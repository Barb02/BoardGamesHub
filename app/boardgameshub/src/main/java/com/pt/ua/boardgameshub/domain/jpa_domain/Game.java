package com.pt.ua.boardgameshub.domain.jpa_domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.CascadeType;
import javax.persistence.Column;

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

    @Column(columnDefinition="text")
    private String description;

    @ManyToMany(cascade = { CascadeType.ALL })
    @JoinTable(
        name = "designedBy", 
        joinColumns = @JoinColumn(name = "game_id"), 
        inverseJoinColumns = @JoinColumn(name = "designer_id"))
    private Set<Designer> designers = new HashSet<>();

    @ManyToMany(cascade = { CascadeType.ALL })
    @JoinTable(
        name = "publsihedBy", 
        joinColumns = @JoinColumn(name = "game_id"), 
        inverseJoinColumns = @JoinColumn(name = "publisher_id"))
    private Set<Publisher> publishers = new HashSet<>();

    @ManyToMany(cascade = { CascadeType.ALL })
    @JoinTable(
        name = "artBy", 
        joinColumns = @JoinColumn(name = "game_id"), 
        inverseJoinColumns = @JoinColumn(name = "artist_id"))
    private Set<Artist> artists = new HashSet<>();

    @Column
    private double complexity;

    @Column
    private double minplayers;

    @Column
    private double maxplayers;

    @Column
    private int minage;

    @Column
    private int minplaytime;

    @Column
    private int maxplaytime;
    
    @Column
    private double score;

    @Column
    private int numRatings;

    @Column
    private String image;

    @ManyToMany(cascade = { CascadeType.ALL })
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

    public Set<Artist> getArtist() {
        return artists;
    }

    public void setArtists(Set<Artist> artists) {
        this.artists = artists;
    }

    public double getComplexity() {
        return complexity;
    }

    public void setComplexity(double complexity) {
        this.complexity = complexity;
    }

    public double getMinplayers() {
        return minplayers;
    }

    public void setMinplayers(double minPlayers) {
        this.minplayers = minPlayers;
    }

    public double getMaxplayers() {
        return maxplayers;
    }

    public void setMaxplayers(double maxPlayers) {
        this.maxplayers = maxPlayers;
    }

    public int getMinage() {
        return minage;
    }

    public void setMinAge(int minage){
        this.minage = minage;
    }

    public int getMinplaytime() {
        return minplaytime;
    }

    public void setMinplaytime(int minplaytime) {
        this.minplaytime = minplaytime;
    }

    public int getMaxplaytime() {
        return maxplaytime;
    }

    public void setMaxplaytime(int maxplaytime) {
        this.maxplaytime = maxplaytime;
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
