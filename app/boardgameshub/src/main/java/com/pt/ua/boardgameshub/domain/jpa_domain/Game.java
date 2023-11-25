package com.pt.ua.boardgameshub.domain.jpa_domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
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

    @ManyToMany
    @JoinTable(
        name = "categories_games", 
        joinColumns = @JoinColumn(name = "game_id"), 
        inverseJoinColumns = @JoinColumn(name = "category_id"))
    private Set<Category> categories = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription(){
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Designer> getDesigners() {
        return designers;
    }

    public void setDesigners(Set<Designer> designers) {
        this.designers = designers;
    }

    public Set<Publisher> getPublishers() {
        return publishers;
    }

    public void setPublishers(Set<Publisher> publishers){
        this.publishers = publishers;
    }

    public Set<String> getArtists() {
        return artists;
    }

    public void setArtists(Set<String> artists) {
        this.artists = artists;
    }

    public double getComplexity() {
        return complexity;
    }

    public void setComplexity(double complexity) {
        this.complexity = complexity;
    }

    public double getMinPlayers() {
        return minPlayers;
    }

    public void setMinPlayers(double minPlayers) {
        this.minPlayers = minPlayers;
    }

    public double getMaxPlayers() {
        return maxPlayers;
    }

    public void setMaxPlayers(double maxPlayers) {
        this.maxPlayers = maxPlayers;
    }

    public int getMinAge() {
        return minAge;
    }

    public void setMinAge(int minAge){
        this.minAge = minAge;
    }

    public int getMinPlaytime() {
        return minPlaytime;
    }

    public void setMinPlaytime(int minPlaytime) {
        this.minPlaytime = minPlaytime;
    }

    public int getMaxPlaytime() {
        return maxPlaytime;
    }

    public void setMaxPlaytime(int maxPlaytime) {
        this.maxPlaytime = maxPlaytime;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score){
        this.score = score;
    }

    public int getNumRatings() {
        return numRatings;
    }

    public void setNumRatings(int numRatings){
        this.numRatings = numRatings;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image){
        this.image = image;
    }

    public Set<Category> getCategories(){
        return categories;
    }

    public void setCategories(Set<Category> categories){
        this.categories = categories;
    }

}
