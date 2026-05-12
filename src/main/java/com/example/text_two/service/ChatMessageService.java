package com.example.text_two.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.text_two.dto.chat.ChatMessageView;
import com.example.text_two.dto.chat.ChatRecordView;
import com.example.text_two.dto.knowledge.KnowledgeReference;
import com.example.text_two.entity.ChatMessage;
import com.example.text_two.entity.ChatSession;
import com.example.text_two.enums.MessageRole;
import java.util.List;

public interface ChatMessageService extends IService<ChatMessage> {

    ChatMessage saveMessage(ChatSession session, MessageRole role, String content, String sourceType,
            List<KnowledgeReference> references);

    List<ChatMessageView> listMessages(Long sessionId);

    List<ChatRecordView> listRecords();

    void removeBySessionId(Long sessionId);
}
