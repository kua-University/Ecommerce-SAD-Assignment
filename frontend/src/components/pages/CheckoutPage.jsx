import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const CheckoutPage = () => {
  const { user } = useAuth();
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [buyerName, setBuyerName] = useState(user?.username || '');
  const [buyerPhone, setBuyerPhone] = useState(user?.phone || '');
  const [shippingAddress, setShippingAddress] = useState(user?.address || '');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      navigate('/products');
    }
  }, [cart, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!buyerName.trim() || !buyerPhone.trim() || !shippingAddress.trim()) {
      toast.error('Please fill in all buyer and shipping details');
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        buyerName,
        buyerPhone,
        shippingAddress,
        paymentMethod,
        items: cart.map(item => ({
          productId: item.id,
          quantity: item.quantity
        }))
      };

      const response = await axios.post(
        `${API_URL}/orders/checkout?userId=${user.id}`,
        orderData
      );

      clearCart();
      toast.success('Order placed successfully!');
      navigate('/products');
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Checkout Form */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Buyer Name
                  </label>
                  <input
                    type="text"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    required
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Shipping Address
                </label>
                <textarea
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  rows="3"
                  required
                  placeholder="Enter your full address"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                >
                  <option value="credit_card">Credit Card</option>
                  <option value="Telebirr">Telebirr</option>
                  <option value="paypal">PayPal</option>
                  <option value="cash_on_delivery">Cash on Delivery</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading || cart.length === 0}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold text-lg"
              >
                {loading ? 'Processing...' : `Place Order ($${cartTotal.toFixed(2)})`}
              </button>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-96">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            {cart.map((item) => (
              <div key={item.id} className="border-b py-3">
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      ${Number(item.price).toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">${(Number(item.price) * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between mb-2">
                <span>Shipping:</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between pt-2 border-t mt-2">
                <span className="font-bold text-lg">Total:</span>
                <span className="font-bold text-xl">${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;