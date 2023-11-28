package com.pt.ua.boardgameshub.service.jpa_service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pt.ua.boardgameshub.domain.jpa_domain.Price;
import com.pt.ua.boardgameshub.domain.jpa_domain.Game;
import com.pt.ua.boardgameshub.service.jpa_service.PriceService;
import com.pt.ua.boardgameshub.repository.jpa_repo.PriceRepository;

@Service
public class PriceServiceImpl implements PriceService{
    
    private final PriceRepository priceRepository;

    @Autowired
    public PriceServiceImpl(PriceRepository priceRepository) {
        this.priceRepository = priceRepository;
    }

    @Override
    public Price addPrice(Price newPrice, Game game, long id) {
        if (game != null) newPrice.setGame(game);
        newPrice.setTimestamp(new java.sql.Timestamp(System.currentTimeMillis()));
        return priceRepository.save(newPrice);
    }

    @Override
    public Price getPriceById(Long id) {
        return priceRepository.findById(id).orElse(null);
    }
}
