package com.pt.ua.boardgameshub.service;

import java.util.List;

import com.pt.ua.boardgameshub.domain.Click;

public interface ClickService {
    public int getClickAmount(Long game_id);
    public List<Click> getClicks(Long game_id);
    public void addClick(Click click);
}
