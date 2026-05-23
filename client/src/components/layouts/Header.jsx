import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useAdminSettings } from '@hooks/useAdminSettings';
import { getProductImageUrl } from '@utils/imageUtils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const { storeSettings, appearance } = useAdminSettings();
  const cartQuantity = useSelector(state => state.cart.totalQuantity);
  const wishlistItems = useSelector(state => state.wishlist.items);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }
    
    setIsSearching(true);
    const debounceTimer = setTimeout(async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/solestyle/products/search/suggestions?q=${searchQuery}`);
        const data = await res.json();
        setSuggestions(data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) setIsScrolled(true);
      else setIsScrolled(false);
    };
    window.addEventListener('scroll', handleScroll);
    
    const storedTheme = localStorage.getItem('theme');
    const isDark = storedTheme === 'dark' || (!storedTheme && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (isMobileMenuOpen || searchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen, searchOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  const toggleTheme = () => {
    if (theme === 'light') {
      document.documentElement.classList.add('dark');
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      setTheme('light');
      localStorage.setItem('theme', 'light');
    }
  };

  const navLinks = [
    { name: 'Shop', path: '/products' },
    { name: 'Categories', path: '/categories' },
    { name: 'New Arrivals', path: '/products?filter=new' },
    { name: 'Sale', path: '/products?filter=sale' },
    { name: 'About', path: '/about' },
  ];

  return (
    <>
      {appearance.promoBarEnabled && (
        <div className="bg-gradient-to-r from-primary-600 to-primary-500 py-2 px-4 text-center text-sm font-medium text-white w-full">
          {appearance.promoBarText}
        </div>
      )}
      <header 
        className={`sticky top-0 z-40 glass-header transition-all w-full ${isScrolled ? "scrolled" : ""}`}
        data-header
      >
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-20">
            <button 
              type="button" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden" 
              aria-expanded={isMobileMenuOpen} 
              aria-label="Toggle menu"
            >
              {!isMobileMenuOpen ? (
                <svg className="menu-icon h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              ) : (
                <svg className="close-icon h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              )}
            </button>

            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-600">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <span className="font-display text-xl font-bold text-gray-900 dark:text-white">{storeSettings.storeName}</span>
            </Link>

            <nav className="hidden items-center gap-8 lg:flex">
              {navLinks.map(link => (
                <NavLink 
                  key={link.name} 
                  to={link.path} 
                  className={({isActive}) => {
                    const isLinkActive = isActive && (link.path.includes('?') ? location.search === link.path.split('?')[1] || location.search === `?${link.path.split('?')[1]}` : location.search === '');
                    return `text-sm font-medium transition-colors hover:text-primary-600 ${isLinkActive ? 'text-primary-600' : 'text-gray-700 dark:text-gray-300'}`;
                  }}
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button 
                type="button" 
                onClick={() => setSearchOpen(true)}
                className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800" 
                aria-label="Search"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>

              <div className="hidden sm:flex items-center gap-4 border-l border-gray-200 dark:border-gray-800 ml-2 pl-4">
                {(() => {
                  const token = localStorage.getItem('token');
                  if (!token) {
                    return (
                      <Link to="/auth" className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 shadow-sm">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                        </svg>
                        Sign In
                      </Link>
                    );
                  }

                  let isAdmin = false;
                  try {
                    const decoded = JSON.parse(atob(token.split('.')[1]));
                    if (decoded.role === 'admin' || decoded.role === 'principal_admin') isAdmin = true;
                  } catch (e) {
                  }

                  return (
                    <>
                      {isAdmin && (
                        <Link to="/admin" className="flex items-center gap-2 rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700 shadow-sm shadow-primary-500/25">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                          </svg>
                          Admin Panel
                        </Link>
                      )}
                      <Link to="/profile" className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 shadow-sm">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        Profile
                      </Link>
                    </>
                  );
                })()}
              </div>

              <Link to="/wishlist" className="relative hidden rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 sm:block" aria-label="Wishlist">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
                {wishlistItems.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              <Link to="/cart" className="relative rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800" aria-label="Cart">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
                {cartQuantity > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
                    {cartQuantity}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              id="mobile-menu" 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950 lg:hidden block overflow-hidden"
            >
              <nav className="mx-auto max-w-7xl px-4 py-4">
                {navLinks.map(link => (
                  <NavLink 
                    key={link.name} 
                    to={link.path} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({isActive}) => {
                      const isLinkActive = isActive && (link.path.includes('?') ? location.search === link.path.split('?')[1] || location.search === `?${link.path.split('?')[1]}` : location.search === '');
                      return `block rounded-lg px-4 py-3 text-base font-medium transition-colors ${isLinkActive ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20' : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-900'}`;
                    }}
                  >
                    {link.name}
                  </NavLink>
                ))}
                <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-800">
                  {(() => {
                    const token = localStorage.getItem('token');
                    if (!token) {
                      return (
                        <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)} className="block rounded-lg px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-900">
                          Sign In
                        </Link>
                      );
                    }

                    let isAdmin = false;
                    try {
                      const decoded = JSON.parse(atob(token.split('.')[1]));
                      if (decoded.role === 'admin' || decoded.role === 'principal_admin') isAdmin = true;
                    } catch (e) {}

                    return (
                      <>
                        {isAdmin && (
                          <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="block rounded-lg px-4 py-3 text-base font-medium text-primary-600 hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-primary-900/20">
                            Admin Panel
                          </Link>
                        )}
                        <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="block rounded-lg px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-900">
                          Profile
                        </Link>
                      </>
                    );
                  })()}
                  <Link to="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="block rounded-lg px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-900">
                    Wishlist
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
        
        {searchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-20 backdrop-blur-sm" onClick={() => setSearchOpen(false)}>
            <div className="mx-4 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900" onClick={e => e.stopPropagation()}>
              <div className="relative">
                {isSearching ? (
                  <svg className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 animate-spin text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                )}
                <input 
                  type="text" 
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={e => {
                    if(e.key === 'Enter') {
                       navigate(`/products?q=${e.target.value}`);
                       setSearchOpen(false);
                       setSearchQuery('');
                    }
                  }}
                  placeholder="Search shoes, brands, categories..." 
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white" 
                />
              </div>

              <AnimatePresence>
                {searchQuery && suggestions.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 flex flex-col gap-2 rounded-xl border border-gray-100 bg-white p-2 shadow-lg dark:border-gray-800 dark:bg-gray-950"
                  >
                    {suggestions.map((item) => (
                      <Link 
                        key={item.id} 
                        to={`/products/${item.id}`} 
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900/50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800">
                            <img 
                              src={getProductImageUrl(item.image, item.category, item.id)}
                              onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder.svg' }}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900 dark:text-white">{item.name}</p>
                            <p className="text-xs text-gray-500">{item.category}</p>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">${item.price}</span>
                      </Link>
                    ))}
                    <Link 
                      to={`/products?q=${searchQuery}`}
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery('');
                      }}
                       className="mt-2 block w-full rounded-lg bg-gray-50 py-2.5 text-center text-sm font-bold text-primary-600 transition-colors hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800"
                    >
                      View all results
                    </Link>
                  </motion.div>
                )}
                
                {searchQuery && suggestions.length === 0 && !isSearching && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 p-4 text-center text-sm text-gray-500"
                  >
                    No products found for "{searchQuery}"
                  </motion.div>
                )}
              </AnimatePresence>

              {!searchQuery && (
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-sm text-gray-500">Popular:</span>
                  <Link to="/products?q=running" onClick={() => setSearchOpen(false)} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300">Running</Link>
                  <Link to="/products?q=sneakers" onClick={() => setSearchOpen(false)} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300">Sneakers</Link>
                  <Link to="/products?q=boots" onClick={() => setSearchOpen(false)} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300">Boots</Link>
                </div>
              )}
              
              <div className="mt-4 text-center text-sm text-gray-500">
                Press <kbd className="rounded bg-gray-100 px-2 py-1 font-mono dark:bg-gray-800">Esc</kbd> to close
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;

