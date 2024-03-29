package com.pt.ua.boardgameshub.service;

import java.util.List;

import com.pt.ua.boardgameshub.domain.Store;

public interface StoreService {
    public Store getStoreById(Long id);
    public Store addStore(Store store);
    public List<Store> getStores();
} 
