package com.pt.ua.boardgameshub.domain.jpa_domain;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.pt.ua.boardgameshub.controller.request_body.CategoryRequest;

@Entity
@Table(name = "category")
public class Category {
    @Id
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @ManyToMany(mappedBy = "categories")
    private Set<Game> games = new HashSet<>();

    public Category(){

    }

    public Category(CategoryRequest cr){
        this.id = cr.getId();        
        this.name = cr.getName();
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
