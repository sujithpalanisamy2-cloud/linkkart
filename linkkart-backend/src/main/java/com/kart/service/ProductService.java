package com.kart.service;

import com.kart.dto.product.ProductRequest;
import com.kart.dto.product.ProductResponse;

import java.util.List;

public interface ProductService {
    ProductResponse create(ProductRequest request);
    ProductResponse update(Long id, ProductRequest request);
    void delete(Long id);
    List<ProductResponse> getAll();
    ProductResponse getById(Long id);
}
