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
    promoBarText: 'Free shipping on orders over $75 | Use code SOLESTYLE20 for 20% off your first order',
    promoBarEnabled: true,
  }
};

const getInitialSettings = () => {
  try {
    const cached = localStorage.getItem('solestyle_settings');
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (e) {
    console.error('Failed to parse cached settings from localStorage', e);
  }
  return defaultSettings;
};

export const useAdminSettings = () => {
  const [settings, setSettings] = useState(getInitialSettings);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_API_BASE_URL + '/api/solestyle/settings');
        if (res.ok) {
          const data = await res.json();
          setSettings(prev => {
            const updated = {
              ...prev,
              storeSettings: { ...prev.storeSettings, ...data.storeSettings },
              appearance: { ...prev.appearance, ...data.appearance },
              notifications: { ...prev.notifications, ...data.notifications }
            };
            try {
              localStorage.setItem('solestyle_settings', JSON.stringify(updated));
            } catch (err) {
              console.error('Failed to save settings to localStorage', err);
            }
            return updated;
          });
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

