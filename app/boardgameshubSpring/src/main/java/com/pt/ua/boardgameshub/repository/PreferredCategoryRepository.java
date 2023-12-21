package com.pt.ua.boardgameshub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pt.ua.boardgameshub.domain.PreferredCategory;

import java.util.List;

@Repository
public interface PreferredCategoryRepository extends JpaRepository<PreferredCategory,Long>{
    List<PreferredCategory> findByUserIdOrderByCategoryNameDesc(long user_id);
    PreferredCategory findByCategoryIdAndUserId(long category_id, long user_id);
}