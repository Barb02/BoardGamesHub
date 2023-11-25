package com.pt.ua.boardgameshub.service.jpa_service;

import com.pt.ua.boardgameshub.domain.jpa_domain.Game;

public interface GameService {
    public Game addGameManual(Game game);
    //public Game addGameAuto(Long id);
    public Game getGame(Long id);
}
