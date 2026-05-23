import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatCard = ({ stat, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-[2rem] border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="flex items-center justify-between">
        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 dark:bg-gray-800 ${stat.color}`}>
          <stat.icon size={28} />
        </div>
        <div className={`flex items-center text-sm font-bold ${stat.trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
          {stat.change}
          {stat.trend === 'up' ? <ArrowUpRight size={16} className="ml-1" /> : <ArrowDownRight size={16} className="ml-1" />}
        </div>
      </div>
      <div className="mt-6">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
        <h3 className="mt-1 text-3xl font-black text-gray-900 dark:text-white">{stat.value}</h3>
      </div>
    </motion.div>
  );
};

export default StatCard;

