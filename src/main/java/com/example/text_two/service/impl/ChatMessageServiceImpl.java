package com.example.text_two.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.text_two.dto.chat.ChatMessageView;
import com.example.text_two.dto.chat.ChatRecordView;
import com.example.text_two.dto.knowledge.KnowledgeReference;
import com.example.text_two.entity.ChatMessage;
import com.example.text_two.entity.ChatSession;
import com.example.text_two.enums.MessageRole;
import com.example.text_two.mapper.ChatMessageMapper;
import com.example.text_two.mapper.ChatSessionMapper;
import com.example.text_two.service.ChatMessageService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatMessageServiceImpl extends ServiceImpl<ChatMessageMapper, ChatMessage> implements ChatMessageService {

    private final ObjectMapper objectMapper;

    private final ChatSessionMapper chatSessionMapper;

    @Override
    public ChatMessage saveMessage(ChatSession session, MessageRole role, String content, String sourceType,
            List<KnowledgeReference> references) {
        ChatMessage message = new ChatMessage();
        message.setSessionId(session.getId());
        message.setSessionCode(session.getSessionCode());
        message.setRole(role.name());
        message.setContent(content);
        message.setSourceType(sourceType);
        message.setReferenceChunks(writeReferences(references));
        message.setCreatedAt(LocalDateTime.now());
        save(message);
        return message;
    }

    @Override
    public List<ChatMessageView> listMessages(Long sessionId) {
        return lambdaQuery()
                .eq(ChatMessage::getSessionId, sessionId)
                .orderByAsc(ChatMessage::getCreatedAt)
                .list()
                .stream()
                .map(this::toMessageView)
                .toList();
    }

    @Override
    public List<ChatRecordView> listRecords() {
        List<ChatMessage> messages = lambdaQuery()
                .orderByAsc(ChatMessage::getSessionId)
                .orderByAsc(ChatMessage::getCreatedAt)
                .list();
        Map<Long, ChatMessage> latestUserMessage = new HashMap<>();
        Map<Long, ChatSession> sessionMap = new HashMap<>();
        for (ChatSession session : chatSessionMapper.selectList(null)) {
            sessionMap.put(session.getId(), session);
        }
        List<ChatRecordView> result = new ArrayList<>();
        for (ChatMessage message : messages) {
            if (MessageRole.USER.name().equals(message.getRole())) {
                latestUserMessage.put(message.getSessionId(), message);
                continue;
            }
            if (!MessageRole.ASSISTANT.name().equals(message.getRole())) {
                continue;
            }
            ChatMessage questionMessage = latestUserMessage.get(message.getSessionId());
            ChatSession session = sessionMap.get(message.getSessionId());
            result.add(ChatRecordView.builder()
                    .sessionId(message.getSessionId())
                    .sessionCode(message.getSessionCode())
                    .sessionName(session == null ? "未知会话" : session.getSessionName())
                    .question(questionMessage == null ? "" : questionMessage.getContent())
                    .answer(message.getContent())
                    .sourceType(message.getSourceType())
                    .references(readReferences(message.getReferenceChunks()))
                    .createdAt(message.getCreatedAt())
                    .build());
        }
        Collections.reverse(result);
        return result;
    }

    @Override
    public void removeBySessionId(Long sessionId) {
        remove(new LambdaQueryWrapper<ChatMessage>().eq(ChatMessage::getSessionId, sessionId));
    }

    private ChatMessageView toMessageView(ChatMessage message) {
        return ChatMessageView.builder()
                .id(message.getId())
                .role(message.getRole())
                .content(message.getContent())
                .sourceType(message.getSourceType())
                .references(readReferences(message.getReferenceChunks()))
                .createdAt(message.getCreatedAt())
                .build();
    }

    private String writeReferences(List<KnowledgeReference> references) {
        if (references == null || references.isEmpty()) {
            return null;
        }
        try {
            return objectMapper.writeValueAsString(references);
        } catch (JsonProcessingException exception) {
            return null;
        }
    }

    private List<KnowledgeReference> readReferences(String references) {
        if (references == null || references.isBlank()) {
            return List.of();
        }
        try {
            return objectMapper.readValue(references, new TypeReference<>() {
            });
        } catch (JsonProcessingException exception) {
            return List.of();
        }
    }
}
