package com.pt.ua.boardgameshub;

import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import org.json.JSONArray;
import org.json.JSONObject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.io.ClassPathResource;
import org.springframework.util.FileCopyUtils;

@SpringBootApplication
public class BoardgameshubApplication {

	public static void main(String[] args) {
		SpringApplication.run(BoardgameshubApplication.class, args);
	}

	@EventListener(ApplicationReadyEvent.class)
	public void doSomethingAfterStartup() {

		if(!checkDatabaseEmpty()){
			return;
		}

        loadBoardGames();
        loadStores();
        loadPrices();
	}

    public boolean checkDatabaseEmpty(){
        try {
            URL url = new URL("http://localhost:8080/api/v1/game/1");
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");

            int responseCode = connection.getResponseCode();
			if (responseCode == HttpURLConnection.HTTP_OK) {
                    return false;
            }
            connection.disconnect();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return true;
    }

    public void loadBoardGames() {
        try {
            ClassLoader classLoader = getClass().getClassLoader();
            InputStream inputStream = classLoader.getResourceAsStream("db/board_games.json");

            if (inputStream != null) {
                byte[] bytes = inputStream.readAllBytes();
                String jsonString = new String(bytes, StandardCharsets.UTF_8);

                JSONArray boardGames = new JSONArray(jsonString);
                for (int i = 0; i < boardGames.length(); i++) {
                    JSONObject boardGame = boardGames.getJSONObject(i);
                    URL url = new URL("http://localhost:8080/api/v1/game/manual");
                    sendRequest(url, boardGame);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void loadStores() {
        try {
            ClassLoader classLoader = getClass().getClassLoader();
            InputStream inputStream = classLoader.getResourceAsStream("db/stores.json");

            if (inputStream != null) {
                byte[] bytes = inputStream.readAllBytes();
                String jsonString = new String(bytes, StandardCharsets.UTF_8);

                JSONArray stores = new JSONArray(jsonString);
                for (int i = 0; i < stores.length(); i++) {
                    JSONObject store = stores.getJSONObject(i);
                    URL url = new URL("http://localhost:8080/api/v1/store");
                    sendRequest(url, store);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void loadPrices() {
        try {
            ClassLoader classLoader = getClass().getClassLoader();
            InputStream inputStream = classLoader.getResourceAsStream("db/prices.json");

            if (inputStream != null) {
                byte[] bytes = inputStream.readAllBytes();
                String jsonString = new String(bytes, StandardCharsets.UTF_8);

                int game_id = 0; 
                JSONArray stores = new JSONArray(jsonString);
                for (int i = 0; i < stores.length(); i++) {
                    int store_id = i%4 + 1;
                    if(store_id == 1){
                        game_id += 1;
                    }
                    JSONObject store = stores.getJSONObject(i);
                    URL url = new URL("http://localhost:8080/api/v1/price/" + game_id + "/" + store_id);
                    sendRequest(url, store);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void sendRequest(URL url, JSONObject object){
        try{
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setDoOutput(true);

            String jsonInputString = object.toString();
            byte[] jsonBytes = jsonInputString.getBytes(StandardCharsets.UTF_8);
            try (DataOutputStream outputStream = new DataOutputStream(connection.getOutputStream())) {
                outputStream.write(jsonBytes);
                outputStream.flush();
            }
            int responseCode = connection.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                System.out.println("POST request sent successfully");
            } else {
                System.out.println("POST request failed");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
