import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettings } from '../../../context/SettingsContext';
import { formatCurrency } from '../../../utils/currencyUtils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const categoryImages = [
  '/images/sneakers.webp',
  '/images/running.webp',
  '/images/basketball.webp',
  '/images/casual.webp',
  '/images/boots.webp',
  '/images/sandals.webp'
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { settings } = useSettings();

  const threshold = settings?.freeShippingThreshold || 50;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % categoryImages.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-gray-950">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-primary-950"></div>
        <div className="absolute -right-40 top-20 h-[600px] w-[600px] rounded-full bg-primary-500/10 blur-[100px]"></div>
        <div className="absolute -left-20 bottom-20 h-[400px] w-[400px] rounded-full bg-primary-600/10 blur-[80px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative mx-auto flex w-full min-h-[90vh] max-w-7xl items-center px-4 py-20 lg:px-8"
      >
        <div className="grid w-full items-center gap-12 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <motion.span variants={itemVariants} className="inline-flex items-center gap-2 rounded-full bg-primary-500/10 px-4 py-1.5 text-sm font-medium text-primary-400">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              New Collection 2032
            </motion.span>
            
            <motion.h1 variants={itemVariants} className="mt-6 font-display text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Step Into
              <span className="block bg-gradient-to-r from-primary-400 to-primary-500 bg-clip-text text-transparent">
                Your Best
              </span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="mx-auto mt-6 max-w-xl text-lg text-gray-400 lg:mx-0 lg:text-xl">
              Premium footwear for every step of your journey. From athletic performance to everyday comfort.
            </motion.p>
            
            <motion.div variants={itemVariants} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <Link to="/products" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-600 px-8 py-4 font-semibold text-white shadow-lg shadow-primary-500/25 transition-all hover:bg-primary-500 hover:shadow-xl hover:shadow-primary-500/30 sm:w-auto">
                Shop Now
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </Link>
              <Link to="/categories" className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-white/20 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10 sm:w-auto">
                Browse Categories
              </Link>
            </motion.div>
            
            <motion.div variants={itemVariants} className="mt-16 flex flex-wrap items-center justify-center gap-4 border-t border-white/10 pt-8 sm:gap-8 lg:justify-start">
              <div>
                <div className="font-display text-3xl font-bold text-white">50K+</div>
                <div className="text-sm text-gray-500">Happy Customers</div>
              </div>
              <div className="hidden h-12 w-px bg-white/10 sm:block"></div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-display text-3xl font-bold text-white">4.9</span>
                  <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                </div>
                <div className="text-sm text-gray-500">Average Rating</div>
              </div>
              <div className="hidden h-12 w-px bg-white/10 sm:block"></div>
              <div>
                <div className="font-display text-3xl font-bold text-white">300+</div>
                <div className="text-sm text-gray-500">Styles Available</div>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative z-10 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentIndex}
                  initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    rotate: -10, 
                    scale: 1
                  }}
                  exit={{ opacity: 0, rotate: -10, scale: 0.9 }}
                  transition={{ 
                    opacity: { duration: 0.4 },
                    rotate: { duration: 0.6, ease: "easeOut" }
                  }}
                  src={categoryImages[currentIndex]} 
                  alt="Featured product" 
                  fetchPriority={currentIndex === 0 ? "high" : "auto"}
                  loading="eager"
                  decoding="async"
                  className="w-full max-w-[500px] drop-shadow-[0_20px_20px_rgba(0,0,0,0.4)]" 
                />
              </AnimatePresence>
            </div>
            
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute -left-4 top-1/4 z-20 rounded-xl bg-white/10 p-4 backdrop-blur-md lg:-left-8"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20">
                  <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Free Shipping</p>
                  <p className="text-xs text-gray-400">Orders over {formatCurrency(threshold, settings)}</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute -right-4 bottom-1/4 z-20 rounded-xl bg-white/10 p-4 backdrop-blur-md lg:-right-8"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500/20">
                  <svg className="h-5 w-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Easy Returns</p>
                  <p className="text-xs text-gray-400">60-day guarantee</p>
                </div>
              </div>
            </motion.div>
            
            <div className="absolute right-8 top-8 z-20">
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex h-20 w-20 flex-col items-center justify-center rounded-full bg-primary-500 shadow-lg shadow-primary-500/50"
              >
                <span className="text-xs font-bold text-white">UP TO</span>
                <span className="font-display text-2xl font-bold text-white">40%</span>
                <span className="text-xs font-bold text-white">OFF</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <a href="#categories" className="group flex flex-col items-center gap-2 transition-all active:scale-90">
          <span className="text-xs font-medium uppercase tracking-wider text-gray-500 transition-colors group-hover:text-white">Explore</span>
          <motion.svg 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-5 w-5 text-gray-500 transition-colors group-hover:text-white" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </motion.svg>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;

