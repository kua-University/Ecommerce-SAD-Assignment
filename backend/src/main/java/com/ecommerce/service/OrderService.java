package com.ecommerce.service;

import com.ecommerce.dto.CheckoutRequest;
import com.ecommerce.model.Order;
import com.ecommerce.model.OrderItem;
import com.ecommerce.model.Product;
import com.ecommerce.model.User;
import com.ecommerce.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private ProductService productService;

    @Transactional
    public Order createOrder(Long userId, CheckoutRequest checkoutRequest) {
        User user = userService.findById(userId);

        Order order = new Order();
        order.setUser(user);
        order.setShippingAddress(checkoutRequest.getShippingAddress());
        order.setPaymentMethod(checkoutRequest.getPaymentMethod());
        order.setBuyerName(checkoutRequest.getBuyerName());
        order.setBuyerPhone(checkoutRequest.getBuyerPhone());
        order.setStatus("PENDING");

        BigDecimal totalAmount = BigDecimal.ZERO;
        List<OrderItem> orderItems = new ArrayList<>();

        for (CheckoutRequest.CartItem item : checkoutRequest.getItems()) {
            Product product = productService.getProductById(item.getProductId());

            // Check stock
            if (product.getStockQuantity() < item.getQuantity()) {
                throw new RuntimeException("Insufficient stock for product: " + product.getName());
            }

            // Update stock
            productService.updateStock(product.getId(), item.getQuantity());

            // Create order item
            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(product);
            orderItem.setQuantity(item.getQuantity());
            orderItem.setPrice(product.getPrice());
            orderItem.setOrder(order);

            orderItems.add(orderItem);

            // Calculate total
            totalAmount = totalAmount.add(product.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
        }

        order.setTotalAmount(totalAmount);
        order.setOrderItems(orderItems);

        return orderRepository.save(order);
    }

    public List<Order> getUserOrders(Long userId) {
        User user = userService.findById(userId);
        return orderRepository.findByUserOrderByCreatedAtDesc(user);
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public Order updateOrderStatus(Long id, String status) {
        Order order = getOrderById(id);
        order.setStatus(status);
        return orderRepository.save(order);
    }
}