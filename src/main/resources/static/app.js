const state = {
  sessions: [],
  currentSessionId: null,
  records: [],
  documents: [],
  currentView: "chat"
};

const navItems = document.querySelectorAll(".nav-item");
const views = document.querySelectorAll(".view");
const sessionSelector = document.getElementById("sessionSelector");
const messageList = document.getElementById("messageList");
const referenceList = document.getElementById("referenceList");
const sessionTableBody = document.getElementById("sessionTableBody");
const knowledgeTableBody = document.getElementById("knowledgeTableBody");
const recordTableBody = document.getElementById("recordTableBody");
const chunkList = document.getElementById("chunkList");

navItems.forEach((item) => {
  item.addEventListener("click", () => switchView(item.dataset.view));
});

document.getElementById("createSessionBtn").addEventListener("click", createSession);
document.getElementById("refreshSessionsBtn").addEventListener("click", bootstrap);
document.getElementById("sendQuestionBtn").addEventListener("click", sendQuestion);
document.getElementById("importKnowledgeBtn").addEventListener("click", importKnowledge);
sessionSelector.addEventListener("change", async (event) => {
  const sessionId = Number(event.target.value);
  if (sessionId) {
    state.currentSessionId = sessionId;
    await loadMessages(sessionId);
  }
});

async function api(path, options = {}) {
  const response = await fetch(path, {
    headers: { "Content-Type": "application/json" },
    ...options
  });
  const payload = await response.json();
  if (!response.ok || payload.code !== 200) {
    throw new Error(payload.message || "请求失败");
  }
  return payload.data;
}

async function bootstrap() {
  try {
    await Promise.all([loadDashboard(), loadSessions(), loadKnowledge(), loadRecords()]);
    if (state.sessions.length && !state.currentSessionId) {
      state.currentSessionId = state.sessions[0].id;
      sessionSelector.value = String(state.currentSessionId);
      await loadMessages(state.currentSessionId);
    } else if (state.currentSessionId) {
      await loadMessages(state.currentSessionId);
    } else {
      renderMessages([]);
    }
  } catch (error) {
    alert(error.message);
  }
}

function switchView(viewName) {
  state.currentView = viewName;
  navItems.forEach((item) => item.classList.toggle("active", item.dataset.view === viewName));
  views.forEach((view) => view.classList.toggle("active", view.id === `view-${viewName}`));
}

async function loadDashboard() {
  const summary = await api("/api/dashboard/summary");
  document.getElementById("sessionCount").textContent = summary.sessionCount || 0;
  document.getElementById("messageCount").textContent = summary.messageCount || 0;
  document.getElementById("documentCount").textContent = summary.documentCount || 0;
  document.getElementById("chunkCount").textContent = summary.chunkCount || 0;
}

async function loadSessions() {
  state.sessions = await api("/api/sessions");
  renderSessions();
}

async function loadMessages(sessionId) {
  const messages = await api(`/api/sessions/${sessionId}/messages`);
  renderMessages(messages);
}

async function loadKnowledge() {
  state.documents = await api("/api/knowledge");
  renderKnowledgeTable();
}

async function loadRecords() {
  state.records = await api("/api/records");
  renderRecords();
}

function renderSessions() {
  sessionSelector.innerHTML = "";
  if (!state.sessions.length) {
    sessionSelector.innerHTML = '<option value="">暂无会话</option>';
  } else {
    state.sessions.forEach((session) => {
      const option = document.createElement("option");
      option.value = String(session.id);
      option.textContent = `${session.sessionName} (${session.sceneType})`;
      sessionSelector.appendChild(option);
    });
    if (state.currentSessionId) {
      sessionSelector.value = String(state.currentSessionId);
    }
  }

  sessionTableBody.innerHTML = state.sessions.map((session) => `
    <tr>
      <td>${escapeHtml(session.sessionName)}</td>
      <td>${escapeHtml(session.sessionCode)}</td>
      <td>${escapeHtml(session.sceneType)}</td>
      <td>${escapeHtml(session.lastQuestion || "-")}</td>
      <td>${formatTime(session.updatedAt)}</td>
      <td>
        <div class="table-actions">
          <button onclick="selectSession(${session.id})">查看消息</button>
          <button class="danger" onclick="deleteSession(${session.id})">删除</button>
        </div>
      </td>
    </tr>
  `).join("");
}

function renderMessages(messages) {
  if (!messages.length) {
    messageList.innerHTML = '<div class="empty-state">当前会话还没有消息，输入问题开始对话。</div>';
    referenceList.innerHTML = '<p class="muted">发送知识问答后会在这里展示命中片段。</p>';
    return;
  }
  messageList.innerHTML = messages.map((message) => `
    <div class="message-item ${message.role === 'USER' ? 'user' : 'assistant'}">
      <div class="message-meta">
        <span>${message.role === "USER" ? "用户" : "智能助理"} / ${escapeHtml(message.sourceType || "-")}</span>
        <span>${formatTime(message.createdAt)}</span>
      </div>
      <div>${escapeHtml(message.content)}</div>
    </div>
  `).join("");
  const latestAssistant = [...messages].reverse().find((item) => item.role === "ASSISTANT");
  renderReferences(latestAssistant?.references || []);
}

function renderReferences(references) {
  if (!references.length) {
    referenceList.innerHTML = '<p class="muted">当前回答未命中知识片段，或使用了普通聊天模式。</p>';
    return;
  }
  referenceList.innerHTML = references.map((reference) => `
    <div class="reference-item">
      <strong>${escapeHtml(reference.documentTitle)}</strong>
      <div>${escapeHtml(reference.snippet)}</div>
      <div class="muted">匹配分数：${Number(reference.score || 0).toFixed(1)}</div>
    </div>
  `).join("");
}

function renderKnowledgeTable() {
  knowledgeTableBody.innerHTML = state.documents.map((document) => `
    <tr>
      <td>${escapeHtml(document.title)}</td>
      <td>${escapeHtml(document.category)}</td>
      <td>${escapeHtml(document.summary || "-")}</td>
      <td>${document.chunkCount || 0}</td>
      <td>${escapeHtml(document.status)}</td>
      <td>
        <div class="table-actions">
          <button onclick="loadChunks(${document.id})">查看片段</button>
          <button class="danger" onclick="deleteKnowledge(${document.id})">删除</button>
        </div>
      </td>
    </tr>
  `).join("");
}

function renderRecords() {
  recordTableBody.innerHTML = state.records.map((record) => `
    <tr>
      <td>${escapeHtml(record.sessionName)}</td>
      <td>${escapeHtml(record.question)}</td>
      <td>${escapeHtml(record.answer)}</td>
      <td>${escapeHtml(record.sourceType)}</td>
      <td>${renderInlineReferences(record.references)}</td>
      <td>${formatTime(record.createdAt)}</td>
    </tr>
  `).join("");
}

function renderInlineReferences(references) {
  if (!references || !references.length) {
    return "<span class='muted'>无</span>";
  }
  return references.map((reference) =>
    `<div><strong>${escapeHtml(reference.documentTitle)}</strong>：${escapeHtml(reference.snippet)}</div>`
  ).join("");
}

async function createSession() {
  const sessionName = document.getElementById("sessionNameInput").value.trim();
  try {
    await api("/api/sessions", {
      method: "POST",
      body: JSON.stringify({
        sessionName,
        sceneType: document.getElementById("knowledgeMode").checked ? "KNOWLEDGE_QA" : "GENERAL_CHAT"
      })
    });
    document.getElementById("sessionNameInput").value = "";
    await loadSessions();
    if (state.sessions.length) {
      state.currentSessionId = state.sessions[0].id;
      sessionSelector.value = String(state.currentSessionId);
      await loadMessages(state.currentSessionId);
    }
    await loadDashboard();
  } catch (error) {
    alert(error.message);
  }
}

async function sendQuestion() {
  const question = document.getElementById("questionInput").value.trim();
  if (!question) {
    alert("请输入问题");
    return;
  }
  try {
    const response = await api("/api/chat/ask", {
      method: "POST",
      body: JSON.stringify({
        sessionId: state.currentSessionId,
        question,
        knowledgeMode: document.getElementById("knowledgeMode").checked
      })
    });
    state.currentSessionId = response.sessionId;
    document.getElementById("questionInput").value = "";
    await Promise.all([loadSessions(), loadMessages(state.currentSessionId), loadDashboard(), loadRecords()]);
    sessionSelector.value = String(state.currentSessionId);
  } catch (error) {
    alert(error.message);
  }
}

async function importKnowledge() {
  const title = document.getElementById("knowledgeTitle").value.trim();
  const category = document.getElementById("knowledgeCategory").value.trim();
  const content = document.getElementById("knowledgeContent").value.trim();
  if (!title || !category || !content) {
    alert("请完整填写知识标题、分类和内容");
    return;
  }
  try {
    await api("/api/knowledge/import", {
      method: "POST",
      body: JSON.stringify({ title, category, content, sourceType: "TEXT" })
    });
    document.getElementById("knowledgeTitle").value = "";
    document.getElementById("knowledgeCategory").value = "";
    document.getElementById("knowledgeContent").value = "";
    await Promise.all([loadKnowledge(), loadDashboard()]);
  } catch (error) {
    alert(error.message);
  }
}

async function loadChunks(documentId) {
  try {
    const chunks = await api(`/api/knowledge/${documentId}/chunks`);
    chunkList.innerHTML = chunks.map((chunk) => `
      <div class="chunk-item">
        <strong>片段 ${chunk.chunkIndex}</strong>
        <div>${escapeHtml(chunk.content)}</div>
        <div class="muted">关键词：${escapeHtml(chunk.keywords || "-")}</div>
      </div>
    `).join("");
  } catch (error) {
    alert(error.message);
  }
}

async function deleteSession(sessionId) {
  if (!confirm("确定删除该会话吗？")) {
    return;
  }
  try {
    await api(`/api/sessions/${sessionId}`, { method: "DELETE" });
    if (state.currentSessionId === sessionId) {
      state.currentSessionId = null;
    }
    await Promise.all([loadSessions(), loadDashboard(), loadRecords()]);
    if (state.sessions.length) {
      state.currentSessionId = state.sessions[0].id;
      sessionSelector.value = String(state.currentSessionId);
      await loadMessages(state.currentSessionId);
    } else {
      renderMessages([]);
    }
  } catch (error) {
    alert(error.message);
  }
}

async function deleteKnowledge(documentId) {
  if (!confirm("确定删除该知识文档吗？")) {
    return;
  }
  try {
    await api(`/api/knowledge/${documentId}`, { method: "DELETE" });
    chunkList.innerHTML = '<p class="muted">选择任意知识文档后，这里会展示切片内容与关键词。</p>';
    await Promise.all([loadKnowledge(), loadDashboard()]);
  } catch (error) {
    alert(error.message);
  }
}

async function selectSession(sessionId) {
  state.currentSessionId = sessionId;
  switchView("chat");
  sessionSelector.value = String(sessionId);
  await loadMessages(sessionId);
}

function formatTime(value) {
  if (!value) {
    return "-";
  }
  return value.replace("T", " ");
}

function escapeHtml(value) {
  if (value === null || value === undefined) {
    return "";
  }
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
    .replaceAll("\n", "<br>");
}

window.selectSession = selectSession;
window.deleteSession = deleteSession;
window.deleteKnowledge = deleteKnowledge;
window.loadChunks = loadChunks;

bootstrap();
