import { motion } from 'framer-motion';

const ShippingPage = () => {
  const sections = [
    {
      title: "Shipping Methods & Costs",
      content: [
        { label: "Standard Shipping", time: "3-5 business days", price: "Free on orders over $75, otherwise $9.95" },
        { label: "Express Shipping", time: "1-2 business days", price: "$19.95" },
        { label: "International Shipping", time: "7-14 business days", price: "Calculated at checkout" }
      ]
    },
    {
      title: "Returns & Exchanges",
      content: "We accept returns and exchanges within 30 days of delivery. All items must be in their original condition, unworn, and with all tags attached. Returns are free for all domestic orders."
    },
    {
      title: "How to Return",
      content: "To initiate a return, visit our online return portal with your order number and email address. Once approved, you will receive a pre-paid shipping label to send the items back to us."
    }
  ];

  return (
    <div className="min-h-screen bg-white py-20 dark:bg-gray-950">
      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="font-display text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">Shipping & Returns</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Everything you need to know about getting your SoleStyle gear.</p>
        </motion.div>

        <div className="mt-16 space-y-12">
          {sections.map((section, idx) => (
            <motion.section 
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="rounded-2xl border border-gray-100 bg-gray-50/50 p-8 dark:border-gray-800 dark:bg-gray-900/50 backdrop-blur-sm"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{section.title}</h2>
              <div className="mt-6">
                {Array.isArray(section.content) ? (
                  <div className="grid gap-6 sm:grid-cols-3">
                    {section.content.map((item) => (
                      <div key={item.label} className="flex flex-col">
                        <span className="font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wider">{item.label}</span>
                        <span className="mt-2 text-gray-600 dark:text-gray-400">{item.time}</span>
                        <span className="mt-1 font-medium text-primary-600 dark:text-primary-400">{item.price}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">{section.content}</p>
                )}
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;

