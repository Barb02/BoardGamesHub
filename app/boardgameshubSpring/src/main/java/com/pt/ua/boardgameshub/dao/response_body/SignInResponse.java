package com.pt.ua.boardgameshub.dao.response_body;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class SignInResponse {
    String token;
    String username;
}
