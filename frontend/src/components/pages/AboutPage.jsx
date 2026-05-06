import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('mission');
  const [isExpanded, setIsExpanded] = useState(false);
  const [counts, setCounts] = useState({ customers: 0, products: 0, years: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [showSubscribeMsg, setShowSubscribeMsg] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeError, setSubscribeError] = useState('');

  const statsRef = useRef(null);

  const stats = [
    { label: 'Happy Customers', value: 15000, suffix: '+', key: 'customers' },
    { label: 'Products', value: 5000, suffix: '+', key: 'products' },
    { label: 'Years of Excellence', value: 4, suffix: '', key: 'years' }
  ];

  // Intersection Observer for counter animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  // Animate counters
  useEffect(() => {
    if (isVisible) {
      stats.forEach(stat => {
        let start = 0;
        const end = stat.value;
        const duration = 2000;
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCounts(prev => ({ ...prev, [stat.key]: end }));
            clearInterval(timer);
          } else {
            setCounts(prev => ({ ...prev, [stat.key]: Math.floor(start) }));
          }
        }, 16);

        return () => clearInterval(timer);
      });
    }
  }, [isVisible]);

  const tabs = {
    mission: {
      title: 'Our Mission',
      content: 'To revolutionize the shopping experience by providing high-quality, affordable products while fostering a community of satisfied customers who trust us for their every need.'
    },
    vision: {
      title: 'Our Vision',
      content: 'To become the most trusted and innovative e-commerce platform in Ethiopia and beyond, setting new standards for customer satisfaction and sustainable business practices.'
    },
    values: {
      title: 'Our Values',
      content: 'Integrity, Innovation, Customer-Centricity, Sustainability, and Excellence in everything we do.'
    }
  };

  const features = [
    { icon: '⭐', title: 'Quality Products', desc: 'Curated from trusted brands worldwide' },
    { icon: '🚚', title: 'Fast Shipping', desc: 'Delivery within 2-3 business days' },
    { icon: '🔒', title: 'Secure Payments', desc: 'Multiple payment options with encryption' },
    { icon: '💬', title: '24/7 Support', desc: 'Round-the-clock customer service' },
    { icon: '🔄', title: 'Easy Returns', desc: '30-day money-back guarantee' },
    { icon: '🎁', title: 'Rewards Program', desc: 'Earn points on every purchase' }
  ];

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setSubscribeError('');
    setShowSubscribeMsg(false);
    
    if (email) {
      setIsSubscribing(true);
      try {
        await axios.post('http://localhost:8080/api/newsletter/subscribe', { email });
        setShowSubscribeMsg(true);
        setEmail('');
        setTimeout(() => setShowSubscribeMsg(false), 3000);
      } catch (err) {
        if (err.response && err.response.data && err.response.data.error) {
          setSubscribeError(err.response.data.error);
        } else {
          setSubscribeError('An error occurred. Please try again later.');
        }
      } finally {
        setIsSubscribing(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-20 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fadeIn">About Us</h1>
            <p className="text-xl md:text-2xl opacity-90">Your trusted partner in online shopping since 2024</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="p-8">
            {/* Story Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Welcome to <span className="font-semibold text-blue-600">E-Commerce</span>, your number one source for all things.
                  We're dedicated to providing you the best of products, with a focus on dependability,
                  customer service, and uniqueness.
                </p>
                <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-96' : 'max-h-24'}`}>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Founded in 2024, E-Commerce has come a long way from its beginnings.
                    When we first started out, our passion for providing the best products drove us
                    to start this business. What started as a small operation has grown into a
                    thriving community of over 15,000 satisfied customers. We continue to grow and
                    improve every day, always putting our customers first.
                  </p>
                </div>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-blue-600 font-semibold hover:text-blue-700 transition-colors mt-2"
                >
                  {isExpanded ? 'Read Less ↑' : 'Read More ↓'}
                </button>
              </div>
            </div>

            {/* Interactive Tabs */}
            <div className="mb-12">
              <div className="flex border-b border-gray-200 mb-6 flex-wrap">
                {Object.keys(tabs).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`px-6 py-3 text-lg font-semibold transition-all duration-300 ${activeTab === key
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                      }`}
                  >
                    {tabs[key].title}
                  </button>
                ))}
              </div>
              <div className="bg-gray-50 rounded-xl p-6 transition-all duration-300">
                <p className="text-gray-700 text-lg leading-relaxed">{tabs[activeTab].content}</p>
              </div>
            </div>

            {/* Stats Section */}
            <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow transform hover:-translate-y-1 duration-300"
                >
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {counts[stat.key]}{stat.suffix}
                  </div>
                  <div className="text-gray-600 font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Why Choose Us */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-2"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    transform: hoveredCard === index ? 'translateY(-8px)' : 'translateY(0)',
                    boxShadow: hoveredCard === index ? '0 20px 25px -5px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Contact Section */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 hover:translate-x-1 transition-transform duration-300">
                    <span className="text-2xl">📧</span>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-800 font-semibold">yabsrashimels531@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 hover:translate-x-1 transition-transform duration-300">
                    <span className="text-2xl">📞</span>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-800 font-semibold">+251900468152</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 hover:translate-x-1 transition-transform duration-300">
                    <span className="text-2xl">📍</span>
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="text-gray-800 font-semibold">123 Commerce Street, Mekelle, Ethiopia</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
                <h3 className="text-xl font-bold mb-3">Subscribe to Our Newsletter</h3>
                <p className="mb-4 opacity-90">Get exclusive offers and updates directly in your inbox</p>
                <form onSubmit={handleSubscribe} className="flex gap-2 flex-wrap">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                    required
                    disabled={isSubscribing}
                  />
                  <button
                    type="submit"
                    className={`bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold transition-all ${isSubscribing ? 'opacity-70 cursor-not-allowed' : 'hover:bg-opacity-90'}`}
                    disabled={isSubscribing}
                  >
                    {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </form>
                {showSubscribeMsg && (
                  <div className="mt-3 text-sm bg-green-500 text-white px-3 py-1 rounded-lg text-center animate-slideDown">
                    ✓ Thanks for subscribing!
                  </div>
                )}
                {subscribeError && (
                  <div className="mt-3 text-sm bg-red-500 text-white px-3 py-1 rounded-lg text-center animate-slideDown">
                    ✕ {subscribeError}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-gray-500 text-sm mt-8">
          <p>© 2024 E-Commerce. All rights reserved. | Built with ❤️ for our customers</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AboutPage;