package com.pt.ua.boardgameshub.service;

import com.pt.ua.boardgameshub.domain.Publisher;

public interface PublisherService {
    public Publisher getPublisherById(Long id);
    public void addPublisher(Publisher publisher);
}
