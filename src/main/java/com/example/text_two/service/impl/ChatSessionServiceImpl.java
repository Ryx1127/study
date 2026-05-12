package com.example.text_two.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.text_two.common.BusinessException;
import com.example.text_two.dto.session.SessionCreateRequest;
import com.example.text_two.dto.session.SessionView;
import com.example.text_two.entity.ChatMessage;
import com.example.text_two.entity.ChatSession;
import com.example.text_two.enums.SessionSceneType;
import com.example.text_two.mapper.ChatMessageMapper;
import com.example.text_two.mapper.ChatSessionMapper;
import com.example.text_two.service.ChatSessionService;
import com.example.text_two.util.TextSegmentUtils;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
@RequiredArgsConstructor
public class ChatSessionServiceImpl extends ServiceImpl<ChatSessionMapper, ChatSession> implements ChatSessionService {

    private final ChatMessageMapper chatMessageMapper;

    @Override
    public ChatSession createSession(SessionCreateRequest request) {
        LocalDateTime now = LocalDateTime.now();
        ChatSession session = new ChatSession();
        session.setSessionCode(UUID.randomUUID().toString().replace("-", ""));
        session.setSessionName(StringUtils.hasText(request.getSessionName())
                ? request.getSessionName().trim()
                : "新会话-" + now.toLocalTime().withNano(0));
        session.setSceneType(StringUtils.hasText(request.getSceneType())
                ? request.getSceneType()
                : SessionSceneType.GENERAL_CHAT.name());
        session.setCreatedAt(now);
        session.setUpdatedAt(now);
        session.setDeleted(0);
        save(session);
        return session;
    }

    @Override
    public List<SessionView> listSessions() {
        return lambdaQuery()
                .orderByDesc(ChatSession::getUpdatedAt)
                .list()
                .stream()
                .map(this::toView)
                .toList();
    }

    @Override
    public ChatSession getOrCreateSession(Long sessionId, String sessionCode, String sessionName, Boolean knowledgeMode) {
        if (sessionId != null) {
            ChatSession session = getById(sessionId);
            if (session == null) {
                throw new BusinessException("会话不存在");
            }
            return session;
        }
        if (StringUtils.hasText(sessionCode)) {
            ChatSession session = lambdaQuery().eq(ChatSession::getSessionCode, sessionCode).one();
            if (session != null) {
                return session;
            }
        }
        SessionCreateRequest request = new SessionCreateRequest();
        request.setSessionName(sessionName);
        request.setSceneType(Boolean.TRUE.equals(knowledgeMode)
                ? SessionSceneType.KNOWLEDGE_QA.name()
                : SessionSceneType.GENERAL_CHAT.name());
        return createSession(request);
    }

    @Override
    public void updateSessionSnapshot(ChatSession session, String question, String answer, Boolean knowledgeMode) {
        session.setLastQuestion(TextSegmentUtils.summarize(question, 120));
        session.setLastAnswer(TextSegmentUtils.summarize(answer, 400));
        session.setSceneType(Boolean.TRUE.equals(knowledgeMode)
                ? SessionSceneType.KNOWLEDGE_QA.name()
                : SessionSceneType.GENERAL_CHAT.name());
        if (!StringUtils.hasText(session.getSessionName()) || session.getSessionName().startsWith("新会话-")) {
            session.setSessionName(TextSegmentUtils.summarize(question, 16));
        }
        session.setUpdatedAt(LocalDateTime.now());
        updateById(session);
    }

    @Override
    public void removeSession(Long sessionId) {
        ChatSession session = getById(sessionId);
        if (session == null) {
            throw new BusinessException("会话不存在");
        }
        removeById(sessionId);
        chatMessageMapper.delete(new LambdaQueryWrapper<ChatMessage>().eq(ChatMessage::getSessionId, sessionId));
    }

    private SessionView toView(ChatSession session) {
        return SessionView.builder()
                .id(session.getId())
                .sessionCode(session.getSessionCode())
                .sessionName(session.getSessionName())
                .sceneType(session.getSceneType())
                .lastQuestion(session.getLastQuestion())
                .updatedAt(session.getUpdatedAt())
                .build();
    }
}
