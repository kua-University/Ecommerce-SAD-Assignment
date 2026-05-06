import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../../context/CartContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const { addToCart } = useCart();

  const mockProducts = [
    { id: 1, name: "Premium Wireless Headphones", price: 299.99, category: "Electronics", stockQuantity: 50, imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", seller: { username: "TechStore" } },
    { id: 2, name: "Minimalist Smartwatch", price: 199.50, category: "Accessories", stockQuantity: 30, imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80", seller: { username: "TimeKeepers" } },
    { id: 3, name: "Ergonomic Office Chair", price: 159.00, category: "Furniture", stockQuantity: 15, imageUrl: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500&q=80", seller: { username: "OfficePro" } },
    { id: 4, name: "Mechanical Keyboard", price: 129.99, category: "Electronics", stockQuantity: 0, imageUrl: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80", seller: { username: "KeyCrafters" } }
  ];

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await axios.get(`${API_URL}/products`);
        if (response.data && response.data.length > 0) {
          setFeaturedProducts(response.data.slice(0, 4));
        } else {
          setFeaturedProducts(mockProducts);
        }
      } catch (error) {
        console.error('Failed to load featured products, using mock data:', error);
        setFeaturedProducts(mockProducts);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Hero */}
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to Yabu E-Commerce Shop
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your one-stop shop for amazing products
          </p>
          <Link
            to="/products"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            Shop Now
          </Link>
        </div>

        {/* Features */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl mb-4">🚚</div>
            <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
            <p className="text-gray-600">On orders over $50</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl mb-4">🛡️</div>
            <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
            <p className="text-gray-600">100% secure transactions</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl mb-4">⭐</div>
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-600">Customer support anytime</p>
          </div>
        </div>

        {/* Featured Products */}
        <div className="mt-20 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
          {loadingProducts ? (
            <div className="grid md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="border rounded-lg p-4 animate-pulse">
                  <div className="h-48 bg-gray-200 rounded mb-4" />
                  <div className="h-4 bg-gray-200 rounded mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
                  <div className="h-8 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No products available yet.</p>
              <Link to="/products" className="text-blue-600 hover:underline mt-2 block">Browse all products</Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <div key={product.id} className="border rounded-lg p-4 hover:shadow-lg transition">
                  <div className="h-48 bg-gray-200 rounded mb-4 flex items-center justify-center overflow-hidden">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-4xl">📦</span>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg truncate">{product.name}</h3>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                      {product.category || 'Uncategorized'}
                    </p>
                    <p className="text-xs text-gray-500">
                      By {product.seller ? product.seller.username : 'Unknown'}
                    </p>
                  </div>
                  <p className="text-blue-600 font-bold mt-2">${Number(product.price).toFixed(2)}</p>
                  <p className="text-xs text-gray-400 mt-1">Stock: {product.stockQuantity}</p>
                  <button
                    onClick={() => addToCart(product)}
                    disabled={product.stockQuantity === 0}
                    className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                  >
                    {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-8">
            <Link
              to="/products"
              className="inline-block border-2 border-blue-600 text-blue-600 px-8 py-2 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition"
            >
              View All Products →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;