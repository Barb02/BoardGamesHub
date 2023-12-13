package com.pt.ua.boardgameshub.service;

import java.util.List;

import com.pt.ua.boardgameshub.domain.Game;
import com.pt.ua.boardgameshub.dao.request_body.GameRequest;

public interface GameService {
    public Game addGameManual(GameRequest game);
    //public Game addGameAuto(Long id);
    public Game getGameById(Long id);
    public List<Game> getFilteredGames(String name, String categories, String orderBy);
    public List<Game> getTopGames(int limit);
}
