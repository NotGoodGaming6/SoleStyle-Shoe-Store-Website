import { AlertCircle } from 'lucide-react';
import { formatCurrency } from '@utils/currencyUtils';

const RecentOrders = ({ orders, settings }) => {
  return (
    <div className="lg:col-span-2 rounded-[2.5rem] border border-gray-200 bg-white p-10 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Orders</h2>
        <button className="text-sm font-bold text-primary-600 hover:text-primary-700">View All</button>
      </div>
      <div className="space-y-4">
        {orders?.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-500/10 flex items-center justify-center text-primary-600 font-bold">
                  {order.customer[0]}
                </div>
                <div className="ml-4">
                  <p className="font-bold text-gray-900 dark:text-white">{order.customer}</p>
                  <p className="text-xs text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-sm font-black text-gray-900 dark:text-white">
                  {formatCurrency(order.amount, settings)}
                </span>
                <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${
                  order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-600' : 
                  order.status === 'Pending' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="py-10 text-center">
            <AlertCircle className="mx-auto h-10 w-10 text-gray-400 mb-4" />
            <p className="text-gray-500">No recent orders found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentOrders;

