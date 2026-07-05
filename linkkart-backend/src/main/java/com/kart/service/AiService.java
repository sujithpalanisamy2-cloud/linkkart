package com.kart.service;

import com.kart.dto.ai.ChatRequest;
import com.kart.dto.ai.ChatResponse;

public interface AiService {
    ChatResponse chat(ChatRequest request);
}
