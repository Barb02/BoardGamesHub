package com.pt.ua.boardgameshub.service.jpa_service;

import com.pt.ua.boardgameshub.domain.jpa_domain.Artist;

public interface ArtistService {
    public Artist getArtistById(Long id);
    public void addArtist(Artist artist);
} 
