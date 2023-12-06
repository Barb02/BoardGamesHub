package com.pt.ua.boardgameshub.service.impl;

import java.util.List;
import java.util.stream.Collectors;

/* import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.concurrent.TimeUnit;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.w3c.dom.Node; */

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pt.ua.boardgameshub.domain.Game;
import com.pt.ua.boardgameshub.repository.GameRepository;
import com.pt.ua.boardgameshub.service.GameService;

@Service
public class GameServiceImpl implements GameService{
    
    private final GameRepository gameRepository;

    @Autowired
    public GameServiceImpl(GameRepository gameRepository){
        this.gameRepository = gameRepository;
    }

    @Override
    public Game addGameManual(Game game){
        Game newgame = gameRepository.save(game);
        return newgame;
    }

    @Override
    public Game getGameById(Long id){
        return gameRepository.findById(id).orElse(null);
    }

    @Override
    public List<Game> getFilterdGames(String filter){
        List<Game> games = gameRepository.findAllByOrderByIdAsc();
        List<Game> filteredGames = games
        .stream()
        .filter(p -> p.getName().toLowerCase().contains(filter.toLowerCase()))
        .collect(Collectors.toList());
        return filteredGames;
    }

    /* @Override
    public Game addGameAuto(Long id){
        try {
            URL url = new URL("https://boardgamegeek.com/xmlapi2/thing?stats=1&id=" + id);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");

            int responseCode = connection.getResponseCode();

            if (responseCode == HttpURLConnection.HTTP_OK) {
                BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                StringBuilder response = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    response.append(line);
                }
                reader.close();

                DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
                DocumentBuilder builder = factory.newDocumentBuilder();
                Document doc = builder.parse(url.openStream());

                NodeList itemList = doc.getElementsByTagName("item");
                Element item = (Element) itemList.item(0);
    
                String name = item.getElementsByTagName("name").item(0).getAttributes().getNamedItem("value").getNodeValue();
                String image = item.getElementsByTagName("image").item(0).getTextContent();
                String description = item.getElementsByTagName("description").item(0).getTextContent();

                
            } else {
                System.out.println("HTTP error: " + responseCode);
            }
            connection.disconnect();
        } 
        catch (Exception e) {
            e.printStackTrace();
        } 
    } */

}
