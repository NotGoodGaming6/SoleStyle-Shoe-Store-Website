import { motion } from 'framer-motion';

const AuthFooter = ({ isLogin, isForgotPassword, toggleAuthMode, toggleForgotPassword }) => {
  return (
    <motion.div layout className="mt-10 text-center">
      <p className="text-gray-500 dark:text-gray-400">
        {isForgotPassword ? (
          <>
            Remembered your password?{" "}
            <button type="button" onClick={toggleForgotPassword} className="font-bold text-primary-600 hover:text-primary-500 underline-offset-4 hover:underline">
              Back to login
            </button>
          </>
        ) : isLogin ? (
          <>
            Don't have an account?{" "}
            <button type="button" onClick={toggleAuthMode} className="font-bold text-primary-600 hover:text-primary-500 underline-offset-4 hover:underline">
              Register now
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button type="button" onClick={toggleAuthMode} className="font-bold text-primary-600 hover:text-primary-500 underline-offset-4 hover:underline">
              Sign in here
            </button>
          </>
        )}
      </p>
    </motion.div>
  );
};

export default AuthFooter;
