package com.kart.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "conversions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Conversion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "affiliate_link_id")
    private AffiliateLink affiliateLink;

    private BigDecimal amount;
    private String status = "PENDING";
    private LocalDateTime createdAt = LocalDateTime.now();
}
