import { motion } from 'framer-motion';

const CareersPage = () => {
  const benefits = [
    { title: 'Global Growth', description: 'Opportunity to work with teams across 15+ countries.', icon: '🌍' },
    { title: 'Innovation First', description: 'We use the latest tech and sustainable materials.', icon: '🚀' },
    { title: 'Health & Wellness', description: 'Comprehensive insurance and gym memberships.', icon: '💪' },
    { title: 'Employee Discount', description: '40% off all SoleStyle products for you and your family.', icon: '👟' },
  ];

  const jobs = [
    { title: 'Senior UX Designer', department: 'Product', location: 'Remote / NYC' },
    { title: 'Frontend Engineer (React)', department: 'Tech', location: 'Remote / London' },
    { title: 'Brand Manager', department: 'Marketing', location: 'Los Angeles' },
    { title: 'Retail Store Manager', department: 'Retail', location: 'Baku' },
  ];

  return (
    <div className="min-h-screen bg-white py-20 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <span className="inline-block rounded-full bg-primary-600/10 px-4 py-1.5 text-sm font-bold tracking-wider text-primary-600 uppercase">Join the movement</span>
          <h1 className="mt-6 font-display text-5xl font-bold text-gray-900 dark:text-white sm:text-6xl lg:text-7xl">Run the Future.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            At SoleStyle, we don't just make shoes. We build the infrastructure for movement, creativity, and self-expression.
          </p>
        </motion.div>

        <div className="mt-24">
          <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white">Why SoleStyle?</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, idx) => (
              <motion.div 
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-2xl border border-gray-100 bg-gray-50/50 p-8 dark:border-gray-800 dark:bg-gray-900/50 backdrop-blur-sm"
              >
                <div className="text-4xl">{benefit.icon}</div>
                <h3 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">{benefit.title}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-32">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Open Positions</h2>
            <div className="flex gap-4">
               <span className="rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">8 total roles</span>
            </div>
          </div>

          <div className="mt-12 divide-y divide-gray-100 dark:divide-gray-800 border-y border-gray-100 dark:border-gray-800">
            {jobs.map((job, idx) => (
              <motion.div 
                key={job.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group flex flex-col items-start justify-between gap-4 py-8 sm:flex-row sm:items-center"
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">{job.title}</h3>
                  <div className="mt-1 flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{job.department}</span>
                    <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{job.location}</span>
                  </div>
                </div>
                <button className="rounded-lg bg-gray-950 px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-primary-600 dark:bg-white dark:text-black dark:hover:bg-primary-600 dark:hover:text-white active:scale-95">
                  Apply Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-32 rounded-3xl bg-primary-600 px-8 py-16 text-center text-white"
        >
          <h2 className="text-3xl font-bold sm:text-4xl">Don't see a fit?</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-100">
            We're always looking for talented rebels and dreamers. Send your CV to careers@solestyle.com and we'll keep you in mind.
          </p>
          <button className="mt-10 rounded-xl bg-white px-10 py-4 font-bold text-primary-600 transition-all hover:bg-gray-100 active:scale-95">
            Send General Application
          </button>
        </motion.div>

      </div>
    </div>
  );
};

export default CareersPage;

