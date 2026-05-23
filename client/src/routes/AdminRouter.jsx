import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '@pages/Admin/AdminLayout';
import AdminDashboard from '@pages/Admin/AdminDashboard';
import AdminProducts from '@pages/Admin/AdminProducts';
import AdminOrders from '@pages/Admin/AdminOrders';
import AdminUsers from '@pages/Admin/AdminUsers';
import AdminSettings from '@pages/Admin/AdminSettings';
import { Loader2 } from 'lucide-react';

const AdminRouter = () => {
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAdmin(false);
        return;
      }

      try {
        const res = await fetch(import.meta.env.VITE_API_BASE_URL + '/api/solestyle/profile/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setIsAdmin(data.role === 'admin');
      } catch (error) {
        setIsAdmin(false);
      }
    };
    checkAdminStatus();
  }, []);

  if (isAdmin === null) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-950">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary-500" />
          <p className="mt-4 text-sm font-bold uppercase tracking-widest text-gray-400">Verifying Admin Access...</p>
        </div>
      </div>
    );
  }

  if (isAdmin === false) {
    const token = localStorage.getItem('token');
    return <Navigate to={token ? "/" : "/auth"} replace />;
  }

  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default AdminRouter;

