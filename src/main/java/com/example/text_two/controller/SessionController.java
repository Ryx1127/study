package com.example.text_two.controller;

import com.example.text_two.common.ApiResponse;
import com.example.text_two.dto.chat.ChatMessageView;
import com.example.text_two.dto.session.SessionCreateRequest;
import com.example.text_two.dto.session.SessionView;
import com.example.text_two.entity.ChatSession;
import com.example.text_two.service.ChatMessageService;
import com.example.text_two.service.ChatSessionService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sessions")
public class SessionController {

    private final ChatSessionService chatSessionService;

    private final ChatMessageService chatMessageService;

    @PostMapping
    public ApiResponse<SessionView> create(@RequestBody SessionCreateRequest request) {
        ChatSession session = chatSessionService.createSession(request);
        return ApiResponse.success("会话创建成功", SessionView.builder()
                .id(session.getId())
                .sessionCode(session.getSessionCode())
                .sessionName(session.getSessionName())
                .sceneType(session.getSceneType())
                .lastQuestion(session.getLastQuestion())
                .updatedAt(session.getUpdatedAt())
                .build());
    }

    @GetMapping
    public ApiResponse<List<SessionView>> list() {
        return ApiResponse.success(chatSessionService.listSessions());
    }

    @GetMapping("/{sessionId}/messages")
    public ApiResponse<List<ChatMessageView>> listMessages(@PathVariable Long sessionId) {
        return ApiResponse.success(chatMessageService.listMessages(sessionId));
    }

    @DeleteMapping("/{sessionId}")
    public ApiResponse<Void> delete(@PathVariable Long sessionId) {
        chatSessionService.removeSession(sessionId);
        return ApiResponse.success("会话删除成功", null);
    }
}
