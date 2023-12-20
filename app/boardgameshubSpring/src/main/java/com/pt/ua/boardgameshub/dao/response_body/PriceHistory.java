package com.pt.ua.boardgameshub.dao.response_body;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PriceHistory {

    public PriceHistory(String store, String color){
        this.id = store;
        this.color = color;
    }

    private String id;
    private String color;
    private List<ShortPrice> data;
}
