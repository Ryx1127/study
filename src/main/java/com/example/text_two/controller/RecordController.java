package com.example.text_two.controller;

import com.example.text_two.common.ApiResponse;
import com.example.text_two.dto.chat.ChatRecordView;
import com.example.text_two.service.ChatMessageService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/records")
public class RecordController {

    private final ChatMessageService chatMessageService;

    @GetMapping
    public ApiResponse<List<ChatRecordView>> list() {
        return ApiResponse.success(chatMessageService.listRecords());
    }
}
