package com.pt.ua.boardgameshub.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pt.ua.boardgameshub.repository.ClickRepository;
import com.pt.ua.boardgameshub.service.ClickService;
import com.pt.ua.boardgameshub.domain.Click;

@Service
public class ClickServiceImpl implements ClickService{

    private ClickRepository clickRepository;

    @Autowired
    public ClickServiceImpl(ClickRepository clickRepository){
        this.clickRepository = clickRepository;
    }

    @Override
    public int getClickAmount(Long game_id) {
        List<Click> clicks = clickRepository.findByGameId(game_id);
        return clicks.size();
    }

    @Override
    public List<Click> getClicks(Long game_id) {
        List<Click> clicks = clickRepository.findByGameId(game_id);
        return clicks;
    }

    @Override
    public void addClick(Click click) {        
        clickRepository.save(click);
    }
}