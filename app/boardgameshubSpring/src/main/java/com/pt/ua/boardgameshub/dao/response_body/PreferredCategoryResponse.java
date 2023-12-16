package com.pt.ua.boardgameshub.dao.response_body;

import com.pt.ua.boardgameshub.domain.Category;

import lombok.Data;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
public class PreferredCategoryResponse {
    Category category;
}
