package com.kart.service;

import com.kart.dto.campaign.CampaignRequest;
import com.kart.dto.campaign.CampaignResponse;

import java.util.List;

public interface CampaignService {
    CampaignResponse create(CampaignRequest request);
    CampaignResponse update(Long id, CampaignRequest request);
    void delete(Long id);
    List<CampaignResponse> getAll();
}
