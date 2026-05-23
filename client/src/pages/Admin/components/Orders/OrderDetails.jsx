import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Truck, User, Package } from 'lucide-react';
import { formatCurrency } from '@utils/currencyUtils';
import { getProductImageUrl } from '@utils/imageUtils';

const OrderDetails = ({ order, settings }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div>
        <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
          <ShoppingBag size={14} /> Order Items
        </h4>
        <div className="space-y-4">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between group/item">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl bg-white dark:bg-gray-800 overflow-hidden border border-gray-100 dark:border-gray-800 p-1">
                  <img 
                    src={getProductImageUrl(item.image, item.category, item.id)}
                    onError={(e) => { e.target.src = '/placeholder.svg' }}
                    className="h-full w-full object-contain transition-transform group-hover/item:scale-110"
                    alt=""
                  />
                </div>
                <div>
                  <p className="text-sm font-black text-gray-900 dark:text-white">{item.name}</p>
                  <p className="text-[11px] font-bold text-gray-500 uppercase tracking-tighter">Size: {item.size} • Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="text-sm font-black text-gray-900 dark:text-white">
                {formatCurrency(item.totalPrice, settings)}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
          <Truck size={14} /> Shipping Information
        </h4>
        <div className="rounded-[2rem] border border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 p-8 space-y-6 backdrop-blur-sm">
           <div className="flex items-start gap-4">
             <div className="h-10 w-10 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-500 shrink-0">
                <User size={18} />
             </div>
             <div>
               <p className="text-[11px] font-black uppercase tracking-widest text-gray-500 mb-1">Recipient</p>
               <p className="text-sm font-bold text-gray-900 dark:text-white">{order.user?.name || 'Guest User'}</p>
               <p className="text-xs text-gray-500">{order.user?.email}</p>
             </div>
           </div>
           <div className="flex items-start gap-4">
             <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                <Package size={18} />
             </div>
             <div>
               <p className="text-[11px] font-black uppercase tracking-widest text-gray-500 mb-1">Delivery Address</p>
               <p className="text-sm font-bold text-gray-900 dark:text-white leading-relaxed">{order.shippingAddress || 'No address provided'}</p>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
