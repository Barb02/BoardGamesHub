package com.pt.ua.boardgameshub.domain.jpa_domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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

    private long game_id;

    public long getGame() {
        return game_id;
    }

    public String getStore() {
        return store;
    }

    public double getPrice() {
        return price;
    }

    public void setGame(long game_id) {
        this.game_id = game_id;
    }

    public void setStore(String store) {
        this.store = store;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}