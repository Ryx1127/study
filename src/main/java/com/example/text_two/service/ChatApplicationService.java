package com.example.text_two.service;

import com.example.text_two.dto.chat.ChatAskRequest;
import com.example.text_two.dto.chat.ChatAskResponse;

public interface ChatApplicationService {

    ChatAskResponse ask(ChatAskRequest request);
}
