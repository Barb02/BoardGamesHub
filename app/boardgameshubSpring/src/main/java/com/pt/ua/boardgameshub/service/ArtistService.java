package com.pt.ua.boardgameshub.service;

import com.pt.ua.boardgameshub.domain.Artist;

public interface ArtistService {
    public Artist getArtistById(Long id);
    public void addArtist(Artist artist);
} 
