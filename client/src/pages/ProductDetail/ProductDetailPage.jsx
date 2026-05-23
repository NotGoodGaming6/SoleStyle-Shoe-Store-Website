import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '@redux/cartSlice';
import { toggleWishlistAndSync } from '@redux/wishlistSlice';
import { ShoppingCart, Heart, ArrowLeft, Star, Truck, ShieldCheck, RefreshCcw } from 'lucide-react';
import RelatedProducts from './RelatedProducts';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import SEO from '@components/shared/SEO';
import { useSettings } from '@context/SettingsContext';
import { formatCurrency } from '@utils/currencyUtils';
import { getProductImageUrl } from '@utils/imageUtils';

const ProductDetail = () => {
  const { settings } = useSettings();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [loading, setLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistItems = useSelector(state => state.wishlist.items);
  const isInWishlist = wishlistItems.some(item => item.id === product?.id);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please log in to continue.');
      navigate('/auth');
      return false;
    }
    return true;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/solestyle/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return null;
  }

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Product Not Found</h2>
        <Link to="/products" className="text-primary-600 hover:underline">Go back to Shop</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!checkAuth()) return;
    if (!selectedSize) {
      toast.error('Please choose a size first!');
      return;
    }
    
    setIsAddingToCart(true);
    setTimeout(() => {
      dispatch(addToCart({ ...product, size: selectedSize }));
      setIsAddingToCart(false);
      toast.success(`${product.name} added to cart!`);
    }, 600);
  };

  const handleToggleWishlist = () => {
    if (!checkAuth()) return;
    dispatch(toggleWishlistAndSync(product));
  };

  return (
    <>
      <SEO 
        title={product.name} 
        description={`${product.name} - ${product.category}. ${product.description}`} 
      />
      <section className="bg-gray-50 py-6 dark:bg-gray-900/50">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <nav className="text-sm">
            <ol className="flex items-center gap-2">
              <li>
                <Link to="/" className="text-gray-500 hover:text-primary-600 dark:text-gray-400">Home</Link>
              </li>
              <li className="text-gray-400">/</li>
              <li>
                <Link to="/products" className="text-gray-500 hover:text-primary-600 dark:text-gray-400">Shop</Link>
              </li>
              <li className="text-gray-400">/</li>
              <li className="font-medium text-gray-900 dark:text-white">{product.name}</li>
            </ol>
          </nav>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                {product.isNewItem && (
                  <span className="bg-green-500 text-white font-bold px-3 py-1.5 rounded-full text-xs">
                    NEW ARRIVAL
                  </span>
                )}
                {(product.isOnSale || product.discountPercentage > 0 || product.discount > 0) && (
                  <span className="bg-primary-500 text-white font-bold px-3 py-1.5 rounded-full text-xs">
                    SAVE {product.discountPercentage || product.discount || 0}%
                  </span>
                )}
              </div>

              <img
                src={getProductImageUrl(product.image, product.category, product.id)}
                onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder.svg'; }}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <div className="mb-2 text-primary-600 font-bold text-sm tracking-widest uppercase">{product.category}</div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">{product.name}</h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">(128 Reviews)</span>
              </div>

              <div className="flex items-end gap-3 mb-8">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(product.price, settings)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through mb-1">
                    {formatCurrency(product.originalPrice, settings)}
                  </span>
                )}
              </div>

              <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
                {product.description} Built for premium comfort, durability, and a sleek modern design. Perfect for your next adventure or everyday wear.
              </p>

              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-gray-900 dark:text-white">Select Size</span>
                  <Link to="/size-guide" className="text-sm text-primary-600 hover:underline">Size Guide</Link>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                  {product.sizes?.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 rounded-xl border font-bold text-sm transition-all flex items-center justify-center
                        ${selectedSize === size
                          ? 'border-primary-600 bg-primary-600 text-white scale-[1.02] shadow-md'
                          : 'border-gray-200 bg-white text-gray-900 hover:border-primary-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white'
                        }`}
                    >
                      US {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 mb-10">
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="flex-1 bg-primary-600 text-white h-16 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-primary-700 transition shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isAddingToCart ? (
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  ) : (
                    <>
                      <ShoppingCart size={24} /> Add to Cart
                    </>
                  )}
                </button>
                <button 
                  onClick={handleToggleWishlist}
                  className={`h-16 w-16 rounded-2xl flex items-center justify-center transition-all shadow-lg active:scale-95 border
                    ${isInWishlist 
                      ? 'bg-red-50 border-red-200 text-red-500 dark:bg-red-950/30 dark:border-red-900' 
                      : 'bg-white border-gray-200 text-gray-500 hover:border-red-200 hover:text-red-500 dark:bg-gray-800 dark:border-gray-700'
                    }`}
                >
                  <Heart size={24} fill={isInWishlist ? "currentColor" : "none"} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-200 dark:border-gray-800 pt-8 mt-auto">
                <div className="flex items-center gap-3">
                  <Truck size={24} className="text-primary-600" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Free Delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <RefreshCcw size={24} className="text-primary-600" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">60 Days Return</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck size={24} className="text-primary-600" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">2 Year Warranty</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {product && (
        <RelatedProducts category={product.category} currentProductId={product.id} />
      )}
    </>
  );
};

export default ProductDetail;
