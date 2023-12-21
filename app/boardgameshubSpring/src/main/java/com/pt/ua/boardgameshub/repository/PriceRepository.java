package com.pt.ua.boardgameshub.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pt.ua.boardgameshub.domain.Price;

@Repository
public interface PriceRepository extends JpaRepository<Price, Long> {
    public Price findFirstByStoreIdAndGameId(Long store_id, Long game_id, Sort sort);
    public List<Price> findByGameId(Long game_id);

    @Query(value = "SELECT * FROM GetLatestPricesForGame(:gameId)", nativeQuery = true)
    public List<Price> findLatestPriceByGameId(@Param("gameId") Long game_id);

    @Query(value = "SELECT * FROM GetLowestPriceForGame(:gameId)", nativeQuery = true)
    public Price findLowestPriceByGameId(@Param("gameId") Long game_id);

    @Query(value = "SELECT * FROM GetPriceHistory(:gameId)", nativeQuery = true)
    public List<Price> findPriceHistory(@Param("gameId") Long game_id);
}
