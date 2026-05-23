import { Toaster } from 'react-hot-toast';
import AppRouter from '@routes/AppRouter';
import ScrollToTop from '@components/shared/ScrollToTop';
import { SettingsProvider } from '@context/SettingsContext';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchWishlist } from '@redux/wishlistSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  return (
    <SettingsProvider>
      <div className="min-h-screen flex flex-col bg-gray-950 text-white selection:bg-primary-500/30">
        <ScrollToTop />
        <Toaster 
          position="top-right" 
          toastOptions={{
            duration: 4000,
            style: {
              background: '#111827',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '1rem',
              backdropFilter: 'blur(10px)',
              padding: '12px 20px',
              fontSize: '14px',
              fontWeight: '500',
            },
            success: {
              iconTheme: {
                primary: 'var(--color-primary-500)',
                secondary: '#fff',
              },
            },
          }}
        />
        <AppRouter />
      </div>
    </SettingsProvider>
  );
}

export default App;

