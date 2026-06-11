import { useEffect } from 'react';

const SEO = ({ title, description }) => {
  const siteName = 'DineFlow';
  const defaultDescription = 'Smart Restaurant Management & Reservation Platform. Book tables, explore our menu, and experience fine dining.';

  useEffect(() => {
    document.title = title ? `${title} | ${siteName}` : `${siteName} - Smart Restaurant Management & Reservation Platform`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description || defaultDescription);
    }
  }, [title, description]);

  return null;
};

export default SEO;
