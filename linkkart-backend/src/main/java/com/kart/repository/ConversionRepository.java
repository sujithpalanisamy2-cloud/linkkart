package com.kart.repository;

import com.kart.entity.Conversion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConversionRepository extends JpaRepository<Conversion, Long> {
}
