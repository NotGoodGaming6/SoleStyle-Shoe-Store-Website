import { motion } from 'framer-motion';

const LoginForm = ({ formData, errors, handleChange, showPassword, setShowPassword, toggleForgotPassword }) => {
  return (
    <motion.div
      key="login-form"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div>
        <label htmlFor="email-address" className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">Email address</label>
        <input
          id="email-address"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className={`block w-full rounded-2xl border ${errors.email ? 'border-red-500 bg-red-50/50' : 'border-gray-200 bg-gray-50'} px-5 py-4 text-[#111827] transition-all hover:bg-gray-100 focus:border-primary-500 focus:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-primary-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700 dark:focus:ring-primary-500/5`}
          placeholder="email@example.com"
        />
        {errors.email && <p className="mt-1.5 ml-2 text-xs font-semibold text-red-500">{errors.email}</p>}
      </div>
      <div className="space-y-1">
        <label htmlFor="password" className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">Password</label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            value={formData.password}
            onChange={handleChange}
            className={`block w-full rounded-2xl border ${errors.password ? 'border-red-500 bg-red-50/50' : 'border-gray-200 bg-gray-50'} px-5 py-4 pr-14 text-[#111827] transition-all hover:bg-gray-100 focus:border-primary-500 focus:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-primary-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700 dark:focus:ring-primary-500/5`}
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-primary-500 transition-colors"
          >
            {showPassword ? (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.2" />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
              </svg>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            )}
          </button>
        </div>
        {errors.password && <p className="mt-1 ml-1 text-xs font-bold text-red-500 animate-in fade-in slide-in-from-top-1">{errors.password}</p>}
      </div>
      <div className="mt-4 flex items-center justify-between px-1">
        <div className="flex items-center">
          <input id="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 dark:text-gray-400">Remember me</label>
        </div>
        <button 
          type="button"
          onClick={toggleForgotPassword}
          className="text-sm font-bold text-primary-600 hover:text-primary-500"
        >
          Forgot?
        </button>
      </div>
    </motion.div>
  );
};

export default LoginForm;
