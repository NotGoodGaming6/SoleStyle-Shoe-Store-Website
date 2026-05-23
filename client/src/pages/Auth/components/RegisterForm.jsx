import { motion } from 'framer-motion';

const RegisterForm = ({ registerStep, formData, errors, handleChange, handleResendOTP, timer, canResend, loading, showPassword, setShowPassword }) => {
  return (
    <>
      {registerStep === 1 && (
        <motion.div
          key="reg-step-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="block w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-[#111827] transition-all hover:bg-gray-100 focus:border-primary-500 focus:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-primary-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700 dark:focus:ring-primary-500/5"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label htmlFor="reg-email" className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">Email address</label>
            <input
              id="reg-email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="block w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-[#111827] transition-all hover:bg-gray-100 focus:border-primary-500 focus:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-primary-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700 dark:focus:ring-primary-500/5"
              placeholder="email@example.com"
            />
          </div>
        </motion.div>
      )}

      {registerStep === 2 && (
        <motion.div
          key="reg-step-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="otp" className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">6-Digit Verification Code</label>
            <input
              id="otp"
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
          <div className="mt-4 flex flex-col items-center justify-center space-y-2">
            {timer > 0 ? (
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Resend code in <span className="font-bold text-primary-600">{timer}s</span>
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={!canResend || loading}
                className="text-sm font-bold text-primary-600 transition-colors hover:text-primary-700 disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Resend Code'}
              </button>
            )}
          </div>
        </motion.div>
      )}

      {registerStep === 3 && (
        <motion.div
          key="reg-step-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="reg-password" className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">Create Password</label>
            <div className="relative">
              <input
                id="reg-password"
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
            <label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">Confirm Password</label>
            <input
              id="confirmPassword"
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

export default RegisterForm;
