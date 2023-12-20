package com.pt.ua.boardgameshub.dao.response_body;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WishlistPrice {
    long game_id;
    String name;
    Double price;
}