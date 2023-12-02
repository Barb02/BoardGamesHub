package com.pt.ua.boardgameshub.service.jpa_service;

import com.pt.ua.boardgameshub.domain.jpa_domain.Game;

import java.util.List;

public interface GameService {
    public Game addGameManual(Game game);
    //public Game addGameAuto(Long id);
    public Game getGameById(Long id);
    public List<Game> getFilterdGames(String filter);
}
