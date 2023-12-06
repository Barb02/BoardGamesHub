package com.pt.ua.boardgameshub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.pt.ua.boardgameshub.service.jpa_service.PriceService;
import com.pt.ua.boardgameshub.service.jpa_service.GameService;
import com.pt.ua.boardgameshub.service.jpa_service.StoreService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.*;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import com.pt.ua.boardgameshub.domain.jpa_domain.Store;
import com.pt.ua.boardgameshub.controller.response_body.PriceResponse;
import com.pt.ua.boardgameshub.domain.jpa_domain.Game;
import com.pt.ua.boardgameshub.domain.jpa_domain.Price;


import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/api/v1")
public class PriceController {
    private final PriceService priceService;
    private final GameService gameService;
    private final StoreService storeService;

    @Autowired
    public PriceController(PriceService priceService, GameService gameService, StoreService storeService) {
        this.priceService = priceService;
        this.gameService = gameService;
        this.storeService = storeService;
    }

    @Operation(summary = "Add a new price for a game in the specified store")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Created",
            content = {@Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = Price.class)))}),
            @ApiResponse(responseCode = "404", description = "Game or store not found", content = @Content),
            @ApiResponse(responseCode = "500", description = "Couldn't add price", content = @Content)})
    @PostMapping("price/{game_id}/{store_id}")
    public Price addPrice(@RequestBody Price price, @PathVariable long game_id, @PathVariable long store_id){
        Game game = gameService.getGameById(game_id);
        Store store = storeService.getStoreById(store_id);
        if (game == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Game not found");
        }
        if (store == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Store not found");
        }
        Price newPrice = priceService.addPrice(price, game, store);
        if (newPrice != null) {
            return newPrice;
        }
        else{
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Couldn't add game (manual)");
        }
    }

    @Operation(summary = "Get current price for a game in the specified store")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK",
            content = {@Content(mediaType = "application/json", schema = @Schema(implementation = PriceResponse.class))}),
            @ApiResponse(responseCode = "404", description = "Price not found", content = @Content)})
    @GetMapping("price/{game_id}/{store_id}")
    public PriceResponse getCurrentPrice(@PathVariable long game_id, @PathVariable long store_id){
        Price price = priceService.getPriceByStoreIdAndGameId(store_id, game_id);
        PriceResponse priceResponse = new PriceResponse(price);
        if (price != null) {
            return priceResponse;
        }
        else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Price not found");
        }
    }

    @Operation(summary = "Get current prices for a game in all stores")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK",
            content = {@Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = PriceResponse.class)))}),
            @ApiResponse(responseCode = "404", description = "Prices not found", content = @Content)})
    @GetMapping("price/{game_id}")
    public List<PriceResponse> getCurrentPrices(@PathVariable long game_id){
        List<Store> stores = storeService.getStores();
        List<PriceResponse> prices = new ArrayList<>();
        for (Store store : stores) {
            Price price = priceService.getPriceByStoreIdAndGameId(store.getId(), game_id);
            PriceResponse priceResponse = new PriceResponse(price);
            prices.add(priceResponse);
        }
        if ( ! prices.isEmpty()) {
            return prices;
        }
        else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Prices not found");
        }
    }

    @Operation(summary = "Get current lowest price for a game across all stores")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK",
            content = {@Content(mediaType = "application/json", schema = @Schema(implementation = PriceResponse.class))}),
            @ApiResponse(responseCode = "404", description = "Price not found", content = @Content)})
    @GetMapping("price/lowest/{game_id}")
    public PriceResponse getCurrentLowestPrice(@PathVariable long game_id){
        List<PriceResponse> prices = getCurrentPrices(game_id);
        PriceResponse lowestPrice = prices.stream().min(Comparator.comparing(PriceResponse::getPrice)).orElse(null);
        if (lowestPrice != null) {
            return lowestPrice;
        }
        else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Prices not found");
        }
    }

}
