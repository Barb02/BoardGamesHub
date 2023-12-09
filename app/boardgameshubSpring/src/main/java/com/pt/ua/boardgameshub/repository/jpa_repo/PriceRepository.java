package com.pt.ua.boardgameshub.repository.jpa_repo;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import com.pt.ua.boardgameshub.domain.jpa_domain.Price;

@EnableJpaRepositories(basePackages = { "com.pt.ua.boardgameshub.repository.jpa_repo" })
@Repository
public interface PriceRepository extends JpaRepository<Price, Long> {
    public Price findFirstByStoreIdAndGameId(Long store_id, Long game_id, Sort sort);
    public List<Price> findByGameId(Long game_id);
}
