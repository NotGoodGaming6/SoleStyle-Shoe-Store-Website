import { motion } from 'framer-motion';

const TestimonialSection = () => {
  return (
    <section className="bg-gray-950 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-500/10 px-4 py-1.5 text-sm font-medium text-primary-400">
            Customer Love
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">What Our Customers Say</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">Join thousands of happy customers who have made SoleStyle their go-to footwear brand</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.15 }}
          className="mt-16 grid gap-8 lg:grid-cols-3"
        >
          {[
            { name: 'Marcus Chen', role: 'Marathon Runner', text: 'SoleStyle has completely transformed my running experience. The Velocity Runner Pro helped me PR at my last marathon by 8 minutes.', img: '/images/stride-asset-17.webp' },
            { name: 'Emily Rodriguez', role: 'Fitness Instructor', text: 'I wear SoleStyle shoes for all my classes. They are versatile, stylish, and most importantly, my feet never hurt after a long day of training.', img: '/images/stride-asset-18.webp' },
            { name: 'David Kim', role: 'Sneaker Enthusiast', text: 'The quality and attention to detail is unmatched. I have been collecting sneakers for 15 years and SoleStyle has become my go-to brand.', img: '/images/stride-asset-19.webp' }
          ].map((review, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-gray-900 p-8"
            >
              <div className="flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <blockquote className="mt-6 text-lg text-gray-300">"{review.text}"</blockquote>
              <div className="mt-8 flex items-center gap-4">
                <img src={review.img} alt={review.name} className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-white">{review.name}</p>
                  <p className="text-sm text-gray-500">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 border-t border-gray-800 pt-12">
          <div className="text-center">
            <div className="font-display text-4xl font-bold text-white">50K+</div>
            <p className="mt-1 text-sm text-gray-500">Happy Customers</p>
          </div>
          <div className="h-12 w-px bg-gray-800"></div>
          <div className="text-center">
            <div className="font-display text-4xl font-bold text-white">4.9/5</div>
            <p className="mt-1 text-sm text-gray-500">Average Rating</p>
          </div>
          <div className="h-12 w-px bg-gray-800"></div>
          <div className="text-center">
            <div className="font-display text-4xl font-bold text-white">15K+</div>
            <p className="mt-1 text-sm text-gray-500">5-Star Reviews</p>
          </div>
          <div className="h-12 w-px bg-gray-800"></div>
          <div className="text-center">
            <div className="font-display text-4xl font-bold text-white">98%</div>
            <p className="mt-1 text-sm text-gray-500">Would Recommend</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;

