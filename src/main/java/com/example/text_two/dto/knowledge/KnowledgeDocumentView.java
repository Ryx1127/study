package com.example.text_two.dto.knowledge;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class KnowledgeDocumentView {

    private Long id;

    private String title;

    private String category;

    private String sourceType;

    private String summary;

    private String status;

    private Integer chunkCount;

    private LocalDateTime createdAt;
}
