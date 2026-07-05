package com.kart.controller;

import com.kart.dto.ApiResponse;
import com.kart.dto.feedback.FeedbackRequest;
import com.kart.dto.feedback.FeedbackResponse;
import com.kart.entity.Feedback;
import com.kart.repository.FeedbackRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
@RequiredArgsConstructor
@Tag(name = "Feedback")
public class FeedbackController {
    private final FeedbackRepository feedbackRepository;

    @PostMapping
    @Operation(summary = "Submit feedback")
    public ResponseEntity<ApiResponse<FeedbackResponse>> submit(@Valid @RequestBody FeedbackRequest request) {
        Feedback feedback = Feedback.builder()
                .content(request.getMessage())
                .build();
        feedbackRepository.save(feedback);
        return ResponseEntity.ok(ApiResponse.success("Feedback submitted successfully", FeedbackResponse.builder()
                .id(feedback.getId())
                .message(feedback.getContent())
                .build()));
    }

    @GetMapping
    @Operation(summary = "List feedback")
    public ResponseEntity<ApiResponse<List<FeedbackResponse>>> list() {
        List<FeedbackResponse> response = feedbackRepository.findAll().stream().map(f -> FeedbackResponse.builder()
                .id(f.getId())
                .message(f.getContent())
                .build()).toList();
        return ResponseEntity.ok(ApiResponse.success("Feedback fetched successfully", response));
    }
}
