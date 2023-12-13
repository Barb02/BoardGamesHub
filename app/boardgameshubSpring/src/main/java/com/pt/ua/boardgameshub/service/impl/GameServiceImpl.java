package com.pt.ua.boardgameshub.service.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

import com.pt.ua.boardgameshub.dao.request_body.ArtistRequest;
import com.pt.ua.boardgameshub.dao.request_body.CategoryRequest;
import com.pt.ua.boardgameshub.dao.request_body.DeveloperRequest;
import com.pt.ua.boardgameshub.dao.request_body.GameRequest;
import com.pt.ua.boardgameshub.domain.*;
import com.pt.ua.boardgameshub.repository.*;
import com.pt.ua.boardgameshub.service.GameService;

@Service
public class GameServiceImpl implements GameService{
    
    private final GameRepository gameRepository;
    private final DesignerRepository designerRepository;
    private final PublisherRepository publisherRepository;
    private final ArtistRepository artistRepository;
    private final CategoryRepository categoryRepository;

    @Autowired
    public GameServiceImpl(GameRepository gameRepository, DesignerRepository designerRepository, PublisherRepository publisherRepository, ArtistRepository artistRepository, CategoryRepository categoryRepository){
        this.gameRepository = gameRepository;
        this.designerRepository = designerRepository;
        this.publisherRepository = publisherRepository;
        this.artistRepository = artistRepository;
        this.categoryRepository = categoryRepository;
    }


    @Override
    public Game addGameManual(GameRequest gamerequest){
        Game game = new Game(gamerequest);
        Set<Designer> designers = new HashSet<>();
        for(DeveloperRequest request: gamerequest.getDesigners()){
            Designer designer = designerRepository.findById(request.getId()).orElse(null);
            if (designer == null){
                System.out.println("\n\n\nHERE\n\n\n");
                Designer newDesigner = new Designer(request);
                designerRepository.save(newDesigner);
                designers.add(newDesigner);
            }
            else{
                designers.add(designer);
            }
        }
        Set<Publisher> publishers = new HashSet<>();
        for(DeveloperRequest request: gamerequest.getPublishers()){
            Publisher pub = publisherRepository.findById(request.getId()).orElse(null);
            if (pub == null){
                Publisher newPublisher = new Publisher(request);
                publisherRepository.save(newPublisher);
                publishers.add(newPublisher);
            }
            else{
                publishers.add(pub);
            }
        }
        Set<Artist> artists = new HashSet<>();
        for(ArtistRequest request: gamerequest.getArtists()){
            Artist artist = artistRepository.findById(request.getId()).orElse(null);
            if (artist == null){
                Artist newArtist = new Artist(request);
                artistRepository.save(newArtist);
                artists.add(newArtist);
            }
            else{
                artists.add(artist);
            }
        }
        Set<Category> categories = new HashSet<>();
        for(CategoryRequest request: gamerequest.getCategories()){
            Category cat = categoryRepository.findById(request.getId()).orElse(null);
            if (cat == null){
                Category newCategory = new Category(request);
                categoryRepository.save(newCategory);
                categories.add(newCategory);
            }
            else{
                categories.add(cat);
            }
        }
        game.setDesigners(designers);
        game.setPublishers(publishers);
        game.setArtists(artists);
        game.setCategories(categories);
        Game newgame = gameRepository.save(game);
        return newgame;
    }

    @Override
    public Game getGameById(Long id){
        return gameRepository.findById(id).orElse(null);
    }

    @Override
    public List<Game> getFilterdGames(String filter){
        List<Game> games = gameRepository.findByNameStartingIgnoreCaseWithOrderByNameAsc(filter);
        List<Game> gamesContains = gameRepository.findByNameContainingIgnoreCaseOrderByNameAsc(filter);
        for(Game game: gamesContains){
            if (!games.contains(game)){
                games.add(game);
            }
        }
        return games;
    }


    @Override
    public List<Game> getTopGames(int limit) {
        return gameRepository.findAllGamesOrderByClickCountDesc(limit);
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
