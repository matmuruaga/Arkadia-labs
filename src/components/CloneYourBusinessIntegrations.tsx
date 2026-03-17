// src/components/CloneYourBusinessIntegrations.tsx
// Integrations section for /clone-your-business landing page.
// Animated marquee logo cloud grouped by category with CTA to /integrations.

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import {
  FaSlack,
  FaSalesforce,
  FaHubspot,
  FaTrello,
  FaJira,
  FaGoogleDrive,
  FaWhatsapp,
  FaStripe,
} from 'react-icons/fa';
import {
  SiGooglemeet,
  SiAsana,
  SiGooglecalendar,
  SiBrevo,
} from 'react-icons/si';
import { BsMicrosoftTeams } from 'react-icons/bs';
import { BiLogoZoom, BiLogoGmail } from 'react-icons/bi';
import { RiNotionFill, RiCalendarScheduleLine } from 'react-icons/ri';
import type { IconType } from 'react-icons';
import { trackCtaClick, trackSectionView } from '@/utils/dataLayer';
import { cn } from '@/lib/utils';
import { useRef, useEffect, useState } from 'react';

// ============================================================================
// Types & Data
// ============================================================================

interface IntegrationLogo {
  id: string;
  name: string;
  Icon: IconType;
  color: string;
}

const integrationLogos: IntegrationLogo[] = [
  // CRM
  { id: 'salesforce', name: 'Salesforce', Icon: FaSalesforce, color: '#00A1E0' },
  { id: 'hubspot', name: 'HubSpot', Icon: FaHubspot, color: '#FF7A59' },
  // Communication
  { id: 'slack', name: 'Slack', Icon: FaSlack, color: '#4A154B' },
  { id: 'ms-teams', name: 'Microsoft Teams', Icon: BsMicrosoftTeams, color: '#6264A7' },
  { id: 'whatsapp', name: 'WhatsApp', Icon: FaWhatsapp, color: '#25D366' },
  { id: 'zoom', name: 'Zoom', Icon: BiLogoZoom, color: '#2D8CFF' },
  { id: 'google-meet', name: 'Google Meet', Icon: SiGooglemeet, color: '#00897B' },
  // Calendar
  { id: 'google-calendar', name: 'Google Calendar', Icon: SiGooglecalendar, color: '#4285F4' },
  { id: 'cal-com', name: 'Cal.com', Icon: RiCalendarScheduleLine, color: '#292929' },
  // Email
  { id: 'gmail', name: 'Gmail', Icon: BiLogoGmail, color: '#EA4335' },
  { id: 'brevo', name: 'Brevo', Icon: SiBrevo, color: '#0B996E' },
  // Productivity
  { id: 'notion', name: 'Notion', Icon: RiNotionFill, color: '#000000' },
  { id: 'jira', name: 'Jira', Icon: FaJira, color: '#0052CC' },
  { id: 'asana', name: 'Asana', Icon: SiAsana, color: '#F06A6A' },
  { id: 'trello', name: 'Trello', Icon: FaTrello, color: '#0079BF' },
  { id: 'google-drive', name: 'Google Drive', Icon: FaGoogleDrive, color: '#4285F4' },
  // Payments
  { id: 'stripe', name: 'Stripe', Icon: FaStripe, color: '#635BFF' },
];

// ============================================================================
// Marquee Row Component
// ============================================================================

interface MarqueeRowProps {
  logos: IntegrationLogo[];
  direction?: 'left' | 'right';
  speed?: number;
}

const MarqueeRow: React.FC<MarqueeRowProps> = ({
  logos,
  direction = 'left',
  speed = 30,
}) => {
  // Double logos for seamless loop
  const doubled = [...logos, ...logos];

  return (
    <div className="relative overflow-hidden py-3" aria-hidden="true">
      {/* Gradient masks on edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />

      <div
        className={cn(
          'flex w-max gap-8 md:gap-12',
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right',
        )}
        style={{ '--marquee-speed': `${speed}s` } as React.CSSProperties}
      >
        {doubled.map((logo, idx) => (
          <div
            key={`${logo.id}-${idx}`}
            className="flex flex-shrink-0 items-center gap-2.5 rounded-xl border border-gray-100 bg-white px-4 py-2.5 shadow-sm transition-shadow hover:shadow-md"
          >
            <logo.Icon
              className="h-6 w-6 flex-shrink-0"
              style={{ color: logo.color }}
            />
            <span className="whitespace-nowrap text-sm font-medium text-gray-700">
              {logo.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// Main Component
// ============================================================================

const CloneYourBusinessIntegrations: React.FC = () => {
  const { t, i18n } = useTranslation('clone-your-business');
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const [tracked, setTracked] = useState(false);

  // Track section view once
  useEffect(() => {
    if (tracked) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackSectionView('integrations', '/clone-your-business');
          setTracked(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [tracked]);

  const handleCtaClick = () => {
    trackCtaClick(
      'view_all_integrations',
      'clone_your_business_integrations',
      t('cloneYourBusiness.integrations.cta'),
    );
    navigate(`/${i18n.language}/integrations`);
  };

  // Split logos into two rows for visual variety
  const midpoint = Math.ceil(integrationLogos.length / 2);
  const row1 = integrationLogos.slice(0, midpoint);
  const row2 = integrationLogos.slice(midpoint);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="mx-auto mb-12 max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-600">
            {t('cloneYourBusiness.integrations.badge')}
          </span>
          <h2 className="mt-4 text-3xl font-bold text-[#0D1B2A] md:text-4xl lg:text-5xl">
            {t('cloneYourBusiness.integrations.title')}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#0D1B2A]/70">
            {t('cloneYourBusiness.integrations.subtitle')}
          </p>
        </motion.div>

        {/* Marquee Logo Cloud */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <MarqueeRow logos={row1} direction="left" speed={35} />
          <MarqueeRow logos={row2} direction="right" speed={40} />
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button
            onClick={handleCtaClick}
            className="group inline-flex items-center rounded-lg bg-[#1C7ED6] px-8 py-3 text-lg font-semibold text-white shadow-md transition-colors duration-300 hover:bg-[#1565C0] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#1C7ED6] focus:ring-opacity-50"
          >
            {t('cloneYourBusiness.integrations.cta')}
            <ArrowRight
              size={20}
              className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CloneYourBusinessIntegrations;
