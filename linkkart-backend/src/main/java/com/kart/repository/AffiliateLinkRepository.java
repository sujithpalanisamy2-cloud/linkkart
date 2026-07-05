package com.kart.repository;

import com.kart.entity.AffiliateLink;
import com.kart.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AffiliateLinkRepository extends JpaRepository<AffiliateLink, Long> {
    List<AffiliateLink> findByAffiliate(User affiliate);
}
