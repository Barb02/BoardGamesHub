package com.pt.ua.boardgameshub.service;

import com.pt.ua.boardgameshub.domain.Category;

import java.util.List;

public interface PreferredCategoryService {
    Category addPreferredCategory(long category_id);
    void removePreferredCategory(long category_id);
    List<Category> getPreferredCategories();
}