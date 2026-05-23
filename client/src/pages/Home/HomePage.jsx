import { useState, useEffect } from 'react';
import HeroSection from '@pages/Home/components/HeroSection';
import CategoriesSection from '@pages/Home/components/CategoriesSection';
import FeaturedSection from '@pages/Home/components/FeaturedSection';
import FeaturesGrid from '@pages/Home/components/FeaturesGrid';
import NewArrivalsSection from '@pages/Home/components/NewArrivalsSection';
import TestimonialSection from '@pages/Home/components/TestimonialSection';
import NewsletterSection from '@pages/Home/components/NewsletterSection';
import SEO from '@components/shared/SEO';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const featuredRes = await fetch(import.meta.env.VITE_API_BASE_URL + '/api/solestyle/products?filter=featured');
        const featuredData = await featuredRes.json();
        setFeaturedProducts(featuredData.slice(0, 4));

        const newRes = await fetch(import.meta.env.VITE_API_BASE_URL + '/api/solestyle/products?filter=new');
        const newData = await newRes.json();
        setNewArrivals(newData.slice(0, 4));
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <SEO 
        title="Home" 
        description="Premium footwear for every step of your journey. Discover the latest sneakers, athletic shoes, and more at SoleStyle." 
      />
      <HeroSection />
      <CategoriesSection />
      <FeaturedSection featuredProducts={featuredProducts} />
      <FeaturesGrid />
      <NewArrivalsSection newArrivals={newArrivals} />
      <TestimonialSection />
      <NewsletterSection />
    </>
  );
};

export default Home;

