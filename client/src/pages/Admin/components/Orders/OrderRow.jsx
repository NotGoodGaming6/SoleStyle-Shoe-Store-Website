import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import StatusPicker from './StatusPicker';
import OrderDetails from './OrderDetails';
import { formatCurrency } from '@utils/currencyUtils';

const OrderRow = ({ order, isExpanded, onToggle, onStatusUpdate, onDelete, settings }) => {
  return (
    <React.Fragment>
      <motion.tr 
        layout
        className="group transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
      >
        <td className="px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500">
              <Package size={20} />
            </div>
            <div>
              <p className="text-sm font-black text-gray-900 dark:text-white uppercase">#{order._id.slice(-8)}</p>
              <p className="text-xs text-gray-500">{new Date(order.orderDate).toLocaleDateString()}</p>
            </div>
          </div>
        </td>
        <td className="px-8 py-6">
          <div className="flex flex-col">
            <p className="text-sm font-bold text-gray-900 dark:text-white">{order.user?.name || 'Guest'}</p>
            <p className="text-xs text-gray-500">{order.user?.email}</p>
          </div>
        </td>
        <td className="px-8 py-6">
          <p className="text-sm font-black text-gray-900 dark:text-white">
            {formatCurrency(order.totalAmount, settings)}
          </p>
        </td>
        <td className="px-8 py-6">
          <StatusPicker 
            currentStatus={order.status} 
            onStatusChange={(newStatus) => onStatusUpdate(order._id, newStatus)} 
          />
        </td>
        <td className="px-8 py-6 text-right">
          <div className="flex items-center justify-end gap-2">
            <button 
              onClick={onToggle}
              className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all ${isExpanded ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25' : 'bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'}`}
            >
              {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            <button 
              onClick={() => onDelete(order._id)}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white dark:bg-red-500/10 dark:hover:bg-red-500 transition-all"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </td>
      </motion.tr>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.tr
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-50/30 dark:bg-gray-800/20"
          >
            <td colSpan="5" className="px-12 py-8">
              <OrderDetails order={order} settings={settings} />
            </td>
          </motion.tr>
        )}
      </AnimatePresence>
    </React.Fragment>
  );
};

export default OrderRow;
