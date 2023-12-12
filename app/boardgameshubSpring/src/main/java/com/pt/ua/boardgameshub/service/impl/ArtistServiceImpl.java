package com.pt.ua.boardgameshub.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pt.ua.boardgameshub.domain.Artist;
import com.pt.ua.boardgameshub.repository.ArtistRepository;
import com.pt.ua.boardgameshub.service.ArtistService;

@Service
public class ArtistServiceImpl implements ArtistService{
    
    private final ArtistRepository artistRepository;

    @Autowired
    public ArtistServiceImpl(ArtistRepository artistRepository){
        this.artistRepository = artistRepository;
    }

    @Override
    public Artist getArtistById(Long id) {
        return artistRepository.findById(id).orElse(null);
    }

    @Override
    public void addArtist(Artist artist) {
        artistRepository.save(artist);
    }
}
