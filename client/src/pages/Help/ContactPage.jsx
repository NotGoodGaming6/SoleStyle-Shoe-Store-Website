import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdminSettings } from '../../hooks/useAdminSettings';

const ContactPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { storeSettings } = useAdminSettings();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactInfo = [
    { label: 'Email', value: storeSettings.storeEmail, icon: 'envelope' },
    { label: 'Phone', value: storeSettings.storePhone, icon: 'phone' },
    { label: 'Office', value: '123 Sneaker St, Metro City', icon: 'map-pin' },
  ];

  return (
    <div className="min-h-screen bg-white py-20 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="font-display text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">Get in touch</h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
              Have questions about your order, sizing, or just want to chat shoes? Our team is here to help you step up your game.
            </p>

            <div className="mt-12 space-y-8">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-center gap-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-600/10 text-primary-600">
                    {item.label === 'Email' && <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                    {item.label === 'Phone' && <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}
                    {item.label === 'Office' && <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">{item.label}</h3>
                    <p className="mt-1 text-lg font-medium text-gray-900 dark:text-white">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-900 h-80 relative shadow-inner">
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d177819.18998538662!2d-118.37377091583811!3d34.09199978649813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bf61e9d408cb%3A0x73ff07b1c2d6dadc!2sGriffith%20Observatory!5e0!3m2!1saz!2saz!4v1776347777804!5m2!1saz!2saz" 
                 className="w-full h-full border-0" 
                 allowFullScreen="" 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
               ></iframe>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-3xl border border-gray-100 bg-white p-8 dark:border-gray-800 dark:bg-gray-900 shadow-2xl shadow-black/5"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                  <input required type="text" className="mt-2 block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                  <input required type="text" className="mt-2 block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                <input required type="email" className="mt-2 block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                <textarea required rows="4" className="mt-2 block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white resize-none" />
              </div>
              
              <button 
                type="submit" 
                className="w-full rounded-xl bg-primary-600 px-8 py-4 font-bold text-white transition-all hover:bg-primary-700 active:scale-[0.98]"
              >
                Send Message
              </button>

              <AnimatePresence>
                {isSubmitted && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-xl bg-green-500/10 p-4 text-center text-green-600 dark:text-green-400"
                  >
                    Your message has been sent successfully! We'll get back to you soon.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;

