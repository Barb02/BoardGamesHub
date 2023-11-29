package com.pt.ua.boardgameshub.service.jpa_service;

import com.pt.ua.boardgameshub.domain.jpa_domain.Designer;

public interface DesignerService {
    public Designer getDesignerById(Long id);
    public void addDesigner(Designer designer);
}
