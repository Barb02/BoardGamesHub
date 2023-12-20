package com.pt.ua.boardgameshub.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pt.ua.boardgameshub.domain.Publisher;
import com.pt.ua.boardgameshub.service.PublisherService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.server.ResponseStatusException;

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/api/v1")
public class PublisherController {
    
    private final PublisherService publisherService;

    public PublisherController(PublisherService publisherService) {
        this.publisherService = publisherService;
    }

    @Operation(summary = "Get a game by its id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = Publisher.class))}),
            @ApiResponse(responseCode = "404", description = "Game not found", content = @Content)})
    @GetMapping("publisher/{id}")
    public Publisher getGameById(@PathVariable long id){
        Publisher publisher = publisherService.getPublisherById(id);
        if (publisher != null) {
            return publisher;
        }
        else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Publisher not found");
        }
    }
}