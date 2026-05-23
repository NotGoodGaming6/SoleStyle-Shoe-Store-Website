import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Search, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import UserRow from '@pages/Admin/components/Users/UserRow';
import ConfirmModal from '@components/shared/ConfirmModal';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const [currentUserId, setCurrentUserId] = useState(null);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState({ isOpen: false, type: '', userId: '', role: '', title: '', message: '' });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      let userId = null;
      if (token) {
        try {
          const decoded = JSON.parse(atob(token.split('.')[1]));
          userId = decoded.id;
          setCurrentUserId(userId);
        } catch (e) {
          console.error('Invalid token');
        }
      }

      const res = await fetch(import.meta.env.VITE_API_BASE_URL + '/api/solestyle/admin/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      
      if (Array.isArray(data)) {
        setUsers(data);
        if (userId) {
          const currentUser = data.find(u => u._id === userId);
          if (currentUser && (currentUser.email === 'admin@solestyle.com' || currentUser.role === 'principal_admin')) {
            setIsSuperAdmin(true);
          }
        }
      } else {
        setUsers([]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = (userId, newRole) => {
    const actionText = newRole === 'admin' ? 'Promote to Admin' : 'Demote to User';
    setConfirmConfig({
      isOpen: true,
      type: 'role',
      userId,
      role: newRole,
      title: `${actionText}?`,
      message: newRole === 'admin' ? 'This user will gain full access to the dashboard.' : 'This user will lose dashboard access.'
    });
  };

  const confirmRoleChange = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/solestyle/admin/users/${confirmConfig.userId}/role`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ role: confirmConfig.role })
      });

      if (res.ok) {
        setUsers(users.map(u => u._id === confirmConfig.userId ? { ...u, role: confirmConfig.role } : u));
        setConfirmConfig({ ...confirmConfig, isOpen: false });
        toast.success('User role updated');
      }
    } catch (error) {
      toast.error('Failed to update role');
    }
  };

  const handleDelete = (userId) => {
    setConfirmConfig({
      isOpen: true,
      type: 'delete',
      userId,
      title: 'Delete User Account?',
      message: 'This action cannot be undone. All user data will be permanently removed.'
    });
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/solestyle/admin/users/${confirmConfig.userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setUsers(users.filter(u => u._id !== confirmConfig.userId));
        setConfirmConfig({ ...confirmConfig, isOpen: false });
        toast.success('User deleted');
      }
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">
            User Directory
          </h1>
          <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
            Manage your customer base and administrative access.
          </p>
        </div>
      </div>

      <div className="rounded-[2.5rem] border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 overflow-hidden">
        <div className="border-b border-gray-100 p-6 dark:border-gray-800">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-sm focus:border-primary-500 focus:bg-white/10 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:bg-gray-700"
            />
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 text-xs font-bold uppercase tracking-wider text-gray-500 dark:bg-gray-800/50 dark:text-gray-400">
                  <th className="px-8 py-5">User</th>
                  <th className="px-8 py-5">Role</th>
                  <th className="px-8 py-5">Joined</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                <AnimatePresence>
                  {filteredUsers.map((user) => (
                    <UserRow 
                      key={user._id}
                      user={user}
                      onRoleChange={handleRoleChange}
                      onDelete={handleDelete}
                      isSuperAdmin={isSuperAdmin}
                      currentUserId={currentUserId}
                    />
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          )}
        </div>
      </div>

      <ConfirmModal 
        isOpen={confirmConfig.isOpen}
        onClose={() => setConfirmConfig({ ...confirmConfig, isOpen: false })}
        onConfirm={confirmConfig.type === 'delete' ? confirmDelete : confirmRoleChange}
        title={confirmConfig.title}
        message={confirmConfig.message}
        confirmText={confirmConfig.type === 'delete' ? "Yes, Delete" : "Yes, Update"}
      />
    </div>
  );
};

export default AdminUsers;

