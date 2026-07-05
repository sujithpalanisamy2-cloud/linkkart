package com.kart.service;

import com.kart.dto.auth.AuthResponse;
import com.kart.dto.auth.LoginRequest;
import com.kart.dto.auth.RegisterRequest;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}
