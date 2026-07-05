package com.kart.repository;

import com.kart.entity.Commission;
import com.kart.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommissionRepository extends JpaRepository<Commission, Long> {
    List<Commission> findByAffiliate(User affiliate);
}
