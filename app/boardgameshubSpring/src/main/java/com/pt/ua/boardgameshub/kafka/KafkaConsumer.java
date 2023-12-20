package com.pt.ua.boardgameshub.kafka;

import org.json.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import com.pt.ua.boardgameshub.service.ClickService;
import com.pt.ua.boardgameshub.service.GameService;
import com.pt.ua.boardgameshub.service.PriceService;
import com.pt.ua.boardgameshub.domain.Click;
import com.pt.ua.boardgameshub.domain.Price;

@Component
public class KafkaConsumer {

    private final GameService gameService;
    private final PriceService priceService;
    private final ClickService clickService;

    @Autowired
    public KafkaConsumer(GameService gameService, PriceService priceService, ClickService clickService){
        this.gameService = gameService;
        this.priceService = priceService;
        this.clickService = clickService;
    }

    @KafkaListener(topics = "bgh", groupId = "my-group-id")
    public void listen(String message) {
        System.out.println("Received message: " + message);

        JSONObject obj = new JSONObject(message);
        String message_type = obj.getString("type");
        if(message_type.equals("PRICE")){
            int game_id = obj.getInt("game_id");
            int store_id = obj.getInt("store_id");
            double price = obj.getDouble("price");
    
            Price newPrice = new Price();
            newPrice.setPrice(price);
            this.priceService.addPrice(newPrice, game_id, store_id);
        }
        if(message_type.equals("CLICK")){
            int game_id = obj.getInt("game_id");
            int amount = obj.getInt("amount");
            for(int i=0; i < amount; i++){
                Click click = new Click();
                click.setClickTime(new java.sql.Timestamp(System.currentTimeMillis()));
                click.setGame(gameService.getGameById(Long.valueOf(game_id)));
                clickService.addClick(click);
            }
        }
    }

}