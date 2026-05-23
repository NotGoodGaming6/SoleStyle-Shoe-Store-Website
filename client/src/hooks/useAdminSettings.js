import { useState, useEffect } from 'react';

const defaultSettings = {
  storeSettings: {
    storeName: 'SoleStyle',
    storeEmail: 'support@solestyle.com',
    storePhone: '+1 (555) 123-4567',
    currency: 'USD',
    freeShippingThreshold: 75,
    taxRate: 8.5,
  },
  appearance: {
    promoBarText: 'Free shipping on orders over $75 | Use code SOLE20 for 20% off your first order',
    promoBarEnabled: true,
  }
};

export const useAdminSettings = () => {
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_API_BASE_URL + '/api/solestyle/settings');
        if (res.ok) {
          const data = await res.json();
          setSettings(prev => ({
            ...prev,
            storeSettings: { ...prev.storeSettings, ...data.storeSettings },
            appearance: { ...prev.appearance, ...data.appearance },
            notifications: { ...prev.notifications, ...data.notifications }
          }));
        }
      } catch (e) {
        console.error('Failed to fetch admin settings from backend', e);
      }
    };

    fetchSettings();

    const handleUpdate = () => fetchSettings();
    window.addEventListener('adminSettingsUpdated', handleUpdate);

    return () => {
      window.removeEventListener('adminSettingsUpdated', handleUpdate);
    };
  }, []);

  return settings;
};

