import React from 'react';

const ProfileSidebar = ({ activeTab, setActiveTab, onSignOut }) => {
  const tabs = [
    { id: 'profile', label: 'General', icon: '👤' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'orders', label: 'My Orders', icon: '📦' },
  ];

  return (
    <aside className="lg:col-span-1">
      <nav className="space-y-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex w-full items-center rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
              activeTab === tab.id 
              ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20' 
              : 'text-gray-400 hover:bg-gray-900 hover:text-white'
            }`}
          >
            <span className="mr-3 text-lg">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
        <button 
          onClick={onSignOut}
          className="flex w-full items-center rounded-xl px-4 py-3 text-sm font-semibold text-red-400 transition-all hover:bg-red-500/10 hover:text-red-300 mt-8"
        >
          <span className="mr-3 text-lg">🚪</span>
          Sign Out
        </button>
      </nav>
    </aside>
  );
};

export default ProfileSidebar;

