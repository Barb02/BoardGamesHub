package com.pt.ua.boardgameshub.dao.response_body;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShortPrice {
    private String x;
    private Double y;
}