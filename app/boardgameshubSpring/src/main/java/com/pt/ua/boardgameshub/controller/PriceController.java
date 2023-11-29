package com.pt.ua.boardgameshub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.pt.ua.boardgameshub.service.jpa_service.PriceService;
import com.pt.ua.boardgameshub.service.jpa_service.GameService;
import com.pt.ua.boardgameshub.domain.jpa_domain.Game;
import com.pt.ua.boardgameshub.domain.jpa_domain.Price;

@RestController
public class PriceController {
    private final PriceService priceService;
    private final GameService gameService;

    @Autowired
    public PriceController(PriceService priceService, GameService gameService) {
        this.priceService = priceService;
        this.gameService = gameService;
    }

    @PostMapping("/price/{game_id}/{id}")
    public Price updatePrice(@RequestBody Price price, @PathVariable long game_id, @PathVariable long id){
        Game game = gameService.getGameById(game_id);
        if (game == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Game not found.");
        }
        Price newPrice = priceService.addPrice(price, game, id);
        if (newPrice != null) {
            return newPrice;
        }
        else{
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Couldn't add price.");
        }
    }
}
