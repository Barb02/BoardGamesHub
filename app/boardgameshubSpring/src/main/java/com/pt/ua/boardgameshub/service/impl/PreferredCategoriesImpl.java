package com.pt.ua.boardgameshub.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.pt.ua.boardgameshub.dao.response_body.PreferredCategoryResponse;
import com.pt.ua.boardgameshub.domain.Category;
import com.pt.ua.boardgameshub.domain.PreferredCategory;
import com.pt.ua.boardgameshub.domain.User;
import com.pt.ua.boardgameshub.repository.CategoryRepository;
import com.pt.ua.boardgameshub.repository.PreferredCategoryRepository;
import com.pt.ua.boardgameshub.service.PreferredCategoryService;

@Service
public class PreferredCategoriesImpl implements PreferredCategoryService{
    private final PreferredCategoryRepository preferredCategoryRepository;
    private final CategoryRepository categoryRepository;

    @Autowired
    public PreferredCategoriesImpl(PreferredCategoryRepository preferredCategoryRepository, CategoryRepository categoryRepository) {
        this.preferredCategoryRepository = preferredCategoryRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public PreferredCategoryResponse addPreferredCategory(long category_id) {
        User user = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Category category = categoryRepository.findById(category_id).orElse(null);
        if(category != null){
            PreferredCategory preferredCategoryed = new PreferredCategory();
            preferredCategoryed.setCategory(category);
            preferredCategoryed.setUser(user);
            PreferredCategory saved = preferredCategoryRepository.save(preferredCategoryed);
            return new PreferredCategoryResponse(saved.getCategory());
        }
        return null;
    }

    @Override
    public void removePreferredCategory(long category_id) throws IllegalArgumentException{
        User user = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        PreferredCategory preferredCategoryed = preferredCategoryRepository.findByCategoryIdAndUserId(category_id, user.getId());
        preferredCategoryRepository.delete(preferredCategoryed);
    }

    @Override
    public List<PreferredCategoryResponse> getPreferredCategories(){
        User user = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<PreferredCategory> preferredCategory = preferredCategoryRepository.findByUserIdOrderByCategoryNameDesc(user.getId());
        List<PreferredCategoryResponse> preferredCategoryResponse = new ArrayList<>();
        for(PreferredCategory preferredCategoryed: preferredCategory){
            preferredCategoryResponse.add(new PreferredCategoryResponse(preferredCategoryed.getCategory()));
        }
        return preferredCategoryResponse;
    }
}
