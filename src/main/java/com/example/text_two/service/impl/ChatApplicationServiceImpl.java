package com.example.text_two.service.impl;

import com.example.text_two.dto.chat.ChatAskRequest;
import com.example.text_two.dto.chat.ChatAskResponse;
import com.example.text_two.dto.knowledge.KnowledgeReference;
import com.example.text_two.entity.ChatSession;
import com.example.text_two.enums.MessageRole;
import com.example.text_two.service.ChatApplicationService;
import com.example.text_two.service.ChatMessageService;
import com.example.text_two.service.ChatSessionService;
import com.example.text_two.service.KnowledgeDocumentService;
import com.example.text_two.util.TextSegmentUtils;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
@RequiredArgsConstructor
public class ChatApplicationServiceImpl implements ChatApplicationService {

    private final ChatSessionService chatSessionService;

    private final ChatMessageService chatMessageService;

    private final KnowledgeDocumentService knowledgeDocumentService;

    @Override
    public ChatAskResponse ask(ChatAskRequest request) {
        boolean knowledgeMode = Boolean.TRUE.equals(request.getKnowledgeMode());
        ChatSession session = chatSessionService.getOrCreateSession(
                request.getSessionId(),
                request.getSessionCode(),
                request.getSessionName(),
                knowledgeMode);
        String question = request.getQuestion().trim();
        chatMessageService.saveMessage(session, MessageRole.USER, question, "QUESTION", List.of());
        List<KnowledgeReference> references = knowledgeMode
                ? knowledgeDocumentService.retrieveReferences(question, 3)
                : List.of();
        String sourceType = references.isEmpty() ? "GENERAL" : "KNOWLEDGE";
        String answer = buildAnswer(session, question, references, knowledgeMode);
        chatMessageService.saveMessage(session, MessageRole.ASSISTANT, answer, sourceType, references);
        chatSessionService.updateSessionSnapshot(session, question, answer, knowledgeMode);
        return ChatAskResponse.builder()
                .sessionId(session.getId())
                .sessionCode(session.getSessionCode())
                .sessionName(session.getSessionName())
                .answer(answer)
                .sourceType(sourceType)
                .references(references)
                .createdAt(LocalDateTime.now())
                .build();
    }

    private String buildAnswer(ChatSession session, String question, List<KnowledgeReference> references,
            boolean knowledgeMode) {
        String contextPrefix = "";
        if (StringUtils.hasText(session.getLastQuestion())) {
            contextPrefix = "结合上一轮提到的“" + TextSegmentUtils.summarize(session.getLastQuestion(), 18) + "”，";
        }
        if (!references.isEmpty()) {
            String evidence = references.stream()
                    .map(reference -> "【" + reference.getDocumentTitle() + "】" + reference.getSnippet())
                    .reduce((left, right) -> left + "\n" + right)
                    .orElse("");
            return contextPrefix
                    + "系统已命中 "
                    + references.size()
                    + " 条知识库片段。\n"
                    + "问题聚焦："
                    + question
                    + "\n"
                    + "参考依据：\n"
                    + evidence
                    + "\n"
                    + "综合答复：建议先按照上述知识片段中的制度、流程或口径执行；如果实际场景存在例外，再由管理员补充说明并更新知识库。";
        }
        if (knowledgeMode) {
            return contextPrefix
                    + "当前知识库中没有检索到与“"
                    + question
                    + "”高度匹配的片段。建议先补充制度文本、FAQ 或业务说明，再重新发起知识问答。";
        }
        return contextPrefix
                + "关于“"
                + question
                + "”，系统给出的演示性答复是：先明确业务目标、输入条件和预期输出，再按流程逐步处理。如果需要更精确的企业口径，可以切换到知识问答模式并补充知识库内容。";
    }
}
