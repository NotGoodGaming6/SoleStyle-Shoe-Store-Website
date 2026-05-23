import React from 'react';
import { motion } from 'framer-motion';

const GeneralTab = ({ profileData, setProfileData, handleProfileUpdate }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <h2 className="text-2xl font-bold text-white">Profile Information</h2>
      <p className="mt-1 text-sm text-gray-400">Update your account's profile information and email address.</p>
      
      <form onSubmit={handleProfileUpdate} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-400">Full Name</label>
            <input
              type="text"
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              className="mt-2 block w-full rounded-2xl border border-gray-800 bg-gray-800/50 px-4 py-3 text-white transition-all focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400">Email Address</label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              className="mt-2 block w-full rounded-2xl border border-gray-800 bg-gray-800/50 px-4 py-3 text-white transition-all focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-400">Phone Number (Optional)</label>
            <input
              type="text"
              value={profileData.phone}
              placeholder="+994 (__) ___-__-__"
              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
              className="mt-2 block w-full rounded-2xl border border-gray-800 bg-gray-800/50 px-4 py-3 text-white transition-all focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10"
            />
          </div>
        </div>
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="rounded-2xl bg-primary-600 px-8 py-3 text-sm font-bold text-white shadow-xl shadow-primary-500/20 transition-all hover:bg-primary-700 hover:shadow-primary-500/40"
          >
            Save Changes
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default GeneralTab;

