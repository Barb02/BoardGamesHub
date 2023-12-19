package com.pt.ua.boardgameshub.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

import com.pt.ua.boardgameshub.dao.response_body.PreferredCategoryResponse;
import com.pt.ua.boardgameshub.dao.response_body.WishlistedResponse;
import com.pt.ua.boardgameshub.domain.Game;
import com.pt.ua.boardgameshub.dao.response_body.InWishlist;
import com.pt.ua.boardgameshub.service.WishlistedService;
import com.pt.ua.boardgameshub.service.GameService;
import com.pt.ua.boardgameshub.service.PreferredCategoryService;

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
    private final PreferredCategoryService preferredCategoryService;
    private final GameService gameService;

    @Autowired
    public UserController(WishlistedService wishlistedService, PreferredCategoryService preferredCategoryService, GameService gameService) {
        this.wishlistedService = wishlistedService;
        this.preferredCategoryService = preferredCategoryService;
        this.gameService = gameService;
    }

    @Operation(summary = "Add a game to user's wishlist (AUTHENTICATION REQUIRED)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Game added to wishlist",
            content = {@Content(mediaType = "application/json", schema = @Schema(implementation = WishlistedResponse.class))}),
            @ApiResponse(responseCode = "404", description = "Game not found", content = @Content),
            @ApiResponse(responseCode = "403", description = "Not signed in", content = @Content),
            @ApiResponse(responseCode = "500", description = "Couldn't add game to wishlist", content = @Content)})
    @PostMapping("user/wishlist/{game_id}")
    public WishlistedResponse addGameToWishlist(@PathVariable long game_id) {
        WishlistedResponse game;
        try{
            game = wishlistedService.addToWishlist(game_id);
        }
        catch(Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Game is already on wishlist");
        }
        if(game != null){
            return game;
        }
        else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Game not found");
        }
    }

    @Operation(summary = "Remove a game from user's wishlist (AUTHENTICATION REQUIRED)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Game removed from wishlist"),
            @ApiResponse(responseCode = "404", description = "Game not found", content = @Content),
            @ApiResponse(responseCode = "403", description = "Not signed in", content = @Content),
            @ApiResponse(responseCode = "500", description = "Couldn't remove from wishlist", content = @Content)})
    @DeleteMapping("user/wishlist/{game_id}")
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
            @ApiResponse(responseCode = "404", description = "Wishlist not found", content = @Content),
            @ApiResponse(responseCode = "403", description = "Not signed in", content = @Content)})
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

    @Operation(summary = "Check if a game is at user's wishlist (AUTHENTICATION REQUIRED)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = InWishlist.class))}),
            @ApiResponse(responseCode = "404", description = "Game not found", content = @Content),
            @ApiResponse(responseCode = "403", description = "Not signed in", content = @Content)})
    @GetMapping("user/wishlist/{game_id}")
    public InWishlist inWishlist(@PathVariable long game_id) {
        try{
            return new InWishlist(wishlistedService.inWishlist(game_id));
        }
        catch(Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Game not found");
        }
    }

    @Operation(summary = "Edit user's preferred categories (AUTHENTICATION REQUIRED)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Preferred categories were updated",
            content = {@Content(mediaType = "application/json", schema = @Schema(implementation = PreferredCategoryResponse.class))}),
            @ApiResponse(responseCode = "404", description = "Categories not found", content = @Content),
            @ApiResponse(responseCode = "403", description = "Not signed in", content = @Content),
            @ApiResponse(responseCode = "500", description = "Couldn't update categories", content = @Content)})
    @PutMapping("user/categories")
    public List<PreferredCategoryResponse> editPreferredCategories(@RequestBody List<PreferredCategoryResponse> updatedCategories) {
        List<PreferredCategoryResponse> currentCategories = preferredCategoryService.getPreferredCategories();
        if(currentCategories != null && updatedCategories != null){
            for(PreferredCategoryResponse current: currentCategories){
                if(!updatedCategories.contains(current)){
                    preferredCategoryService.removePreferredCategory(current.getCategory().getId());
                }
            }
            for(PreferredCategoryResponse updated: updatedCategories){
                if(!currentCategories.contains(updated)){
                    preferredCategoryService.addPreferredCategory(updated.getCategory().getId());
                }
            }
            return preferredCategoryService.getPreferredCategories();
        }
        else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Categories not found");
        }
    }

    @Operation(summary = "Get user's preferred categories (AUTHENTICATION REQUIRED)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK",
                    content = {@Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = PreferredCategoryResponse.class)))}),
            @ApiResponse(responseCode = "404", description = "Preferred categories not found", content = @Content),
            @ApiResponse(responseCode = "403", description = "Not signed in", content = @Content)})
    @GetMapping("user/categories")
    public List<PreferredCategoryResponse> getPreferredCategories() {
        List<PreferredCategoryResponse> preferredCategoryResponse = preferredCategoryService.getPreferredCategories();
        if(preferredCategoryResponse != null){
            return preferredCategoryResponse;
        }
        else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Categories not found");
        }
    }

    @GetMapping("user/game/recommended")
    public List<Game> getRecommendedGames(@RequestParam( defaultValue = "10", required = false) String limit){
        return gameService.getRecommendedGames(Integer.parseInt(limit));
    }

}
