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
@RequestMapping("/api/dashboard")
@Tag(name = "Dashboard")
public class DashboardController {

    @GetMapping
    @Operation(summary = "Get dashboard summary")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getDashboard() {
        Map<String, Object> data = Map.of(
                "activeCampaigns", 0,
                "totalProducts", 0,
                "monthlyRevenue", 0,
                "conversionRate", 0.0
        );
        return ResponseEntity.ok(ApiResponse.success("Dashboard summary fetched", data));
    }
}
