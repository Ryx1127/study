package com.example.text_two.dto.session;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SessionView {

    private Long id;

    private String sessionCode;

    private String sessionName;

    private String sceneType;

    private String lastQuestion;

    private LocalDateTime updatedAt;
}
