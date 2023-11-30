package com.pt.ua.boardgameshub.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class KafkaConsumer {

    @KafkaListener(topics = "bgh", groupId = "my-group-id")
    public void listen(String message) {
        System.out.println("Received message: " + message);
    }

}