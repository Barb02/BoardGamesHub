package com.pt.ua.boardgameshub.domain.jpa_domain;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "price")
public class Price {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long store_id;

    @Column
    private String store;

    @Column
    private double price;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "game_id")
    private Game game;

    public Game getGame() {
        return game;
    }

    public String getStore() {
        return store;
    }

    public double getPrice() {
        return price;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public void setStore(String store) {
        this.store = store;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}