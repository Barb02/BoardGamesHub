package com.pt.ua.boardgameshub.service;

import java.util.List;

import com.pt.ua.boardgameshub.domain.Game;
import com.pt.ua.boardgameshub.dao.request_body.GameRequest;
import com.pt.ua.boardgameshub.dao.request_body.GameQuery;
import com.pt.ua.boardgameshub.dao.response_body.GameCount;

public interface GameService {
    public Game addGameManual(GameRequest game);
    //public Game addGameAuto(Long id);
    public Game getGameById(Long id);
    public List<Game> getFilteredGames(GameQuery query);
    public List<Game> getTopGames(int limit, String publisher);
    public List<Game> getRecommendedGames(int limit);
    public void removeGame(long id);
    public GameCount getNumberOfGames();
}
