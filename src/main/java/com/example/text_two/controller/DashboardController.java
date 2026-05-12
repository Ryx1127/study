package com.example.text_two.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.example.text_two.common.ApiResponse;
import com.example.text_two.entity.KnowledgeChunk;
import com.example.text_two.mapper.KnowledgeChunkMapper;
import com.example.text_two.service.ChatMessageService;
import com.example.text_two.service.ChatSessionService;
import com.example.text_two.service.KnowledgeDocumentService;
import java.util.LinkedHashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final ChatSessionService chatSessionService;

    private final ChatMessageService chatMessageService;

    private final KnowledgeDocumentService knowledgeDocumentService;

    private final KnowledgeChunkMapper knowledgeChunkMapper;

    @GetMapping("/summary")
    public ApiResponse<Map<String, Long>> summary() {
        Map<String, Long> summary = new LinkedHashMap<>();
        summary.put("sessionCount", chatSessionService.count());
        summary.put("messageCount", chatMessageService.count());
        summary.put("documentCount", knowledgeDocumentService.count());
        summary.put("chunkCount", knowledgeChunkMapper.selectCount(new LambdaQueryWrapper<KnowledgeChunk>()));
        return ApiResponse.success(summary);
    }
}
