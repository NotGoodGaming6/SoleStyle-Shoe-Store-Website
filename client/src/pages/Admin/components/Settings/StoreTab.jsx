import { motion } from 'framer-motion';
import { Save, Loader2 } from 'lucide-react';

const currencyLabels = {
  USD: 'US Dollar ($)',
  EUR: 'Euro (€)',
  GBP: 'British Pound (£)',
  AZN: 'Azerbaijani Manat (₼)',
  TRY: 'Turkish Lira (₺)'
};

const StoreTab = ({ storeSettings, setStoreSettings, saving, onSave }) => {
  const exchangeRates = storeSettings.exchangeRates || {};

  const handleRateChange = (currency, value) => {
    setStoreSettings({
      ...storeSettings,
      exchangeRates: {
        ...exchangeRates,
        [currency]: Number(value) || 0
      }
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="rounded-[2.5rem] border border-gray-200 bg-white p-10 dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Store Information</h2>
          <p className="mt-1 text-sm text-gray-500">Basic details about your business.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">Store Name</label>
            <input
              type="text"
              value={storeSettings.storeName}
              onChange={(e) => setStoreSettings({ ...storeSettings, storeName: e.target.value })}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:border-primary-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">Contact Email</label>
            <input
              type="email"
              value={storeSettings.storeEmail}
              onChange={(e) => setStoreSettings({ ...storeSettings, storeEmail: e.target.value })}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:border-primary-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">Phone Number</label>
            <input
              type="text"
              value={storeSettings.storePhone}
              onChange={(e) => setStoreSettings({ ...storeSettings, storePhone: e.target.value })}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:border-primary-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">Currency</label>
            <select
              value={storeSettings.currency}
              onChange={(e) => setStoreSettings({ ...storeSettings, currency: e.target.value })}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:border-primary-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="AZN">AZN (₼)</option>
              <option value="TRY">TRY (₺)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="rounded-[2.5rem] border border-gray-200 bg-white p-10 dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Exchange Rates</h2>
          <p className="mt-1 text-sm text-gray-500">Set conversion rates relative to 1 USD.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Object.keys(currencyLabels).map((code) => (
            <div key={code}>
              <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">
                {currencyLabels[code]}
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                  1 USD =
                </span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={exchangeRates[code] ?? (code === 'USD' ? 1 : '')}
                  onChange={(e) => handleRateChange(code, e.target.value)}
                  disabled={code === 'USD'}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-20 pr-4 text-sm text-gray-900 focus:border-primary-500 focus:outline-none disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[2.5rem] border border-gray-200 bg-white p-10 dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Pricing & Shipping</h2>
          <p className="mt-1 text-sm text-gray-500">Configure tax and shipping thresholds.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">Free Shipping Threshold ($)</label>
            <input
              type="number"
              value={storeSettings.freeShippingThreshold}
              onChange={(e) => setStoreSettings({ ...storeSettings, freeShippingThreshold: Number(e.target.value) })}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:border-primary-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">Tax Rate (%)</label>
            <input
              type="number"
              step="0.1"
              value={storeSettings.taxRate}
              onChange={(e) => setStoreSettings({ ...storeSettings, taxRate: Number(e.target.value) })}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:border-primary-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-2xl bg-primary-600 px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-primary-700 disabled:opacity-50"
        >
          {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          Save Changes
        </button>
      </div>
    </motion.div>
  );
};

export default StoreTab;
