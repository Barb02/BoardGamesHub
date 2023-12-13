package com.pt.ua.boardgameshub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pt.ua.boardgameshub.domain.Click;

@Repository
public interface ClickRepository extends JpaRepository<Click, Long> {
    @Query("SELECT c FROM Click c WHERE c.game.id = :gameId")
    List<Click> findByGameId(@Param("gameId") Long gameId);
}