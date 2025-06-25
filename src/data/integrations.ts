// src/data/integrations.ts
import type { IconType } from 'react-icons';
import { FaSlack, FaSalesforce, FaHubspot, FaTrello, FaIntercom, FaJira, FaGoogleDrive } from 'react-icons/fa';
import { SiAmazon, SiGooglemeet, SiAsana } from 'react-icons/si';
import { BsMicrosoftTeams } from 'react-icons/bs';
import { BiLogoZoom, BiLogoGmail } from 'react-icons/bi';
import { DiCisco } from 'react-icons/di';
import { RiNotionFill } from 'react-icons/ri';

export interface Integration {
  id: string;
  nameKey: string;
  Icon: IconType;
  descriptionKey?: string;
  categoryKey: 'marketing' | 'crm' | 'communication' | 'support' | 'productivity';
}

// Todas las claves ahora usan "integrationsPage" como raíz
export const allIntegrations: Integration[] = [
  // CRM
  { id: 'salesforce', nameKey: 'integrationsPage.list.salesforce.name', Icon: FaSalesforce, categoryKey: 'crm', descriptionKey: 'integrationsPage.list.salesforce.description' },
  { id: 'hubspot', nameKey: 'integrationsPage.list.hubspot.name', Icon: FaHubspot, categoryKey: 'crm', descriptionKey: 'integrationsPage.list.hubspot.description' },

  // Comunicación
  { id: 'zoom', nameKey: 'integrationsPage.list.zoom.name', Icon: BiLogoZoom, categoryKey: 'communication', descriptionKey: 'integrationsPage.list.zoom.description' },
  { id: 'google-meet', nameKey: 'integrationsPage.list.google_meet.name', Icon: SiGooglemeet, categoryKey: 'communication', descriptionKey: 'integrationsPage.list.google_meet.description' },
  { id: 'ms-teams', nameKey: 'integrationsPage.list.ms_teams.name', Icon: BsMicrosoftTeams, categoryKey: 'communication', descriptionKey: 'integrationsPage.list.ms_teams.description' },
  { id: 'slack', nameKey: 'integrationsPage.list.slack.name', Icon: FaSlack, categoryKey: 'communication', descriptionKey: 'integrationsPage.list.slack.description'},
  { id: 'amazon-chime', nameKey: 'integrationsPage.list.amazon_chime.name', Icon: SiAmazon, categoryKey: 'communication' },
  { id: 'cisco-webex', nameKey: 'integrationsPage.list.cisco_webex.name', Icon: DiCisco, categoryKey: 'communication' },
  
  // Soporte
  { id: 'intercom', nameKey: 'integrationsPage.list.intercom.name', Icon: FaIntercom, categoryKey: 'support' },
  
  // Productividad
  { id: 'jira', nameKey: 'integrationsPage.list.jira.name', Icon: FaJira, categoryKey: 'productivity' },
  { id: 'notion', nameKey: 'integrationsPage.list.notion.name', Icon: RiNotionFill, categoryKey: 'productivity' },
  { id: 'trello', nameKey: 'integrationsPage.list.trello.name', Icon: FaTrello, categoryKey: 'productivity' },
  { id: 'asana', nameKey: 'integrationsPage.list.asana.name', Icon: SiAsana, categoryKey: 'productivity' },
  { id: 'gmail', nameKey: 'integrationsPage.list.gmail.name', Icon: BiLogoGmail, categoryKey: 'productivity' },
  { id: 'drive', nameKey: 'integrationsPage.list.google_drive.name', Icon: FaGoogleDrive, categoryKey: 'productivity' },
];

export const categoryKeys = [...new Set(allIntegrations.map(item => item.categoryKey))];
export const featuredIntegrations = allIntegrations.filter(i => i.descriptionKey);
export const allIntegrationsLogos = allIntegrations.map(({ id, Icon, nameKey }) => ({ id, Icon, nameKey }));