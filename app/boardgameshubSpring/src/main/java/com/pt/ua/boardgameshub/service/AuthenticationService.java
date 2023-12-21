package com.pt.ua.boardgameshub.service;

import com.pt.ua.boardgameshub.dao.request_body.SignUpRequest;
import com.pt.ua.boardgameshub.dao.request_body.SignInRequest;
import com.pt.ua.boardgameshub.dao.response_body.SignUpResponse;
import com.pt.ua.boardgameshub.dao.response_body.SignInResponse;

public interface AuthenticationService {
    SignUpResponse signup(SignUpRequest request);
    SignInResponse signin(SignInRequest request);
}
