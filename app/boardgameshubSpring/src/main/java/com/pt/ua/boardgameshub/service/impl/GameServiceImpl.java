package com.pt.ua.boardgameshub.service.impl;


import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.pt.ua.boardgameshub.dao.request_body.ArtistRequest;
import com.pt.ua.boardgameshub.dao.request_body.CategoryRequest;
import com.pt.ua.boardgameshub.dao.request_body.DeveloperRequest;
import com.pt.ua.boardgameshub.dao.request_body.GameQuery;
import com.pt.ua.boardgameshub.dao.request_body.GameRequest;
import com.pt.ua.boardgameshub.dao.request_body.Range;
import com.pt.ua.boardgameshub.dao.response_body.GameCount;
import com.pt.ua.boardgameshub.domain.*;
import com.pt.ua.boardgameshub.repository.*;
import com.pt.ua.boardgameshub.service.GameService;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Expression;


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
            Designer designer = designerRepository.findByName(request.getName()).orElse(null);
            if (designer == null){
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
            Publisher pub = publisherRepository.findByName(request.getName()).orElse(null);
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
            Artist artist = artistRepository.findByName(request.getName()).orElse(null);
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
            Category cat = categoryRepository.findByName(request.getName()).orElse(null);
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

    @PersistenceContext
    private EntityManager entityManager;
    
    @Override
    public List<Game> getFilteredGames(GameQuery q) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Game> criteriaQuery = criteriaBuilder.createQuery(Game.class);
        Root<Game> root = criteriaQuery.from(Game.class);
        List<Predicate> predicates = new ArrayList<>();
    
        // Filtering by name containing the provided string
        String name = q.getName();
        if (name != null && !name.isEmpty()) {
            predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), "%" + name.toLowerCase() + "%"));
        }
        
        List<String> categories = q.getCategories();
        // Filtering by categories (case-insensitive exact match - game must have all categories)
        if (categories != null && !categories.isEmpty()) {
            List<Predicate> categoryPredicates = new ArrayList<>();
            
            for (String category : categories) {
                Join<Game, Category> categoryJoin = root.join("categories");
                Expression<String> categoryLowerCase = criteriaBuilder.lower(categoryJoin.get("name"));
                Predicate categoryPredicate = criteriaBuilder.equal(categoryLowerCase, category.trim().toLowerCase());
                categoryPredicates.add(categoryPredicate);
            }
            
            predicates.add(criteriaBuilder.and(categoryPredicates.toArray(new Predicate[0])));
        }
    
        // Sorting
        String orderBy = q.getOrderBy();
        Expression<Double> lowestPriceFunction = criteriaBuilder.function("GetLowestPriceValueForGame", Double.class, root.get("id"));
        List<String> sortFields = getSortFields(Game.class);
        sortFields.add("price");
        if (orderBy != null && !orderBy.isEmpty() && sortFields.contains(orderBy)) {
            Expression<?> result;
            if(orderBy.equals("price")){
                result = lowestPriceFunction;
            }
            else{
                result = root.get(orderBy);
            }

            if(q.getOrder().toLowerCase().equals("asc"))
                criteriaQuery.orderBy(criteriaBuilder.asc(result));
            else if(q.getOrder().toLowerCase().equals("desc"))
                criteriaQuery.orderBy(criteriaBuilder.desc(result));
            
            if(q.getOrder().isEmpty()){
                criteriaQuery.orderBy(criteriaBuilder.asc(result));
            }
        }
    
        // Filtering
        List<Field> rangeFields = getRangeFields(GameQuery.class);
        for(Field f : rangeFields){
            Range value;
            String getterName = "get" + f.getName().substring(0, 1).toUpperCase() + f.getName().substring(1);
            try{
                Method getterMethod = GameQuery.class.getMethod(getterName);
                value = (Range)getterMethod.invoke(q);

                if(value != null && value.getMin() >= 0 && value.getMax() >= 0){
                    String fname = f.getName();
                    switch(fname) {
                        case "price":
                            predicates.add(criteriaBuilder.between(lowestPriceFunction, value.getMin(), value.getMax()));
                            break;
                        case "players":
                            predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("minplayers"), value.getMin()));
                            predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("maxplayers"), value.getMax()));
                            break;
                        case "playtime":
                            predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("minplaytime"), value.getMin()));
                            predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("maxplaytime"), value.getMax()));
                            break;
                        default:
                            predicates.add(criteriaBuilder.between(root.get(fname), value.getMin(), value.getMax()));
                    }

                }
            }
            catch(Exception e){
                e.printStackTrace();
            }
        }
        

        criteriaQuery.where(predicates.toArray(new Predicate[0]));
    
        TypedQuery<Game> query = entityManager.createQuery(criteriaQuery);
        List<Game> result =  query.getResultList();
        return result;
    }

    private static List<Field> getRangeFields(Class<?> clazz) {
        List<Field> rangeFields = new ArrayList<>();
        Field[] fields = clazz.getDeclaredFields();

        for (Field field : fields) {
            if (field.getType().getSimpleName().equals("Range")) {
                rangeFields.add(field);
            }
        }

        return rangeFields;
    }
    
    public static List<String> getSortFields(Class<?> clazz) {
        List<String> fieldNames = new ArrayList<>();
        Field[] fields = clazz.getDeclaredFields();

        for (Field field : fields) {
            Class<?> fieldType = field.getType();
            if (fieldType == int.class || fieldType == String.class || fieldType == double.class) {
                fieldNames.add(field.getName());
            }
        }

        return fieldNames;
    }


    @Override
    public List<Game> getTopGames(int limit, String publisher) {
        if(publisher.isEmpty()){
            publisher = null;
        }
        return gameRepository.findAllGamesOrderByClickCountDesc(limit, publisher);
    }

    @Override
    public List<Game> getRecommendedGames(int limit){
        User user = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return gameRepository.findGamesByPreferredCategoryOrderByClickCountDesc(limit, user.getId());
    }
    @Override
    public void removeGame(long game_id) throws IllegalArgumentException{
        gameRepository.deleteById(game_id);
    }

    @Override
    public GameCount getNumberOfGames() {
        GameCount gc = new GameCount(gameRepository.count());
        return gc;
    }
}
