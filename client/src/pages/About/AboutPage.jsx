import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="font-sans text-gray-900 transition-colors duration-300 dark:bg-gray-950 dark:text-white">
      <section className="relative overflow-hidden bg-gray-950 py-24 lg:py-32">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-primary-950/20"></div>
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-primary-500/10 blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-primary-600/5 blur-[120px]"></div>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-display text-5xl font-extrabold tracking-tight text-white lg:text-7xl">
              Our <span className="text-primary-500">Story</span>
            </h1>
            <p className="mt-8 text-xl font-medium text-gray-300 sm:text-2xl">
              We believe in the power of the perfect step.
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
              SoleStyle was founded with a singular vision: to revolutionize the footwear industry by blending high-performance engineering with timeless aesthetic design.
            </p>
          </div>
        </div>
      </section>
 
      <section className="bg-white py-16 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
            {[
              { label: 'Happy Customers', value: '500K+' },
              { label: 'Shoe Styles', value: '200+' },
              { label: 'Countries Served', value: '15' },
              { label: 'Average Rating', value: '4.9' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="font-display text-4xl font-bold text-gray-900 dark:text-white lg:text-5xl">{stat.value}</p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-primary-600 dark:text-primary-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      <section className="bg-gray-50 py-20 dark:bg-gray-900/50 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="space-y-10">
              <div>
                <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Making every step count</h2>
                <div className="mt-4 h-1.5 w-20 rounded-full bg-primary-500"></div>
                <p className="mt-8 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  Our journey began in a small workshop with a big dream. We saw that runners and athletes often had to choose between shoes that looked good and shoes that worked well. We decided that no one should ever have to make that compromise again.
                </p>
              </div>
 
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl bg-white p-6 shadow-sm transition-transform hover:-translate-y-1 dark:bg-gray-800">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-900/40 dark:text-primary-400">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Quality First</h4>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Uncompromising standards in every stitch and material choice.</p>
                </div>
                <div className="rounded-2xl bg-white p-6 shadow-sm transition-transform hover:-translate-y-1 dark:bg-gray-800">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-900/40 dark:text-primary-400">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2.5 2.5 0 012.5-2.5h1.065m-2.72 5.039a4.5 4.5 0 01-1.242 3.066L15 17h1a2 2 0 002-2 2 2 0 012-2c1 0 1.996-.143 2.946-.409m-2.73 11.118A9.722 9.722 0 0020 12a9.722 9.722 0 00-20 0c0 1.439.31 2.805.865 4.033L3 17a2 2 0 002 2 2 2 0 012 2v1" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Eco-Conscious</h4>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Committed to sustainable practices and planet-friendly materials.</p>
                </div>
              </div>
            </div>
 
            <div className="relative lg:pl-12">
              <div className="relative aspect-square overflow-hidden rounded-[40px] border-8 border-white shadow-2xl dark:border-gray-800">
                <img 
                  src="/images/boots.webp" 
                  alt="Crafting shoes" 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 flex h-32 w-32 items-center justify-center rounded-3xl bg-primary-600 p-4 text-center text-white shadow-2xl outline outline-8 outline-white dark:outline-gray-950 sm:-bottom-12 sm:-left-12 sm:h-44 sm:w-44 lg:left-0 lg:h-52 lg:w-52">
                <div>
                  <p className="font-display text-4xl font-extrabold sm:text-6xl lg:text-7xl">6</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] sm:text-xs">Years of <br /> innovation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
 
      <section className="bg-white py-20 dark:bg-gray-950 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Our Values</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">The principles that drive every design and decision at SoleStyle.</p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Innovation', desc: 'We continuously explorer new materials and manufacturing techniques to push the boundaries of whats possible.' },
              { title: 'Customer Love', desc: 'Everything we do starts and ends with our community. Your feedback is what inspires our next breakthrough.' },
              { title: 'Sustainability', desc: 'Crafting premium products shouldn’t cost the earth. We are on a mission to be climate-positive by 2030.' },
            ].map((value, i) => (
              <div key={i} className="group relative rounded-3xl border border-gray-100 bg-white p-10 transition-all hover:border-primary-100 hover:shadow-2xl hover:shadow-primary-600/10 dark:border-gray-800 dark:bg-gray-900">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">{value.title}</h3>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 dark:bg-gray-900/50 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl text-center">Our Leadership</h2>
            <div className="mt-4 mx-auto h-1.5 w-20 rounded-full bg-primary-500"></div>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'Marcus Chen', role: 'Founder & CEO', img: '/images/stride-asset-2.webp' },
              { name: 'Sarah Jenkins', role: 'Head of Design', img: '/images/stride-asset-3.webp' },
              { name: 'David Wilson', role: 'Chief Technologist', img: '/images/stride-asset-4.webp' },
              { name: 'Elena Rodriguez', role: 'VP of Marketing', img: '/images/stride-asset-5.webp' },
            ].map((member, i) => (
              <div key={i} className="group">
                <div className="overflow-hidden rounded-3xl grayscale transition-all duration-500 group-hover:grayscale-0">
                  <img src={member.img} alt={member.name} className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="mt-6">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">{member.name}</h4>
                  <p className="text-sm font-medium text-primary-600 dark:text-primary-400">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 dark:bg-gray-950 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
           <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl text-center">Loved by athletes and enthusiasts</h2>
           <div className="mt-16 grid gap-8 lg:grid-cols-2 text-left">
              {[
                { quote: "The best pair of running shoes I've ever owned. The attention to detail is just unmatched.", author: "Alex Rivera", role: "Marathon Runner" },
                { quote: "Finally a brand that understands that style doesn't have to sacrifice performance.", author: "Sophie Miller", role: "Fitness Influencer" }
              ].map((item, i) => (
                <div key={i} className="rounded-3xl bg-gray-50 p-10 dark:bg-gray-900">
                  <p className="text-2xl font-medium text-gray-900 dark:text-white italic leading-relaxed">"{item.quote}"</p>
                  <div className="mt-8 flex items-center gap-4">
                    <div className="h-1 bg-primary-500 w-8"></div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">{item.author}</p>
                      <p className="text-sm text-gray-500">{item.role}</p>
                    </div>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      <section className="bg-white pb-20 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="relative overflow-hidden rounded-[40px] bg-primary-600 px-8 py-16 text-center shadow-2xl lg:py-24">
            <div className="absolute inset-0">
               <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
               <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-500/50 blur-[100px]"></div>
               <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-primary-400/30 blur-[100px]"></div>
            </div>
            <div className="relative mx-auto max-w-3xl">
              <h2 className="font-display text-4xl font-bold text-white sm:text-5xl lg:text-4xl">Ready to find your <span className="text-white/90 underline decoration-white/30 underline-offset-8">perfect pair?</span></h2>
              <p className="mx-auto mt-8 max-w-3xl text-lg text-primary-50 lg:text-xl">Browse our collection and step into comfort and style. Free shipping on all orders over $75.</p>
              <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link to="/products" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-primary-600 shadow-lg transition-all hover:bg-gray-50 hover:scale-105 active:scale-95">
                  Shop Now
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </Link>
                <Link to="/categories" className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-4 font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white">
                  Browse Categories
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

