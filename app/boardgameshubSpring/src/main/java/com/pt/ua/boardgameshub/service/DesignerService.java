package com.pt.ua.boardgameshub.service;

import com.pt.ua.boardgameshub.domain.Designer;

public interface DesignerService {
    public Designer getDesignerById(Long id);
    public void addDesigner(Designer designer);
}
