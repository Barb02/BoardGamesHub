package com.pt.ua.boardgameshub.service.impl;

import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.pt.ua.boardgameshub.dao.response_body.WishlistedResponse;
import com.pt.ua.boardgameshub.domain.Game;
import com.pt.ua.boardgameshub.domain.User;
import com.pt.ua.boardgameshub.domain.Wishlisted;
import com.pt.ua.boardgameshub.repository.WishlistedRepository;
import com.pt.ua.boardgameshub.repository.GameRepository;
import com.pt.ua.boardgameshub.service.WishlistedService;

@Service
public class WishlitedServiceImpl implements WishlistedService{

    private final WishlistedRepository wishlistedRepository;
    private final GameRepository gameRepository;

    @Autowired
    public WishlitedServiceImpl(WishlistedRepository wishlistedRepository, GameRepository gameRepository) {
        this.wishlistedRepository = wishlistedRepository;
        this.gameRepository = gameRepository;
    }
    
    @Override
    public WishlistedResponse addToWishlist(long game_id) {
        User user = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Game game = gameRepository.findById(game_id).orElse(null);
        if(game != null){
            Wishlisted wishlisted = new Wishlisted();
            wishlisted.setGame(game);
            wishlisted.setUser(user);
            wishlisted.setInsertionDate(new java.sql.Timestamp(System.currentTimeMillis()));
            Wishlisted saved = wishlistedRepository.save(wishlisted);
            return new WishlistedResponse(saved.getGame(), saved.getInsertionDate());
        }
        return null;
    }

    @Override
    public void removeFromWishlist(long game_id) throws IllegalArgumentException{
        User user = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Wishlisted wishlisted = wishlistedRepository.findByGameIdAndUserId(game_id, user.getId());
        wishlistedRepository.delete(wishlisted);
    }

    @Override
    public List<WishlistedResponse> getWishlist(String filter){
        User user = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<Wishlisted> wishlist = wishlistedRepository.findByUserIdAndGameNameContainingIgnoreCaseOrderByInsertionDateDesc(user.getId(), filter);
        List<WishlistedResponse> wishlistResponse = new ArrayList<>();
        for(Wishlisted wishlisted: wishlist){
            wishlistResponse.add(new WishlistedResponse(wishlisted.getGame(), wishlisted.getInsertionDate()));
        }
        return wishlistResponse;
    }

}
