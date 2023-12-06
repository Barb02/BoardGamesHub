package com.pt.ua.boardgameshub.domain.jpa_domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

import java.util.HashSet;
import java.util.Set;

import com.pt.ua.boardgameshub.dao.request_body.DeveloperRequest;

@Entity
@Table(name = "designer")
public class Designer {
    @Id
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column
    private String image;

    @ManyToMany(mappedBy = "designers")
    private Set<Game> games = new HashSet<>();

    public Designer(){

    }

    public Designer(DeveloperRequest dr){
        this.id = dr.getId();        
        this.name = dr.getName();
        this.image = dr.getImage();
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
