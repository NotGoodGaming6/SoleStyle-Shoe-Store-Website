import { getProductImageUrl } from '@utils/imageUtils';

const NewArrivals = ({ products }) => {
  return (
    <div className="rounded-[2.5rem] border border-gray-200 bg-white p-10 dark:border-gray-800 dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">New Arrivals</h2>
      <div className="space-y-6">
        {products?.map((product) => (
          <div key={product.id} className="flex items-center">
            <div className="h-14 w-14 rounded-2xl bg-gray-100 dark:bg-gray-800 overflow-hidden">
              <img 
                src={getProductImageUrl(product.image, product.category, product.id)}
                onError={(e) => { e.target.src = '/placeholder.svg' }}
                className="h-full w-full object-cover" 
                alt="" 
              />
            </div>
            <div className="ml-4">
              <p className="font-bold text-gray-900 dark:text-white truncate max-w-[150px]">{product.name}</p>
              <p className="text-xs text-gray-500">${product.price} • {product.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;

