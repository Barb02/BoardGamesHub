package com.pt.ua.boardgameshub.repository.jpa_repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pt.ua.boardgameshub.domain.jpa_entities.Designer;

@Repository
public interface DesignerRepository extends JpaRepository<Designer, Long> {}
