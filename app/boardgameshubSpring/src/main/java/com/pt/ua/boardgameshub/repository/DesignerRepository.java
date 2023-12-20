package com.pt.ua.boardgameshub.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pt.ua.boardgameshub.domain.Designer;

@Repository
public interface DesignerRepository extends JpaRepository<Designer, Long> {
    public Optional<Designer> findByName(String name);
}
