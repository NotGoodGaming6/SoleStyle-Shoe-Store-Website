import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { 
  ChevronDown, 
  Clock, 
  Settings, 
  Truck, 
  CheckCircle2, 
  XCircle 
} from 'lucide-react';

export const STATUS_CONFIG = {
  Pending: { color: 'text-orange-500', bg: 'bg-orange-500/10', icon: Clock, label: 'Pending' },
  Processing: { color: 'text-blue-500', bg: 'bg-blue-500/10', icon: Settings, label: 'Processing' },
  Shipped: { color: 'text-purple-500', bg: 'bg-purple-500/10', icon: Truck, label: 'Shipped' },
  Delivered: { color: 'text-emerald-500', bg: 'bg-emerald-500/10', icon: CheckCircle2, label: 'Delivered' },
  Cancelled: { color: 'text-red-500', bg: 'bg-red-500/10', icon: XCircle, label: 'Cancelled' },
};

const StatusPicker = ({ currentStatus, onStatusChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const containerRef = useRef(null);
  const menuRef = useRef(null);
  
  const config = STATUS_CONFIG[currentStatus] || STATUS_CONFIG.Pending;
  const Icon = config.icon;

  const updateCoords = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      updateCoords();
      window.addEventListener('scroll', updateCoords);
      window.addEventListener('resize', updateCoords);
    }
    return () => {
      window.removeEventListener('scroll', updateCoords);
      window.removeEventListener('resize', updateCoords);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (containerRef.current && containerRef.current.contains(event.target)) ||
        (menuRef.current && menuRef.current.contains(event.target))
      ) {
        return;
      }
      setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 ${config.bg} ${config.color}`}
      >
        <Icon size={14} className={currentStatus === 'Processing' ? 'animate-spin-slow' : ''} />
        {config.label}
        <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && createPortal(
        <AnimatePresence>
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="fixed z-[9999] mt-2 w-48 overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 p-2 shadow-2xl"
            style={{ 
              top: coords.top,
              left: coords.left,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4)'
            }}
          >
            {Object.entries(STATUS_CONFIG).map(([status, item]) => {
              const ItemIcon = item.icon;
              return (
                <button
                  key={status}
                  onClick={() => {
                    onStatusChange(status);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-bold transition-colors hover:bg-gray-800 ${currentStatus === status ? item.color : 'text-gray-400 hover:text-white'}`}
                >
                  <ItemIcon size={16} />
                  {item.label}
                </button>
              );
            })}
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export default StatusPicker;

