package com.pt.ua.boardgameshub.service.jpa_service;

import com.pt.ua.boardgameshub.domain.jpa_domain.Price;
import com.pt.ua.boardgameshub.domain.jpa_domain.Game;
import com.pt.ua.boardgameshub.domain.jpa_domain.Store;

public interface PriceService {
    public Price addPrice(Price price, Game game, Store store);
    public Price getPriceById(Long id);
    public Price getPriceByStoreIdAndGameId(Long store_id, Long game_id);
} 
