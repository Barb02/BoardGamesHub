package com.pt.ua.boardgameshub.service.jpa_service;

import com.pt.ua.boardgameshub.domain.jpa_domain.Price;

public interface PriceService {
    public Price updatePrice(Price price, long id);
    public Price getPriceById(Long id);
} 
