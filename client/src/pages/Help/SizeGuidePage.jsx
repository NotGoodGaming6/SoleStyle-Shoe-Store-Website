import { motion } from 'framer-motion';

const SizeGuidePage = () => {
  const sizeData = [
    { us: "6", eu: "39", uk: "5.5", inches: "9.25", cm: "23.5" },
    { us: "6.5", eu: "39", uk: "6", inches: "9.5", cm: "24.1" },
    { us: "7", eu: "40", uk: "6.5", inches: "9.625", cm: "24.4" },
    { us: "7.5", eu: "40.5", uk: "7", inches: "9.75", cm: "24.8" },
    { us: "8", eu: "41", uk: "7.5", inches: "9.9375", cm: "25.4" },
    { us: "8.5", eu: "41.5", uk: "8", inches: "10.125", cm: "25.7" },
    { us: "9", eu: "42", uk: "8.5", inches: "10.25", cm: "26" },
    { us: "9.5", eu: "42.5", uk: "9", inches: "10.4375", cm: "26.7" },
    { us: "10", eu: "43.5", uk: "9.5", inches: "10.5625", cm: "27" },
    { us: "10.5", eu: "44", uk: "10", inches: "10.75", cm: "27.3" },
    { us: "11", eu: "44.5", uk: "10.5", inches: "10.9375", cm: "27.9" },
    { us: "11.5", eu: "45", uk: "11", inches: "11.125", cm: "28.3" },
    { us: "12", eu: "45.5", uk: "11.5", inches: "11.25", cm: "28.6" },
    { us: "13", eu: "46.5", uk: "12.5", inches: "11.5625", cm: "29.4" },
    { us: "14", eu: "47.5", uk: "13.5", inches: "11.875", cm: "30.2" },
    { us: "15", eu: "48.5", uk: "14.5", inches: "12.1875", cm: "31" }
  ];

  return (
    <div className="min-h-screen bg-white py-20 dark:bg-gray-950">
      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="font-display text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">Size Guide</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Find the perfect fit for your next pair of Stride shoes.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 overflow-hidden rounded-2xl border border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900 shadow-xl shadow-black/5"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50">
                  <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800">US Size</th>
                  <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800">EU Size</th>
                  <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800">UK Size</th>
                  <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800">Inches</th>
                  <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800">CM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {sizeData.map((size) => (
                  <tr key={size.us} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4 text-gray-900 dark:text-gray-300 font-bold">US {size.us}</td>
                    <td className="px-6 py-4 text-gray-900 dark:text-gray-300">{size.eu}</td>
                    <td className="px-6 py-4 text-gray-900 dark:text-gray-300">UK {size.uk}</td>
                    <td className="px-6 py-4 text-gray-900 dark:text-gray-300">{size.inches}"</td>
                    <td className="px-6 py-4 text-gray-900 dark:text-gray-300">{size.cm} cm</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-gray-50 p-8 dark:bg-gray-900"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">How to measure</h3>
            <ol className="mt-6 space-y-4 text-gray-600 dark:text-gray-400">
              <li className="flex gap-4">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">1</span>
                <p>Trace the outline of your foot on a piece of paper.</p>
              </li>
              <li className="flex gap-4">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">2</span>
                <p>Measure the distance from the back of your heel to the tip of your longest toe.</p>
              </li>
              <li className="flex gap-4">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">3</span>
                <p>Use our table above to find your corresponding size.</p>
              </li>
            </ol>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border-2 border-dashed border-gray-200 p-8 dark:border-gray-800 flex flex-col justify-center text-center"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Still unsure?</h3>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Our sizes run true to size. If you are between sizes, we recommend sizing up for athletic performance and sizing down for a tighter, lifestyle fit.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuidePage;

