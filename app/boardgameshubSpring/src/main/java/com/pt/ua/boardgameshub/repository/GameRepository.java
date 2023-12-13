package com.pt.ua.boardgameshub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pt.ua.boardgameshub.domain.Game;

import java.util.List;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {
    List<Game> findByNameContainingOrderByNameAsc(String query);
    List<Game> findByNameStartingWithOrderByNameAsc(String query);

    @Query("SELECT c.game " +
           "FROM Click c " +
           "GROUP BY c.game " +
           "ORDER BY COUNT(c) DESC " +
           "LIMIT :max")
    List<Game> findAllGamesOrderByClickCountDesc(@Param("max") int limit);
    List<Game> findByNameStartingIgnoreCaseWithOrderByNameAsc(String query);
    List<Game> findByNameContainingIgnoreCaseOrderByNameAsc(String query);
}