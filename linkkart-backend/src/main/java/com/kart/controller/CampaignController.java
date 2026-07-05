package com.kart.controller;

import com.kart.dto.ApiResponse;
import com.kart.dto.campaign.CampaignRequest;
import com.kart.dto.campaign.CampaignResponse;
import com.kart.service.CampaignService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/campaigns")
@RequiredArgsConstructor
@Tag(name = "Campaigns")
public class CampaignController {
    private final CampaignService campaignService;

    @GetMapping
    @Operation(summary = "List campaigns")
    public ResponseEntity<ApiResponse<List<CampaignResponse>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success("Campaigns fetched successfully", campaignService.getAll()));
    }

    @PostMapping
    @Operation(summary = "Create a campaign")
    public ResponseEntity<ApiResponse<CampaignResponse>> create(@Valid @RequestBody CampaignRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Campaign created successfully", campaignService.create(request)));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a campaign")
    public ResponseEntity<ApiResponse<CampaignResponse>> update(@PathVariable Long id, @Valid @RequestBody CampaignRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Campaign updated successfully", campaignService.update(id, request)));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a campaign")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        campaignService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Campaign deleted successfully", null));
    }
}
