package com.pt.ua.boardgameshub.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pt.ua.boardgameshub.service.jpa_service.StoreService;
import com.pt.ua.boardgameshub.domain.jpa_domain.Store;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class StoreController {
    
    private final StoreService storeService;

    public StoreController(StoreService storeService) {
        this.storeService = storeService;
    }

    @PostMapping("store")
    public Store addStore(@RequestBody Store store){
        return storeService.addStore(store);
    }

    @GetMapping("stores")
    public List<Store> getStores(){
        return storeService.getStores();
    }
}
