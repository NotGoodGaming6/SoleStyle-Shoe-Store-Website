import { motion } from 'framer-motion';
import AuthFormContainer from '@pages/Auth/components/AuthFormContainer';
import AuthDecorativeSide from '@pages/Auth/components/AuthDecorativeSide';
import { useAuthForm } from '@pages/Auth/hooks/useAuthForm';
import SpotlightCard from '@components/ReactBits/SpotlightCard';

const AuthPage = () => {
  const {
    isLogin,
    isForgotPassword,
    registerStep,
    forgotPasswordStep,
    formData,
    errors,
    loading,
    timer,
    validityTimer,
    canResend,
    handleChange,
    toggleAuthMode,
    toggleForgotPassword,
    handleSubmit,
    handleResendOTP
  } = useAuthForm();

  return (
    <div className="flex min-h-[90vh] items-center justify-center bg-gray-50 p-4 dark:bg-gray-950 sm:p-6 lg:p-12">
      <SpotlightCard
        className="w-full max-w-6xl rounded-[2.5rem] overflow-hidden shadow-2xl"
        spotlightColor="rgba(79, 70, 229, 0.08)"
      >
        <motion.div 
          layout
          transition={{ duration: 0.6, type: 'spring', bounce: 0.15 }}
          className={`flex w-full flex-col bg-white dark:bg-gray-900 lg:min-h-[750px] ${
            isLogin ? 'lg:flex-row' : 'lg:flex-row-reverse'
          }`}
        >
          <AuthFormContainer 
            isLogin={isLogin}
            isForgotPassword={isForgotPassword}
            forgotPasswordStep={forgotPasswordStep}
            toggleForgotPassword={toggleForgotPassword}
            registerStep={registerStep}
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            toggleAuthMode={toggleAuthMode}
            timer={timer}
            validityTimer={validityTimer}
            canResend={canResend}
            handleResendOTP={handleResendOTP}
            loading={loading}
          />
          <AuthDecorativeSide isLogin={isLogin} />
        </motion.div>
      </SpotlightCard>
    </div>
  );
};

export default AuthPage;
