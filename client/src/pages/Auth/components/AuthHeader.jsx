import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const AuthHeader = ({ isLogin, isForgotPassword, registerStep, forgotPasswordStep, formData, validityTimer, formatTime }) => {
  return (
    <div className="text-center lg:text-left">
      <Link to="/" className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/30">
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
      </Link>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={isForgotPassword ? `fp-${forgotPasswordStep}` : isLogin ? 'login' : `reg-${registerStep}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="mt-8 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {isForgotPassword ? (
              forgotPasswordStep === 1 ? 'Reset Password' :
              forgotPasswordStep === 2 ? 'Verify Reset' :
              'New Password'
            ) : isLogin ? 'Welcome back' : 
              registerStep === 1 ? 'Join Stride' : 
              registerStep === 2 ? 'Check Email' : 
              'Secure Account'}
          </h2>
          <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
            {isForgotPassword ? (
              forgotPasswordStep === 1 ? "Don't worry! Enter your email and we'll send a code." :
              forgotPasswordStep === 2 ? `Enter the reset code sent to ${formData.email}` :
              "Enter a new strong password for your account."
            ) : isLogin 
              ? "The best collections are waiting for you." 
              : registerStep === 1 ? "Start your journey. Enter your details below."
              : registerStep === 2 ? (
                <>
                  We sent a 6-digit code to <span className="font-bold text-gray-900 dark:text-white">{formData.email}</span>
                  {validityTimer > 0 && (
                    <div className="mt-2 flex items-center justify-center lg:justify-start gap-2 text-sm font-medium text-amber-600 dark:text-amber-400">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Valid for: {formatTime(validityTimer)}
                    </div>
                  )}
                </>
              ) : "Create a strong password for your new account."}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AuthHeader;
