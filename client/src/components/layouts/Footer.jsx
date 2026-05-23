import { Link } from 'react-router-dom';
import { useAdminSettings } from '../../hooks/useAdminSettings';

const Footer = () => {
  const { storeSettings } = useAdminSettings();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900">
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <div className="text-center lg:text-left">
              <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white">Join the SoleStyle Club</h3>
              <p className="mt-1 text-gray-600 dark:text-gray-400">Get 15% off your first order, plus early access to new drops.</p>
            </div>
            <form className="flex w-full max-w-md gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white" 
              />
              <button type="submit" className="rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-8">
          <div className="flex flex-col items-center text-center lg:w-1/4 lg:items-start lg:text-left">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-600">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <span className="font-display text-xl font-bold text-gray-900 dark:text-white">{storeSettings.storeName}</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-gray-600 dark:text-gray-400">
              Premium footwear for every step of your journey. From athletic performance to everyday comfort.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="#" className="text-gray-400 transition-colors hover:text-primary-600" aria-label="Instagram">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 transition-colors hover:text-primary-600" aria-label="Facebook">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 transition-colors hover:text-primary-600" aria-label="Twitter">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 transition-colors hover:text-primary-600" aria-label="YouTube">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
                </svg>
              </a>
            </div>
          </div>

          <div className="grid w-full grid-cols-2 gap-8 sm:grid-cols-3 lg:w-3/4">
            <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
              <h4 className="font-semibold text-gray-900 dark:text-white">Shop</h4>
              <ul className="mt-4 space-y-3">
                <li><Link to="/products?category=running" className="text-sm text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400">Running</Link></li>
                <li><Link to="/products?category=sneakers" className="text-sm text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400">Sneakers</Link></li>
                <li><Link to="/products?category=basketball" className="text-sm text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400">Basketball</Link></li>
                <li><Link to="/products?category=casual" className="text-sm text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400">Casual</Link></li>
                <li><Link to="/products?category=boots" className="text-sm text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400">Boots</Link></li>
                <li><Link to="/products?category=sandals" className="text-sm text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400">Sandals</Link></li>
              </ul>
            </div>

            <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
              <h4 className="font-semibold text-gray-900 dark:text-white">Help</h4>
              <ul className="mt-4 space-y-3">
                <li><Link to="/faq" className="text-sm text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400">FAQ</Link></li>
                <li><Link to="/shipping" className="text-sm text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400">Shipping & Returns</Link></li>
                <li><Link to="/size-guide" className="text-sm text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400">Size Guide</Link></li>
                <li><Link to="/contact" className="text-sm text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400">Contact Us</Link></li>
              </ul>
            </div>

            <div className="col-span-2 flex flex-col items-center text-center sm:col-span-1 sm:items-start sm:text-left">
              <h4 className="font-semibold text-gray-900 dark:text-white">About</h4>
              <ul className="mt-4 space-y-3">
                <li><Link to="/about" className="text-sm text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400">Our Story</Link></li>
                <li><Link to="/careers" className="text-sm text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400">Careers</Link></li>
                <li><Link to="/stores" className="text-sm text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400">Store Locator</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-6 sm:flex-row lg:px-8">
          <p className="text-center text-sm text-gray-500 sm:text-left">&copy; 2026 {storeSettings.storeName}. All rights reserved.</p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
            <div className="flex gap-6">
              <Link to="/privacy" className="text-sm text-gray-500 transition-colors hover:text-gray-700 dark:hover:text-gray-300">Privacy</Link>
              <Link to="/terms" className="text-sm text-gray-500 transition-colors hover:text-gray-700 dark:hover:text-gray-300">Terms</Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              <div className="flex h-6 w-10 items-center justify-center rounded bg-[#1A1F71]">
                <span className="font-bold italic text-white text-xs">VISA</span>
              </div>
              <div className="flex h-6 w-10 items-center justify-center rounded bg-gray-100">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle cx="9" cy="12" r="6" fill="#EB001B"></circle>
                  <circle cx="15" cy="12" r="6" fill="#F79E1B"></circle>
                  <path d="M12 7.5a6 6 0 000 9 6 6 0 000-9z" fill="#FF5F00"></path>
                </svg>
              </div>
              <div className="flex h-6 w-10 items-center justify-center rounded bg-[#006FCF]">
                <span className="font-bold text-white text-[8px]">AMEX</span>
              </div>
              <div className="flex h-6 w-10 items-center justify-center rounded bg-black">
                <span className="font-bold text-white text-[10px]">Pay</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

