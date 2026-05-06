import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-7">
            <Link to="/" className="flex items-center py-4">
              <span className="font-semibold text-gray-700 text-lg">E-Commerce</span>
            </Link>
            <div className="hidden md:flex items-center space-x-2 ml-4">
              <Link to="/" className="py-2 px-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md font-medium transition-all duration-200">Home</Link>
              <Link to="/products" className="py-2 px-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md font-medium transition-all duration-200">Products</Link>
              <Link to="/checkout" className="py-2 px-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md font-medium transition-all duration-200">Checkout</Link>
              <Link to="/about" className="py-2 px-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md font-medium transition-all duration-200">About</Link>
              <Link to="/seller/dashboard" className="py-2 px-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md font-medium transition-all duration-200">Dashboard</Link>
            </div>
          </div>

            <div className="flex items-center space-x-3">
            {/* Cart Icon with Badge */}
            <Link to="/cart" className="relative p-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-full transition-all duration-200 group">
              <span className="text-2xl group-hover:scale-110 inline-block transition-transform duration-200">🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4 ml-2">
                <div className="flex flex-col items-end">
                  <span className="text-sm text-gray-500">Welcome back,</span>
                  <span className="font-semibold text-gray-800">{user?.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="py-2 px-4 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-500 hover:text-white transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 ml-2">
                <Link to="/login" className="py-2 px-4 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-all duration-200">
                  Login
                </Link>
                <Link to="/register" className="py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;