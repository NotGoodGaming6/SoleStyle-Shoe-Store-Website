import { motion } from 'framer-motion';
import AuthFormContainer from '@pages/Auth/components/AuthFormContainer';
import AuthDecorativeSide from '@pages/Auth/components/AuthDecorativeSide';
import { useAuthForm } from '@pages/Auth/hooks/useAuthForm';

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
      <motion.div 
        layout
        transition={{ duration: 0.6, type: 'spring', bounce: 0.15 }}
        className={`flex w-full max-w-6xl flex-col overflow-hidden rounded-[2.5rem] bg-white shadow-2xl dark:bg-gray-900 lg:min-h-[750px] ${
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
    </div>
  );
};

export default AuthPage;
