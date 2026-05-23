import React from 'react';
import { motion } from 'framer-motion';

const SecurityTab = ({ passwordData, setPasswordData, showPassword, setShowPassword, handlePasswordUpdate }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <h2 className="text-2xl font-bold text-white">Security Settings</h2>
      <p className="mt-1 text-sm text-gray-400">Ensure your account is using a long, random password to stay secure.</p>
      
      <form onSubmit={handlePasswordUpdate} className="mt-8 space-y-6">
        <div className="space-y-6 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-400">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                className="mt-2 block w-full rounded-2xl border border-gray-800 bg-gray-800/50 px-4 py-3 pr-12 text-white transition-all focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 mt-1 -translate-y-1/2 text-gray-500 hover:text-primary-500 transition-colors"
              >
                {showPassword ? (
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.2" />
                    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400">New Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                className="mt-2 block w-full rounded-2xl border border-gray-800 bg-gray-800/50 px-4 py-3 pr-12 text-white transition-all focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 mt-1 -translate-y-1/2 text-gray-500 hover:text-primary-500 transition-colors"
              >
                {showPassword ? (
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.2" />
                    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400">Confirm New Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                className="mt-2 block w-full rounded-2xl border border-gray-800 bg-gray-800/50 px-4 py-3 pr-12 text-white transition-all focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="rounded-2xl bg-primary-600 px-8 py-3 text-sm font-bold text-white shadow-xl shadow-primary-500/20 transition-all hover:bg-primary-700 hover:shadow-primary-500/40"
          >
            Update Password
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default SecurityTab;

