import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Search, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import OrderRow from '@pages/Admin/components/Orders/OrderRow';
import ConfirmModal from '@components/shared/ConfirmModal';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [settings, setSettings] = useState(null);
  const [confirmConfig, setConfirmConfig] = useState({ isOpen: false, orderId: null });

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const [ordersRes, settingsRes] = await Promise.all([
        fetch(import.meta.env.VITE_API_BASE_URL + '/api/solestyle/admin/orders', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(import.meta.env.VITE_API_BASE_URL + '/api/solestyle/settings')
      ]);
      
      const ordersData = await ordersRes.json();
      const settingsData = await settingsRes.json();

      if (Array.isArray(ordersData)) {
        setOrders(ordersData);
      } else {
        setOrders([]);
      }
      
      setSettings(settingsData.storeSettings);
      setLoading(false);
    } catch (error) {
      setOrders([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/solestyle/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        setOrders(orders.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
        toast.success(`Order is now ${newStatus}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (orderId) => {
    setConfirmConfig({ isOpen: true, orderId });
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/solestyle/admin/orders/${confirmConfig.orderId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setOrders(orders.filter(o => o._id !== confirmConfig.orderId));
        setConfirmConfig({ isOpen: false, orderId: null });
        toast.success('Order removed');
      }
    } catch (error) {
      toast.error('Failed to remove order');
    }
  };

  const filteredOrders = orders.filter(order => 
    order.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">
            Order Management
          </h1>
          <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
            Fulfill orders and manage customer transactions.
          </p>
        </div>
      </div>

      <div className="rounded-[2.5rem] border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 overflow-hidden">
        <div className="border-b border-gray-100 p-6 dark:border-gray-800">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by customer name or Order ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-sm focus:border-primary-500 focus:bg-white/10 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:bg-gray-700"
            />
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 text-xs font-bold uppercase tracking-wider text-gray-500 dark:bg-gray-800/50 dark:text-gray-400">
                  <th className="px-8 py-5">Order Info</th>
                  <th className="px-8 py-5">Customer</th>
                  <th className="px-8 py-5">Amount</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                <AnimatePresence>
                  {filteredOrders.map((order) => (
                    <OrderRow 
                      key={order._id}
                      order={order}
                      settings={settings}
                      isExpanded={expandedOrder === order._id}
                      onToggle={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                      onStatusUpdate={handleStatusUpdate}
                      onDelete={handleDelete}
                    />
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          )}
        </div>
      </div>

      <ConfirmModal 
        isOpen={confirmConfig.isOpen}
        onClose={() => setConfirmConfig({ isOpen: false, orderId: null })}
        onConfirm={confirmDelete}
        title="Delete Order?"
        message="This will permanently remove the order from history. This action cannot be undone."
        confirmText="Yes, Delete"
      />
    </div>
  );
};

export default AdminOrders;
