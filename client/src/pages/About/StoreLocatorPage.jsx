import { motion } from 'framer-motion';

const StoreLocatorPage = () => {
  const stores = [
    {
      name: "SoleStyle Flagship - SoHo",
      address: "123 Broadway, New York, NY 10012",
      phone: "+1 (212) 555-0198",
      hours: "Mon-Sat: 10am - 8pm, Sun: 11am - 7pm",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.479590629731!2d-73.9996562!3d40.725916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2598fc2be0413%3A0x6790a3692ea4087e!2sSoHo%2C%20New%20York%2C%20NY!5e0!3m2!1saz!2saz!4v1776348888000!5m2!1saz!2saz"
    },
    {
      name: "SoleStyle Tech Hub - London",
      address: "45 Oxford St, London W1D 2DZ, UK",
      phone: "+44 20 7946 0123",
      hours: "Mon-Sat: 9am - 9pm, Sun: 12pm - 6pm",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.9050212!2d-0.1340401!3d51.5152862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761ad000000001%3A0x1d00000000000000!2sOxford%20St%2C%20London!5e0!3m2!1saz!2saz!4v1776348889000!5m2!1saz!2saz"
    },
    {
       name: "SoleStyle Boutique - Baku",
       address: "Nizami Street 68, Baku, Azerbaijan",
       phone: "+994 12 493 00 00",
       hours: "Mon-Sun: 10am - 10pm",
       mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.4284948!2d49.8450!3d40.3758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d9!2sNizami%20Street%2C%20Baku!5e0!3m2!1saz!2saz!4v1776348890000!5m2!1saz!2saz"
    }
  ];

  return (
    <div className="min-h-screen bg-white py-20 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="font-display text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">Store Locator</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Visit us in person to experience the SoleStyle difference.</p>
        </motion.div>

        <div className="mt-16 grid gap-12 lg:grid-cols-3">
          
          <div className="lg:col-span-1 space-y-6 max-h-[700px] overflow-y-auto pr-4 custom-scrollbar">
            {stores.map((store, idx) => (
              <motion.div 
                key={store.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-2xl border border-gray-100 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900/50 hover:border-primary-500/50 transition-all cursor-pointer group"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">{store.name}</h3>
                <div className="mt-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-primary-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <p className="text-gray-600 dark:text-gray-400">{store.address}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    <p className="text-gray-600 dark:text-gray-400">{store.phone}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <p className="text-gray-600 dark:text-gray-400">{store.hours}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2 h-[700px] rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-2xl relative"
          >
            <iframe 
              src={stores[0].mapUrl} 
              className="w-full h-full border-0" 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            
            <div className="absolute top-4 left-4 right-4 flex justify-between gap-4">
               <div className="flex-1 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-lg dark:bg-gray-900/95 border border-gray-100 dark:border-gray-800">
                  <input type="text" placeholder="Enter zip code or city..." className="w-full bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white placeholder:text-gray-500" />
               </div>
               <button className="bg-primary-600 text-white px-6 rounded-xl font-bold shadow-lg shadow-primary-500/20 hover:bg-primary-700 transition-colors">Search</button>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default StoreLocatorPage;

