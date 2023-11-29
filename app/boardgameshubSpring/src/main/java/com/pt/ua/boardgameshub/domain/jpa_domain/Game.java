package com.pt.ua.boardgameshub.domain.jpa_domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.pt.ua.boardgameshub.controller.request_body.GameRequest;

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

    @Column(nullable = false, unique = true)
    private String name;

    @Column(columnDefinition="text")
    private String shortDescription;

    @Column(columnDefinition="text")
    private String description;

    @ManyToMany(cascade = { CascadeType.MERGE })
    @JoinTable(
        name = "designedBy", 
        joinColumns = @JoinColumn(name = "game_id"), 
        inverseJoinColumns = @JoinColumn(name = "designer_id"))
    private Set<Designer> designers = new HashSet<>();

    @ManyToMany(cascade = { CascadeType.MERGE })
    @JoinTable(
        name = "publsihedBy", 
        joinColumns = @JoinColumn(name = "game_id"), 
        inverseJoinColumns = @JoinColumn(name = "publisher_id"))
    private Set<Publisher> publishers = new HashSet<>();

    @ManyToMany(cascade = { CascadeType.MERGE })
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

    @Column
    private String[] images;

    @ManyToMany(cascade = { CascadeType.MERGE })
    @JoinTable(
        name = "categories_games", 
        joinColumns = @JoinColumn(name = "game_id"), 
        inverseJoinColumns = @JoinColumn(name = "category_id"))
    private Set<Category> categories = new HashSet<>();

    public Game() {
    }

    public Game(GameRequest gamerequest) {
        this.name = gamerequest.getName();
        this.shortDescription = gamerequest.getShortDescription();
        this.description = gamerequest.getDescription();
        this.complexity = gamerequest.getComplexity();
        this.minplayers = gamerequest.getMinplayers();
        this.maxplayers = gamerequest.getMaxplayers();
        this.minage = gamerequest.getMinage();
        this.minplaytime = gamerequest.getMinplaytime();
        this.maxplaytime = gamerequest.getMaxplaytime();
        this.score = gamerequest.getScore();
        this.numRatings = gamerequest.getNumRatings();
        this.image = gamerequest.getImage();
        this.images = gamerequest.getImages();
    }

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

    public String getShortDescription(){
        return shortDescription;
    }

    public void setShortDescription(String shortDescription){
        this.shortDescription = shortDescription;
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

    public String[] getImages() {
        return images;
    }

    public void setImages(String[] images){
        this.images = images;
    }

    public Set<Category> getCategories(){
        return categories;
    }

    public void setCategories(Set<Category> categories){
        this.categories = categories;
    }

}
