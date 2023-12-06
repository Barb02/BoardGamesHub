package com.pt.ua.boardgameshub.kafka;

import org.json.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import com.pt.ua.boardgameshub.service.GameService;
import com.pt.ua.boardgameshub.service.PriceService;
import com.pt.ua.boardgameshub.service.StoreService;
import com.pt.ua.boardgameshub.domain.Game;
import com.pt.ua.boardgameshub.domain.Price;
import com.pt.ua.boardgameshub.domain.Store;

@Component
public class KafkaConsumer {

    private final GameService gameService;
    private final StoreService storeService;
    private final PriceService priceService;

    @Autowired
    public KafkaConsumer(GameService gameService, StoreService storeService, PriceService priceService){
        this.gameService = gameService;
        this.storeService = storeService;
        this.priceService = priceService;
    }

    @KafkaListener(topics = "bgh", groupId = "my-group-id")
    public void listen(String message) {
        System.out.println("Received message: " + message);

        JSONObject obj = new JSONObject(message);
        int game_id = obj.getInt("game_id");
        int store_id = obj.getInt("store_id");
        double price = obj.getDouble("price");
        System.out.println("game_id: " + game_id);
        System.out.println("store_id: " + store_id);
        System.out.println("price: " + price);

        Price newPrice = new Price();
        newPrice.setPrice(price);
        Store store = storeService.getStoreById(Long.valueOf(store_id));
        Game game = gameService.getGameById(Long.valueOf(game_id));
        this.priceService.addPrice(newPrice, game, store);
    }

}