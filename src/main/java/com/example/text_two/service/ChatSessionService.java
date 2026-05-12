package com.example.text_two.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.text_two.dto.session.SessionCreateRequest;
import com.example.text_two.dto.session.SessionView;
import com.example.text_two.entity.ChatSession;
import java.util.List;

public interface ChatSessionService extends IService<ChatSession> {

    ChatSession createSession(SessionCreateRequest request);

    List<SessionView> listSessions();

    ChatSession getOrCreateSession(Long sessionId, String sessionCode, String sessionName, Boolean knowledgeMode);

    void updateSessionSnapshot(ChatSession session, String question, String answer, Boolean knowledgeMode);

    void removeSession(Long sessionId);
}
