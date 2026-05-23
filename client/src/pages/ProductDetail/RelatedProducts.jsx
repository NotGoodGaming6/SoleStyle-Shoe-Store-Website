import { useState, useEffect } from 'react';
import ProductCard from '@components/shared/ProductCard';

const RelatedProducts = ({ category, currentProductId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/solestyle/products?category=${category}`);
        const data = await res.json();
        setRelatedProducts(data.filter(p => p.id !== currentProductId).slice(0, 4));
      } catch (e) {
        console.error("Failed to fetch related products", e);
      }
    };

    if (category) {
      fetchRelatedProducts();
    }
  }, [category, currentProductId]);

  if (relatedProducts.length === 0) return null;

  return (
    <section className="py-12 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">You Might Also Like</h2>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {relatedProducts.map(relProduct => (
            <ProductCard key={relProduct.id || relProduct._id} product={relProduct} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;

