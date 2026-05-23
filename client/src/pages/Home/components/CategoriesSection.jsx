import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);

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
  }, []);

  const categoryMetadata = [
    { id: 'running', title: 'Running', desc: 'Performance shoes built for speed and endurance', img: '/images/running.webp', wide: true },
    { id: 'sneakers', title: 'Sneakers', desc: 'Classic and contemporary streetwear styles', img: '/images/sneakers.webp' },
    { id: 'basketball', title: 'Basketball', desc: 'Court-ready shoes with superior ankle support', img: '/images/basketball.webp' },
    { id: 'casual', title: 'Casual', desc: 'Everyday comfort meets effortless style', img: '/images/casual.webp' },
    { id: 'boots', title: 'Boots', desc: 'Rugged style for any terrain', img: '/images/boots.webp' },
    { id: 'sandals', title: 'Sandals', desc: 'Breathable comfort for warmer days', img: '/images/sandals.webp' }
  ];

  const displayCategories = categoryMetadata.map(meta => {
    const realCat = categories.find(c => c.name.toLowerCase() === meta.id.toLowerCase());
    return {
      ...meta,
      count: realCat ? realCat.count : 0
    };
  });

  return (
    <section id="categories" className="bg-white py-20 dark:bg-gray-950 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-between gap-4 sm:flex-row"
        >
          <div className="text-center sm:text-left">
            <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Shop by Category</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Find the perfect pair for every occasion</p>
          </div>
          <Link to="/categories" className="inline-flex items-center gap-2 font-medium text-primary-600 transition-colors hover:text-primary-700">
            View All
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.1 }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {displayCategories.map(cat => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Link to={`/products?category=${cat.id}`} className="category-card group relative block h-full w-full overflow-hidden rounded-2xl">
                <div className="aspect-[4/3]">
                  <img src={cat.img} alt={cat.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-70 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 transition-transform">
                  <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">{cat.count} products</span>
                  <h3 className="mt-3 font-display text-2xl font-bold text-white">{cat.title}</h3>
                  <p className="mt-1 text-sm text-gray-300">{cat.desc}</p>
                  <div className="mt-4 inline-flex items-center gap-2 font-medium text-white">
                    Shop Now
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesSection;

