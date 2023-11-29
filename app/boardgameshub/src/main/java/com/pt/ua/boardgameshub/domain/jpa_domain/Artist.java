package com.pt.ua.boardgameshub.domain.jpa_domain;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.pt.ua.boardgameshub.controller.request_body.ArtistRequest;

import javax.persistence.Column;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "artist")
public class Artist {
    @Id
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @ManyToMany(mappedBy = "artists")
    private Set<Game> games = new HashSet<>();

    public Artist(){

    }

    public Artist(ArtistRequest ar){
        this.id = ar.getId();        
        this.name = ar.getName();
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
}
