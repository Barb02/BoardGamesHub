package com.pt.ua.boardgameshub.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name = "Product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column
    private String description;

    @OneToMany(mappedBy = "Product")
    private List<Designer> designers = new ArrayList<>();

    @Column
    private List<String> artists = new ArrayList<>();

    // Tags?

    @Column
    private double minPlayers;

    @Column
    private double maxPlayers;

    @Column
    private int minAge;

    @Column
    private int minPlaytime;

    @Column
    private int maxPlaytime;
    
    @Column
    private double score;

    @Column
    private int numRatings;

    @Column
    private String image;

    
}
