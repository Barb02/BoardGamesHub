package com.pt.ua.boardgameshub.service.jpa_service;

import com.pt.ua.boardgameshub.domain.jpa_domain.Category;

public interface CategoryService {
    public Category getCategoryById(Long id);
    public void addCategory(Category category);
}
