package com.example.text_two.controller;

import com.example.text_two.common.ApiResponse;
import com.example.text_two.dto.chat.ChatAskRequest;
import com.example.text_two.dto.chat.ChatAskResponse;
import com.example.text_two.service.ChatApplicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatApplicationService chatApplicationService;

    @PostMapping("/ask")
    public ApiResponse<ChatAskResponse> ask(@Valid @RequestBody ChatAskRequest request) {
        return ApiResponse.success("问答成功", chatApplicationService.ask(request));
    }
}
