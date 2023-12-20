package com.pt.ua.boardgameshub.repository;

import com.pt.ua.boardgameshub.dao.response_body.WishlistPrice;
import com.pt.ua.boardgameshub.domain.Wishlisted;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WishlistedRepository extends JpaRepository<Wishlisted, Long> {
    List<Wishlisted> findByUserIdAndGameNameContainingIgnoreCaseOrderByInsertionDateDesc(long user_id, String query);
    Wishlisted findByGameIdAndUserId(long game_id, long user_id);
    boolean existsByGameIdAndUserId(long game_id, long user_id);
    
    @Query(value = "SELECT w.game_id, g.name, GetLowestPriceValueForGame(w.game_id) as lowest_price " +
                   "FROM wishlisted w " +
                   "JOIN game g ON w.game_id = g.id " +
                   "WHERE w.user_id = :userId", nativeQuery = true)
    List<Object[]> findWishlistedGamesWithPriceByUserId(@Param("userId") Long userId);
}
