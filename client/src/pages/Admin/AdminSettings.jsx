import { useState, useEffect } from 'react';
import { Store, Lock, Bell, Palette, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';
import StoreTab from '@pages/Admin/components/Settings/StoreTab';
import SecurityTab from '@pages/Admin/components/Settings/SecurityTab';
import NotificationsTab from '@pages/Admin/components/Settings/NotificationsTab';
import AppearanceTab from '@pages/Admin/components/Settings/AppearanceTab';

const tabs = [
  { id: 'store', label: 'Store', icon: Store },
  { id: 'security', label: 'Security', icon: Lock },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'appearance', label: 'Appearance', icon: Palette },
];

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('store');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [storeSettings, setStoreSettings] = useState({
    storeName: 'SoleStyle',
    storeEmail: 'support@solestyle.com',
    storePhone: '+1 (555) 123-4567',
    currency: 'USD',
    exchangeRates: {
      USD: 1,
      AZN: 1.70,
      EUR: 0.86,
      TRY: 45.50,
      GBP: 0.74
    },
    freeShippingThreshold: 75,
    taxRate: 8.5,
  });

  const [notifications, setNotifications] = useState({
    newOrder: true,
    lowStock: true,
    newUser: false,
    orderStatusChange: true,
    dailySummary: false,
    weeklySummary: true,
  });

  const [appearance, setAppearance] = useState({
    promoBarText: 'Free shipping on orders over $75 | Use code SOLESTYLE20 for 20% off your first order',
    promoBarEnabled: true,
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_API_BASE_URL + '/api/solestyle/settings');
        if (res.ok) {
          const data = await res.json();
          if (data.storeSettings) setStoreSettings(data.storeSettings);
          if (data.notifications) setNotifications(data.notifications);
          if (data.appearance) setAppearance(data.appearance);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const showToast = (icon, title) => {
    Swal.fire({
      icon, title, toast: true, position: 'top-end',
      showConfirmButton: false, timer: 3000,
      background: '#111827', color: '#fff',
    });
  };

  const saveToStorage = async (key, value, message) => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(import.meta.env.VITE_API_BASE_URL + '/api/solestyle/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ [key]: value })
      });

      if (res.ok) {
        window.dispatchEvent(new Event('adminSettingsUpdated'));
        showToast('success', message);
      } else {
        const data = await res.json();
        showToast('error', data.message || 'Failed to save settings');
      }
    } catch (error) {
      showToast('error', 'Connection failed');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (passwordData, onSuccess) => {
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      return showToast('error', 'Please fill all password fields');
    }
    if (passwordData.newPassword.length < 8) {
      return showToast('error', 'Password must be at least 8 characters');
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return showToast('error', 'Passwords do not match');
    }

    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(import.meta.env.VITE_API_BASE_URL + '/api/solestyle/profile/update-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        showToast('success', 'Password updated successfully');
        onSuccess();
      } else {
        showToast('error', data.message || 'Failed to update password');
      }
    } catch {
      showToast('error', 'Server error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">Settings</h1>
        <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">Configure your store, security, and preferences.</p>
      </div>

      <div className="flex gap-2 overflow-x-auto rounded-2xl border border-gray-200 bg-gray-50 p-1.5 dark:border-gray-800 dark:bg-gray-900 custom-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex items-center gap-2 whitespace-nowrap rounded-xl px-5 py-3 text-sm font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-800 dark:text-white'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'store' && (
        <StoreTab
          storeSettings={storeSettings}
          setStoreSettings={setStoreSettings}
          saving={saving}
          onSave={() => saveToStorage('storeSettings', storeSettings, 'Store settings saved')}
        />
      )}

      {activeTab === 'security' && (
        <SecurityTab saving={saving} onPasswordChange={handlePasswordChange} />
      )}

      {activeTab === 'notifications' && (
        <NotificationsTab
          notifications={notifications}
          setNotifications={setNotifications}
          saving={saving}
          onSave={() => saveToStorage('notifications', notifications, 'Notification preferences saved')}
        />
      )}

      {activeTab === 'appearance' && (
        <AppearanceTab
          appearance={appearance}
          setAppearance={setAppearance}
          saving={saving}
          onSave={() => saveToStorage('appearance', appearance, 'Appearance settings saved')}
        />
      )}
    </div>
  );
};

export default AdminSettings;

