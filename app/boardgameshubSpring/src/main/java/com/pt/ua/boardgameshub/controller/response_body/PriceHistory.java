package com.pt.ua.boardgameshub.controller.response_body;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PriceHistory {
    private String id;
    private String color;
    private List<ShortPrice> data;
}
