import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthHeader from '@pages/Auth/components/AuthHeader';
import LoginForm from '@pages/Auth/components/LoginForm';
import RegisterForm from '@pages/Auth/components/RegisterForm';
import ForgotPasswordForm from '@pages/Auth/components/ForgotPasswordForm';
import AuthFooter from '@pages/Auth/components/AuthFooter';

const AuthFormContainer = ({
  isLogin,
  isForgotPassword,
  forgotPasswordStep,
  toggleForgotPassword,
  registerStep,
  formData,
  errors = {},
  handleChange,
  handleSubmit,
  toggleAuthMode,
  timer,
  canResend,
  handleResendOTP,
  validityTimer,
  loading
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getButtonText = () => {
    if (isForgotPassword) {
      if (forgotPasswordStep === 1) return 'Send Reset Code';
      if (forgotPasswordStep === 2) return 'Verify & Continue';
      return 'Reset Password';
    }
    if (isLogin) return 'Log in';
    if (registerStep === 1) return 'Continue to Verification';
    if (registerStep === 2) return 'Verify Code';
    return 'Create Account';
  };

  return (
    <motion.div 
      layout="position"
      className="flex w-full flex-col justify-center p-8 sm:p-12 lg:w-1/2 lg:p-20"
    >
      <div className="mx-auto w-full max-w-sm">
        <AuthHeader 
          isLogin={isLogin}
          isForgotPassword={isForgotPassword}
          registerStep={registerStep}
          forgotPasswordStep={forgotPasswordStep}
          formData={formData}
          validityTimer={validityTimer}
          formatTime={formatTime}
        />

        <form className="mt-10" onSubmit={handleSubmit}>
          <div className="relative min-h-[160px]">
            <AnimatePresence mode="wait">
              {isForgotPassword ? (
                <ForgotPasswordForm 
                  forgotPasswordStep={forgotPasswordStep}
                  formData={formData}
                  errors={errors}
                  handleChange={handleChange}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
              ) : isLogin ? (
                <LoginForm 
                  formData={formData}
                  errors={errors}
                  handleChange={handleChange}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  toggleForgotPassword={toggleForgotPassword}
                />
              ) : (
                <RegisterForm 
                  registerStep={registerStep}
                  formData={formData}
                  errors={errors}
                  handleChange={handleChange}
                  handleResendOTP={handleResendOTP}
                  timer={timer}
                  canResend={canResend}
                  loading={loading}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Step Indicators */}
          {(isForgotPassword || !isLogin) && (
            <div className="mt-6 flex justify-center gap-2">
              {[1, 2, 3].map((step) => (
                <div 
                  key={step}
                  className={`h-1.5 w-1/3 rounded-full transition-colors duration-300 ${
                    (isForgotPassword ? forgotPasswordStep >= step : registerStep >= step) 
                      ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                />
              ))}
            </div>
          )}

          <motion.button
            layout
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-primary-600 py-4 text-lg font-bold text-white shadow-xl shadow-primary-500/25 transition-all hover:bg-primary-700 hover:shadow-primary-500/40 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading && (
              <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            <span>{getButtonText()}</span>
          </motion.button>
        </form>

        <AuthFooter 
          isLogin={isLogin}
          isForgotPassword={isForgotPassword}
          toggleAuthMode={toggleAuthMode}
          toggleForgotPassword={toggleForgotPassword}
        />
      </div>
    </motion.div>
  );
};

export default AuthFormContainer;
