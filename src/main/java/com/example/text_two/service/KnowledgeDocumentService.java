package com.example.text_two.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.text_two.dto.knowledge.KnowledgeChunkView;
import com.example.text_two.dto.knowledge.KnowledgeDocumentView;
import com.example.text_two.dto.knowledge.KnowledgeImportRequest;
import com.example.text_two.dto.knowledge.KnowledgeReference;
import com.example.text_two.entity.KnowledgeDocument;
import java.util.List;

public interface KnowledgeDocumentService extends IService<KnowledgeDocument> {

    KnowledgeDocumentView importKnowledge(KnowledgeImportRequest request);

    List<KnowledgeDocumentView> listDocuments();

    List<KnowledgeChunkView> listChunks(Long documentId);

    List<KnowledgeReference> retrieveReferences(String question, int limit);

    void removeDocument(Long documentId);
}
