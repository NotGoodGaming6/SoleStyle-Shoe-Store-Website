import { motion } from 'framer-motion';
import { Save, Loader2, Mail } from 'lucide-react';

const notificationItems = [
  { key: 'newOrder', label: 'New Order Received', desc: 'Get notified when a customer places an order.' },
  { key: 'lowStock', label: 'Low Stock Alert', desc: 'Alert when a product drops below 5 units.' },
  { key: 'newUser', label: 'New User Registration', desc: 'Get notified when a new customer signs up.' },
  { key: 'orderStatusChange', label: 'Order Status Changes', desc: 'Updates when an order is shipped or delivered.' },
  { key: 'dailySummary', label: 'Daily Summary', desc: 'Receive a daily recap of sales and activity.' },
  { key: 'weeklySummary', label: 'Weekly Summary', desc: 'Receive a weekly performance report.' },
];

const NotificationsTab = ({ notifications, setNotifications, saving, onSave }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="rounded-[2.5rem] border border-gray-200 bg-white p-10 dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-500 dark:bg-blue-500/10">
            <Mail size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Email Notifications</h2>
            <p className="mt-1 text-sm text-gray-500">Choose which email alerts you'd like to receive.</p>
          </div>
        </div>

        <div className="space-y-1">
          {notificationItems.map((item) => (
            <div 
              key={item.key}
              className="flex items-center justify-between rounded-2xl p-5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <div>
                <p className="font-bold text-gray-900 dark:text-white">{item.label}</p>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
              <button
                onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })}
                className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ${
                  notifications[item.key] ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-200 mt-1 ${
                    notifications[item.key] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-2xl bg-primary-600 px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-primary-700 disabled:opacity-50"
        >
          {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          Save Preferences
        </button>
      </div>
    </motion.div>
  );
};

export default NotificationsTab;

