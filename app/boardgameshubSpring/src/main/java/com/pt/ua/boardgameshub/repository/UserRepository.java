package com.pt.ua.boardgameshub.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pt.ua.boardgameshub.domain.User;
import com.pt.ua.boardgameshub.domain.Game;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String username);
    List<Game> findByNameContainingOrderByNameAsc(String query);
    List<Game> findByNameStartingWithOrderByNameAsc(String query);
}
