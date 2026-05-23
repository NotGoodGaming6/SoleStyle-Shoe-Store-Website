import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import OrderCard from './OrderCard';

const OrdersTab = ({ orders, loading, expandedOrder, setExpandedOrder, navigate }) => {
  if (loading) {
    return (
      <div className="flex py-20 justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-800 text-4xl text-gray-400">
          <ShoppingBag size={32} />
        </div>
        <h3 className="mt-6 text-xl font-bold text-white">No orders yet</h3>
        <p className="mt-2 text-gray-400">When you shop, your order history will appear here.</p>
        <button 
          onClick={() => navigate('/products')}
          className="mt-8 rounded-2xl border border-primary-500/30 bg-primary-500/10 px-8 py-3 text-sm font-bold text-primary-400 transition-all hover:bg-primary-500/20"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <h2 className="text-2xl font-bold text-white mb-6">Order History</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard 
            key={order._id}
            order={order}
            isExpanded={expandedOrder === order._id}
            onToggle={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default OrdersTab;


