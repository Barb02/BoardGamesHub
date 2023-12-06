package com.pt.ua.boardgameshub.domain.jpa_domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

import java.util.HashSet;
import java.util.Set;

import com.pt.ua.boardgameshub.dao.request_body.ArtistRequest;

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
