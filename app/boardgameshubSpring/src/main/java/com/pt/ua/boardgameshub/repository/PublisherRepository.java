package com.pt.ua.boardgameshub.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pt.ua.boardgameshub.domain.Publisher;

@Repository
public interface PublisherRepository extends JpaRepository<Publisher, Long> {
    public Optional<Publisher> findByName(String name);
}
