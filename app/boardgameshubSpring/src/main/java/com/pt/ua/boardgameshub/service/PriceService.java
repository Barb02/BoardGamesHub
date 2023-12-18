package com.pt.ua.boardgameshub.service;

import java.util.List;

import com.pt.ua.boardgameshub.dao.response_body.PriceHistory;
import com.pt.ua.boardgameshub.domain.Game;
import com.pt.ua.boardgameshub.domain.Price;
import com.pt.ua.boardgameshub.domain.Store;

public interface PriceService {
    public Price addPrice(Price price, Game game, Store store);
    public Price getPriceById(Long id);
    public Price getPriceByStoreIdAndGameId(Long store_id, Long game_id);
    public List<Price> getCurrentPrices(Long game_id);
    public Price getLowerPrice(Long game_id);
    public List<PriceHistory> getHistory(Long game_id);
} 
