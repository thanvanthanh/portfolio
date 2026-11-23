import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://thanvanthanh.info.vn';
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/#ai-systems`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/#work`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/#skills`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/#experience`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/#contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ];
}
