package com.example.text_two.dto.knowledge;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class KnowledgeReference {

    private Long chunkId;

    private Long documentId;

    private String documentTitle;

    private String snippet;

    private Double score;
}
