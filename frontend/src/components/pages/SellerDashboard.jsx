import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const SellerDashboard = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    imageUrl: '',
    category: '',
    stockQuantity: 10
  });

  useEffect(() => {
    fetchMyProducts();
  }, [user]);

  const fetchMyProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products/seller/${user.id}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching seller products:', error);
      toast.error('Failed to load your products');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        stockQuantity: parseInt(formData.stockQuantity, 10)
      };
      await axios.post(`${API_URL}/products?sellerId=${user.id}`, payload);
      toast.success('Product added successfully!');
      
      // Reset form
      setFormData({
        name: '',
        price: '',
        description: '',
        imageUrl: '',
        category: '',
        stockQuantity: 10
      });
      
      // Refresh list
      fetchMyProducts();
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Seller Dashboard</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Add Product Form */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Stock Quantity</label>
                <input
                  type="number"
                  name="stockQuantity"
                  value={formData.stockQuantity}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                  rows="3"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-bold"
              >
                List Product
              </button>
            </form>
          </div>
        </div>
        
        {/* My Products List */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">My Products</h2>
            
            {loading ? (
              <p>Loading your products...</p>
            ) : products.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>You haven't listed any products yet.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {products.map(product => (
                  <div key={product.id} className="border rounded-lg p-4 flex gap-4">
                    <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center overflow-hidden flex-shrink-0">
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-2xl">📦</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold truncate">{product.name}</h3>
                      <p className="text-blue-600 font-bold">${Number(product.price).toFixed(2)}</p>
                      <p className="text-sm text-gray-500 mt-1">Stock: {product.stockQuantity}</p>
                      <p className="text-sm text-gray-500">Category: {product.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default SellerDashboard;
