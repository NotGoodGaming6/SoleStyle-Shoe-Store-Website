import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '@components/shared/ProductCard';

const FeaturedSection = ({ featuredProducts }) => {
  return (
    <section className="bg-gray-50 py-20 dark:bg-gray-900 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Featured Collection</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Our most popular styles handpicked for you</p>
          </motion.div>
          <Link to="/products?filter=featured" className="inline-flex items-center gap-2 font-medium text-primary-600 transition-colors hover:text-primary-700">
            View All Featured
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;

