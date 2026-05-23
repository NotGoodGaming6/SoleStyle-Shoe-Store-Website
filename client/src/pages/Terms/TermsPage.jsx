import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAdminSettings } from '@hooks/useAdminSettings';

const TermsPage = () => {
  const { storeSettings } = useAdminSettings();
  const [activeSection, setActiveSection] = useState('intro');

  const sections = [
    {
      id: 'intro',
      title: '1. Agreement to Terms',
      content: `These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity, and ${storeSettings?.storeName || 'SoleStyle'}, concerning your access to and use of our website and services. By accessing or using our store, you agree that you have read, understood, and agreed to be bound by all of these Terms and Conditions. If you do not agree with all of these terms, then you are expressly prohibited from using the site and must discontinue use immediately.`
    },
    {
      id: 'accounts',
      title: '2. User Accounts & Registration',
      content: 'To access certain features of the website, including checking out faster, tracking orders, and viewing order history, you may be required to register an account. You agree to:',
      bullets: [
        'Provide accurate, current, and complete information during the registration process.',
        'Maintain the confidentiality and security of your account password and login credentials.',
        'Promptly update your account details, including email address and shipping details, if they change.',
        'Accept responsibility for all activities that occur under your account.'
      ]
    },
    {
      id: 'products',
      title: '3. Products, Pricing & Orders',
      content: `We strive to display our products, including sneakers, footwear, and apparel, as accurately as possible. However, we cannot guarantee that your device's screen will perfectly reflect the colors and details of the products.`,
      bullets: [
        'All products are subject to availability, and we cannot guarantee that items will always be in stock.',
        'We reserve the right to limit the quantities of any products we offer or restrict orders placed under the same customer account or payment details.',
        'Prices for our products are subject to change without notice.',
        'We reserve the right to refuse or cancel any order placed with us. In the event we make a change to or cancel an order, we will attempt to notify you by contacting the e-mail or billing address/phone number provided at the time the order was made.'
      ]
    },
    {
      id: 'payment',
      title: '4. Payments & Billing',
      content: 'We accept various forms of payment, including credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, and Google Pay. You agree that:',
      bullets: [
        'You will provide current, complete, and accurate purchase and account information for all purchases made at our store.',
        'You authorize us to charge your chosen payment provider for any such purchases (including any applicable shipping fees and taxes).',
        'We process all transactions via secure, PCI-compliant payment gateways. Your complete billing info is encrypted and not stored on our systems.'
      ]
    },
    {
      id: 'shipping',
      title: '5. Shipping & Delivery',
      content: `All purchases made through our store are subject to our Shipping and Returns policy. Shipping costs and estimated delivery times are calculated at checkout based on your selected delivery location and shipping method.`,
      bullets: [
        'Risk of loss and title for items purchased pass to you upon our delivery of the items to the shipping carrier.',
        'While we make every effort to ship orders promptly, delivery dates are estimates only and are not guaranteed.',
        'International shipments may be subject to customs duties, import taxes, and brokerage fees levied by the destination country. You are solely responsible for paying these fees.'
      ]
    },
    {
      id: 'intellectual',
      title: '6. Intellectual Property Rights',
      content: `Unless otherwise indicated, the website, its software, databases, designs, graphics, logo, brand assets, and all text and media content are our proprietary property and are protected by copyright, trademark, and other intellectual property laws. You are granted a limited license to access and use the website solely for your personal, non-commercial shopping use. Any duplication, redistribution, or modification of website content without our express prior written consent is strictly prohibited.`
    },
    {
      id: 'limitation',
      title: '7. Limitation of Liability',
      content: `In no event will ${storeSettings?.storeName || 'SoleStyle'}, our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the website or products purchased, even if we have been advised of the possibility of such damages.`
    },
    {
      id: 'disputes',
      title: '8. Governing Law & Disputes',
      content: 'These Terms and Conditions and your use of the website are governed by and construed in accordance with the local laws, without regard to its conflict of law principles. Any legal action or proceeding arising out of or related to these Terms shall be resolved through good-faith negotiations or, if necessary, brought exclusively in the courts of appropriate jurisdiction.'
    },
    {
      id: 'contact',
      title: '9. Contact Us',
      content: `If you have any questions, disputes, or seek clarification regarding these Terms and Conditions, please reach out to us at:`
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
            Terms & <span className="text-primary-500">Conditions</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-gray-400"
          >
            Last Updated: May 17, 2026. Please read these terms carefully before shopping with us.
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

export default TermsPage;
