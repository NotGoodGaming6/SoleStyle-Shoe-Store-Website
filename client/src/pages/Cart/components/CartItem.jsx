import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useSettings } from '../../../context/SettingsContext';
import { formatCurrency } from '../../../utils/currencyUtils';
import { getProductImageUrl } from '@utils/imageUtils';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const { settings } = useSettings();

  return (
    <div className="group relative flex flex-col sm:flex-row items-center gap-8 p-6 rounded-3xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-xl dark:border-gray-800 dark:bg-gray-900">
      <div className="h-32 w-32 shrink-0 overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
        <img 
          src={getProductImageUrl(item.image, item.category, item.id)}
          onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder.svg'; }}
          alt={item.name} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
      </div>
      
      <div className="flex-1 flex flex-col sm:flex-row justify-between w-full h-full">
        <div className="space-y-2">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400">{item.category}</span>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.name}</h3>
          </div>
          <p className="text-sm font-medium text-gray-500">Size: <span className="text-gray-900 dark:text-gray-300 font-bold ml-1">{item.size}</span></p>
          
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center rounded-xl bg-gray-100 dark:bg-gray-800 p-1">
              <button 
                onClick={() => onUpdateQuantity(item.id, item.size, -1)}
                className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-400"
              >
                <Minus size={14} />
              </button>
              <span className="w-10 text-center text-sm font-bold text-gray-900 dark:text-white">{item.quantity}</span>
              <button 
                onClick={() => onUpdateQuantity(item.id, item.size, 1)}
                className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-400"
              >
                <Plus size={14} />
              </button>
            </div>
            
            <button
              onClick={() => onRemove(item.id, item.size)}
              className="flex items-center text-xs font-bold text-red-400 hover:text-red-500 transition-colors ml-4"
            >
              <Trash2 size={14} className="mr-1" /> REMOVE
            </button>
          </div>
        </div>
        
        <div className="flex flex-col items-end justify-between mt-4 sm:mt-0">
          <p className="text-2xl font-black text-gray-900 dark:text-white">
            {formatCurrency(item.totalPrice, settings)}
          </p>
          <p className="text-xs text-gray-500 font-medium">
            {formatCurrency(item.price, settings)} each
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
