import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2 } from 'lucide-react';
import { getProductImageUrl } from '@utils/imageUtils';

const ProductRow = ({ product, onEdit, onDelete, settings }) => {
  const getFormattedPrice = (price) => {
    if (!settings) return `$${price}`;
    
    const { currency, exchangeRates } = settings;
    const rate = exchangeRates[currency] || 1;
    const convertedPrice = (price * rate).toFixed(2);

    const symbols = {
      'USD': '$',
      'EUR': '€',
      'GBP': '£',
      'AZN': '₼',
      'TRY': '₺'
    };

    return `${symbols[currency] || ''}${convertedPrice}`;
  };

  return (
    <motion.tr 
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      key={product.id} 
      className="group transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
    >
      <td className="px-8 py-6">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-xl bg-gray-100 dark:bg-gray-800 overflow-hidden">
            <img 
              src={getProductImageUrl(product.image, product.category, product.id)}
              onError={(e) => { e.target.src = '/placeholder.svg' }}
              alt="" 
              className="h-full w-full object-cover transition-transform group-hover:scale-110" 
            />
          </div>
          <div className="ml-4">
            <p className="font-bold text-gray-900 dark:text-white">{product.name}</p>
            <p className="text-xs text-gray-500">#{product.id}</p>
          </div>
        </div>
      </td>
      <td className="px-8 py-6 text-sm text-gray-600 dark:text-gray-400 font-medium">
        {product.category}
      </td>
      <td className="px-8 py-6 text-sm font-bold text-gray-900 dark:text-white">
        {getFormattedPrice(product.price)}
      </td>
      <td className="px-8 py-6">
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
          (product.stock || 0) > 10 ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-500' :
          (product.stock || 0) > 0 ? 'bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-500' :
          'bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-500'
        }`}>
          {product.stock || 0} in stock
        </span>
      </td>
      <td className="px-8 py-6 text-right">
        <div className="flex items-center justify-end gap-2">
          <button 
            onClick={() => onEdit(product)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-500 hover:bg-primary-600 hover:text-white dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-primary-600 transition-all"
          >
            <Edit2 size={16} />
          </button>
          <button 
            onClick={() => onDelete(product.id)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white dark:bg-red-500/10 dark:hover:bg-red-500 transition-all"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </motion.tr>
  );
};

export default ProductRow;
