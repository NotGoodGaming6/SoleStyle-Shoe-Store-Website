import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Confirm", cancelText = "Cancel", type = "danger" }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] border border-gray-800 bg-gray-900/90 p-8 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex flex-col items-center text-center">
            <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-full ${
              type === 'danger' ? 'bg-red-500/10 text-red-500' : 'bg-primary-500/10 text-primary-500'
            }`}>
              <AlertCircle size={32} />
            </div>
            
            <h3 className="mb-2 text-2xl font-black text-white">{title}</h3>
            <p className="mb-8 text-gray-400">{message}</p>

            <div className="flex w-full gap-3">
              <button
                onClick={onClose}
                className="flex-1 rounded-2xl border border-gray-800 bg-transparent px-6 py-4 font-bold text-white transition-all hover:bg-gray-800"
              >
                {cancelText}
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className={`flex-1 rounded-2xl px-6 py-4 font-bold text-white shadow-lg transition-all ${
                  type === 'danger' 
                    ? 'bg-red-600 shadow-red-600/20 hover:bg-red-700' 
                    : 'bg-primary-600 shadow-primary-600/20 hover:bg-primary-700'
                }`}
              >
                {confirmText}
              </button>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="absolute right-6 top-6 text-gray-500 transition-colors hover:text-white"
          >
            <X size={20} />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ConfirmModal;
