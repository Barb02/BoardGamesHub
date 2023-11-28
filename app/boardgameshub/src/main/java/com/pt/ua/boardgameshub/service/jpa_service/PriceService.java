package com.pt.ua.boardgameshub.service.jpa_service;

import com.pt.ua.boardgameshub.domain.jpa_domain.Price;
import com.pt.ua.boardgameshub.domain.jpa_domain.Game;

public interface PriceService {
    public Price addPrice(Price price, Game game, long id);
    public Price getPriceById(Long id);
} 
