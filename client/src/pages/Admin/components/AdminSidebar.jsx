import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Settings, 
  LogOut, 
  Menu,
  ChevronRight,
  Package
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearWishlist } from '@redux/wishlistSlice';
import { useAdminSettings } from '@hooks/useAdminSettings';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/admin' },
  { icon: ShoppingBag, label: 'Products', path: '/admin/products' },
  { icon: Package, label: 'Orders', path: '/admin/orders' },
  { icon: Users, label: 'Customers', path: '/admin/users' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { storeSettings } = useAdminSettings();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isOpen ? 280 : 80 }}
      className="fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 shadow-xl transition-colors duration-300"
    >
      <div className="flex h-20 items-center justify-between px-6">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white uppercase truncate"
          >
            {storeSettings.storeName}<span className="text-primary-600">.</span>
          </motion.div>
        )}
        <button
          onClick={toggleSidebar}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-500 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          <Menu size={20} />
        </button>
      </div>

      <nav className="flex-1 space-y-2 px-4 py-6">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end
            className={({ isActive }) => `
              group relative flex h-12 items-center rounded-2xl px-3 transition-all duration-300
              ${isActive 
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25' 
                : 'text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800'}
            `}
          >
            <item.icon size={22} className={`${isOpen ? 'mr-4' : 'mx-auto'}`} />
            {isOpen && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-semibold"
              >
                {item.label}
              </motion.span>
            )}
            {!isOpen && (
              <div className="absolute left-full ml-6 hidden rounded-lg bg-gray-900 px-2 py-1 text-xs text-white group-hover:block whitespace-nowrap">
                {item.label}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100 dark:border-gray-800 space-y-2">
        <NavLink to="/" className="flex w-full h-12 items-center rounded-2xl px-3 text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors">
          <svg className={`h-5 w-5 ${isOpen ? 'mr-4' : 'mx-auto'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          {isOpen && <span className="font-semibold">Back to Store</span>}
        </NavLink>
        <button 
          onClick={() => {
            localStorage.removeItem('token');
            dispatch(clearWishlist());
            navigate('/auth');
          }}
          className="flex w-full h-12 items-center rounded-2xl px-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={22} className={`${isOpen ? 'mr-4' : 'mx-auto'}`} />
          {isOpen && <span className="font-semibold">Sign Out</span>}
        </button>
      </div>
    </motion.aside>
  );
};

export default AdminSidebar;

