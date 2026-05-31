import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdminSettings } from '@hooks/useAdminSettings';

const faqData = [
  {
    category: "Orders & Shipping",
    questions: [
      {
        id: "q1",
        question: "How can I track my order?",
        answer: "Once your order ships, you'll receive a confirmation email with a tracking number and a link to the carrier's website. You can also track your order in the 'Orders' section of your account profile."
      },
      {
        id: "q2",
        question: "Do you ship internationally?",
        answer: "Yes! We currently ship to over 50 countries worldwide. International shipping rates and delivery times vary by location and will be calculated at checkout."
      },
      {
        id: "q3",
        question: "How long will it take to receive my order?",
        answer: "Standard shipping typically takes 3-5 business days. Express shipping is available for 1-2 business day delivery. International orders can take 7-14 business days depending on customs."
      }
    ]
  },
  {
    category: "Returns & Exchanges",
    questions: [
      {
        id: "q4",
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy for all unworn items in their original packaging. Returns are free for all domestic orders. Final sale items are not eligible for return."
      },
      {
        id: "q5",
        question: "How do I start a return?",
        answer: "To start a return, visit our Return Center and enter your order number and zip code. Follow the prompts to select items for return and print your prepaid shipping label."
      },
      {
        id: "q6",
        question: "Can I exchange an item for a different size?",
        answer: "Yes, we offer free exchanges for size. Simply select the 'Exchange' option when processing your return online and choose your new size."
      }
    ]
  },
  {
    category: "Product & Sizing",
    questions: [
      {
        id: "q7",
        question: "How do I find my shoe size?",
        answer: "We recommend checking our Size Guide for detailed measurements. Many of our performance models run true to size, but we've included specific 'Fit Notes' on each product page to help you choose."
      },
      {
        id: "q8",
        question: "Are your shoes vegan?",
        answer: "While many of our sneakers use synthetic materials, some models contain leather or suede components. You can find detailed material lists on every product page under the 'Materials & Care' section."
      }
    ]
  },
  {
    category: "Payments & Security",
    questions: [
      {
        id: "q9",
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Klarna for buy-now-pay-later options."
      },
      {
        id: "q10",
        question: "Is my payment information secure?",
        answer: "Absolutely. We use industry-standard SSL encryption to protect your data. Your payment information is processed through secure gateways and is never stored on our servers."
      }
    ]
  }
];

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeId, setActiveId] = useState(null);
  const { storeSettings } = useAdminSettings();

  const toggleAccordion = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  const filteredFaq = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-white transition-colors duration-300 dark:bg-gray-950 dark:text-white">
      <section className="relative overflow-hidden bg-gray-950 py-20 lg:py-32">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-primary-950/20"></div>
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-primary-500/10 blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-primary-600/5 blur-[120px]"></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 text-center lg:px-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            How can we <span className="text-primary-500">help you?</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-gray-400"
          >
            Search our knowledge base or browse by category to find answers to common questions about your SoleStyle experience.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-10 max-w-xl"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-2xl border-0 bg-white/10 px-6 py-4 text-white placeholder-gray-500 backdrop-blur-md transition-all focus:bg-white/15 focus:ring-2 focus:ring-primary-500 dark:bg-gray-900/50"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          {filteredFaq.length > 0 ? (
            <div className="space-y-16">
              {filteredFaq.map((category, catIdx) => (
                <div key={catIdx}>
                  <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white">{category.category}</h2>
                  <div className="mt-8 space-y-4">
                    {category.questions.map((item) => (
                      <div 
                        key={item.id}
                        className="overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all hover:border-primary-100 hover:shadow-lg hover:shadow-primary-600/5 dark:border-gray-800 dark:bg-gray-900"
                      >
                        <button
                          onClick={() => toggleAccordion(item.id)}
                          className="flex w-full items-center justify-between px-6 py-5 text-left focus:outline-none"
                        >
                          <span className="font-semibold text-gray-900 dark:text-white">{item.question}</span>
                          <span className={`transition-transform duration-300 ${activeId === item.id ? 'rotate-180' : ''}`}>
                            <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                            </svg>
                          </span>
                        </button>
                        <AnimatePresence>
                          {activeId === item.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                              <div className="border-t border-gray-50 px-6 py-5 text-gray-600 dark:border-gray-800 dark:text-gray-400 leading-relaxed">
                                {item.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-50 dark:bg-gray-900">
                <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">No results found</h3>
              <p className="mt-2 text-gray-500">We couldn't find any answers for "{searchTerm}". Please try a different term.</p>
              <button 
                onClick={() => setSearchTerm('')}
                className="mt-6 font-semibold text-primary-600 hover:text-primary-700"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="bg-gray-50 py-20 dark:bg-gray-900/50">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white">Still have questions?</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">If you can't find what you're looking for, our support team is here to help.</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <div className="flex items-center gap-4 rounded-3xl bg-white p-6 shadow-sm dark:bg-gray-800 w-full max-w-sm sm:w-auto">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 dark:bg-primary-900/40 dark:text-primary-400 flex-shrink-0">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-500">Email us at</p>
                <p className="font-bold text-gray-900 dark:text-white">{storeSettings.storeEmail}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 rounded-3xl bg-white p-6 shadow-sm dark:bg-gray-800 w-full max-w-sm sm:w-auto">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 dark:bg-primary-900/40 dark:text-primary-400 flex-shrink-0">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-500">Live chat</p>
                <p className="font-bold text-gray-900 dark:text-white">Available 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>  
  );
};

export default FAQPage;

