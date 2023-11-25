package com.pt.ua.boardgameshub.repository.cassandra_repo;

import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import com.pt.ua.boardgameshub.domain.cassandra_domain.PriceHistory;
import com.pt.ua.boardgameshub.domain.cassandra_domain.PriceHistoryKey;

@Repository
public interface PriceHistoryRepository extends CassandraRepository<PriceHistory, PriceHistoryKey> {}