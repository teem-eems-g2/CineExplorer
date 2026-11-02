import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return [
    {
      url: `${baseUrl}/home`,
      lastModified: new Date('2026-03-21'),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/home#trending`,
      lastModified: new Date('2026-03-21'),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/home#categories`,
      lastModified: new Date('2026-03-21'),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/home#featured`,
      lastModified: new Date('2026-03-21'),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ];
}
