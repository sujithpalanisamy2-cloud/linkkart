package com.kart.controller;

import com.kart.dto.ApiResponse;
import com.kart.dto.ai.ChatRequest;
import com.kart.dto.ai.ChatResponse;
import com.kart.service.AiService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
@Tag(name = "AI Chat")
public class AiController {
    private final AiService aiService;

    @PostMapping
    @Operation(summary = "Send a chat message to the AI assistant")
    public ResponseEntity<ApiResponse<ChatResponse>> chat(@Valid @RequestBody ChatRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Chat completed", aiService.chat(request)));
    }
}
