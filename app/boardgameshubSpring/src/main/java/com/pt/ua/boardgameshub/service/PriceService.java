package com.pt.ua.boardgameshub.service;

import java.util.List;

import com.pt.ua.boardgameshub.dao.response_body.PriceHistory;
import com.pt.ua.boardgameshub.dao.response_body.PriceResponse;
import com.pt.ua.boardgameshub.domain.Price;

public interface PriceService {
    public Price addPrice(Price price, long game_id, long store_id);
    public PriceResponse getPriceByStoreIdAndGameId(Long store_id, Long game_id);
    public List<PriceResponse> getCurrentPrices(Long game_id);
    public PriceResponse getLowerPrice(Long game_id);
    public List<PriceHistory> getHistory(Long game_id);
} 
