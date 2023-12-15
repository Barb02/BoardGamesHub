package com.pt.ua.boardgameshub.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

import com.pt.ua.boardgameshub.dao.response_body.WishlistedResponse;
import com.pt.ua.boardgameshub.service.WishlistedService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;


@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/api/v1")
public class UserController {
    private final WishlistedService wishlistedService;

    @Autowired
    public UserController(WishlistedService wishlistedService) {
        this.wishlistedService = wishlistedService;
    }

    @Operation(summary = "Add a game to the user's wishlist (AUTHENTICATION REQUIRED)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Game saved to wishlist",
            content = {@Content(mediaType = "application/json", schema = @Schema(implementation = WishlistedResponse.class))}),
            @ApiResponse(responseCode = "404", description = "Game not found", content = @Content)})
    @PostMapping("user/wishlist/add/{game_id}")
    public WishlistedResponse addGameToWishlist(@PathVariable long game_id) {
        WishlistedResponse game = wishlistedService.addToWishlist(game_id);
        if(game != null){
            return game;
        }
        else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Game not found");
        }
    }

    @Operation(summary = "Remove a game from the user's wishlist (AUTHENTICATION REQUIRED)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Game removed from wishlist",
            content = {@Content(mediaType = "application/json", schema = @Schema(implementation = WishlistedResponse.class))}),
            @ApiResponse(responseCode = "404", description = "Game not found", content = @Content)})
    @DeleteMapping("user/wishlist/remove/{game_id}")
    public void removeGameFromWishlist(@PathVariable long game_id) {
        try{
            wishlistedService.removeFromWishlist(game_id);
        }
        catch(Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Game not found");
        }
    }

    @Operation(summary = "Get user's wishlist filtered by search query (AUTHENTICATION REQUIRED)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK",
                    content = {@Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = WishlistedResponse.class)))}),
            @ApiResponse(responseCode = "404", description = "Wishlist not found", content = @Content)})
    @GetMapping("user/wishlist")
    public List<WishlistedResponse> getWishlist(@RequestParam(name="q", defaultValue = "") String filter) {
        List<WishlistedResponse> wishlistResponse = wishlistedService.getWishlist(filter);
        if(wishlistResponse != null){
            return wishlistResponse;
        }
        else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Wishlist not found");
        }
    }

}
