package com.pt.ua.boardgameshub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pt.ua.boardgameshub.domain.Game;

import java.util.List;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {
    @Query("SELECT c.game " +
        "FROM Click c " +
        "LEFT JOIN c.game.publishers p " +
        "WHERE (:publisherName IS NULL OR p.name = :publisherName) " +
        "GROUP BY c.game " +
        "ORDER BY COUNT(c) DESC " +
        "LIMIT :max")
    List<Game> findAllGamesOrderByClickCountDesc(@Param("max") int limit, @Param("publisherName") String publisherName);
    @Query("SELECT c.game " +
        "FROM Click c " +
        "LEFT JOIN c.game.categories cat " +
        "WHERE cat.name IN " +
        "(SELECT pc.category.name FROM PreferredCategory pc " +
        "WHERE pc.user.id = :userId) " +
        "GROUP BY c.game " +
        "ORDER BY COUNT(c) DESC " +
        "LIMIT :max")
    List<Game> findGamesByPreferredCategoryOrderByClickCountDesc(@Param("max") int limit, @Param("userId") long userId);

}