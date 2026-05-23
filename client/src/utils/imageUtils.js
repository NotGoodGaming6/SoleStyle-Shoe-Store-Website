export const getProductImageUrl = (image, category, id) => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';

  if (!image) {
    const safeCategory = category ? category.toLowerCase() : 'sneakers';
    return `/images/products/${safeCategory}/${id}.webp`;
  }
  
  if (image.startsWith('http') || image.startsWith('data:')) {
    return image;
  }
  
  if (image.startsWith('/uploads')) {
    return `${apiBaseUrl}${image}`;
  }
  
  if (image.startsWith('uploads')) {
    return `${apiBaseUrl}/${image}`;
  }
  
  if (image.startsWith('images/')) {
    return `/${image}`;
  }
  
  if (image.startsWith('/images/')) {
    return image;
  }
  
  return image.startsWith('/') ? image : `/${image}`;
};
