package com.pt.ua.boardgameshub.repository;

import com.pt.ua.boardgameshub.domain.Wishlisted;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WishlistedRepository extends JpaRepository<Wishlisted, Long> {
    List<Wishlisted> findByUserIdAndGameNameContainingIgnoreCaseOrderByInsertionDateDesc(long user_id, String query);
    Wishlisted findByGameIdAndUserId(long game_id, long user_id);
}
