package com.pt.ua.boardgameshub.domain.jpa_domain;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.pt.ua.boardgameshub.controller.request_body.DeveloperRequest;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;

@Entity
@Table(name = "publisher")
public class Publisher {
    @Id
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column
    private String image;

    @ManyToMany(mappedBy = "publishers")
    private Set<Game> games = new HashSet<>();

    public Publisher(){

    }

    public Publisher(DeveloperRequest pr){
        this.id = pr.getId();        
        this.name = pr.getName();
        this.image = pr.getImage();
    }

    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name = name;
    }

    public String getImage(){
        return image;
    }

    public void setImage(String image){
        this.image = image;
    }
}
