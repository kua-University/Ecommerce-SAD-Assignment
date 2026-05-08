package com.ecommerce.service;

import com.ecommerce.model.Order;
import com.ecommerce.model.Product;
import com.ecommerce.model.Subscriber;
import com.ecommerce.model.User;
import com.ecommerce.repository.OrderRepository;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.repository.SubscriberRepository;
import com.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Month;
import java.time.format.TextStyle;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private SubscriberRepository subscriberRepository;

    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        
        long totalUsers = userRepository.count();
        long totalProducts = productRepository.count();
        long totalOrders = orderRepository.count();
        long totalSubscribers = subscriberRepository.count();
        
        List<Order> allOrders = orderRepository.findAll();
        BigDecimal totalRevenue = allOrders.stream()
                .map(Order::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
                
        stats.put("totalUsers", totalUsers);
        stats.put("totalProducts", totalProducts);
        stats.put("totalOrders", totalOrders);
        stats.put("totalRevenue", totalRevenue);
        stats.put("totalSubscribers", totalSubscribers);
        
        return stats;
    }

    public List<Map<String, Object>> getSalesChartData() {
        List<Order> orders = orderRepository.findAll();
        
        // Group by month
        Map<Month, BigDecimal> revenueByMonth = new EnumMap<>(Month.class);
        Map<Month, Long> ordersByMonth = new EnumMap<>(Month.class);
        
        // Initialize all months to 0
        for (Month month : Month.values()) {
            revenueByMonth.put(month, BigDecimal.ZERO);
            ordersByMonth.put(month, 0L);
        }
        
        for (Order order : orders) {
            if (order.getCreatedAt() != null) {
                Month month = order.getCreatedAt().getMonth();
                revenueByMonth.put(month, revenueByMonth.get(month).add(order.getTotalAmount()));
                ordersByMonth.put(month, ordersByMonth.get(month) + 1);
            }
        }
        
        List<Map<String, Object>> chartData = new ArrayList<>();
        for (Month month : Month.values()) {
            Map<String, Object> monthData = new HashMap<>();
            // Get 3-letter month name (e.g. Jan, Feb)
            monthData.put("name", month.getDisplayName(TextStyle.SHORT, Locale.ENGLISH));
            monthData.put("revenue", revenueByMonth.get(month));
            monthData.put("orders", ordersByMonth.get(month));
            chartData.add(monthData);
        }
        
        return chartData;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public List<Subscriber> getAllSubscribers() {
        return subscriberRepository.findAll();
    }
}
