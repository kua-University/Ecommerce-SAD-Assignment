import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../../context/CartContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, cart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCartQuantity = (productId) => {
    const item = cart.find(i => i.id === productId);
    return item ? item.quantity : 0;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Our Products</h1>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="border rounded-lg p-4 animate-pulse">
              <div className="h-48 bg-gray-200 rounded mb-4" />
              <div className="h-4 bg-gray-200 rounded mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
              <div className="h-10 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      {products.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <div className="text-6xl mb-4">📦</div>
          <p className="text-xl">No products available yet.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product) => {
            const cartQty = getCartQuantity(product.id);
            return (
              <div key={product.id} className="border rounded-lg p-4 hover:shadow-lg transition bg-white">
                <div className="h-48 bg-gray-100 rounded mb-4 flex items-center justify-center overflow-hidden">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover rounded" />
                  ) : (
                    <span className="text-5xl">📦</span>
                  )}
                </div>
                <h3 className="font-semibold text-lg">{product.name}</h3>
                
                <div className="flex justify-between items-center mt-1 mb-2">
                  <p className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                    {product.category || 'Uncategorized'}
                  </p>
                  <p className="text-xs text-gray-500">
                    By {product.seller ? product.seller.username : 'Unknown'}
                  </p>
                </div>
                
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">{product.description}</p>
                <p className="text-xl font-bold text-blue-600 mt-2">${Number(product.price).toFixed(2)}</p>
                <p className="text-sm text-gray-400">Stock: {product.stockQuantity}</p>

                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={() => addToCart(product)}
                    disabled={product.stockQuantity === 0}
                    className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                  >
                    {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                  {cartQty > 0 && (
                    <span className="bg-blue-100 text-blue-700 text-sm font-semibold px-2 py-1 rounded">
                      {cartQty} in cart
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;