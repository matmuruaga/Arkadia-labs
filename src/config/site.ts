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
  // OG Image: Should be 1200x630px minimum. Update this URL when a proper OG image is created.
  defaultOgImage: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1759500046/arcadia_labs_COMPLETO_oggaxg.svg',
} as const;

export type SupportedLocale = (typeof SITE_CONFIG.locales)[number];
