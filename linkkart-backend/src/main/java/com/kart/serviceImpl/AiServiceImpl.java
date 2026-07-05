package com.kart.serviceImpl;

import com.kart.dto.ai.ChatRequest;
import com.kart.dto.ai.ChatResponse;
import com.kart.entity.ChatHistory;
import com.kart.repository.ChatHistoryRepository;
import com.kart.service.AiService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDateTime;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AiServiceImpl implements AiService {
    private final ChatHistoryRepository chatHistoryRepository;

    @Value("${gemini.api.key:}")
    private String geminiApiKey;

    @Value("${gemini.api.url:https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent}")
    private String geminiApiUrl;

    @Override
    public ChatResponse chat(ChatRequest request) {
        String reply = "I can help with campaign performance, earnings, product recommendations, and conversion tips.";
        if (!geminiApiKey.isBlank()) {
            try {
                WebClient client = WebClient.builder().baseUrl(geminiApiUrl).build();
                Map<String, Object> payload = Map.of(
                        "contents", new Object[]{Map.of("parts", new Object[]{Map.of("text", request.getMessage())})}
                );
                reply = client.post()
                        .uri(uriBuilder -> uriBuilder.queryParam("key", geminiApiKey).build())
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                        .bodyValue(payload)
                        .retrieve()
                        .bodyToMono(Map.class)
                        .map(body -> {
                            var candidates = (java.util.List<Map<String, Object>>) body.get("candidates");
                            if (candidates != null && !candidates.isEmpty()) {
                                var content = (Map<String, Object>) candidates.get(0).get("content");
                                var parts = (java.util.List<Map<String, Object>>) content.get("parts");
                                if (parts != null && !parts.isEmpty()) {
                                    return parts.get(0).get("text").toString();
                                }
                            }
                            return "I couldn’t generate an AI response right now.";
                        })
                        .block();
            } catch (Exception ex) {
                reply = "AI service is unavailable right now. Please try again later.";
            }
        }

        ChatHistory history = ChatHistory.builder()
                .prompt(request.getMessage())
                .response(reply)
                .createdAt(LocalDateTime.now())
                .build();
        chatHistoryRepository.save(history);

        return ChatResponse.builder().reply(reply).build();
    }
}
