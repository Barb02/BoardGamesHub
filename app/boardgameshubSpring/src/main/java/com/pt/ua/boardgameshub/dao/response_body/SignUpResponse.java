package com.pt.ua.boardgameshub.dao.response_body;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import com.pt.ua.boardgameshub.domain.Role;

@Data
@Builder
@AllArgsConstructor
public class SignUpResponse {
    private String token;
    private Role role;
}
