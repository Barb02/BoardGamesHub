package com.pt.ua.boardgameshub.dao.request_body;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GameQuery {
    private String name;
    private List<String> categories;
    private Range price;
    private Range players;
    private Range complexity;
    private Range playtime;
    private String orderBy;
    private String order;
}

