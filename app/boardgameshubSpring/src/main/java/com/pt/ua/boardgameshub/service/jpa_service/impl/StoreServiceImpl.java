package com.pt.ua.boardgameshub.service.jpa_service.impl;

import com.pt.ua.boardgameshub.service.jpa_service.StoreService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.pt.ua.boardgameshub.domain.jpa_domain.Store;
import com.pt.ua.boardgameshub.repository.jpa_repo.StoreRepository;

import java.util.List;

@Service
public class StoreServiceImpl implements StoreService {
    private final StoreRepository storeRepository;

    @Autowired
    public StoreServiceImpl(StoreRepository storeRepository) {
        this.storeRepository = storeRepository;
    }

    @Override
    public Store getStoreById(Long id) {
        return storeRepository.findById(id).orElse(null);
    }

    @Override
    public Store addStore(Store store) {
        return storeRepository.save(store);
    }

    @Override
    public List<Store> getStores() {
        return storeRepository.findAll();
    }
}
