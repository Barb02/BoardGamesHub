package com.pt.ua.boardgameshub.service.jpa_service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.pt.ua.boardgameshub.domain.jpa_domain.Category;
import com.pt.ua.boardgameshub.repository.jpa_repo.CategoryRepository;
import com.pt.ua.boardgameshub.service.jpa_service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService{
    
    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository){
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id).orElse(null);
    }

    @Override
    public void addCategory(Category category) {
        categoryRepository.save(category);
    }
}
