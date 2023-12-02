package com.pt.ua.boardgameshub.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.pt.ua.boardgameshub.service.jpa_service.StoreService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import com.pt.ua.boardgameshub.domain.jpa_domain.Store;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class StoreController {
    
    private final StoreService storeService;

    public StoreController(StoreService storeService) {
        this.storeService = storeService;
    }

    @Operation(summary = "Add a new store")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Store was created",
            content = {@Content(mediaType = "application/json", schema = @Schema(implementation = Store.class))}),
            @ApiResponse(responseCode = "500", description = "Couldn't add store", content = @Content)})
    @PostMapping("store")
    public Store addStore(@RequestBody Store store){
        Store newStore = storeService.addStore(store);
        if(newStore != null){
            return newStore;
        }
        else{
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Couldn't add store");
        }
    }

    @Operation(summary = "Get all stores")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK",
            content = {@Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = Store.class)))}),
            @ApiResponse(responseCode = "404", description = "Stores not found", content = @Content)})
    @GetMapping("stores")
    public List<Store> getStores(){
        List<Store> stores = storeService.getStores();
        if ( ! stores.isEmpty()){
            return stores;
        }
        else{
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Stores not found");
        }
    }
}
