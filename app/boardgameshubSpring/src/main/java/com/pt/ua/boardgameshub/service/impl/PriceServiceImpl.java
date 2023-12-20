package com.pt.ua.boardgameshub.service.impl;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.pt.ua.boardgameshub.dao.response_body.PriceHistory;
import com.pt.ua.boardgameshub.dao.response_body.PriceResponse;
import com.pt.ua.boardgameshub.dao.response_body.ShortPrice;
import com.pt.ua.boardgameshub.domain.Game;
import com.pt.ua.boardgameshub.domain.Price;
import com.pt.ua.boardgameshub.domain.Store;
import com.pt.ua.boardgameshub.repository.GameRepository;
import com.pt.ua.boardgameshub.repository.PriceRepository;
import com.pt.ua.boardgameshub.repository.StoreRepository;
import com.pt.ua.boardgameshub.service.PriceService;

@Service
public class PriceServiceImpl implements PriceService{
    
    private final PriceRepository priceRepository;
    private final StoreRepository storeRepository;
    private final GameRepository gameRepository;

    @Autowired
    public PriceServiceImpl(PriceRepository priceRepository, GameRepository gameRepository, StoreRepository storeRepository) {
        this.priceRepository = priceRepository;
        this.gameRepository = gameRepository;
        this.storeRepository = storeRepository;
    }

    @Override
    public Price addPrice(Price newPrice, long game_id, long store_id) {
        Game game = gameRepository.findById(game_id).orElse(null);
        Store store = storeRepository.findById(store_id).orElse(null);
        if (game != null && store != null){
            newPrice.setGame(game);
            newPrice.setStore(store);
            newPrice.setTimestamp(new java.sql.Timestamp(System.currentTimeMillis()));
            return priceRepository.save(newPrice);
        }
        else{
            return null;
        }
    }

    @Override
    public PriceResponse getPriceByStoreIdAndGameId(Long store_id, Long game_id) {
        Price price = priceRepository.findFirstByStoreIdAndGameId(store_id, game_id, Sort.by(Sort.Direction.DESC, "timestamp"));
        return new PriceResponse(price);
    }

    public List<PriceHistory> getHistory(Long game_id){
        List<Price> history = priceRepository.findPriceHistory(game_id);
        List<PriceHistory> result = List.of(
            new PriceHistory("Worten", "hsl(0, 100%, 50%)"),
            new PriceHistory("Fnac", "hsl(106, 100%, 57%)"),
            new PriceHistory("Amazon", "hsl(32, 100%, 57%)"),
            new PriceHistory("ZATU", "hsl(289, 100%, 57%)")
        );

        for(Price p : history){
            int store_index = (int)(p.getStore().getId()-1);
            PriceHistory ph = result.get(store_index);

            SimpleDateFormat dateFormat = new SimpleDateFormat("MMM dd yyyy HH:00");
            String formatted_timestamp = dateFormat.format(new Date(p.getTimestamp().getTime()));
            ShortPrice sp = new ShortPrice(formatted_timestamp, p.getPrice());

            if(ph.getData() == null || ph.getData().isEmpty()){
                List<ShortPrice> data = new ArrayList<>();
                data.add(sp);
                ph.setData(data);
            }
            else{
                System.out.println(ph.getData());
                ph.getData().add(sp);
            }
        }
        System.out.println(result);
        return result;
    }

    @Override
    public List<PriceResponse> getCurrentPrices(Long game_id) {
        List<Price> prices = priceRepository.findLatestPriceByGameId(game_id);
        return prices.stream().map(PriceResponse::new).collect(Collectors.toList());
    }

    @Override
    public PriceResponse getLowerPrice(Long game_id) {
        Price price = priceRepository.findLowestPriceByGameId(game_id);
        return new PriceResponse(price);
    }
}
