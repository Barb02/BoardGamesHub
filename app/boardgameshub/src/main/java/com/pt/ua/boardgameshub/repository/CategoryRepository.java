package com.pt.ua.boardgameshub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pt.ua.boardgameshub.domain.Game;

@Repository
public interface CategoryRepository extends JpaRepository<Game, Long> {}