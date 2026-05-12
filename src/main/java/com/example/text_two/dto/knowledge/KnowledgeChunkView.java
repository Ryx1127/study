package com.example.text_two.dto.knowledge;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class KnowledgeChunkView {

    private Long id;

    private Integer chunkIndex;

    private String content;

    private String keywords;
}
