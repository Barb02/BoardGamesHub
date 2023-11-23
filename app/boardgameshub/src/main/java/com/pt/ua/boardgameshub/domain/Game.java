package com.pt.ua.boardgameshub.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "game")
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column
    private String description;

    @ManyToMany
    @JoinTable(
        name = "designedBy", 
        joinColumns = @JoinColumn(name = "game_id"), 
        inverseJoinColumns = @JoinColumn(name = "designer_id"))
    private Set<Designer> designers = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "publsihedBy", 
        joinColumns = @JoinColumn(name = "game_id"), 
        inverseJoinColumns = @JoinColumn(name = "publisher_id"))
    private Set<Publisher> publishers = new HashSet<>();

    @Column
    private Set<String> artists;

    @Column
    private double complexity;

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

    @ManyToOne
    @JoinColumn(name = "game_id")
    private Game game;

}
