package com.pt.ua.boardgameshub.service.jpa_service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pt.ua.boardgameshub.domain.jpa_domain.Price;
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
    public Price updatePrice(Price newPrice, long id) {
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
