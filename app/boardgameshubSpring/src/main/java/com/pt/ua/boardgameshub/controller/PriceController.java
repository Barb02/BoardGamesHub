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

import com.pt.ua.boardgameshub.service.PriceService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.*;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import com.pt.ua.boardgameshub.dao.response_body.PriceHistory;
import com.pt.ua.boardgameshub.dao.response_body.PriceResponse;
import com.pt.ua.boardgameshub.domain.Price;

import java.util.List;

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/api/v1")
public class PriceController {
    private final PriceService priceService;

    @Autowired
    public PriceController(PriceService priceService) {
        this.priceService = priceService;
    }

    @Operation(summary = "Add a new price for a game in the specified store")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Created",
            content = {@Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = Price.class)))}),
            @ApiResponse(responseCode = "404", description = "Game and/or store not found", content = @Content),
            @ApiResponse(responseCode = "500", description = "Couldn't add price", content = @Content)})
    @PostMapping("price/{game_id}/{store_id}")
    public Price addPrice(@RequestBody Price price, @PathVariable long game_id, @PathVariable long store_id){
        Price newPrice = priceService.addPrice(price, game_id, store_id);
        if (newPrice != null) {
            return newPrice;
        }
        else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Game and/or store not found.");
        }
    }

    @Operation(summary = "Get current price for a game in the specified store")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK",
            content = {@Content(mediaType = "application/json", schema = @Schema(implementation = PriceResponse.class))}),
            @ApiResponse(responseCode = "404", description = "Price not found", content = @Content)})
    @GetMapping("price/{game_id}/{store_id}")
    public PriceResponse getCurrentPrice(@PathVariable long game_id, @PathVariable long store_id){
        PriceResponse price = priceService.getPriceByStoreIdAndGameId(store_id, game_id);
        if (price != null) {
            return price;
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
        List<PriceResponse> prices = priceService.getCurrentPrices(game_id);
        if ( !prices.isEmpty()) {
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
        PriceResponse lowestPrice = priceService.getLowerPrice(game_id);
        if (lowestPrice != null) {
            return lowestPrice;
        }
        else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Price not found");
        }
    }

    @Operation(summary = "Get the price history for a game for each store")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK",
            content = {@Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = PriceHistory.class)))}),
            @ApiResponse(responseCode = "404", description = "Prices not found", content = @Content)})
    @GetMapping("price/history/{game_id}")
    public List<PriceHistory> priceHistory(@PathVariable long game_id){
        List<PriceHistory> priceHistory = priceService.getHistory(game_id);
        if (priceHistory != null) {
            return priceHistory;
        }
        else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Prices not found");
        }
    }
}
