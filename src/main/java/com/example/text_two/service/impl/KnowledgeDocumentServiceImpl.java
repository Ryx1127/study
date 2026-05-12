package com.example.text_two.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.text_two.common.BusinessException;
import com.example.text_two.dto.knowledge.KnowledgeChunkView;
import com.example.text_two.dto.knowledge.KnowledgeDocumentView;
import com.example.text_two.dto.knowledge.KnowledgeImportRequest;
import com.example.text_two.dto.knowledge.KnowledgeReference;
import com.example.text_two.entity.KnowledgeChunk;
import com.example.text_two.entity.KnowledgeDocument;
import com.example.text_two.mapper.KnowledgeChunkMapper;
import com.example.text_two.mapper.KnowledgeDocumentMapper;
import com.example.text_two.service.KnowledgeDocumentService;
import com.example.text_two.util.TextSegmentUtils;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
@RequiredArgsConstructor
public class KnowledgeDocumentServiceImpl extends ServiceImpl<KnowledgeDocumentMapper, KnowledgeDocument>
        implements KnowledgeDocumentService {

    private final KnowledgeChunkMapper knowledgeChunkMapper;

    @Override
    public KnowledgeDocumentView importKnowledge(KnowledgeImportRequest request) {
        LocalDateTime now = LocalDateTime.now();
        KnowledgeDocument document = new KnowledgeDocument();
        document.setTitle(request.getTitle().trim());
        document.setCategory(request.getCategory().trim());
        document.setSourceType(StringUtils.hasText(request.getSourceType()) ? request.getSourceType() : "TEXT");
        document.setContent(request.getContent().trim());
        document.setSummary(TextSegmentUtils.summarize(request.getContent(), 140));
        document.setStatus("READY");
        document.setCreatedAt(now);
        document.setUpdatedAt(now);
        document.setDeleted(0);
        save(document);

        List<String> chunks = TextSegmentUtils.splitIntoChunks(request.getContent(), 120);
        for (int index = 0; index < chunks.size(); index++) {
            KnowledgeChunk chunk = new KnowledgeChunk();
            chunk.setDocumentId(document.getId());
            chunk.setChunkIndex(index + 1);
            chunk.setContent(chunks.get(index));
            chunk.setKeywords(TextSegmentUtils.extractKeywords(chunks.get(index), 10));
            chunk.setCreatedAt(now);
            chunk.setUpdatedAt(now);
            knowledgeChunkMapper.insert(chunk);
        }
        return toView(document, chunks.size());
    }

    @Override
    public List<KnowledgeDocumentView> listDocuments() {
        List<KnowledgeDocument> documents = lambdaQuery()
                .orderByDesc(KnowledgeDocument::getUpdatedAt)
                .list();
        Map<Long, Integer> chunkCountMap = new HashMap<>();
        for (KnowledgeChunk chunk : knowledgeChunkMapper.selectList(null)) {
            chunkCountMap.merge(chunk.getDocumentId(), 1, Integer::sum);
        }
        return documents.stream()
                .map(document -> toView(document, chunkCountMap.getOrDefault(document.getId(), 0)))
                .toList();
    }

    @Override
    public List<KnowledgeChunkView> listChunks(Long documentId) {
        return knowledgeChunkMapper.selectList(new LambdaQueryWrapper<KnowledgeChunk>()
                        .eq(KnowledgeChunk::getDocumentId, documentId)
                        .orderByAsc(KnowledgeChunk::getChunkIndex))
                .stream()
                .map(chunk -> KnowledgeChunkView.builder()
                        .id(chunk.getId())
                        .chunkIndex(chunk.getChunkIndex())
                        .content(chunk.getContent())
                        .keywords(chunk.getKeywords())
                        .build())
                .toList();
    }

    @Override
    public List<KnowledgeReference> retrieveReferences(String question, int limit) {
        List<KnowledgeChunk> chunks = knowledgeChunkMapper.selectList(new LambdaQueryWrapper<KnowledgeChunk>()
                .orderByAsc(KnowledgeChunk::getDocumentId)
                .orderByAsc(KnowledgeChunk::getChunkIndex));
        Map<Long, String> documentTitleMap = lambdaQuery()
                .list()
                .stream()
                .collect(java.util.stream.Collectors.toMap(KnowledgeDocument::getId, KnowledgeDocument::getTitle));
        return chunks.stream()
                .map(chunk -> KnowledgeReference.builder()
                        .chunkId(chunk.getId())
                        .documentId(chunk.getDocumentId())
                        .documentTitle(documentTitleMap.getOrDefault(chunk.getDocumentId(), "未命名文档"))
                        .snippet(TextSegmentUtils.summarize(chunk.getContent(), 100))
                        .score(TextSegmentUtils.calculateScore(question, chunk.getContent()))
                        .build())
                .filter(reference -> reference.getScore() > 0)
                .sorted((left, right) -> Double.compare(right.getScore(), left.getScore()))
                .limit(limit)
                .toList();
    }

    @Override
    public void removeDocument(Long documentId) {
        KnowledgeDocument document = getById(documentId);
        if (document == null) {
            throw new BusinessException("知识文档不存在");
        }
        removeById(documentId);
        knowledgeChunkMapper.delete(new LambdaQueryWrapper<KnowledgeChunk>().eq(KnowledgeChunk::getDocumentId, documentId));
    }

    private KnowledgeDocumentView toView(KnowledgeDocument document, Integer chunkCount) {
        return KnowledgeDocumentView.builder()
                .id(document.getId())
                .title(document.getTitle())
                .category(document.getCategory())
                .sourceType(document.getSourceType())
                .summary(document.getSummary())
                .status(document.getStatus())
                .chunkCount(chunkCount)
                .createdAt(document.getCreatedAt())
                .build();
    }
}
