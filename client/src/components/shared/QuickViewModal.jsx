import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { addToCart } from '@redux/cartSlice';
import { toggleWishlistAndSync } from '@redux/wishlistSlice';
import Swal from 'sweetalert2';
import { useSettings } from '@context/SettingsContext';
import { formatCurrency } from '@utils/currencyUtils';
import { getProductImageUrl } from '@utils/imageUtils';

const QuickViewModal = ({ product, isOpen, onClose }) => {
  const { settings } = useSettings();
  const [selectedSize, setSelectedSize] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistItems = useSelector(state => state.wishlist.items);
  const isInWishlist = wishlistItems.some(item => item.id === product?.id);

  useEffect(() => {
    setSelectedSize('');
  }, [product, isOpen]);

  if (!isOpen || !product) return null;

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      onClose();
      Swal.fire({
        title: 'Sign In Required',
        text: 'Please log in to add items to your cart or wishlist.',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#4F46E5',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Go to Login',
        background: '#111827',
        color: '#fff',
        customClass: {
          popup: 'rounded-3xl border border-gray-800'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/auth');
        }
      });
      return false;
    }
    return true;
  };

  const handleAddToCart = () => {
    if (!checkAuth()) return;
    if (!selectedSize) {
      Swal.fire({
        title: 'Select Size',
        text: 'Please choose a size before adding to cart.',
        icon: 'warning',
        confirmButtonColor: '#4F46E5',
        background: '#111827',
        color: '#fff',
        customClass: {
          popup: 'rounded-3xl border border-gray-800'
        }
      });
      return;
    }
    dispatch(addToCart({ ...product, size: selectedSize }));
    onClose();
    Swal.fire({
      icon: 'success',
      title: 'Added to Cart',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      background: '#111827',
      color: '#fff',
      customClass: {
        popup: 'rounded-2xl border border-gray-800'
      }
    });
  };

  const handleToggleWishlist = () => {
    if (!checkAuth()) return;
    dispatch(toggleWishlistAndSync(product));
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" onClick={onClose}>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-gray-900 flex flex-col md:flex-row"
        >
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-gray-500 backdrop-blur-md hover:bg-white/20 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors border border-gray-200 dark:border-gray-700/50 shadow-sm"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          <div className="w-full md:w-1/2 bg-gray-100 dark:bg-gray-800 aspect-square md:aspect-auto">
            <img 
              src={getProductImageUrl(product.image, product.category, product.id)}
              onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder.svg'; }}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex w-full md:w-1/2 flex-col justify-between p-6 sm:p-8 md:p-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 mb-2">{product.category}</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">{product.name}</h2>
              
              <div className="flex items-end gap-3 mb-6">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(product.price, settings)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-400 line-through mb-1">
                    {formatCurrency(product.originalPrice, settings)}
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-6 leading-relaxed">
                {product.description || "Built for premium comfort, durability, and a sleek modern design. Perfect for your next adventure or everyday wear."}
              </p>

              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">Select Size</span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes?.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 rounded-lg border font-bold text-xs transition-all flex items-center justify-center
                        ${selectedSize === size
                          ? 'border-primary-600 bg-primary-600 text-white scale-[1.05] shadow-sm'
                          : 'border-gray-200 bg-white text-gray-900 hover:border-primary-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-primary-600 text-white h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary-700 transition shadow-lg active:scale-95"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                Add to Cart
              </button>
              <button 
                onClick={handleToggleWishlist}
                className={`h-12 w-12 rounded-xl flex items-center justify-center transition-all shadow-md active:scale-95 border
                  ${isInWishlist 
                    ? 'bg-red-50 border-red-200 text-red-500 dark:bg-red-950/30 dark:border-red-900' 
                    : 'bg-white border-gray-200 text-gray-500 hover:border-red-200 hover:text-red-500 dark:bg-gray-800 dark:border-gray-700'
                  }`}
              >
                <svg className="h-5 w-5" fill={isInWishlist ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
              </button>
            </div>
            
            <div className="mt-4 text-center">
              <Link to={`/products/${product.id}`} className="text-xs font-semibold text-gray-500 hover:text-primary-600 transition-colors" onClick={onClose}>
                View Full Details →
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default QuickViewModal;
