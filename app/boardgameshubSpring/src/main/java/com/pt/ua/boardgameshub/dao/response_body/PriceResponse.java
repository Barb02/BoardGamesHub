package com.pt.ua.boardgameshub.dao.response_body;

import com.pt.ua.boardgameshub.domain.jpa_domain.Price;
import com.pt.ua.boardgameshub.domain.jpa_domain.Store;

import java.sql.Timestamp;

public class PriceResponse {

    private Long id;

    private double price;

    private Timestamp timestamp;

    private Long game_id;

    private Store store;
    
    public PriceResponse(Price price){
        this.id = price.getId();
        this.price = price.getPrice();
        this.timestamp = price.getTimestamp();
        this.game_id = price.getGame().getId();
        this.store = price.getStore();
    }

    public Long getId(){
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(Double price){
        this.price = price;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp){
        this.timestamp = timestamp;
    }

    public Long getGame_id() {
        return game_id;
    }

    public void setGame_id(Long game_id){
        this.game_id = game_id;
    }

    public Store getStore() {
        return store;
    }

    public void setStore(Store store){
        this.store = store;
    }

}
