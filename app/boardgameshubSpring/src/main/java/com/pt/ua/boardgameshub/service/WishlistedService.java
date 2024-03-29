package com.pt.ua.boardgameshub.service;

import com.pt.ua.boardgameshub.dao.response_body.WishlistPrice;
import com.pt.ua.boardgameshub.dao.response_body.WishlistedResponse;

import java.util.List;

public interface WishlistedService {
    WishlistedResponse addToWishlist(long game_id);
    void removeFromWishlist(long game_id);
    List<WishlistedResponse> getWishlist(String filter);
    boolean inWishlist(long game_id);
    List<WishlistPrice> getWishlistPrices();
}
