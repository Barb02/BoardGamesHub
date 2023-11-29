package com.pt.ua.boardgameshub.service.jpa_service;

import com.pt.ua.boardgameshub.domain.jpa_domain.Publisher;

public interface PublisherService {
    public Publisher getPublisherById(Long id);
    public void addPublisher(Publisher publisher);
}
