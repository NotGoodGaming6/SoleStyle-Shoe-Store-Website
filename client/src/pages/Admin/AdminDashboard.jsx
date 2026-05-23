import { useState, useEffect } from 'react';
import { Users, ShoppingBag, DollarSign, Clock, Loader2 } from 'lucide-react';
import StatCard from './components/Dashboard/StatCard';
import RevenueChart from './components/Dashboard/RevenueChart';
import RecentOrders from './components/Dashboard/RecentOrders';
import NewArrivals from './components/Dashboard/NewArrivals';
import { formatCurrency } from '@utils/currencyUtils';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [statsRes, settingsRes] = await Promise.all([
          fetch(import.meta.env.VITE_API_BASE_URL + '/api/solestyle/admin/stats', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch(import.meta.env.VITE_API_BASE_URL + '/api/solestyle/settings')
        ]);
        
        if (statsRes.status === 401 || statsRes.status === 403) {
            setLoading(false);
            return;
        }

        const statsData = await statsRes.json();
        const settingsData = await settingsRes.json();
        
        setStats(statsData);
        setSettings(settingsData.storeSettings);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary-600" />
      </div>
    );
  }

  const summary = stats?.summary;

  const statCards = [
    { 
      label: 'Total Revenue', 
      value: formatCurrency(summary?.totalRevenue || 0, settings), 
      change: summary?.revenueChange?.value || '0%', 
      icon: DollarSign, 
      color: 'text-emerald-500', 
      trend: summary?.revenueChange?.trend || 'up' 
    },
    { 
      label: 'Active Customers', 
      value: (summary?.totalUsers || 0).toLocaleString(), 
      change: summary?.usersChange?.value || '0%', 
      icon: Users, 
      color: 'text-blue-500', 
      trend: summary?.usersChange?.trend || 'up' 
    },
    { 
      label: 'Pending Orders', 
      value: (summary?.pendingOrders || 0).toLocaleString(), 
      change: summary?.pendingChange?.value || '0%', 
      icon: Clock, 
      color: 'text-orange-500', 
      trend: summary?.pendingChange?.trend || 'up' 
    },
    { 
      label: 'Inventory Value', 
      value: formatCurrency(summary?.totalInventoryValue || 0, settings), 
      change: `${summary?.totalProducts || 0} items`, 
      icon: ShoppingBag, 
      color: 'text-purple-500', 
      trend: 'up' 
    },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">
          Command Center
        </h1>
        <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
          Everything you need to manage SoleStyle's growth in one place.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <StatCard key={stat.label} stat={stat} index={index} />
        ))}
      </div>

      <RevenueChart salesHistory={stats?.salesHistory} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <RecentOrders orders={stats?.recentOrders} settings={settings} />
        <NewArrivals products={stats?.recentActivity} />
      </div>
    </div>
  );
};

export default AdminDashboard;
