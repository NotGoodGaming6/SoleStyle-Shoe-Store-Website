import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '@pages/Admin/components/AdminSidebar';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <AdminSidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <main 
        className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-[280px]' : 'ml-[80px]'}`}
      >
        <div className="p-8 lg:p-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;

