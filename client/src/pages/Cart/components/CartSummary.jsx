import React from 'react';
import { useSettings } from '../../../context/SettingsContext';
import { formatCurrency } from '../../../utils/currencyUtils';

const CartSummary = ({ totalAmount, onCheckout }) => {
  const { settings } = useSettings();

  const threshold = settings?.freeShippingThreshold || 75;
  const taxRate = settings?.taxRate || 0;
  const shippingFee = 10;
  
  const isFreeShipping = totalAmount >= threshold;
  const shipping = isFreeShipping ? 0 : shippingFee;
  const taxAmount = (totalAmount * taxRate) / 100;
  const finalTotal = totalAmount + shipping + taxAmount;

  return (
    <div className="p-8 rounded-3xl border border-gray-100 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-900 sticky top-24">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h3>
      <div className="space-y-4 mb-8">
        <div className="flex justify-between text-sm font-medium">
          <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
          <span className="text-gray-900 dark:text-white">
            {formatCurrency(totalAmount, settings)}
          </span>
        </div>
        <div className="flex justify-between text-sm font-medium">
          <span className="text-gray-500 dark:text-gray-400">Shipping</span>
          <span className={isFreeShipping ? "text-green-500" : "text-gray-900 dark:text-white"}>
            {isFreeShipping ? 'FREE' : formatCurrency(shipping, settings)}
          </span>
        </div>
        {taxRate > 0 && (
          <div className="flex justify-between text-sm font-medium">
            <span className="text-gray-500 dark:text-gray-400">Estimated Tax ({taxRate}%)</span>
            <span className="text-gray-900 dark:text-white">
              {formatCurrency(taxAmount, settings)}
            </span>
          </div>
        )}
        {!isFreeShipping && (
          <p className="text-[10px] text-gray-400 mt-2">
            Add {formatCurrency(threshold - totalAmount, settings)} more for FREE shipping
          </p>
        )}
      </div>
      
      <div className="pt-6 border-t border-gray-100 dark:border-gray-800 mb-8">
        <div className="flex justify-between items-end">
          <span className="text-base font-bold text-gray-900 dark:text-white">Total Amount</span>
          <span className="text-3xl font-black text-gray-900 dark:text-white">
            {formatCurrency(finalTotal, settings)}
          </span>
        </div>
      </div>
      
      <button
        onClick={onCheckout}
        className="w-full rounded-2xl bg-primary-600 py-4 font-bold text-white shadow-xl shadow-primary-500/25 transition-all hover:bg-primary-700 hover:shadow-primary-500/40"
      >
        Proceed to Checkout
      </button>
      
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50">
          <span className="text-xs font-bold text-gray-500 text-center">Free Returns</span>
        </div>
        <div className="flex flex-col items-center p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50">
          <span className="text-xs font-bold text-gray-500 text-center">Secure Payment</span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
