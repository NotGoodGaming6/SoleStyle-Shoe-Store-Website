import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import OrderTimeline from './OrderTimeline';
import { getProductImageUrl } from '@utils/imageUtils';

const OrderCard = ({ order, isExpanded, onToggle }) => {
  const orderId = order._id.slice(-8);
  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const getStatusBadgeStyles = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-500/10 text-green-400';
      case 'Cancelled': return 'bg-red-500/10 text-red-400';
      default: return 'bg-primary-500/10 text-primary-400';
    }
  };

  return (
    <div 
      className={`rounded-3xl border border-gray-800 bg-gray-800/20 transition-all ${
        isExpanded ? 'ring-2 ring-primary-500/50 bg-gray-800/40' : 'hover:bg-gray-800/30'
      }`}
    >
      <div 
        onClick={onToggle}
        className="cursor-pointer p-6"
      >
        <div className="flex flex-wrap justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-primary-400 uppercase tracking-widest">Order ID: #{orderId}</p>
            <p className="text-sm text-gray-400 mt-1">{formattedDate}</p>
          </div>
          <div className="text-right">
            <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${getStatusBadgeStyles(order.status)}`}>
              {order.status}
            </span>
            <p className="text-xl font-black text-white mt-2">${order.totalAmount}</p>
          </div>
        </div>

        {!isExpanded && (
          <div className="mt-4 flex items-center justify-between border-t border-gray-800/50 pt-4">
            <div className="flex -space-x-2 overflow-hidden">
              {order.items.slice(0, 4).map((item, idx) => (
                <img 
                  key={idx}
                  src={getProductImageUrl(item.image, item.category, item.id)}
                  alt={item.name}
                  className="inline-block h-8 w-8 rounded-full border-2 border-gray-900 object-cover bg-gray-800"
                  onError={(e) => { e.target.src = '/placeholder.svg' }}
                />
              ))}
              {order.items.length > 4 && (
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-900 bg-gray-800 text-[10px] font-bold text-gray-400">
                  +{order.items.length - 4}
                </div>
              )}
            </div>
            <span className="text-xs font-bold text-gray-500 flex items-center gap-1 hover:text-primary-400 transition-colors">
              View Details
              <ChevronDown size={14} strokeWidth={3} />
            </span>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-6 pb-8 overflow-hidden"
          >
            <div className="border-t border-gray-800/50 pt-6">
              <OrderTimeline currentStatus={order.status} />

              <h4 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-4">Order Items</h4>
              <div className="space-y-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 rounded-2xl bg-gray-900/50 p-3 hover:bg-gray-800/50 transition-colors">
                    <img 
                      src={getProductImageUrl(item.image, item.category, item.id)}
                      alt={item.name}
                      className="h-16 w-16 rounded-xl object-cover bg-gray-800"
                      onError={(e) => { e.target.src = '/placeholder.svg' }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white truncate">{item.name}</p>
                      <p className="text-xs text-gray-400 mt-1">Size: {item.size} • Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-white">${item.totalPrice}</p>
                      <p className="text-[10px] text-gray-500">${item.price} ea.</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-gray-900/50 p-4 border border-gray-800/50">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Shipping To</h4>
                  <p className="text-sm text-gray-300 leading-relaxed">{order.shippingAddress}</p>
                </div>
                <div className="rounded-2xl bg-gray-900/50 p-4 border border-gray-800/50 flex flex-col justify-between">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Payment Status</h4>
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle size={16} strokeWidth={3} />
                    <p className="text-sm font-bold">Paid via SoleStylePay</p>
                  </div>
                </div>
              </div>

              {order.subtotal !== undefined && (
                <div className="mt-6 border-t border-gray-800/50 pt-4 space-y-2 max-w-xs ml-auto">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Subtotal</span>
                    <span className="font-bold text-gray-300">${order.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Shipping</span>
                    <span className="font-bold text-gray-300">
                      {order.shippingFee === 0 ? 'FREE' : `$${order.shippingFee}`}
                    </span>
                  </div>
                  {order.taxRate > 0 && (
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Estimated Tax ({order.taxRate}%)</span>
                      <span className="font-bold text-gray-300">${order.taxAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-gray-800/30">
                    <span>Total Amount</span>
                    <span>${order.totalAmount}</span>
                  </div>
                </div>
              )}

              <button 
                onClick={onToggle}
                className="mt-6 w-full py-3 text-xs font-bold text-gray-500 hover:text-white transition-colors flex items-center justify-center gap-2 rounded-xl hover:bg-gray-800/30"
              >
                Collapse Details
                <ChevronUp size={14} strokeWidth={3} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrderCard;

