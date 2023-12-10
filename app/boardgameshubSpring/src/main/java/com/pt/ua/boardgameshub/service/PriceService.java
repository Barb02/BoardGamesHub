package com.pt.ua.boardgameshub.service;

import com.pt.ua.boardgameshub.domain.Game;
import com.pt.ua.boardgameshub.domain.Price;
import com.pt.ua.boardgameshub.domain.Store;

public interface PriceService {
    public Price addPrice(Price price, Game game, Store store);
    public Price getPriceById(Long id);
    public Price getPriceByStoreIdAndGameId(Long store_id, Long game_id);
} 
