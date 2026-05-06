package com.ecommerce.service;

import com.ecommerce.model.Subscriber;
import com.ecommerce.repository.SubscriberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NewsletterService {

    @Autowired
    private SubscriberRepository subscriberRepository;

    public void subscribe(String email) {
        if (subscriberRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email is already subscribed.");
        }
        
        Subscriber subscriber = new Subscriber(email);
        subscriberRepository.save(subscriber);
    }
}
