import { motion } from 'framer-motion';

const RevenueChart = ({ salesHistory = [] }) => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push({
      label: d.toLocaleDateString('en-US', { weekday: 'short' }),
      key: `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`,
    });
  }

  const mapped = days.map((day) => {
    const match = salesHistory.find(s => s._id === day.key);
    return {
      label: day.label,
      total: match ? match.total : 0,
      count: match ? match.count : 0
    };
  });

  const maxValue = Math.max(...mapped.map(d => d.total), 1);

  return (
    <div className="rounded-[2.5rem] border border-gray-200 bg-white p-10 dark:border-gray-800 dark:bg-gray-900 overflow-hidden relative">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Revenue Performance</h2>
          <p className="text-gray-500">Sales activity for the last 7 days</p>
        </div>
        <div className="flex gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-600 text-xs font-bold dark:bg-emerald-500/10 dark:text-emerald-500 border border-emerald-500/20">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live System
          </span>
        </div>
      </div>
      
      <div className="relative h-64 w-full flex items-end gap-2 px-2">
        {mapped.map((day, i) => {
          const heightPercent = maxValue > 0 ? (day.total / maxValue) * 100 : 0;
          const minHeight = day.total > 0 ? Math.max(heightPercent, 15) : 6;

          return (
            <div key={i} className="flex-1 flex flex-col items-center group">
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: `${minHeight}%` }}
                transition={{ delay: i * 0.1, duration: 1, ease: "easeOut" }}
                className={`w-full max-w-[60px] rounded-t-2xl relative transition-all cursor-pointer border-x border-t ${
                  day.total > 0 
                    ? `bg-gradient-to-t from-primary-600 to-primary-400 border-primary-500 shadow-[0_-10px_30px_-5px_rgba(66,114,255,0.3)]` 
                    : 'bg-gray-200/30 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/20'
                }`}
              >
                {day.total > 0 && (
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-black px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100 whitespace-nowrap z-10 shadow-2xl border border-gray-700">
                    ${day.total.toLocaleString()}
                  </div>
                )}
              </motion.div>
              <span className="mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">{day.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RevenueChart;

