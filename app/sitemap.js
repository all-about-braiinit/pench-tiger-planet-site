export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.penchtigerplanet.com'
  const now = new Date()

  return [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/rooms`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/rooms/garden-view`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/rooms/lake-view`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/gallery`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${base}/booking`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
  ]
}
