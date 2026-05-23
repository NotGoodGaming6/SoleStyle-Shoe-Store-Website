import { motion } from 'framer-motion';

const ForgotPasswordForm = ({ forgotPasswordStep, formData, errors, handleChange, showPassword, setShowPassword }) => {
  return (
    <>
      {forgotPasswordStep === 1 && (
        <motion.div
          key="fp-step-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
           <div>
            <label htmlFor="fp-email" className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">Email address</label>
            <input
              id="fp-email"
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
        </motion.div>
      )}

      {forgotPasswordStep === 2 && (
        <motion.div
          key="fp-step-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div>
            <label htmlFor="fp-otp" className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">6-Digit Reset Code</label>
            <input
              id="fp-otp"
              name="otp"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength="6"
              required
              value={formData.otp}
              onChange={handleChange}
              className={`block w-full rounded-2xl border ${errors.otp ? 'border-red-500 bg-red-50/50' : 'border-gray-200 bg-gray-50'} px-5 py-4 text-center text-2xl tracking-[0.5em] text-[#111827] transition-all hover:bg-gray-100 focus:border-primary-500 focus:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-primary-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700 dark:focus:ring-primary-500/5`}
              placeholder="••••••"
            />
            {errors.otp && <p className="mt-2 text-center text-xs font-semibold text-red-500">{errors.otp}</p>}
          </div>
        </motion.div>
      )}

      {forgotPasswordStep === 3 && (
        <motion.div
          key="fp-step-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="fp-password" className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">New Password</label>
            <div className="relative">
              <input
                id="fp-password"
                name="password"
                type={showPassword ? "text" : "password"}
                minLength="8"
                required
                value={formData.password}
                onChange={handleChange}
                className="block w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 pr-14 text-[#111827] transition-all hover:bg-gray-100 focus:border-primary-500 focus:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-primary-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700 dark:focus:ring-primary-500/5"
                placeholder="Min 8 characters"
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
          </div>
          <div>
            <label htmlFor="fp-confirmPassword" className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">Confirm New Password</label>
            <input
              id="fp-confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              minLength="8"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="block w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-[#111827] transition-all hover:bg-gray-100 focus:border-primary-500 focus:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-primary-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700 dark:focus:ring-primary-500/5"
              placeholder="Confirm password"
            />
          </div>
        </motion.div>
      )}
    </>
  );
};

export default ForgotPasswordForm;
