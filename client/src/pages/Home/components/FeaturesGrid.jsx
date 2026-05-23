import { motion } from 'framer-motion';

const FeaturesGrid = () => {
  return (
    <section className="border-y border-gray-200 bg-gray-50 py-16 dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: 'M8 17a2 2 0 100-4 2 2 0 000 4zM19 17a2 2 0 100-4 2 2 0 000 4zM10.5 10H17l2 4m0 0h2v4h-2m0-4H5.5a2 2 0 00-2 2v2h2m0 0H19M3 10h4.5l1-4h8l1 4', title: 'Free Shipping', text: 'Free standard shipping on all orders over $75. Express options available.' },
            { icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15', title: '60-Day Returns', text: 'Changed your mind? Return unworn items within 60 days, no questions asked.' },
            { icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3', title: 'Size Guarantee', text: 'Not the right fit? Exchange for a different size at no extra cost.' },
            { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Secure Checkout', text: 'Your payment information is encrypted and secure. Shop with confidence.' }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start gap-4"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon}></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;

