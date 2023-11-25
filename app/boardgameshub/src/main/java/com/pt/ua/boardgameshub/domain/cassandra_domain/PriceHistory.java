package com.pt.ua.boardgameshub.domain.cassandra_domain;

import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

@Table(value = "price_history")
public class PriceHistory {
    
    @PrimaryKey
    private PriceHistoryKey pk;

    @Column(value = "price")
    private double price;

    public void setPk(PriceHistoryKey pk) {
        this.pk = pk;
    }

    public PriceHistoryKey getPk() {
        return pk;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getPrice() {
        return price;
    }
}
