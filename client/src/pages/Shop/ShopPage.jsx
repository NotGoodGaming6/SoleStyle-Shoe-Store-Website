import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '@components/shared/ProductCard';
import { ProductSkeleton } from '@components/shared/Skeleton';
import SEO from '@components/shared/SEO';

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  const filter = searchParams.get('filter');
  const category = searchParams.get('category');
  const query = searchParams.get('q');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const sort = searchParams.get('sort') || 'featured';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_API_BASE_URL + '/api/solestyle/categories');
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();

    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        let url = new URL(import.meta.env.VITE_API_BASE_URL + '/api/solestyle/products');
        if (filter) url.searchParams.append('filter', filter);
        if (category) url.searchParams.append('category', category);
        if (query) url.searchParams.append('q', query);
        if (minPrice) url.searchParams.append('minPrice', minPrice);
        if (maxPrice) url.searchParams.append('maxPrice', maxPrice);
        if (sort) url.searchParams.append('sort', sort);

        const res = await fetch(url);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => setIsLoading(false), 500);
      }
    };
    fetchProducts();
  }, [filter, category, query, minPrice, maxPrice, sort]);

  const handlePriceChange = (min, max) => {
    const newParams = new URLSearchParams(searchParams);
    const currentMin = newParams.get('minPrice');
    const currentMax = newParams.get('maxPrice');
    
    if (currentMin === String(min) && (currentMax === String(max) || (!currentMax && !max))) {
      newParams.delete('minPrice');
      newParams.delete('maxPrice');
    } else {
      newParams.set('minPrice', min);
      if (max) newParams.set('maxPrice', max);
      else newParams.delete('maxPrice');
    }
    setSearchParams(newParams);
  };

  const handleSortChange = (e) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort', e.target.value);
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    setSearchParams({});
  };

  const hasActiveFilters = category || filter || query || minPrice || maxPrice || (sort !== 'featured');

  const totalCount = categories.reduce((sum, cat) => sum + (cat.count || 0), 0);

  return (
    <>
      <SEO 
        title={category || filter || query || 'All Products'} 
        description={`Browse our premium collection of ${category || 'footwear'}. Find the best performance shoes at SoleStyle.`} 
      />
      <section className="relative overflow-hidden bg-gray-950 pt-20 pb-12 lg:pt-28 lg:pb-16">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-primary-950/30"></div>
          <div className="absolute -right-20 top-0 h-64 w-64 rounded-full bg-primary-500/5 blur-[80px]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <nav className="mb-4 text-sm">
            <ol className="flex items-center gap-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li className="text-gray-600">/</li>
              <li className="font-medium text-white">Shop All</li>
            </ol>
          </nav>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-display text-4xl font-extrabold capitalize text-white lg:text-5xl"
              >
                {category || filter || query ? `${category || filter || query} Products` : 'Shop All'}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-4 text-lg text-gray-400 font-medium"
              >
                Discover our curated collection of premium performance footwear.
              </motion.p>
            </div>
            {hasActiveFilters && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearAllFilters}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                Clear All Filters
              </motion.button>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 dark:bg-gray-950 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row">

            <aside className="w-full shrink-0 lg:w-64">
              <div className="sticky top-24 space-y-8">
                <div>
                  <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Categories</h3>
                  <ul className="space-y-1">
                    <li>
                      <Link 
                        to="/products" 
                        className={`group flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${!category ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white'}`}
                      >
                        <span>All Products</span>
                        <span className={`text-[10px] ${!category ? 'text-primary-200' : 'text-gray-400 dark:text-gray-500'}`}>{totalCount}</span>
                      </Link>
                    </li>
                    {['running', 'sneakers', 'basketball', 'casual', 'boots', 'sandals'].map(cat => {
                      const realCat = categories.find(c => c.name.toLowerCase() === cat.toLowerCase());
                      const count = realCat ? realCat.count : 0;
                      const isActive = category === cat;
                      return (
                        <li key={cat}>
                          <Link 
                            to={`/products?category=${cat}`} 
                            className={`group flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${isActive ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white'}`}
                          >
                            <span className="capitalize">{cat}</span>
                            <span className={`text-[10px] ${isActive ? 'text-primary-200' : 'text-gray-400 dark:text-gray-500'}`}>{count}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div>
                  <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Quick Filters</h3>
                  <div className="flex flex-col gap-2">
                    <Link 
                      to="/products?filter=new" 
                      className={`flex items-center gap-3 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all ${filter === 'new' ? 'border-primary-600 bg-primary-600/10 text-primary-600 shadow-sm' : 'border-gray-200 bg-transparent text-gray-700 hover:border-gray-300 dark:border-gray-800 dark:text-gray-300 dark:hover:border-gray-700'}`}
                    >
                      <span className={`block h-2 w-2 rounded-full ${filter === 'new' ? 'bg-primary-600' : 'bg-green-500'}`}></span>
                      New Arrivals
                    </Link>
                    <Link 
                      to="/products?filter=sale" 
                      className={`flex items-center gap-3 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all ${filter === 'sale' ? 'border-primary-600 bg-primary-600/10 text-primary-600 shadow-sm' : 'border-gray-200 bg-transparent text-gray-700 hover:border-gray-300 dark:border-gray-800 dark:text-gray-300 dark:hover:border-gray-700'}`}
                    >
                      <span className={`block h-2 w-2 rounded-full ${filter === 'sale' ? 'bg-primary-600' : 'bg-primary-500'}`}></span>
                      On Sale
                    </Link>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Price Range</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { label: 'Under $100', min: 0, max: 100 },
                      { label: '$100 - $150', min: 100, max: 150 },
                      { label: '$150 - $200', min: 150, max: 200 },
                      { label: '$200+', min: 200, max: '' }
                    ].map((range, i) => {
                      const isActive = minPrice === String(range.min) && (maxPrice === String(range.max) || (!maxPrice && !range.max));
                      return (
                        <button
                          key={i}
                          onClick={() => handlePriceChange(range.min, range.max)}
                          className={`flex items-center justify-between rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all ${isActive ? 'border-primary-600 bg-primary-600/10 text-primary-600' : 'border-gray-200 bg-transparent text-gray-600 hover:border-gray-300 dark:border-gray-800 dark:text-gray-400 dark:hover:border-gray-700'}`}
                        >
                          <span>{range.label}</span>
                          {isActive && (
                            <svg className="h-4 w-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                            </svg>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </aside>

            <div className="flex-1">
              <div className="mb-8 flex flex-wrap items-center justify-between gap-4 py-4">
                <p className="text-gray-500 dark:text-gray-400">
                  <span className="font-bold text-gray-900 dark:text-white">{products.length}</span> results found
                </p>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <select 
                      value={sort}
                      onChange={handleSortChange}
                      className="appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-sm font-semibold focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
                    >
                      <option value="featured">Featured First</option>
                      <option value="newest">Recently Added</option>
                      <option value="price-low">Lowest Price</option>
                      <option value="price-high">Highest Price</option>
                      <option value="rating">Top Rated</option>
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

                  <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div 
                    key="skeleton"
                    variants={gridVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4"
                  >
                    {[...Array(8)].map((_, i) => (
                      <ProductSkeleton key={i} />
                    ))}
                  </motion.div>
                ) : products.length === 0 ? (
                  <motion.div 
                    key="empty"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex flex-col items-center justify-center py-32 text-center"
                  >
                    <div className="relative mb-8">
                      <div className="absolute inset-0 scale-150 bg-primary-500/10 blur-3xl rounded-full"></div>
                      <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl">
                        <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                      </div>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white">No matches found</h3>
                    <p className="mt-3 max-w-xs text-gray-500">We couldn't find any products matching your current filters. Try broadening your search.</p>
                    <button 
                      onClick={clearAllFilters} 
                      className="mt-8 rounded-full bg-primary-600 px-8 py-3 text-sm font-bold text-white transition-all hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-500/25 active:scale-95"
                    >
                      Clear All Filters
                    </button>
                  </motion.div>
                ) : (
                  <motion.div 
                    variants={gridVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4"
                  >
                    <AnimatePresence mode="popLayout">
                      {products.map(product => (
                        <ProductCard key={product.id || product._id} product={product} />
                      ))}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;

