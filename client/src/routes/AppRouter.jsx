import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const ShopPage = lazy(() => import('@pages/Shop/ShopPage'));
const ProductDetailPage = lazy(() => import('@pages/ProductDetail/ProductDetailPage'));
const CartPage = lazy(() => import('@pages/Cart/CartPage'));
const CategoriesPage = lazy(() => import('@pages/Categories/CategoriesPage'));
const AboutPage = lazy(() => import('@pages/About/AboutPage'));
const FAQPage = lazy(() => import('@pages/FAQ/FAQPage'));
const HomePage = lazy(() => import('@pages/Home/HomePage'));
const ShippingPage = lazy(() => import('@pages/Help/ShippingPage'));
const SizeGuidePage = lazy(() => import('@pages/Help/SizeGuidePage'));
const ContactPage = lazy(() => import('@pages/Help/ContactPage'));
const CareersPage = lazy(() => import('@pages/About/CareersPage'));
const StoreLocatorPage = lazy(() => import('@pages/About/StoreLocatorPage'));
const AuthPage = lazy(() => import('@pages/Auth/AuthPage'));
const WishlistPage = lazy(() => import('@pages/Wishlist/WishlistPage'));
const ProfilePage = lazy(() => import('@pages/Profile/ProfilePage'));
const CheckoutPage = lazy(() => import('@pages/Checkout/CheckoutPage'));
const PrivacyPage = lazy(() => import('@pages/Privacy/PrivacyPage'));
const TermsPage = lazy(() => import('@pages/Terms/TermsPage'));

import AdminRouter from '@routes/AdminRouter';
import UserLayout from '@components/layouts/UserLayout';

const PageLoader = () => (
  <div className="flex min-h-[60vh] w-full items-center justify-center bg-gray-950 text-white">
    <Loader2 className="h-10 w-10 animate-spin text-primary-500" />
  </div>
);

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 1.02, y: -10 }}
    transition={{ 
      type: "spring",
      stiffness: 260,
      damping: 20,
      duration: 0.5 
    }}
    className="w-full h-full"
  >
    {children}
  </motion.div>
);

const AppRouter = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<PageLoader />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<UserLayout />}>
            <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
            <Route path="/products" element={<PageWrapper><ShopPage /></PageWrapper>} />
            <Route path="/products/:id" element={<PageWrapper><ProductDetailPage /></PageWrapper>} />
            <Route path="/cart" element={<PageWrapper><CartPage /></PageWrapper>} />
            <Route path="/categories" element={<PageWrapper><CategoriesPage /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
            <Route path="/faq" element={<PageWrapper><FAQPage /></PageWrapper>} />
            <Route path="/shipping" element={<PageWrapper><ShippingPage /></PageWrapper>} />
            <Route path="/size-guide" element={<PageWrapper><SizeGuidePage /></PageWrapper>} />
            <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
            <Route path="/privacy" element={<PageWrapper><PrivacyPage /></PageWrapper>} />
            <Route path="/terms" element={<PageWrapper><TermsPage /></PageWrapper>} />
            <Route path="/careers" element={<PageWrapper><CareersPage /></PageWrapper>} />
            <Route path="/stores" element={<PageWrapper><StoreLocatorPage /></PageWrapper>} />
            <Route path="/auth" element={<PageWrapper><AuthPage /></PageWrapper>} />
            <Route path="/wishlist" element={<PageWrapper><WishlistPage /></PageWrapper>} />
            <Route path="/profile" element={<PageWrapper><ProfilePage /></PageWrapper>} />
            <Route path="/checkout" element={<PageWrapper><CheckoutPage /></PageWrapper>} />
          </Route>

          <Route path="/admin/*" element={<AdminRouter />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
};

export default AppRouter;
