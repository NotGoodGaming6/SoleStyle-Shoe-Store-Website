import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_API_BASE_URL + '/api/solestyle/categories');
        const data = await res.json();
        setCategories(data);
      } catch (error) {}
    };
    fetchCategories();
  }, []);

  const fallbackCategories = [
    { name: 'Running', count: 48, img: '/images/running.webp', desc: 'Performance shoes built for speed and endurance' },
    { name: 'Sneakers', count: 86, img: '/images/sneakers.webp', desc: 'Classic and contemporary streetwear styles' },
    { name: 'Basketball', count: 32, img: '/images/basketball.webp', desc: 'Court-ready shoes with superior ankle support' },
    { name: 'Casual', count: 64, img: '/images/casual.webp', desc: 'Everyday comfort meets effortless style' },
    { name: 'Boots', count: 28, img: '/images/boots.webp', desc: 'Rugged style for any terrain' },
    { name: 'Sandals', count: 24, img: '/images/sandals.webp', desc: 'Breathable comfort for warmer days' },
  ];

  const displayCategories = categories.length > 0
    ? categories.map(cat => ({
        name: cat.name,
        count: cat.count || 0,
        img: fallbackCategories.find(f => f.name.toLowerCase() === cat.name.toLowerCase())?.img || '/images/running.webp',
        desc: fallbackCategories.find(f => f.name.toLowerCase() === cat.name.toLowerCase())?.desc || 'Browse our collection',
      }))
    : fallbackCategories;

  return (
    <>
      <section className="relative overflow-hidden bg-gray-950 py-12 lg:py-16">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-primary-950/30"></div>
          <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-primary-500/5 blur-[80px]"></div>
        </div>
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <nav className="mb-4 text-sm">
            <ol className="flex items-center gap-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li className="text-gray-500">/</li>
              <li className="font-medium text-white">Categories</li>
            </ol>
          </nav>
          <div className="text-center">
            <h1 className="font-display text-4xl font-bold text-white lg:text-5xl drop-shadow-md">Explore Collections</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-200 font-medium drop-shadow-md">Find the perfect pair for every occasion, terrain, and style.</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 dark:bg-gray-950 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayCategories.map((cat, idx) => (
              <Link
                key={idx}
                to={`/products?category=${cat.name}`}
                className="group relative overflow-hidden rounded-2xl"
              >
                <div className="aspect-[4/3]">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { e.target.src = "/images/sneakers.webp" }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-70 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 transition-transform">
                  <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">{cat.count} products</span>
                  <h3 className="mt-3 font-display text-2xl font-bold text-white">{cat.name}</h3>
                  <p className="mt-1 text-sm text-gray-300">{cat.desc}</p>
                  <div className="mt-4 inline-flex items-center gap-2 font-medium text-white">
                    Shop Now
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Categories;

