package com.pt.ua.boardgameshub.service.jpa_service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.pt.ua.boardgameshub.domain.jpa_domain.Price;
import com.pt.ua.boardgameshub.domain.jpa_domain.Game;
import com.pt.ua.boardgameshub.domain.jpa_domain.Store;
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
    public Price addPrice(Price newPrice, Game game, Store store) {
        if (game != null) newPrice.setGame(game);
        if (store != null) newPrice.setStore(store);
        newPrice.setTimestamp(new java.sql.Timestamp(System.currentTimeMillis()));
        return priceRepository.save(newPrice);
    }

    @Override
    public Price getPriceById(Long id) {
        return priceRepository.findById(id).orElse(null);
    }

    @Override
    public Price getPriceByStoreIdAndGameId(Long store_id, Long game_id) {
        return priceRepository.findFirstByStoreIdAndGameId(store_id, game_id, Sort.by(Sort.Direction.DESC, "timestamp"));
    }
}
