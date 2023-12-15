package com.pt.ua.boardgameshub.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import com.pt.ua.boardgameshub.service.*;
import com.pt.ua.boardgameshub.dao.request_body.*;
import com.pt.ua.boardgameshub.domain.*;


@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/api/v1")
public class GameController {
    
    private final GameService gameService;
    private final ClickService clickService;
    @Autowired
    public GameController(GameService gameService, ClickService clickService){
        this.gameService = gameService;
        this.clickService = clickService;
    }

    @Operation(summary = "Add a new game manually (without pulling data from BGG API)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Game was created",
            content = {@Content(mediaType = "application/json", schema = @Schema(implementation = Game.class))}),
            @ApiResponse(responseCode = "500", description = "Couldn't add game (manual)", content = @Content)})
    @PostMapping("game/manual")
    public Game addGameManual(@RequestBody GameRequest gamerequest){
        Game newGame = gameService.addGameManual(gamerequest);
        if (newGame != null) {
            return newGame;
        }
        else{
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Couldn't add game (manual)");
        }
    }

    @Operation(summary = "Get a game by its id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = Game.class))}),
            @ApiResponse(responseCode = "404", description = "Game not found", content = @Content)})
    @GetMapping("game/{id}")
    public Game getGameById(@PathVariable long id){
        Game game = gameService.getGameById(id);
        if (game != null) {
            Click click = new Click();
            click.setClickTime(new java.sql.Timestamp(System.currentTimeMillis()));
            click.setGame(game);
            clickService.addClick(click);
            return game;
        }
        else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Game not found");
        }
    }

    @Operation(summary = "Get all games filtered by search query")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK",
                    content = {@Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = Game.class)))}),
            @ApiResponse(responseCode = "404", description = "Games not found", content = @Content)})
    @GetMapping("game")
    public List<Game> getAllGames(@RequestParam(name="q", defaultValue="") String name, 
                                  @RequestParam(name="categories", defaultValue="") List<String> categories,
                                  @RequestParam(name="price", defaultValue="") String price,
                                  @RequestParam(name="players", defaultValue="") String players,
                                  @RequestParam(name="complexity", defaultValue="") String complexity,
                                  @RequestParam(name="playtime", defaultValue="") String playtime,
                                  @RequestParam(name="orderBy", defaultValue="") String orderBy,
                                  @RequestParam(name="order", defaultValue="") String order){

        GameQuery gameQuery = new GameQuery(name, categories,
                                            Range.parseString(price), 
                                            Range.parseString(players), 
                                            Range.parseString(complexity), 
                                            Range.parseString(playtime), 
                                            orderBy, order);
                                            
        List<Game> games = gameService.getFilteredGames(gameQuery);
        if(games != null)
            return games;
        
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Games not found");
        
    }

    @Operation(summary = "Get the most visited games")
    @GetMapping("game/top")
    public List<Game> getTopGames(@RequestParam(name="limit", defaultValue="10") String limit){
        try{
            return gameService.getTopGames(Integer.parseInt(limit));
        }
        catch(Exception e){
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "limit must be an integer");
        }
    }

}
