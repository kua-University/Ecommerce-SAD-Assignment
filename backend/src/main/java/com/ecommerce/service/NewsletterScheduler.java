package com.ecommerce.service;

import com.ecommerce.repository.SubscriberRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class NewsletterScheduler {

    private static final Logger logger = LoggerFactory.getLogger(NewsletterScheduler.class);

    @Autowired
    private SubscriberRepository subscriberRepository;

    // Run every 1 minute (60000 ms)
    @Scheduled(fixedRate = 60000)
    public void processSubscribers() {
        long count = subscriberRepository.count();
        logger.info("Scheduled Task: Processing {} newsletter subscribers...", count);
        // Here you would implement logic to actually send emails or process them
        // For example:
        // List<Subscriber> subscribers = subscriberRepository.findAll();
        // emailService.sendNewsletter(subscribers);
    }
}
