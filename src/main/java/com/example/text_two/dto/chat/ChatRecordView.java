package com.example.text_two.dto.chat;

import com.example.text_two.dto.knowledge.KnowledgeReference;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChatRecordView {

    private Long sessionId;

    private String sessionName;

    private String sessionCode;

    private String question;

    private String answer;

    private String sourceType;

    private List<KnowledgeReference> references;

    private LocalDateTime createdAt;
}
