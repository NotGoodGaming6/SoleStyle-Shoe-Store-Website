import React from 'react';
import { Link } from 'react-router-dom';

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 rounded-3xl border border-dashed border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900/50">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-4xl mb-6">
        🛍️
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No items found</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Start adding some items to your cart to see them here.</p>
      <Link to="/products" className="rounded-2xl bg-primary-600 px-10 py-4 font-bold text-white shadow-xl shadow-primary-500/25 transition-all hover:bg-primary-700 hover:shadow-primary-500/40">
        Explore Products
      </Link>
    </div>
  );
};

export default EmptyCart;

