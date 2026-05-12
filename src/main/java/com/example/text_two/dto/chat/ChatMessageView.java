package com.example.text_two.dto.chat;

import com.example.text_two.dto.knowledge.KnowledgeReference;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChatMessageView {

    private Long id;

    private String role;

    private String content;

    private String sourceType;

    private List<KnowledgeReference> references;

    private LocalDateTime createdAt;
}
