package com.pt.ua.boardgameshub.repository;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pt.ua.boardgameshub.domain.Price;

@Repository
public interface PriceRepository extends JpaRepository<Price, Long> {
    public Price findFirstByStoreIdAndGameId(Long store_id, Long game_id, Sort sort);
}
