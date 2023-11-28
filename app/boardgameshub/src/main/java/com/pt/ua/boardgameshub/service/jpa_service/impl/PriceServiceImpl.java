package com.pt.ua.boardgameshub.service.jpa_service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pt.ua.boardgameshub.domain.jpa_domain.Price;
import com.pt.ua.boardgameshub.domain.jpa_domain.Game;
import com.pt.ua.boardgameshub.service.jpa_service.PriceService;
import com.pt.ua.boardgameshub.repository.jpa_repo.PriceRepository;
import com.pt.ua.boardgameshub.repository.jpa_repo.GameRepository;

@Service
public class PriceServiceImpl implements PriceService{
    
    private final PriceRepository priceRepository;
    private final GameRepository gameRepository;

    @Autowired
    public PriceServiceImpl(PriceRepository priceRepository, GameRepository gameRepository) {
        this.priceRepository = priceRepository;
        this.gameRepository = gameRepository;
    }

    @Override
    public Price updatePrice(Price newPrice, long game_id, long id) {
        Game game = gameRepository.findById(game_id);
        newPrice.setGame(game);
        return priceRepository.findById(id)
            .map(price -> {
                price.setPrice(newPrice.getPrice());
                return priceRepository.save(price);
            })
            .orElseGet(() -> {
                return priceRepository.save(newPrice);
            });
    }

    @Override
    public Price getPriceById(Long id) {
        return priceRepository.findById(id).orElse(null);
    }
}
