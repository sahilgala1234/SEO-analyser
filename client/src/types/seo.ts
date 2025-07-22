export interface SeoData {
  url: string;
  title?: string;
  metaDescription?: string;
  metaKeywords?: string;
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
    siteName?: string;
    locale?: string;
    fbAppId?: string;
  };
  twitterCard?: {
    card?: string;
    title?: string;
    description?: string;
    image?: string;
    site?: string;
    creator?: string;
  };
  score: number;
  recommendations: {
    type: 'error' | 'warning' | 'success' | 'info';
    title: string;
    description: string;
  }[];
}
