package com.pt.ua.boardgameshub.service.jpa_service;

import com.pt.ua.boardgameshub.dao.request_body.SignUpRequest;
import com.pt.ua.boardgameshub.dao.request_body.SignInRequest;
import com.pt.ua.boardgameshub.dao.response_body.JwtAuthenticationResponse;

public interface AuthenticationService {
    JwtAuthenticationResponse signup(SignUpRequest request);
    JwtAuthenticationResponse signin(SignInRequest request);
}
