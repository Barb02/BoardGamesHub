package com.pt.ua.boardgameshub.service;

import com.pt.ua.boardgameshub.domain.Category;

import java.util.List;

public interface CategoryService {
    public Category getCategoryById(Long id);
    public void addCategory(Category category);
    public List<Category> getAllCategories();
}
