import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, Loader2, Shield } from 'lucide-react';

const SecurityTab = ({ saving, onPasswordChange }) => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoadingUser(false);
        return;
      }
      try {
        const res = await fetch(import.meta.env.VITE_API_BASE_URL + '/api/solestyle/profile/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setCurrentUser(data);
        }
      } catch (error) {
        console.error('Error fetching current user details:', error);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchCurrentUser();
  }, []);

  const displayEmail = loadingUser ? 'Loading...' : (currentUser ? currentUser.email : 'admin@solestyle.com');
  let displayRole = loadingUser ? 'Loading...' : 'Administrator';
  if (!loadingUser && currentUser) {
    if (currentUser.email === 'admin@solestyle.com' || currentUser.role === 'principal_admin') {
      displayRole = 'Principal Administrator';
    } else if (currentUser.role === 'admin') {
      displayRole = 'Administrator';
    } else {
      displayRole = currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1);
    }
  }

  const handleSubmit = () => {
    onPasswordChange(passwordData, () => {
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="rounded-[2.5rem] border border-gray-200 bg-white p-10 dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500 dark:bg-red-500/10">
            <Shield size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Change Admin Password</h2>
            <p className="mt-1 text-sm text-gray-500">Keep your admin account secure with a strong password.</p>
          </div>
        </div>

        <div className="max-w-lg space-y-5">
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">Current Password</label>
            <div className="relative">
              <input
                type={showPasswords ? 'text' : 'password'}
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                placeholder="Enter current password"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-12 text-sm text-gray-900 focus:border-primary-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowPasswords(!showPasswords)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPasswords ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">New Password</label>
            <input
              type={showPasswords ? 'text' : 'password'}
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              placeholder="Enter new password (min 8 characters)"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:border-primary-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">Confirm New Password</label>
            <input
              type={showPasswords ? 'text' : 'password'}
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              placeholder="Re-enter new password"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:border-primary-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center gap-2 rounded-2xl bg-red-600 px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Lock size={18} />}
            Update Password
          </button>
        </div>
      </div>

      <div className="rounded-[2.5rem] border border-gray-200 bg-white p-10 dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Session Information</h2>
          <p className="mt-1 text-sm text-gray-500">Details about your current active session.</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-gray-50 p-5 dark:bg-gray-800/50">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Signed in as</p>
            <p className="mt-1 font-bold text-gray-900 dark:text-white">{displayEmail}</p>
          </div>
          <div className="rounded-2xl bg-gray-50 p-5 dark:bg-gray-800/50">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Role</p>
            <p className="mt-1 font-bold text-primary-600">{displayRole}</p>
          </div>
          <div className="rounded-2xl bg-gray-50 p-5 dark:bg-gray-800/50">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Token Expiry</p>
            <p className="mt-1 font-bold text-gray-900 dark:text-white">30 days from login</p>
          </div>
          <div className="rounded-2xl bg-gray-50 p-5 dark:bg-gray-800/50">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Security Level</p>
            <div className="mt-1 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-emerald-600">Protected</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SecurityTab;

