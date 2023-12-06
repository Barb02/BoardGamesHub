package com.pt.ua.boardgameshub.repository.jpa_repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pt.ua.boardgameshub.domain.jpa_domain.Store;

@Repository
public interface StoreRepository extends JpaRepository<Store, Long> {}
