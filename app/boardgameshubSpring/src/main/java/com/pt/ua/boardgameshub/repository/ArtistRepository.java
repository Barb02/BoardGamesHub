package com.pt.ua.boardgameshub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pt.ua.boardgameshub.domain.Artist;

@Repository
public interface ArtistRepository extends JpaRepository<Artist, Long> {}
