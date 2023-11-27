package com.pt.ua.boardgameshub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.pt.ua.boardgameshub.service.jpa_service.PriceService;
import com.pt.ua.boardgameshub.domain.jpa_domain.Price;

@RestController
public class PriceController {
    private final PriceService priceService;

    @Autowired
    public PriceController(PriceService priceService) {
        this.priceService = priceService;
    }

    @PutMapping("/price/{id}")
    public Price updatePrice(@RequestBody Price price, @PathVariable long id){
        Price newPrice = priceService.updatePrice(price, id);
        if (newPrice != null) {
            return newPrice;
        }
        else{
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Couldn't update/add price.");
        }
    }
}
