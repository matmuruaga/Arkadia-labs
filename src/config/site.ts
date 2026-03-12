// src/config/site.ts
// Single source of truth for site-wide configuration

export const SITE_CONFIG = {
  url: 'https://arkadialabs.io',
  name: 'Arkadia Labs',
  description: 'Arkadia Labs creates intelligent AI agents that help companies automate and optimize their processes for faster, smarter growth.',
  logo: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1759500046/arcadia_labs_COMPLETO_oggaxg.svg',
  socialLinks: {
    linkedin: 'https://www.linkedin.com/company/arkadia-labs/',
  },
  contactEmail: 'info@arkadialabs.io',
  defaultLocale: 'en' as const,
  locales: ['en', 'es', 'cs'] as const,
  // OG Image: 1200x630px JPG generated from logo via Cloudinary transformations.
  // TODO: Replace with a proper branded OG image (1200x630px) when available.
  defaultOgImage: 'https://res.cloudinary.com/dwhidn4z1/image/upload/w_1200,h_630,c_pad,b_white,f_jpg,q_auto/v1759500046/arcadia_labs_COMPLETO_oggaxg.svg',
} as const;

export type SupportedLocale = (typeof SITE_CONFIG.locales)[number];
