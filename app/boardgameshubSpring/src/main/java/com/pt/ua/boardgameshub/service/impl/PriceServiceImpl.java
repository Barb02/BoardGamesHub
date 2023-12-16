package com.pt.ua.boardgameshub.service.impl;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.pt.ua.boardgameshub.dao.response_body.PriceHistory;
import com.pt.ua.boardgameshub.dao.response_body.ShortPrice;
import com.pt.ua.boardgameshub.domain.Game;
import com.pt.ua.boardgameshub.domain.Price;
import com.pt.ua.boardgameshub.domain.Store;
import com.pt.ua.boardgameshub.repository.PriceRepository;
import com.pt.ua.boardgameshub.service.PriceService;

@Service
public class PriceServiceImpl implements PriceService{
    
    private final PriceRepository priceRepository;

    @Autowired
    public PriceServiceImpl(PriceRepository priceRepository) {
        this.priceRepository = priceRepository;
    }

    @Override
    public Price addPrice(Price newPrice, Game game, Store store) {
        if (game != null) newPrice.setGame(game);
        if (store != null) newPrice.setStore(store);
        newPrice.setTimestamp(new java.sql.Timestamp(System.currentTimeMillis()));
        return priceRepository.save(newPrice);
    }

    @Override
    public Price getPriceById(Long id) {
        return priceRepository.findById(id).orElse(null);
    }

    @Override
    public Price getPriceByStoreIdAndGameId(Long store_id, Long game_id) {
        return priceRepository.findFirstByStoreIdAndGameId(store_id, game_id, Sort.by(Sort.Direction.DESC, "timestamp"));
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

        // int index = 0;
        // for(Price p : history){
        //     Double price = p.getPrice();
        //     String store = p.getStore().getName();
        //     Timestamp timestamp = p.getTimestamp();
        //     Date date = new Date(timestamp.getTime());
        //     SimpleDateFormat dateFormat = new SimpleDateFormat("MMM dd yyyy");
        //     String formatted_timestamp = dateFormat.format(date);
        //     if(visited.keySet().contains(store)){
        //         int key = visited.get(store);
        //         ShortPrice sp = new ShortPrice();
        //         sp.setY(price);
        //         sp.setX(formatted_timestamp);
        //         result.get(key).getData().add(sp);
        //     }
        //     else{
        //         PriceHistory ph = new PriceHistory();
        //         List<ShortPrice> data = new ArrayList<>();
        //         ShortPrice sp = new ShortPrice();
        //         sp.setY(price);
        //         sp.setX(formatted_timestamp);
        //         data.add(sp);
        //         ph.setId(store);
        //         ph.setData(data);
        //         ph.setColor(colors.get(store.toLowerCase()));
        //         result.add(ph);
        //         visited.put(store, index++);
        //     }
        // }
    }

    @Override
    public List<Price> getCurrentPrices(Long game_id) {
        return priceRepository.findLatestPriceByGameId(game_id);
    }

    @Override
    public Price getLowerPrice(Long game_id) {
        return priceRepository.findLowestPriceByGameId(game_id);
    }
}
