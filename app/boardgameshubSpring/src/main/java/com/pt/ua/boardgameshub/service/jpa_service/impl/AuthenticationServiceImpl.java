package com.pt.ua.boardgameshub.service.jpa_service.impl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.pt.ua.boardgameshub.dao.request_body.SignUpRequest;
import com.pt.ua.boardgameshub.dao.request_body.SignInRequest;
import com.pt.ua.boardgameshub.dao.response_body.JwtAuthenticationResponse;
import com.pt.ua.boardgameshub.domain.jpa_domain.User;
import com.pt.ua.boardgameshub.repository.jpa_repo.UserRepository;
import com.pt.ua.boardgameshub.service.jpa_service.AuthenticationService;
import com.pt.ua.boardgameshub.service.jpa_service.JwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public JwtAuthenticationResponse signup(SignUpRequest request) {
        User user = new User(request, passwordEncoder);
        userRepository.save(user);
        var jwt = jwtService.generateToken(user);
        return JwtAuthenticationResponse.builder().token(jwt).build();
    }

    @Override
    public JwtAuthenticationResponse signin(SignInRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));
        var jwt = jwtService.generateToken(user);
        return JwtAuthenticationResponse.builder().token(jwt).build();
    }
}