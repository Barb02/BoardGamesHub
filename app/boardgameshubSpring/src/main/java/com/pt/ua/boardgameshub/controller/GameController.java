package com.pt.ua.boardgameshub.controller;

import java.util.HashSet;
import java.util.Set;
import java.util.List;

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
    private final DesignerService designerService;
    private final PublisherService publisherService;
    private final ArtistService artistService;
    private final CategoryService categoryService;

    @Autowired
    public GameController(GameService gameService, DesignerService designerService, PublisherService publisherService, ArtistService artistService, CategoryService categoryService){
        this.gameService = gameService;
        this.designerService = designerService;
        this.publisherService = publisherService;
        this.artistService = artistService;
        this.categoryService = categoryService;
    }

    @Operation(summary = "Add a new game manually (without pulling data from BGG API)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Game was created",
            content = {@Content(mediaType = "application/json", schema = @Schema(implementation = Game.class))}),
            @ApiResponse(responseCode = "500", description = "Couldn't add game (manual)", content = @Content)})
    @PostMapping("game/manual")
    public Game addGameManual(@RequestBody GameRequest gamerequest){
        Game game = new Game(gamerequest);
        Set<Designer> designers = new HashSet<>();
        for(DeveloperRequest designer: gamerequest.getDesigners()){
            if (designerService.getDesignerById(designer.getId()) == null){
                Designer newDesigner = new Designer(designer);
                designerService.addDesigner(newDesigner);
                designers.add(newDesigner);
            }
            else{
                Designer newDesigner = designerService.getDesignerById(designer.getId());
                designers.add(newDesigner);
            }
        }
        Set<Publisher> publishers = new HashSet<>();
        for(DeveloperRequest pub: gamerequest.getPublishers()){
            if (publisherService.getPublisherById(pub.getId()) == null){
                Publisher newPublisher = new Publisher(pub);
                publisherService.addPublisher(newPublisher);
                publishers.add(newPublisher);
            }
            else{
                Publisher newPublisher = publisherService.getPublisherById(pub.getId());
                publishers.add(newPublisher);
            }
        }
        Set<Artist> artists = new HashSet<>();
        for(ArtistRequest artist: gamerequest.getArtists()){
            if (artistService.getArtistById(artist.getId()) == null){
                Artist newArtist = artistService.addArtist(artist);
                artists.add(newArtist);
            }
            else{
                Artist newArtist = artistService.getArtistById(artist.getId());
                artists.add(newArtist);
            }
        }
        Set<Category> categories = new HashSet<>();
        for(CategoryRequest cat: gamerequest.getCategories()){
            if (categoryService.getCategoryById(cat.getId()) == null){
                Category newCategory = new Category(cat);
                categoryService.addCategory(newCategory);
                categories.add(newCategory);
            }
            else{
                Category newCategory = categoryService.getCategoryById(cat.getId());
                categories.add(newCategory);
            }
        }
        game.setDesigners(designers);
        game.setPublishers(publishers);
        game.setArtists(artists);
        game.setCategories(categories);
        Game newGame = gameService.addGameManual(game);
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
    public List<Game> getAllGames(@RequestParam(name="q", defaultValue="") String filter){
        List<Game> games = gameService.getFilterdGames(filter);
        if (games != null) {
            return games;
        }
        else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Games not found");
        }
    }

}
