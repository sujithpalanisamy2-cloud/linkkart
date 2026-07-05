package com.kart.repository;

import com.kart.entity.Product;
import com.kart.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByMerchant(User merchant);
}
