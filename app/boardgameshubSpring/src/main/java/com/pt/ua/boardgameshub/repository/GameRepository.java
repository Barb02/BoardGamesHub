package com.pt.ua.boardgameshub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pt.ua.boardgameshub.domain.Game;

import java.util.List;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {
    List<Game> findByNameStartingIgnoreCaseWithOrderByNameAsc(String query);
    List<Game> findByNameContainingIgnoreCaseOrderByNameAsc(String query);
}