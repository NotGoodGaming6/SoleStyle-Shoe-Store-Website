import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { clearWishlist } from '@redux/wishlistSlice';
import { useNavigate } from 'react-router-dom';
import ProfileSidebar from '@pages/Profile/components/ProfileSidebar';
import GeneralTab from '@pages/Profile/components/GeneralTab';
import SecurityTab from '@pages/Profile/components/SecurityTab';
import OrdersTab from '@pages/Profile/components/OrdersTab';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [profileData, setProfileData] = useState({ name: '', email: '', phone: '' });
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState(null);

  const showToast = (icon, title) => {
    if (icon === 'success') {
      toast.success(title);
    } else {
      toast.error(title);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/auth');
        return;
      }

      try {
        const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/api/solestyle/profile/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (response.ok) {
          setUser(data);
          setProfileData({ name: data.name, email: data.email, phone: data.phone || '' });
        } else {
          localStorage.removeItem('token');
          navigate('/auth');
        }
      } catch (error) {
        showToast('error', 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  useEffect(() => {
    if (activeTab === 'orders') {
      const fetchOrders = async () => {
        setOrdersLoading(true);
        const token = localStorage.getItem('token');
        try {
          const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/api/solestyle/orders/myorders', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await response.json();
          if (response.ok) {
            setOrders(data);
          }
        } catch (error) {
          console.error('Fetch orders failed');
        } finally {
          setOrdersLoading(false);
        }
      };
      fetchOrders();
    }
  }, [activeTab]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/api/solestyle/profile/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        showToast('success', 'Profile updated successfully');
      } else {
        showToast('error', data.message);
      }
    } catch (error) {
      showToast('error', 'Update failed');
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToast('error', 'Passwords do not match');
      return;
    }
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/api/solestyle/profile/update-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });
      const data = await response.json();
      if (response.ok) {
        showToast('success', 'Password updated');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        showToast('error', data.message);
      }
    } catch (error) {
      showToast('error', 'Update failed');
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    dispatch(clearWishlist());
    navigate('/auth');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Account Settings</h1>
          <p className="mt-4 text-lg text-gray-400">Manage your profile and account preferences.</p>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <ProfileSidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            onSignOut={handleSignOut} 
          />

          <main className="lg:col-span-3">
            <div className="rounded-3xl border border-gray-800 bg-gray-900/50 p-8 py-10 backdrop-blur-xl sm:p-12">
              {activeTab === 'profile' && (
                <GeneralTab 
                  profileData={profileData} 
                  setProfileData={setProfileData} 
                  handleProfileUpdate={handleProfileUpdate} 
                />
              )}

              {activeTab === 'security' && (
                <SecurityTab 
                  passwordData={passwordData} 
                  setPasswordData={setPasswordData} 
                  showPassword={showPassword} 
                  setShowPassword={setShowPassword} 
                  handlePasswordUpdate={handlePasswordUpdate} 
                />
              )}

              {activeTab === 'orders' && (
                <OrdersTab 
                  orders={orders} 
                  loading={ordersLoading} 
                  expandedOrder={expandedOrder} 
                  setExpandedOrder={setExpandedOrder} 
                  navigate={navigate} 
                />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

