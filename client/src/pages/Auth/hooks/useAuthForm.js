import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchWishlist, clearWishlist } from '@redux/wishlistSlice';
import toast from 'react-hot-toast';

export const useAuthForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [registerStep, setRegisterStep] = useState(1);
  const [forgotPasswordStep, setForgotPasswordStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    otp: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [validityTimer, setValidityTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);
  
  const timerRef = useRef(null);
  const validityRef = useRef(null);

  useEffect(() => {
    if (registerStep === 2 || (isForgotPassword && forgotPasswordStep === 2)) {
      if (timer > 0) {
        timerRef.current = setInterval(() => {
          setTimer((prev) => prev - 1);
        }, 1000);
      } else {
        setCanResend(true);
        clearInterval(timerRef.current);
      }

      if (validityTimer > 0) {
        validityRef.current = setInterval(() => {
          setValidityTimer((prev) => prev - 1);
        }, 1000);
      } else {
        clearInterval(validityRef.current);
      }
    }

    return () => {
      clearInterval(timerRef.current);
      clearInterval(validityRef.current);
    };
  }, [registerStep, forgotPasswordStep, isForgotPassword, timer, validityTimer]);

  const startTimer = () => {
    setTimer(60);
    setValidityTimer(300);
    setCanResend(false);
  };

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === 'otp') {
      value = value.replace(/\D/g, '');
    }
    setFormData({ ...formData, [e.target.name]: value });
    if (errors[e.target.name]) {
      const newErrors = { ...errors };
      delete newErrors[e.target.name];
      setErrors(newErrors);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin((prev) => !prev);
    setIsForgotPassword(false);
    setRegisterStep(1);
    setFormData({ name: '', email: '', password: '', confirmPassword: '', otp: '' });
    setErrors({});
    setTimer(0);
    setValidityTimer(0);
    setCanResend(false);
  };

  const toggleForgotPassword = () => {
    setIsForgotPassword(!isForgotPassword);
    setIsLogin(true);
    setForgotPasswordStep(1);
    setFormData({ ...formData, otp: '', password: '', confirmPassword: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    
    if (isForgotPassword) {
        if (forgotPasswordStep === 1) {
          setLoading(true);
          try {
            const res = await fetch(import.meta.env.VITE_API_BASE_URL + '/api/solestyle/auth/forgot-password', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: formData.email })
            });
            const data = await res.json();
            if (res.ok) {
              setForgotPasswordStep(2);
              startTimer();
              toast.success('Reset code sent to your email!');
            } else {
              setErrors({ email: data.message });
              toast.error(data.message);
            }
          } catch (err) {
            toast.error('Server error');
          } finally {
            setLoading(false);
          }
        } else if (forgotPasswordStep === 2) {
          setForgotPasswordStep(3);
        } else if (forgotPasswordStep === 3) {
          if (formData.password.length < 8) {
            setErrors({ password: 'Password must be at least 8 characters' });
            return;
          }
          if (formData.password !== formData.confirmPassword) {
            setErrors({ confirmPassword: 'Passwords do not match' });
            return;
          }
          setLoading(true);
          try {
            const res = await fetch(import.meta.env.VITE_API_BASE_URL + '/api/solestyle/auth/reset-password', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: formData.email,
                otp: formData.otp,
                newPassword: formData.password
              })
            });
            const data = await res.json();
            if (res.ok) {
              toast.success('Password updated! You can now login.');
              setIsForgotPassword(false);
              setIsLogin(true);
            } else {
              setErrors({ otp: data.message });
              toast.error(data.message);
            }
          } catch (err) {
            toast.error('Server error');
          } finally {
            setLoading(false);
          }
        }
        return;
    }

    if (isLogin) {
      setLoading(true);
      try {
        const res = await fetch(import.meta.env.VITE_API_BASE_URL + '/api/solestyle/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email, password: formData.password })
        });
        const data = await res.json();
        if (res.ok) {
          toast.success('Welcome Back!');
          localStorage.setItem('token', data.token);
          dispatch(fetchWishlist());
          if (data.user?.role === 'admin') navigate('/admin');
          else navigate('/');
        } else {
          toast.error(data.message || 'Invalid credentials');
        }
      } catch (err) {
        toast.error('Server error');
      } finally {
        setLoading(false);
      }
    } else {
      if (registerStep === 1) {
        setLoading(true);
        try {
          const res = await fetch(import.meta.env.VITE_API_BASE_URL + '/api/solestyle/auth/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: formData.email })
          });
          const data = await res.json();
          if (res.ok) {
            setRegisterStep(2);
            startTimer();
            toast.success('Verification code sent!');
          } else {
            toast.error(data.message);
          }
        } catch (err) {
          toast.error('Server error');
        } finally {
          setLoading(false);
        }
      } else if (registerStep === 2) {
        setLoading(true);
        try {
          const res = await fetch(import.meta.env.VITE_API_BASE_URL + '/api/solestyle/auth/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: formData.email, otp: formData.otp })
          });
          if (res.ok) {
            setRegisterStep(3);
            toast.success('Email verified!');
          } else {
            toast.error('Invalid OTP');
          }
        } catch (err) {
          toast.error('Server error');
        } finally {
          setLoading(false);
        }
      } else if (registerStep === 3) {
        if (formData.password !== formData.confirmPassword) {
          toast.error('Passwords do not match');
          return;
        }
        setLoading(true);
        try {
          const res = await fetch(import.meta.env.VITE_API_BASE_URL + '/api/solestyle/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              password: formData.password,
              otp: formData.otp
            })
          });
          const data = await res.json();
          if (res.ok) {
            toast.success('Account created!');
            localStorage.setItem('token', data.token);
            dispatch(fetchWishlist());
            navigate('/');
          } else {
            toast.error(data.message);
          }
        } catch (err) {
          toast.error('Server error');
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;
    setLoading(true);
    try {
      const res = await fetch(import.meta.env.VITE_API_BASE_URL + '/api/solestyle/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });
      if (res.ok) {
        toast.success('New code sent!');
        startTimer();
      }
    } catch (err) {
      toast.error('Server error');
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
};
