package com.pt.ua.boardgameshub.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pt.ua.boardgameshub.domain.Publisher;
import com.pt.ua.boardgameshub.repository.PublisherRepository;
import com.pt.ua.boardgameshub.service.PublisherService;

@Service
public class PublisherServiceImpl implements PublisherService{
    
    private final PublisherRepository publisherRepository;

    @Autowired
    public PublisherServiceImpl(PublisherRepository publisherRepository){
        this.publisherRepository = publisherRepository;
    }

    @Override
    public Publisher getPublisherById(Long id) {
        return publisherRepository.findById(id).orElse(null);
    }

    @Override
    public void addPublisher(Publisher publisher) {
        publisherRepository.save(publisher);
    }
}
