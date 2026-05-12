package com.example.text_two.dto.session;

import lombok.Data;

@Data
public class SessionCreateRequest {

    private String sessionName;

    private String sceneType;
}
