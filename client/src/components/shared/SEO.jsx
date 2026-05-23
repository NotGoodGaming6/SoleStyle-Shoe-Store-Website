import { useEffect } from 'react';

const SEO = ({ title, description }) => {
  useEffect(() => {
    // Update Title
    const baseTitle = 'SoleStyle';
    document.title = title ? `${title} | ${baseTitle}` : `${baseTitle} | Premium Footwear`;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description || 'Discover premium sneakers and performance footwear at SoleStyle.');

    // Update OpenGraph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', title || baseTitle);

  }, [title, description]);

  return null;
};

export default SEO;
