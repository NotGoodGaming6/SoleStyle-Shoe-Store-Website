import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { removeFromWishlistAndSync } from '@redux/wishlistSlice';
import { getProductImageUrl } from '@utils/imageUtils';
import QuickViewModal from '@components/shared/QuickViewModal';

const WishlistPage = () => {
  const wishlistItems = useSelector(state => state.wishlist.items);
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 flex items-end justify-between">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">My Wishlist</h1>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              {wishlistItems.length === 0 
                ? "Your wishlist is empty. Start adding some favorites!" 
                : `You have ${wishlistItems.length} items saved.`}
            </p>
          </div>
          {wishlistItems.length > 0 && (
            <Link 
              to="/products" 
              className="hidden text-sm font-bold text-primary-600 hover:text-primary-500 sm:block"
            >
              Continue Shopping &rarr;
            </Link>
          )}
        </header>

        <AnimatePresence mode="popLayout">
          {wishlistItems.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900 text-6xl mb-8">
                ❤️
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Nothing saved yet</h2>
              <p className="mt-2 text-gray-500 max-w-xs">Items saved to your wishlist will appear here for easy access later.</p>
              <Link 
                to="/products"
                className="mt-8 rounded-2xl bg-primary-600 px-8 py-3 text-sm font-bold text-white shadow-xl shadow-primary-500/25 transition-all hover:bg-primary-700 hover:shadow-primary-500/40"
              >
                Explore Collection
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {wishlistItems.map((product) => (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group relative flex flex-col rounded-3xl border border-gray-100 bg-white p-4 transition-all hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900"
                >
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
                    <img
                      src={getProductImageUrl(product.image, product.category, product.id)}
                      onError={(e) => { e.target.src = '/placeholder.svg' }}
                      alt={product.name}
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                    />
                    <button
                      onClick={() => dispatch(removeFromWishlistAndSync(product))}
                      className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-red-500 backdrop-blur-md transition-all hover:bg-white hover:scale-110 shadow-lg"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 13H5v-2h14v2z" />
                      </svg>
                    </button>
                  </div>

                  <div className="mt-6 flex flex-1 flex-col">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          <Link to={`/products/${product.id}`}>{product.name}</Link>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 uppercase tracking-widest">{product.category}</p>
                      </div>
                      <p className="text-xl font-black text-gray-900 dark:text-white">${product.price}</p>
                    </div>

                    <div className="mt-auto pt-6 space-y-3">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="w-full rounded-2xl bg-primary-600 py-3 text-sm font-bold text-white shadow-lg shadow-primary-500/20 transition-all hover:bg-primary-700 hover:shadow-primary-500/40"
                      >
                        Quick View
                      </button>
                      <Link
                        to={`/products/${product.id}`}
                        className="block w-full rounded-2xl border border-gray-200 py-3 text-center text-sm font-bold text-gray-700 transition-all hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
      
      {selectedProduct && (
        <QuickViewModal 
          product={selectedProduct} 
          isOpen={!!selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
};

export default WishlistPage;

