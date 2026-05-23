import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '@components/shared/ProductCard';

const NewArrivalsSection = ({ newArrivals }) => {
  return (
    <section className="bg-white py-20 dark:bg-gray-950 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              Just Dropped
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">New Arrivals</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Fresh styles just landed — be the first to rock them</p>
          </motion.div>
          <Link to="/products?filter=new" className="inline-flex items-center gap-2 font-medium text-primary-600 transition-colors hover:text-primary-700">
            Shop New Arrivals
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {newArrivals.map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivalsSection;

