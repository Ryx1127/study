package com.example.text_two.controller;

import com.example.text_two.common.ApiResponse;
import com.example.text_two.dto.knowledge.KnowledgeChunkView;
import com.example.text_two.dto.knowledge.KnowledgeDocumentView;
import com.example.text_two.dto.knowledge.KnowledgeImportRequest;
import com.example.text_two.service.KnowledgeDocumentService;
import jakarta.validation.Valid;
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
@RequestMapping("/api/knowledge")
public class KnowledgeController {

    private final KnowledgeDocumentService knowledgeDocumentService;

    @PostMapping("/import")
    public ApiResponse<KnowledgeDocumentView> importKnowledge(@Valid @RequestBody KnowledgeImportRequest request) {
        return ApiResponse.success("知识导入成功", knowledgeDocumentService.importKnowledge(request));
    }

    @GetMapping
    public ApiResponse<List<KnowledgeDocumentView>> list() {
        return ApiResponse.success(knowledgeDocumentService.listDocuments());
    }

    @GetMapping("/{documentId}/chunks")
    public ApiResponse<List<KnowledgeChunkView>> listChunks(@PathVariable Long documentId) {
        return ApiResponse.success(knowledgeDocumentService.listChunks(documentId));
    }

    @DeleteMapping("/{documentId}")
    public ApiResponse<Void> delete(@PathVariable Long documentId) {
        knowledgeDocumentService.removeDocument(documentId);
        return ApiResponse.success("知识删除成功", null);
    }
}
