package com.kart.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "clicks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Click {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "affiliate_link_id")
    private AffiliateLink affiliateLink;

    private String ipAddress;
    private String userAgent;
    private LocalDateTime clickedAt = LocalDateTime.now();
}
