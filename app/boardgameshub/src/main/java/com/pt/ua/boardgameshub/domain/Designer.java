package com.pt.ua.boardgameshub.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "designer")
public class Designer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column
    private String image;

    @ManyToMany(mappedBy = "designers")
    Set<Game> games = new HashSet<>();
}
