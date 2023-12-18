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

import com.pt.ua.boardgameshub.service.GameService;
import com.pt.ua.boardgameshub.service.PriceService;
import com.pt.ua.boardgameshub.service.StoreService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.*;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import com.pt.ua.boardgameshub.domain.Store;
import com.pt.ua.boardgameshub.dao.response_body.PriceHistory;
import com.pt.ua.boardgameshub.dao.response_body.PriceResponse;
import com.pt.ua.boardgameshub.dao.response_body.ShortPrice;
import com.pt.ua.boardgameshub.domain.Game;
import com.pt.ua.boardgameshub.domain.Price;

import java.sql.Date;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collector;
import java.util.stream.Collectors;

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
        List<Price> prices = priceService.getCurrentPrices(game_id);
        if ( !prices.isEmpty()) {
            return prices.stream().map(PriceResponse::new).collect(Collectors.toList());
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
        Price lowestPrice = priceService.getLowerPrice(game_id);
        if (lowestPrice != null) {
            return new PriceResponse(lowestPrice);
        }
        else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Prices not found");
        }
    }

    @Operation(summary = "Get current price for a game in the specified store")
    @GetMapping("price/history/{game_id}")
    public List<PriceHistory> priceHistory(@PathVariable long game_id){
        return priceService.getHistory(game_id);
    }
}
