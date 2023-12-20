package com.pt.ua.boardgameshub.service.impl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.pt.ua.boardgameshub.dao.request_body.SignUpRequest;
import com.pt.ua.boardgameshub.dao.request_body.SignInRequest;
import com.pt.ua.boardgameshub.dao.response_body.SignUpResponse;
import com.pt.ua.boardgameshub.dao.response_body.SignInResponse;
import com.pt.ua.boardgameshub.domain.User;
import com.pt.ua.boardgameshub.repository.UserRepository;
import com.pt.ua.boardgameshub.service.AuthenticationService;
import com.pt.ua.boardgameshub.service.JwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public SignUpResponse signup(SignUpRequest request) {
        User user = new User(request, passwordEncoder);
        userRepository.save(user);
        String jwt = jwtService.generateToken(user);
        return SignUpResponse.builder().token(jwt).role(user.getRole()).build();
    }

    @Override
    public SignInResponse signin(SignInRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));
        String jwt = jwtService.generateToken(user);
        return SignInResponse.builder().token(jwt).username(user.getName()).role(user.getRole()).build();
    }
}