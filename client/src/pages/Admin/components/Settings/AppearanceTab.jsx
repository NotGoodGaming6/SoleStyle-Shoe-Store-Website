import { motion } from 'framer-motion';
import { Save, Loader2, Globe } from 'lucide-react';

const AppearanceTab = ({ appearance, setAppearance, saving, onSave }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="rounded-[2.5rem] border border-gray-200 bg-white p-10 dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-500 dark:bg-purple-500/10">
            <Globe size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Promo Banner</h2>
            <p className="mt-1 text-sm text-gray-500">Customize the promotional banner shown at the top of your store.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between rounded-2xl bg-gray-50 p-5 dark:bg-gray-800/50">
            <div>
              <p className="font-bold text-gray-900 dark:text-white">Show Promo Banner</p>
              <p className="text-sm text-gray-500">Toggle the promotional bar visibility on the storefront.</p>
            </div>
            <button
              onClick={() => setAppearance({ ...appearance, promoBarEnabled: !appearance.promoBarEnabled })}
              className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ${
                appearance.promoBarEnabled ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-700'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-200 mt-1 ${
                  appearance.promoBarEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">Banner Message</label>
            <textarea
              value={appearance.promoBarText}
              onChange={(e) => setAppearance({ ...appearance, promoBarText: e.target.value })}
              rows={3}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:border-primary-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white resize-none custom-scrollbar"
            />
          </div>

          {appearance.promoBarEnabled && (
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">Preview</p>
              <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="bg-gradient-to-r from-primary-600 to-primary-500 py-2 text-center text-sm font-medium text-white">
                  {appearance.promoBarText}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-2xl bg-primary-600 px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-primary-700 disabled:opacity-50"
        >
          {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          Save Appearance
        </button>
      </div>
    </motion.div>
  );
};

export default AppearanceTab;

