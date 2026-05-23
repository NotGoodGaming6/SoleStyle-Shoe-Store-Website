import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { addToCart } from '@redux/cartSlice';
import { toggleWishlistAndSync } from '@redux/wishlistSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import QuickViewModal from '@components/shared/QuickViewModal';
import { useSettings } from '@context/SettingsContext';
import { formatCurrency } from '@utils/currencyUtils';
import { getProductImageUrl } from '@utils/imageUtils';

const ProductCard = ({ product }) => {
  const { settings } = useSettings();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistItems = useSelector(state => state.wishlist.items);
  const isInWishlist = wishlistItems.some(item => item.id === product.id);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (!token) {
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

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!checkAuth()) return;
    dispatch(toggleWishlistAndSync(product));
  };

  return (
    <>
      <motion.div 
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -8 }}
        viewport={{ once: true }}
        className="group relative"
      >
        <Link to={`/products/${product.id}`} className="block overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
          <div className="relative aspect-[4/5] overflow-hidden">
            {!imageLoaded && (
              <div className="absolute inset-0 skeleton z-10" />
            )}

            <img
              src={getProductImageUrl(product.image, product.category, product.id)}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder.svg'; }}
              alt={product.name}
              loading="lazy"
              decoding="async"
              className={`h-full w-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'} ${product.images?.[1] ? 'group-hover:opacity-0' : ''}`}
            />
            
            {product.images?.[1] && (
              <img
                src={getProductImageUrl(product.images[1])}
                alt={product.name}
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:opacity-100"
              />
            )}

            <div className="absolute left-3 top-3 flex flex-col gap-2">
              {(product.isOnSale || product.discountPercentage > 0 || product.discount > 0) && (
                <span className="sale-badge rounded-full bg-primary-600 px-3 py-1 text-[10px] font-bold text-white shadow-lg">
                  -{product.discountPercentage || product.discount || 0}%
                </span>
              )}
              {product.isNewItem && (
                <span className="rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[10px] font-bold text-gray-950 shadow-lg dark:bg-gray-900/90 dark:text-white">
                  NEW
                </span>
              )}
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 transition-all duration-500 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
              <button 
                onClick={handleQuickView}
                className="group/btn glass-card flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-xl py-3 text-[10px] font-bold text-white transition-all duration-500 hover:flex-[4] hover:bg-primary-600 active:scale-95 shadow-lg"
              >
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="hidden group-hover/btn:block whitespace-nowrap">QUICK VIEW</span>
              </button>
              <button
                onClick={handleToggleWishlist}
                className={`group/btn glass-card flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-xl py-3 transition-all duration-500 hover:flex-[4] active:scale-95 shadow-lg ${
                  isInWishlist ? 'text-red-500 bg-red-500/10 border-red-500/20' : 'text-white hover:bg-red-500'
                }`} 
                aria-label="Toggle wishlist"
              >
                <svg className="h-4 w-4 shrink-0" fill={isInWishlist ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
                <span className="hidden group-hover/btn:block whitespace-nowrap text-[10px] font-bold">WISHLIST</span>
              </button>
            </div>
          </div>
        </Link>

        <div className="mt-4 px-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">{product.category}</p>
              <h3 className="mt-1 truncate font-display text-base font-bold text-gray-900 dark:text-white transition-colors group-hover:text-primary-600">
                <Link to={`/products/${product.id}`}>
                  {product.name}
                </Link>
              </h3>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              <svg className="h-3.5 w-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{product.rating || '4.5'}</span>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <span className="text-lg font-bold text-gray-950 dark:text-white">
              {formatCurrency(product.price, settings)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {formatCurrency(product.originalPrice, settings)}
              </span>
            )}
          </div>

          {product.colors && product.colors.length > 0 && (
            <div className="mt-3 flex items-center gap-1.5">
              {product.colors.map((color, i) => (
                <span
                  key={i}
                  className="h-3.5 w-3.5 rounded-full border border-gray-200 shadow-sm dark:border-gray-700"
                  style={{ backgroundColor: color.hex || color }}
                ></span>
              ))}
            </div>
          )}

          <p className="mt-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
            {product.sizes?.length || 10} sizes available
          </p>
        </div>
      </motion.div>

      <QuickViewModal 
        product={product} 
        isOpen={isQuickViewOpen} 
        onClose={() => setIsQuickViewOpen(false)} 
      />
    </>
  );
};

export default ProductCard;

