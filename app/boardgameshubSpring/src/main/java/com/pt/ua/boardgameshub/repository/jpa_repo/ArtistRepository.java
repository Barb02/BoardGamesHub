package com.pt.ua.boardgameshub.repository.jpa_repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import com.pt.ua.boardgameshub.domain.jpa_domain.Artist;

@EnableJpaRepositories(basePackages = { "com.pt.ua.boardgameshub.repository.jpa_repo" })
@Repository
public interface ArtistRepository extends JpaRepository<Artist, Long> {}
