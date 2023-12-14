package com.pt.ua.boardgameshub;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

@SpringBootApplication
public class BoardgameshubApplication {

    @Value("${admin.password}")
    String adminPassword;

	public static void main(String[] args) {
		SpringApplication.run(BoardgameshubApplication.class, args);
	}

	@EventListener(ApplicationReadyEvent.class)
	public void doSomethingAfterStartup() {

		if(signin()){
			return;
		}

        String token = signup();
        if(token != null){
            loadBoardGames(token);
            loadStores(token);
            loadPrices(token);
        }
	}

    public boolean signin() {
        boolean siginSuccess = false;
        try{
            String jsonString = "{\"email\":\"admin@gmail.com\",\"password\":\""+adminPassword+"\"}";
            JSONObject request = new JSONObject(jsonString);
            URL url = new URL("http://localhost:8080/api/v1/auth/signin");
            
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setDoOutput(true);

            String jsonInputString = request.toString();
            byte[] jsonBytes = jsonInputString.getBytes(StandardCharsets.UTF_8);
            try (DataOutputStream outputStream = new DataOutputStream(connection.getOutputStream())) {
                outputStream.write(jsonBytes);
                outputStream.flush();
            }
            int responseCode = connection.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                System.out.println("POST request sent successfully");
                InputStreamReader in = new InputStreamReader(connection.getInputStream());
                BufferedReader br = new BufferedReader(in);
                String output = br.readLine();
                JSONObject response = new JSONObject(output);
                String token = response.getString("token");
                System.out.println(token);
                siginSuccess = true;
            } else {
                System.out.println("POST request failed: " + responseCode);
            }
        }
        catch(Exception e){
            e.printStackTrace();
        }
        return siginSuccess;
    }

    public String signup() {
        String token = null;
        try{
            String jsonString = "{\"username\":\"admin\",\"email\":\"admin@gmail.com\",\"password\":\""+adminPassword+"\"}";
            JSONObject request = new JSONObject(jsonString);
            URL url = new URL("http://localhost:8080/api/v1/auth/signup");

            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setDoOutput(true);

            String jsonInputString = request.toString();
            byte[] jsonBytes = jsonInputString.getBytes(StandardCharsets.UTF_8);
            try (DataOutputStream outputStream = new DataOutputStream(connection.getOutputStream())) {
                outputStream.write(jsonBytes);
                outputStream.flush();
            }
            int responseCode = connection.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                System.out.println("POST request sent successfully");
                
                InputStreamReader in = new InputStreamReader(connection.getInputStream());
                BufferedReader br = new BufferedReader(in);
                String output = br.readLine();
                JSONObject response = new JSONObject(output);
                token = response.getString("token");
                System.out.println(token);
            } else {
                System.out.println("POST request failed");
            }
        }
        catch(Exception e){
            e.printStackTrace();
        }
        return token;
    }

    public void loadBoardGames(String token) {
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
                    sendRequest(url, boardGame, token);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void loadStores(String token) {
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
                    sendRequest(url, store, token);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void loadPrices(String token) {
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
                    sendRequest(url, store, token);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void sendRequest(URL url, JSONObject object, String token){
        try{
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("Authorization", "Bearer " + token);
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
                System.out.println("POST request failed. Response code: " + responseCode);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
