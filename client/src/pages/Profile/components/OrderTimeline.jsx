import React from 'react';
import { Check } from 'lucide-react';

const ORDER_STATUSES = ['Pending', 'Processing', 'Shipped', 'Delivered'];

const OrderTimeline = ({ currentStatus }) => {
  if (currentStatus === 'Cancelled') {
    return (
      <div className="mb-8 rounded-2xl bg-red-500/10 p-4 border border-red-500/20 text-center">
        <p className="text-red-400 font-bold">This order has been cancelled.</p>
      </div>
    );
  }

  const currentIndex = ORDER_STATUSES.indexOf(currentStatus);
  const progressPercentage = Math.max(0, (currentIndex / (ORDER_STATUSES.length - 1)) * 100);

  return (
    <div className="mb-8">
      <h4 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-6">Order Status</h4>
      <div className="relative px-6">
        <div className="absolute left-[36px] right-[36px] top-[11px] h-1 rounded-full bg-gray-800" />
        <div className="absolute left-[36px] right-[36px] top-[11px] h-1 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary-500 transition-all duration-500" 
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="relative flex justify-between">
          {ORDER_STATUSES.map((status, idx) => {
            const isCompleted = idx <= currentIndex;
            const isCurrent = idx === currentIndex;
            
            return (
              <div key={status} className="flex flex-col items-center">
                <div 
                  className={`flex h-6 w-6 items-center justify-center rounded-full transition-all duration-500 z-10 ${
                    isCompleted 
                      ? 'bg-primary-500 text-white shadow-[0_0_15px_rgba(var(--color-primary-500),0.5)]' 
                      : 'bg-gray-900 border-2 border-gray-700 text-gray-500'
                  }`}
                >
                  {isCompleted ? (
                    <Check size={12} strokeWidth={3} />
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-gray-700" />
                  )}
                </div>
                <span 
                  className={`mt-3 text-[10px] sm:text-xs font-bold uppercase tracking-wider ${
                    isCurrent 
                      ? 'text-primary-400' 
                      : isCompleted 
                        ? 'text-white' 
                        : 'text-gray-600'
                  }`}
                >
                  {status}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderTimeline;

