package com.pt.ua.boardgameshub.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.pt.ua.boardgameshub.service.jpa_service.PriceService;
import com.pt.ua.boardgameshub.service.jpa_service.GameService;
import com.pt.ua.boardgameshub.domain.jpa_domain.Game;
import com.pt.ua.boardgameshub.domain.jpa_domain.Price;

@RestController
@RequestMapping("/api/v1")
public class PriceController {
    private final PriceService priceService;
    private final GameService gameService;

    @Autowired
    public PriceController(PriceService priceService, GameService gameService) {
        this.priceService = priceService;
        this.gameService = gameService;
    }

    @PostMapping("price/{game_id}")
    public Price addPrice(@RequestBody Price price, @PathVariable long game_id){
        Game game = gameService.getGameById(game_id);
        if (game == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Game not found.");
        }
        Price newPrice = priceService.addPrice(price, game);
        if (newPrice != null) {
            return newPrice;
        }
        else{
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Couldn't add price.");
        }
    }

    @GetMapping("price/{game_id}/{store_id}")
    public Price getPrices(@PathVariable long game_id, @PathVariable long store_id){
        Price price = priceService.getPriceByStoreIdAndGameId(store_id, game_id);
        if (price != null) {
            return price;
        }
        else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Prices not found.");
        }
    }
}
