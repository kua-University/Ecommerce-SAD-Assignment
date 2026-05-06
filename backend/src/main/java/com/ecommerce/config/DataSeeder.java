package com.ecommerce.config;

import com.ecommerce.model.Product;
import com.ecommerce.model.User;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Only seed if there are no products in the database
        if (productRepository.count() == 0) {
            System.out.println("Seeding database with sample data...");

            // Get or create a sample seller
            User seller;
            if (userRepository.count() == 0) {
                seller = new User();
                seller.setUsername("sample_seller");
                seller.setEmail("seller@example.com");
                seller.setPassword(passwordEncoder.encode("password"));
                seller.setRole("ROLE_USER");
                seller.setPhone("+1234567890");
                seller.setAddress("123 Seller St, Tech City");
                seller = userRepository.save(seller);
            } else {
                seller = userRepository.findAll().get(0);
            }

            // Create sample products
            Product p1 = new Product(
                    "Wireless Noise-Canceling Headphones",
                    "High-quality over-ear headphones with active noise cancellation and 30-hour battery life.",
                    new BigDecimal("199.99"),
                    50,
                    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=60",
                    "Electronics",
                    seller
            );

            Product p2 = new Product(
                    "Mechanical Gaming Keyboard",
                    "RGB backlit mechanical keyboard with tactile blue switches and programmable macro keys.",
                    new BigDecimal("89.50"),
                    30,
                    "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=500&q=60",
                    "Electronics",
                    seller
            );

            Product p3 = new Product(
                    "Ergonomic Office Chair",
                    "Breathable mesh back, adjustable lumbar support, and 3D armrests for all-day comfort.",
                    new BigDecimal("249.00"),
                    15,
                    "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=500&q=60",
                    "Furniture",
                    seller
            );

            Product p4 = new Product(
                    "Stainless Steel Water Bottle",
                    "Double-wall vacuum insulated 32oz bottle keeps drinks cold for 24 hours.",
                    new BigDecimal("24.99"),
                    100,
                    "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=500&q=60",
                    "Accessories",
                    seller
            );

            productRepository.saveAll(Arrays.asList(p1, p2, p3, p4));

            System.out.println("Sample data seeded successfully!");
        }
    }
}
