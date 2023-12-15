package com.pt.ua.boardgameshub.dao.response_body;

import java.sql.Timestamp;
import com.pt.ua.boardgameshub.domain.Game;

import lombok.Data;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
public class WishlistedResponse {
    Game game;
    Timestamp insertionDate;
}
