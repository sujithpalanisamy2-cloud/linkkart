package com.kart.controller;

import com.kart.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
@Tag(name = "Analytics")
public class AnalyticsController {

    @GetMapping
    @Operation(summary = "Get analytics summary")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getAnalytics() {
        Map<String, Object> data = Map.of(
                "monthlyEarnings", 0,
                "revenue", 0,
                "conversionRate", 0.0,
                "topProducts", 0,
                "topAffiliates", 0
        );
        return ResponseEntity.ok(ApiResponse.success("Analytics fetched successfully", data));
    }
}
