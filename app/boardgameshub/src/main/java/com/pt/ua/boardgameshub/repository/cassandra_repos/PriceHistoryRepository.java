package com.pt.ua.boardgameshub.repository.cassandra_repos;

import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import com.pt.ua.boardgameshub.domain.cassandra_entities.PriceHistory;
import com.pt.ua.boardgameshub.domain.cassandra_entities.PriceHistoryKey;

@Repository
public interface PriceHistoryRepository extends CassandraRepository<PriceHistory, PriceHistoryKey> {}