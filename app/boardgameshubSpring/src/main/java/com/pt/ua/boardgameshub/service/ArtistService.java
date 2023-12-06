package com.pt.ua.boardgameshub.service;

import com.pt.ua.boardgameshub.dao.request_body.ArtistRequest;
import com.pt.ua.boardgameshub.domain.Artist;

public interface ArtistService {
    public Artist getArtistById(Long id);
    public Artist addArtist(ArtistRequest artist);
} 
