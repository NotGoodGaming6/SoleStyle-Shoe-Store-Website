import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAdminSettings } from '@hooks/useAdminSettings';

const PrivacyPage = () => {
  const { storeSettings } = useAdminSettings();
  const [activeSection, setActiveSection] = useState('intro');

  const sections = [
    {
      id: 'intro',
      title: '1. Introduction',
      content: `Welcome to ${storeSettings?.storeName || 'SoleStyle'}. We value your privacy and are committed to protecting your personal data. This Privacy Policy describes how we collect, use, process, and disclose your information, including personal information, in conjunction with your access to and use of our website and services.`
    },
    {
      id: 'collection',
      title: '2. Information We Collect',
      content: `We collect information that you provide directly to us when you create an account, make a purchase, sign up for our newsletter, or communicate with us. This includes:`,
      bullets: [
        'Personal identifiers (e.g., name, email address, shipping and billing address, phone number).',
        'Payment information (processed securely through encrypted third-party payment gateways; we do not store your full card details).',
        'Commercial information (e.g., history of products purchased, cart items, wishlist details).',
        'Communication preferences and any feedback, reviews, or customer support queries you submit.'
      ]
    },
    {
      id: 'usage',
      title: '3. How We Use Your Information',
      content: 'We use the collected information for various business and commercial purposes, including:',
      bullets: [
        'To process, fulfill, and ship your orders, and manage exchanges or returns.',
        'To send order confirmations, tracking details, and transactional updates.',
        'To personalize your shopping experience and recommend products tailored to your preferences.',
        'To communicate with you about new product drops, exclusive offers, and promotions (where you have opted in).',
        'To maintain the security of our website, detect and prevent fraud or malicious activities.',
        'To analyze website usage metrics to optimize our website design and performance.'
      ]
    },
    {
      id: 'sharing',
      title: '4. Information Sharing & Disclosure',
      content: 'We do not sell your personal data. We may share your information with trusted third-party service providers to help us run our business, including:',
      bullets: [
        'Payment processors (e.g., Visa, Mastercard, AMEX, PayPal) to securely charge and refund transactions.',
        'Delivery partners and courier services (e.g., DHL, FedEx, UPS) to deliver your purchases.',
        'Marketing platforms to manage our newsletters and personalized promotional campaigns.',
        'Analytical tools (e.g., Google Analytics) to help us understand web traffic and user behavior.',
        'Law enforcement or government agencies when legally required to comply with judicial processes or protect rights and safety.'
      ]
    },
    {
      id: 'security',
      title: '5. Data Security & Retention',
      content: `We implement industry-standard administrative, technical, and physical security measures to protect your personal data from unauthorized access, loss, alteration, or disclosure. All transaction information is encrypted using secure socket layer technology (SSL). We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy, or to comply with our legal, accounting, or regulatory requirements.`
    },
    {
      id: 'cookies',
      title: '6. Cookies & Tracking',
      content: 'We use cookies and similar tracking technologies to track the activity on our store and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. They help us remember your cart items, analyze traffic, and offer a personalized shopping journey. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent, though some features of our site may not function properly without them.'
    },
    {
      id: 'rights',
      title: '7. Your Rights & Choices',
      content: 'Depending on your location, you may have specific rights regarding your personal data under regulations like GDPR or CCPA. These rights include:',
      bullets: [
        'The right to access and request a copy of the personal information we hold about you.',
        'The right to request the correction of inaccurate or incomplete personal data.',
        'The right to request the deletion or erasure of your personal data under certain conditions.',
        'The right to withdraw consent at any time for marketing emails by clicking the "unsubscribe" link in any email.'
      ]
    },
    {
      id: 'contact',
      title: '8. Contact Information',
      content: `If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your personal data, please do not hesitate to contact our dedicated privacy officer at:`
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-300 dark:bg-gray-950 dark:text-white">
      <section className="relative overflow-hidden bg-gray-950 py-20 lg:py-28">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-primary-950/20"></div>
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-primary-500/10 blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-primary-600/5 blur-[120px]"></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 text-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-500/10 px-3 py-1 text-xs font-semibold text-primary-500 dark:bg-primary-500/20">
              Legal Information
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Privacy <span className="text-primary-500">Policy</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-gray-400"
          >
            Last Updated: May 17, 2026. Learn how we handle, store, and safeguard your data.
          </motion.p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-4">
            
            <div className="hidden lg:block">
              <div className="sticky top-28 space-y-2 rounded-3xl border border-gray-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-md dark:border-gray-800/80 dark:bg-gray-900/80">
                <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  Sections
                </h3>
                <nav className="flex flex-col gap-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`text-left text-sm py-2.5 px-4 rounded-xl transition-all duration-200 ${
                        activeSection === section.id
                          ? 'bg-primary-50 text-primary-600 font-bold dark:bg-primary-950/40 dark:text-primary-400'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'
                      }`}
                    >
                      {section.title.split('. ')[1] || section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-12">
              {sections.map((section, idx) => (
                <motion.div
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="scroll-mt-28 rounded-3xl border border-gray-200/60 bg-white p-8 shadow-sm transition-colors dark:border-gray-800/60 dark:bg-gray-900"
                >
                  <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                    {section.title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-400">
                    {section.content}
                  </p>
                  
                  {section.bullets && (
                    <ul className="mt-6 space-y-3.5 pl-6 list-none">
                      {section.bullets.map((bullet, bulletIdx) => (
                        <li key={bulletIdx} className="relative text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                          <span className="absolute -left-6 top-2.5 h-1.5 w-1.5 rounded-full bg-primary-500"></span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.id === 'contact' && (
                    <div className="mt-8 overflow-hidden rounded-2xl border border-primary-100 bg-primary-50/30 p-6 dark:border-primary-950/20 dark:bg-primary-950/10">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                            Email Support
                          </p>
                          <p className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
                            {storeSettings?.storeEmail || 'support@solestyle.com'}
                          </p>
                        </div>
                        <a
                          href={`mailto:${storeSettings?.storeEmail || 'support@solestyle.com'}`}
                          className="inline-flex items-center justify-center rounded-xl bg-primary-600 px-5 py-3 font-semibold text-white transition-all hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-600/20 text-sm"
                        >
                          Send Email
                        </a>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;
