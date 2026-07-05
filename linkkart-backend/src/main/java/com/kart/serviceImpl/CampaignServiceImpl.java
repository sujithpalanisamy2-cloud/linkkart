package com.kart.serviceImpl;

import com.kart.dto.campaign.CampaignRequest;
import com.kart.dto.campaign.CampaignResponse;
import com.kart.entity.Campaign;
import com.kart.entity.Category;
import com.kart.entity.User;
import com.kart.exception.BadRequestException;
import com.kart.exception.ResourceNotFoundException;
import com.kart.repository.CampaignRepository;
import com.kart.repository.CategoryRepository;
import com.kart.repository.UserRepository;
import com.kart.service.CampaignService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CampaignServiceImpl implements CampaignService {
    private final CampaignRepository campaignRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    @Override
    public CampaignResponse create(CampaignRequest request) {
        User merchant = getCurrentUser();
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        Campaign campaign = Campaign.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .commissionRate(request.getCommissionRate())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .status(request.getStatus() != null ? request.getStatus() : "ACTIVE")
                .merchant(merchant)
                .category(category)
                .build();

        return toResponse(campaignRepository.save(campaign));
    }

    @Override
    public CampaignResponse update(Long id, CampaignRequest request) {
        Campaign campaign = campaignRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Campaign not found"));
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        campaign.setTitle(request.getTitle());
        campaign.setDescription(request.getDescription());
        campaign.setCommissionRate(request.getCommissionRate());
        campaign.setStartDate(request.getStartDate());
        campaign.setEndDate(request.getEndDate());
        campaign.setStatus(request.getStatus() != null ? request.getStatus() : "ACTIVE");
        campaign.setCategory(category);

        return toResponse(campaignRepository.save(campaign));
    }

    @Override
    public void delete(Long id) {
        Campaign campaign = campaignRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Campaign not found"));
        campaignRepository.delete(campaign);
    }

    @Override
    public List<CampaignResponse> getAll() {
        return campaignRepository.findAll().stream().map(this::toResponse).toList();
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new BadRequestException("Authenticated user not found"));
    }

    private CampaignResponse toResponse(Campaign campaign) {
        return CampaignResponse.builder()
                .id(campaign.getId())
                .title(campaign.getTitle())
                .description(campaign.getDescription())
                .commissionRate(campaign.getCommissionRate())
                .startDate(campaign.getStartDate())
                .endDate(campaign.getEndDate())
                .status(campaign.getStatus())
                .merchantId(campaign.getMerchant() != null ? campaign.getMerchant().getId() : null)
                .merchantName(campaign.getMerchant() != null ? campaign.getMerchant().getFullName() : null)
                .categoryId(campaign.getCategory() != null ? campaign.getCategory().getId() : null)
                .categoryName(campaign.getCategory() != null ? campaign.getCategory().getName() : null)
                .createdAt(campaign.getCreatedAt())
                .build();
    }
}
