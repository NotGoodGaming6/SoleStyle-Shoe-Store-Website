import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '@redux/cartSlice';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useSettings } from '../../context/SettingsContext';
import { formatCurrency } from '../../utils/currencyUtils';
import { getProductImageUrl } from '@utils/imageUtils';

const CheckoutPage = () => {
  const { items, totalAmount } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { settings } = useSettings();

  const [formData, setFormData] = useState({
    phone: '',
    city: '',
    zipCode: '',
    shippingAddress: '',
    paymentMethod: 'Cash'
  });

  const [loading, setLoading] = useState(false);

  const threshold = settings?.freeShippingThreshold || 75;
  const taxRate = settings?.taxRate || 0;
  const isFreeShipping = totalAmount >= threshold;
  const shipping = isFreeShipping ? 0 : 10;
  const taxAmount = (totalAmount * taxRate) / 100;
  const finalAmount = totalAmount + shipping + taxAmount;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    if (!token) {
      toast.error('Please login again to continue.');
      navigate('/auth');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/api/solestyle/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          items,
          ...formData
        })
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(clearCart());
        toast.success('Order placed successfully!');
        navigate('/profile');
      } else {
        throw new Error(data.message || 'Failed to place order');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-xl"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Shipping Information</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                    <input
                      required
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+994 -- --- -- --"
                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">City</label>
                    <input
                      required
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="e.g. Baku"
                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Shipping Address</label>
                  <textarea
                    required
                    name="shippingAddress"
                    value={formData.shippingAddress}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Street, Building, Apartment..."
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none resize-none transition-all"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Zip Code (Optional)</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      placeholder="AZ1000"
                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Payment Method</label>
                    <select
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleChange}
                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                    >
                      <option value="Cash">Cash on Delivery</option>
                      <option value="Card">Online Card (Mock)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-primary-500/25 flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span>Processing...</span>
                  ) : (
                    <>
                      <span>Complete Purchase</span>
                      <span className="ml-2">— {formatCurrency(finalAmount, settings)}</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-200 dark:border-gray-800 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex items-center space-x-4">
                    <img 
                      src={getProductImageUrl(item.image, item.category, item.id)}
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded-xl" 
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate w-40">{item.name}</h3>
                      <p className="text-xs text-gray-500">Size: {item.size} x {item.quantity}</p>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(item.totalPrice, settings)}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-800 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span>{formatCurrency(totalAmount, settings)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Shipping</span>
                  <span>{isFreeShipping ? 'Free' : formatCurrency(10, settings)}</span>
                </div>
                {taxRate > 0 && (
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Estimated Tax ({taxRate}%)</span>
                    <span>{formatCurrency(taxAmount, settings)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-100 dark:border-gray-800">
                  <span>Total</span>
                  <span>{formatCurrency(finalAmount, settings)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
