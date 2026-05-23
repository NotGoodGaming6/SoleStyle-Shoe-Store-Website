import { motion, AnimatePresence } from 'framer-motion';

const images = {
  login: "/images/basketball.webp",
  register: "/images/casual.webp"
};

const AuthDecorativeSide = ({ isLogin }) => {
  return (
    <div className="relative hidden w-1/2 lg:block">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={isLogin ? 'img-login' : 'img-reg'}
          initial={{ opacity: 0, x: isLogin ? 100 : -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: isLogin ? -100 : 100 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 h-full w-full"
        >
          <img 
            src={isLogin ? images.login : images.register}
            alt="Product" 
            className="h-full w-full object-cover grayscale-[0.2] brightness-[0.8] transition-all hover:grayscale-0 hover:brightness-100"
          />
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-gray-900/80 via-transparent to-transparent p-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-md"
            >
              <h3 className="text-2xl font-bold text-white">
                {isLogin ? "Limitless Performance" : "Style Meets Comfort"}
              </h3>
              <p className="mt-2 text-gray-200">
                {isLogin 
                  ? "Engineered for those who never stop. Experience the future of footwear."
                  : "Handcrafted details and premium materials for your daily commute."}
              </p>
              <div className="mt-6 flex gap-2">
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/20">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: isLogin ? '100%' : '30%' }}
                    className="h-full bg-white transition-all duration-1000"
                  />
                </div>
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/20">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: isLogin ? '30%' : '100%' }}
                    className="h-full bg-white transition-all duration-1000"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AuthDecorativeSide;

