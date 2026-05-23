import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import ShopPage from '@pages/Shop/ShopPage';
import ProductDetailPage from '@pages/ProductDetail/ProductDetailPage';
import CartPage from '@pages/Cart/CartPage';
import CategoriesPage from '@pages/Categories/CategoriesPage';
import AboutPage from '@pages/About/AboutPage';
import FAQPage from '@pages/FAQ/FAQPage';
import HomePage from '@pages/Home/HomePage';
import ShippingPage from '@pages/Help/ShippingPage';
import SizeGuidePage from '@pages/Help/SizeGuidePage';
import ContactPage from '@pages/Help/ContactPage';
import CareersPage from '@pages/About/CareersPage';
import StoreLocatorPage from '@pages/About/StoreLocatorPage';
import AuthPage from '@pages/Auth/AuthPage';
import WishlistPage from '@pages/Wishlist/WishlistPage';
import ProfilePage from '@pages/Profile/ProfilePage';
import CheckoutPage from '@pages/Checkout/CheckoutPage';
import AdminRouter from '@routes/AdminRouter';
import UserLayout from '@components/layouts/UserLayout';
import PrivacyPage from '@pages/Privacy/PrivacyPage';
import TermsPage from '@pages/Terms/TermsPage';

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
  );
};

export default AppRouter;

