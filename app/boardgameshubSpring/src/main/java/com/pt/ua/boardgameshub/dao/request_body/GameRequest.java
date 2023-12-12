package com.pt.ua.boardgameshub.dao.request_body;

import java.util.ArrayList;
import java.util.List;

public class GameRequest {

    private Long id;

    private String name;

    private String shortDescription;

    private String description;

    private List<DeveloperRequest> designers = new ArrayList<>();

    private List<DeveloperRequest> publishers = new ArrayList<>();

    private List<ArtistRequest> artists = new ArrayList<>();

    private double complexity;

    private double minplayers;

    private double maxplayers;

    private int minage;

    private int minplaytime;

    private int maxplaytime;
    
    private double score;

    private int numRatings;

    private String image;

    private String[] images;

    private List<CategoryRequest> categories = new ArrayList<>();

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

    public List<DeveloperRequest> getDesigners() {
        return designers;
    }

    public void setDesigners(List<DeveloperRequest> designers) {
        this.designers = designers;
    }

    public List<DeveloperRequest> getPublishers() {
        return publishers;
    }

    public void setPublishers(List<DeveloperRequest> publishers){
        this.publishers = publishers;
    }

    public List<ArtistRequest> getArtists() {
        return artists;
    }

    public void setArtists(List<ArtistRequest> artists) {
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

    public List<CategoryRequest> getCategories(){
        return categories;
    }

    public void setCategories(List<CategoryRequest> categories){
        this.categories = categories;
    }

}
