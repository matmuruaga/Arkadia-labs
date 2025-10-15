// src/utils/dataLayer.ts
/**
 * Google Analytics 4 DataLayer Utility
 *
 * This file contains all GA4 event tracking functions for Arkadia Labs website.
 * Every trackable user interaction should have a corresponding function here.
 *
 * IMPORTANT: When adding new components or modifying existing ones, update this file
 * to ensure proper event tracking. See CLAUDE.md for guidelines.
 */

// Extend Window interface to include dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

// Initialize dataLayer if it doesn't exist
if (typeof window !== 'undefined' && !window.dataLayer) {
  window.dataLayer = [];
}

/**
 * Generic function to push events to dataLayer
 * In development mode, logs events to console for debugging
 * In production mode, silently pushes to dataLayer without console output
 */
const pushToDataLayer = (eventData: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(eventData);

    // Only log in development mode
    if (import.meta.env.DEV) {
      console.log('GA4 Event:', eventData);
    }
  }
};

// ============================================================================
// PAGE VIEW EVENTS
// ============================================================================

/**
 * Track page views with language and path
 */
export const trackPageView = (pagePath: string, pageTitle: string, language: string) => {
  pushToDataLayer({
    event: 'page_view',
    page_path: pagePath,
    page_title: pageTitle,
    language: language,
  });
};

// ============================================================================
// NAVIGATION EVENTS
// ============================================================================

/**
 * Track navigation clicks in header
 */
export const trackNavigationClick = (linkName: string, destination: string) => {
  pushToDataLayer({
    event: 'navigation_click',
    link_name: linkName,
    link_destination: destination,
    component: 'header',
  });
};

/**
 * Track mobile menu interactions
 */
export const trackMobileMenuToggle = (action: 'open' | 'close') => {
  pushToDataLayer({
    event: 'mobile_menu_toggle',
    action: action,
  });
};

/**
 * Track language switch
 */
export const trackLanguageSwitch = (fromLang: string, toLang: string) => {
  pushToDataLayer({
    event: 'language_switch',
    from_language: fromLang,
    to_language: toLang,
  });
};

// ============================================================================
// FORM EVENTS
// ============================================================================

/**
 * Track contact form start
 */
export const trackFormStart = (formName: string, formLocation: string) => {
  pushToDataLayer({
    event: 'form_start',
    form_name: formName,
    form_location: formLocation,
  });
};

/**
 * Track contact form submission
 */
export const trackFormSubmit = (formName: string, formData: {
  companySize?: string;
  role?: string;
  formLocation: string;
}) => {
  pushToDataLayer({
    event: 'form_submit',
    form_name: formName,
    company_size: formData.companySize,
    user_role: formData.role,
    form_location: formData.formLocation,
  });
};

/**
 * Track form submission success
 */
export const trackFormSuccess = (formName: string, formLocation: string) => {
  pushToDataLayer({
    event: 'form_success',
    form_name: formName,
    form_location: formLocation,
  });
};

/**
 * Track form validation errors
 */
export const trackFormError = (formName: string, errorField: string, errorMessage: string) => {
  pushToDataLayer({
    event: 'form_error',
    form_name: formName,
    error_field: errorField,
    error_message: errorMessage,
  });
};

// ============================================================================
// CTA EVENTS
// ============================================================================

/**
 * Track "Get Started" button clicks
 */
export const trackGetStartedClick = (location: string, ctaText: string) => {
  pushToDataLayer({
    event: 'cta_click',
    cta_type: 'get_started',
    cta_location: location,
    cta_text: ctaText,
  });
};

/**
 * Track "Login" button clicks
 */
export const trackLoginClick = (location: string) => {
  pushToDataLayer({
    event: 'cta_click',
    cta_type: 'login',
    cta_location: location,
    external_link: 'https://app.arkadialabs.io',
  });
};

/**
 * Track general CTA button clicks
 */
export const trackCtaClick = (ctaType: string, location: string, ctaText?: string) => {
  pushToDataLayer({
    event: 'cta_click',
    cta_type: ctaType,
    cta_location: location,
    cta_text: ctaText,
  });
};

// ============================================================================
// CALENDLY / SCHEDULING EVENTS
// ============================================================================

/**
 * Track Calendly modal open
 */
export const trackCalendlyOpen = (location: string) => {
  pushToDataLayer({
    event: 'calendly_open',
    calendly_location: location,
  });
};

/**
 * Track Calendly modal close
 */
export const trackCalendlyClose = (location: string) => {
  pushToDataLayer({
    event: 'calendly_close',
    calendly_location: location,
  });
};

/**
 * Track Calendly event scheduled
 */
export const trackCalendlyScheduled = (location: string, eventDetails?: any) => {
  pushToDataLayer({
    event: 'calendly_scheduled',
    calendly_location: location,
    event_details: eventDetails,
  });
};

// ============================================================================
// PRICING EVENTS
// ============================================================================

/**
 * Track pricing plan view
 */
export const trackPricingView = () => {
  pushToDataLayer({
    event: 'pricing_view',
  });
};

/**
 * Track pricing plan selection
 */
export const trackPricingPlanClick = (planName: string, planPrice: string, isRecommended: boolean) => {
  pushToDataLayer({
    event: 'pricing_plan_click',
    plan_name: planName,
    plan_price: planPrice,
    is_recommended: isRecommended,
  });
};

// ============================================================================
// ROI CALCULATOR EVENTS
// ============================================================================

/**
 * Track ROI calculator interaction start
 */
export const trackRoiCalculatorStart = () => {
  pushToDataLayer({
    event: 'roi_calculator_start',
  });
};

/**
 * Track ROI calculator plan selection
 */
export const trackRoiPlanChange = (planName: string) => {
  pushToDataLayer({
    event: 'roi_plan_change',
    selected_plan: planName,
  });
};

/**
 * Track ROI calculator input changes
 */
export const trackRoiInputChange = (inputName: string, value: number) => {
  pushToDataLayer({
    event: 'roi_input_change',
    input_name: inputName,
    input_value: value,
  });
};

/**
 * Track ROI calculation results
 */
export const trackRoiResults = (
  planName: string,
  numReps: number,
  avgDealSize: number,
  monthlyLeads: number,
  revenueGain: number,
  hoursSaved: number,
  roi: number
) => {
  pushToDataLayer({
    event: 'roi_calculated',
    plan_name: planName,
    num_reps: numReps,
    avg_deal_size: avgDealSize,
    monthly_leads: monthlyLeads,
    revenue_gain: revenueGain,
    hours_saved: hoursSaved,
    roi_percentage: roi,
  });
};

// ============================================================================
// CASE STUDY EVENTS
// ============================================================================

/**
 * Track case study card click
 */
export const trackCaseStudyClick = (caseStudyName: string, industry: string, location: string) => {
  pushToDataLayer({
    event: 'case_study_click',
    case_study_name: caseStudyName,
    industry: industry,
    click_location: location,
  });
};

/**
 * Track case study section view
 */
export const trackCaseStudySectionView = (caseStudyName: string, section: string) => {
  pushToDataLayer({
    event: 'case_study_section_view',
    case_study_name: caseStudyName,
    section_name: section,
  });
};

// ============================================================================
// INTEGRATION EVENTS
// ============================================================================

/**
 * Track integrations page filter
 */
export const trackIntegrationFilter = (category: string) => {
  pushToDataLayer({
    event: 'integration_filter',
    filter_category: category,
  });
};

/**
 * Track integration card click
 */
export const trackIntegrationClick = (integrationName: string, category: string) => {
  pushToDataLayer({
    event: 'integration_click',
    integration_name: integrationName,
    integration_category: category,
  });
};

// ============================================================================
// FAQ EVENTS
// ============================================================================

/**
 * Track FAQ accordion toggle
 */
export const trackFaqToggle = (question: string, action: 'open' | 'close') => {
  pushToDataLayer({
    event: 'faq_toggle',
    faq_question: question,
    action: action,
  });
};

// ============================================================================
// VIDEO / MEDIA EVENTS
// ============================================================================

/**
 * Track video play
 */
export const trackVideoPlay = (videoName: string, location: string) => {
  pushToDataLayer({
    event: 'video_play',
    video_name: videoName,
    video_location: location,
  });
};

/**
 * Track video complete
 */
export const trackVideoComplete = (videoName: string, location: string) => {
  pushToDataLayer({
    event: 'video_complete',
    video_name: videoName,
    video_location: location,
  });
};

// ============================================================================
// SCROLL / ENGAGEMENT EVENTS
// ============================================================================

/**
 * Track scroll depth milestones
 */
export const trackScrollDepth = (depth: number, pagePath: string) => {
  pushToDataLayer({
    event: 'scroll_depth',
    scroll_percentage: depth,
    page_path: pagePath,
  });
};

/**
 * Track section view (when user scrolls into view)
 */
export const trackSectionView = (sectionName: string, pagePath: string) => {
  pushToDataLayer({
    event: 'section_view',
    section_name: sectionName,
    page_path: pagePath,
  });
};

// ============================================================================
// ELEVENLABS WIDGET EVENTS
// ============================================================================

/**
 * Track ElevenLabs AI widget open
 */
export const trackAiWidgetOpen = () => {
  pushToDataLayer({
    event: 'ai_widget_open',
    widget_type: 'elevenlabs_conversational_ai',
  });
};

/**
 * Track ElevenLabs AI widget close
 */
export const trackAiWidgetClose = (duration?: number) => {
  pushToDataLayer({
    event: 'ai_widget_close',
    widget_type: 'elevenlabs_conversational_ai',
    interaction_duration: duration,
  });
};

/**
 * Track AI widget conversation start
 */
export const trackAiConversationStart = () => {
  pushToDataLayer({
    event: 'ai_conversation_start',
    widget_type: 'elevenlabs_conversational_ai',
  });
};

// ============================================================================
// SOCIAL / EXTERNAL LINKS
// ============================================================================

/**
 * Track external link clicks
 */
export const trackExternalLinkClick = (linkUrl: string, linkText: string, location: string) => {
  pushToDataLayer({
    event: 'external_link_click',
    link_url: linkUrl,
    link_text: linkText,
    link_location: location,
  });
};

/**
 * Track social media link clicks
 */
export const trackSocialClick = (platform: string, location: string) => {
  pushToDataLayer({
    event: 'social_click',
    social_platform: platform,
    click_location: location,
  });
};

// ============================================================================
// ERROR TRACKING
// ============================================================================

/**
 * Track JavaScript errors
 */
export const trackError = (errorMessage: string, errorLocation: string, errorStack?: string) => {
  pushToDataLayer({
    event: 'error',
    error_message: errorMessage,
    error_location: errorLocation,
    error_stack: errorStack,
  });
};

/**
 * Track 404 errors
 */
export const track404Error = (attemptedPath: string) => {
  pushToDataLayer({
    event: '404_error',
    attempted_path: attemptedPath,
  });
};

// ============================================================================
// CONVERSION EVENTS
// ============================================================================

/**
 * Track lead generation (thank you page view)
 */
export const trackLeadGeneration = (formSource: string) => {
  pushToDataLayer({
    event: 'generate_lead',
    form_source: formSource,
  });
};

/**
 * Track demo request
 */
export const trackDemoRequest = (source: string) => {
  pushToDataLayer({
    event: 'demo_request',
    request_source: source,
  });
};

// ============================================================================
// USER ENGAGEMENT
// ============================================================================

/**
 * Track time on page (call this when user leaves or after certain duration)
 */
export const trackTimeOnPage = (pagePath: string, timeInSeconds: number) => {
  pushToDataLayer({
    event: 'time_on_page',
    page_path: pagePath,
    time_seconds: timeInSeconds,
  });
};

/**
 * Track feature comparison table interaction
 */
export const trackFeatureComparisonView = () => {
  pushToDataLayer({
    event: 'feature_comparison_view',
  });
};

/**
 * Track testimonial carousel interaction
 */
export const trackTestimonialInteraction = (action: 'next' | 'previous' | 'click', testimonialIndex?: number) => {
  pushToDataLayer({
    event: 'testimonial_interaction',
    action: action,
    testimonial_index: testimonialIndex,
  });
};

// ============================================================================
// EXPORT ALL TRACKING FUNCTIONS
// ============================================================================

export default {
  // Page views
  trackPageView,

  // Navigation
  trackNavigationClick,
  trackMobileMenuToggle,
  trackLanguageSwitch,

  // Forms
  trackFormStart,
  trackFormSubmit,
  trackFormSuccess,
  trackFormError,

  // CTAs
  trackGetStartedClick,
  trackLoginClick,
  trackCtaClick,

  // Calendly
  trackCalendlyOpen,
  trackCalendlyClose,
  trackCalendlyScheduled,

  // Pricing
  trackPricingView,
  trackPricingPlanClick,

  // ROI Calculator
  trackRoiCalculatorStart,
  trackRoiPlanChange,
  trackRoiInputChange,
  trackRoiResults,

  // Case Studies
  trackCaseStudyClick,
  trackCaseStudySectionView,

  // Integrations
  trackIntegrationFilter,
  trackIntegrationClick,

  // FAQ
  trackFaqToggle,

  // Video/Media
  trackVideoPlay,
  trackVideoComplete,

  // Engagement
  trackScrollDepth,
  trackSectionView,

  // AI Widget
  trackAiWidgetOpen,
  trackAiWidgetClose,
  trackAiConversationStart,

  // External/Social
  trackExternalLinkClick,
  trackSocialClick,

  // Errors
  trackError,
  track404Error,

  // Conversions
  trackLeadGeneration,
  trackDemoRequest,

  // User Engagement
  trackTimeOnPage,
  trackFeatureComparisonView,
  trackTestimonialInteraction,
};
