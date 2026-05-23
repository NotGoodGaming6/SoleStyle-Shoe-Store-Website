import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ShieldAlert, Trash2, User } from 'lucide-react';

const UserRow = ({ user, onRoleChange, onDelete, isSuperAdmin, currentUserId }) => {
  const isAdmin = user.role === 'admin';

  return (
    <motion.tr 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
    >
      <td className="px-8 py-5">
        <div className="flex items-center gap-4">
          <div className={`flex h-10 w-10 items-center justify-center rounded-full ${isAdmin ? 'bg-primary-100 text-primary-600 dark:bg-primary-500/20 dark:text-primary-400' : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'}`}>
            {isAdmin ? <Shield size={18} /> : <User size={18} />}
          </div>
          <div>
            <div className="font-bold text-gray-900 dark:text-white">{user.name}</div>
            <div className="text-xs text-gray-500">{user.email}</div>
          </div>
        </div>
      </td>
      <td className="px-8 py-5">
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest ${isAdmin ? 'bg-primary-100 text-primary-700 dark:bg-primary-500/20 dark:text-primary-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'}`}>
          {user.role}
        </span>
      </td>
      <td className="px-8 py-5 text-sm text-gray-500">
        {new Date(user.createdAt).toLocaleDateString()}
      </td>
      <td className="px-8 py-5 text-right">
        <div className="flex items-center justify-end gap-2">
          {isSuperAdmin && !isAdmin && (
            <button
              onClick={() => onRoleChange(user._id, 'admin')}
              className="flex items-center justify-center rounded-lg p-2 transition-colors text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10"
              title="Promote to Admin"
            >
              <Shield size={18} />
            </button>
          )}
          {isSuperAdmin && isAdmin && user._id !== currentUserId && (
            <button
              onClick={() => onRoleChange(user._id, 'user')}
              className="flex items-center justify-center rounded-lg p-2 transition-colors text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10"
              title="Demote to User"
            >
              <ShieldAlert size={18} />
            </button>
          )}
          {user._id !== currentUserId && user.email !== 'admin@solestyle.com' && user.role !== 'principal_admin' && (
            <button
              onClick={() => onDelete(user._id)}
              className="flex items-center justify-center rounded-lg p-2 text-red-500 hover:bg-red-50 transition-colors dark:hover:bg-red-500/10"
              title="Delete User"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </td>
    </motion.tr>
  );
};

export default UserRow;

