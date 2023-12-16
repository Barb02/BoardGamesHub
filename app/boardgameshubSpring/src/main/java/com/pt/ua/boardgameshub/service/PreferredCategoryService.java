package com.pt.ua.boardgameshub.service;

import com.pt.ua.boardgameshub.dao.response_body.PreferredCategoryResponse;

import java.util.List;

public interface PreferredCategoryService {
    PreferredCategoryResponse addPreferredCategory(long category_id);
    void removePreferredCategory(long category_id);
    List<PreferredCategoryResponse> getPreferredCategories();
}