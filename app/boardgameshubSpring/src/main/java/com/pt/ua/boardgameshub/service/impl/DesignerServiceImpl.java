package com.pt.ua.boardgameshub.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pt.ua.boardgameshub.domain.Designer;
import com.pt.ua.boardgameshub.repository.DesignerRepository;
import com.pt.ua.boardgameshub.service.DesignerService;

@Service
public class DesignerServiceImpl implements DesignerService{
    
    private final DesignerRepository designerRepository;

    @Autowired
    public DesignerServiceImpl(DesignerRepository designerRepository){
        this.designerRepository = designerRepository;
    }

    @Override
    public Designer getDesignerById(Long id) {
        return designerRepository.findById(id).orElse(null);
    }

    @Override
    public void addDesigner(Designer designer) {
        designerRepository.save(designer);
    }
}
