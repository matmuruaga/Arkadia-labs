// src/data/integrations.data.ts
// Esta es la fuente única de verdad para todas las integraciones de la aplicación.
// Utiliza claves de traducción (i18n) para permitir un sitio multilingüe.

// --- Definición de la estructura de una integración ---
export interface Integration {
  id: string;
  nameKey: string; // Clave para el nombre (ej: 'integrations.openai.name')
  logoUrl: string;
  categoryKey: 'ai' | 'analytics' | 'communication' | 'crm' | 'data_storage' | 'developer_tools' | 'finance' | 'marketing' | 'productivity' | 'cybersecurity' | 'utility';
  descriptionKey?: string; // Clave para la descripción (opcional)
}

// --- Array con todas las integraciones ---
export const allIntegrations: Integration[] = [
    // AI
    { id: 'openai', nameKey: 'integrations.openai.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366249/openai_uzpybi.svg', categoryKey: 'ai', descriptionKey: 'integrations.openai.description' },
    { id: 'google_ai_studio_gemini', nameKey: 'integrations.google_ai_studio.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366238/google_ai_studio_gemini_hladqg.png', categoryKey: 'ai', descriptionKey: 'integrations.google_ai_studio.description' },
    { id: 'hugging_face_inference_model', nameKey: 'integrations.hugging_face.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366242/hugging_face_inference_model_u5xs5z.svg', categoryKey: 'ai', descriptionKey: 'integrations.hugging_face.description' },
    { id: 'aws_bedrock_chat_model', nameKey: 'integrations.aws_bedrock.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366228/aws_bedrock_chat_model_yuhmqi.svg', categoryKey: 'ai' },
    { id: 'claude', nameKey: 'integrations.claude.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366229/claude_qtlsop.jpg', categoryKey: 'ai', descriptionKey: 'integrations.claude.description' },
    { id: 'cohere_model', nameKey: 'integrations.cohere.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366229/cohere_model_fbppeh.svg', categoryKey: 'ai' },
    { id: 'groq_chat_model', nameKey: 'integrations.groq.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366242/groq_chat_model_qjgdse.svg', categoryKey: 'ai' },
    { id: 'google_vertex_ai', nameKey: 'integrations.google_vertex_ai.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366241/google_vertex_ai_t14eok.png', categoryKey: 'ai', descriptionKey: 'integrations.google_vertex_ai.description' },
    { id: 'anthropic_chat_model', nameKey: 'integrations.anthropic.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366227/anthropic_chat_model_zr55nx.svg', categoryKey: 'ai' },
    { id: 'ollama_chat_model', nameKey: 'integrations.ollama.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366249/ollama_chat_model_rja1ed.svg', categoryKey: 'ai' },
    { id: 'mistral_cloud_chat_model', nameKey: 'integrations.mistral_ai.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366246/mistral_cloud_chat_model_tbgna2.svg', categoryKey: 'ai' },
    { id: 'embeddings_openai', nameKey: 'integrations.embeddings_openai.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366236/embeddings_openai_flwy1n.svg', categoryKey: 'ai' },
    { id: 'embeddings_ollama', nameKey: 'integrations.embeddings_ollama.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366236/embeddings_ollama_ba24a5.svg', categoryKey: 'ai' },
    { id: 'azure_openai_chat_model', nameKey: 'integrations.azure_openai_chat.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366228/azure_openai_chat_model_fha3vw.svg', categoryKey: 'ai' },
    { id: 'mongodb_chat_memory', nameKey: 'integrations.mongodb_chat_memory.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366248/mongodb_chat_memory_ouzlhp.svg', categoryKey: 'ai' },
    { id: 'deepl', nameKey: 'integrations.deepl.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366232/deepl_tga11r.svg', categoryKey: 'ai', descriptionKey: 'integrations.deepl.description'},
    
    // Analytics
    { id: 'google_analytics', nameKey: 'integrations.google_analytics.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366238/google_analytics_qqmx6g.svg', categoryKey: 'analytics' },
    { id: 'mixpanel', nameKey: 'integrations.mixpanel.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366247/mixpanel_tep7c3.png', categoryKey: 'analytics' },
    { id: 'posthog', nameKey: 'integrations.posthog.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366252/posthog_g7p0ji.svg', categoryKey: 'analytics' },
    { id: 'segment', nameKey: 'integrations.segment.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366254/segment_pck2qe.svg', categoryKey: 'analytics' },
    { id: 'chartmogul', nameKey: 'integrations.chartmogul.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366229/chartmogul_vhnsh3.png', categoryKey: 'analytics' },

    // Communication
    { id: 'slack', nameKey: 'integrations.slack.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366255/slack_hucixb.svg', categoryKey: 'communication', descriptionKey: 'integrations.slack.description' },
    { id: 'discord', nameKey: 'integrations.discord.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366232/discord_n7mnzk.svg', categoryKey: 'communication' },
    { id: 'gmail', nameKey: 'integrations.gmail.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366238/gmail_pyvtdc.svg', categoryKey: 'communication', descriptionKey: 'integrations.gmail.description' },
    { id: 'microsoft_outlook', nameKey: 'integrations.microsoft_outlook.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366246/microsoft_outlook_grsql9.svg', categoryKey: 'communication' },
    { id: 'telegram', nameKey: 'integrations.telegram.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366256/telegram_fkw9yj.svg', categoryKey: 'communication', descriptionKey: 'integrations.telegram.description' },
    { id: 'twilio', nameKey: 'integrations.twilio.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366276/twilio_hcuwb8.svg', categoryKey: 'communication' },
    { id: 'whatsapp_business_cloud', nameKey: 'integrations.whatsapp.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366276/whatsapp_business_cloud_hwfsdt.svg', categoryKey: 'communication' },
    { id: 'mattermost', nameKey: 'integrations.mattermost.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366245/mattermost_ujfkge.svg', categoryKey: 'communication' },

    // CRM
    { id: 'hubspot', nameKey: 'integrations.hubspot.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366242/hubspot_ttgq2q.svg', categoryKey: 'crm', descriptionKey: 'integrations.hubspot.description' },
    { id: 'salesforce', nameKey: 'integrations.salesforce.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366253/salesforce_fnso2l.svg', categoryKey: 'crm' },
    { id: 'pipedrive', nameKey: 'integrations.pipedrive.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366250/pipedrive_db1uhs.svg', categoryKey: 'crm' },
    { id: 'zoho_crm', nameKey: 'integrations.zoho_crm.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366278/zoho_crm_lqg4ce.svg', categoryKey: 'crm' },
    { id: 'activecampaign', nameKey: 'integrations.activecampaign.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366227/activecampaign_ue9vbl.svg', categoryKey: 'crm' },

    // Data & Storage
    { id: 'mysql', nameKey: 'integrations.mysql.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366249/mysql_bvhyld.svg', categoryKey: 'data_storage', descriptionKey: 'integrations.mysql.description' },
    { id: 'mongodb', nameKey: 'integrations.mongodb.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366247/mongodb_rvua8o.svg', categoryKey: 'data_storage' },
    { id: 'postgres', nameKey: 'integrations.postgres.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366251/postgres_gkt0eb.svg', categoryKey: 'data_storage' },
    { id: 'redis', nameKey: 'integrations.redis.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366252/redis_qea2y3.svg', categoryKey: 'data_storage' },
    { id: 'aws_s3', nameKey: 'integrations.aws_s3.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366228/aws_s3_ou5mg3.svg', categoryKey: 'data_storage' },
    { id: 'milvus_vector_store', nameKey: 'integrations.milvus.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366246/milvus_vector_store_i8jzcm.svg', categoryKey: 'data_storage' },
    
    // Developer Tools
    { id: 'github', nameKey: 'integrations.github.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366237/github_jxvtfl.svg', categoryKey: 'developer_tools', descriptionKey: 'integrations.github.description' },
    { id: 'jira_software', nameKey: 'integrations.jira.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366243/jira_software_fcvt3g.svg', categoryKey: 'developer_tools' },
    { id: 'grafana', nameKey: 'integrations.grafana.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366242/grafana_rqygml.svg', categoryKey: 'developer_tools' },

    // Finance
    { id: 'stripe', nameKey: 'integrations.stripe.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366255/stripe_hb2bay.svg', categoryKey: 'finance', descriptionKey: 'integrations.stripe.description' },
    { id: 'shopify', nameKey: 'integrations.shopify.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366254/shopify_xijdaw.svg', categoryKey: 'finance' },
    { id: 'woocommerce', nameKey: 'integrations.woocommerce.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366277/woocommerce_o0j9up.svg', categoryKey: 'finance' },
    { id: 'profitwell', nameKey: 'integrations.profitwell.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366252/profitwell_sc6grn.svg', categoryKey: 'finance' },

    // Marketing
    { id: 'mailchimp', nameKey: 'integrations.mailchimp.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366244/mailchimp_t8prl1.svg', categoryKey: 'marketing' },
    { id: 'sendgrid', nameKey: 'integrations.sendgrid.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366254/sendgrid_cjwhpy.svg', categoryKey: 'marketing' },
    { id: 'lemlist', nameKey: 'integrations.lemlist.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366244/lemlist_kbdyac.svg', categoryKey: 'marketing' },
    { id: 'convertkit', nameKey: 'integrations.convertkit.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366231/convertkit_o3dvth.svg', categoryKey: 'marketing' },
    { id: 'linkedin', nameKey: 'integrations.linkedin.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366244/linkedin_neuu1j.svg', categoryKey: 'marketing' },
    { id: 'google_ads', nameKey: 'integrations.google_ads.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366238/google_ads_scru7v.svg', categoryKey: 'marketing' },
    { id: 'orbit', nameKey: 'integrations.orbit.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366253/orbit_rbash6.svg', categoryKey: 'marketing' },

    // Productivity
    { id: 'notion', nameKey: 'integrations.notion.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366249/notion_mvxavi.svg', categoryKey: 'productivity', descriptionKey: 'integrations.notion.description' },
    { id: 'google_sheets', nameKey: 'integrations.google_sheets.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366241/google_sheets_mfc938.svg', categoryKey: 'productivity', descriptionKey: 'integrations.google_sheets.description' },
    { id: 'google_calendar', nameKey: 'integrations.google_calendar.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366238/google_calendar_nqrijg.svg', categoryKey: 'productivity' },
    { id: 'mondaycom', nameKey: 'integrations.monday.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366247/mondaycom_tndso7.svg', categoryKey: 'productivity' },
    { id: 'microsoft_excel', nameKey: 'integrations.microsoft_excel.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366246/microsoft_excel_ymxfgl.svg', categoryKey: 'productivity' },
    { id: 'trello', nameKey: 'integrations.trello.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366276/trello_nhrkfh.svg', categoryKey: 'productivity' },
    { id: 'clickup', nameKey: 'integrations.clickup.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366229/clickup_gekfa8.svg', categoryKey: 'productivity' },
    { id: 'todoist', nameKey: 'integrations.todoist.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366275/todoist_ffdqrx.svg', categoryKey: 'productivity' },
    { id: 'wordpress', nameKey: 'integrations.wordpress.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366277/wordpress_bdgrtb.svg', categoryKey: 'productivity' },
    { id: 'webflow', nameKey: 'integrations.webflow.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366276/webflow_vqdqla.svg', categoryKey: 'productivity' },

    // Cybersecurity
    { id: 'securityscorecard', nameKey: 'integrations.securityscorecard.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366254/securityscorecard_bvwzbc.svg', categoryKey: 'cybersecurity' },
    { id: 'virustotal', nameKey: 'integrations.virustotal.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366276/virustotal_lrokk2.png', categoryKey: 'cybersecurity' },
    
    // Utility
    { id: 'cortex', nameKey: 'integrations.cortex.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366232/cortex_vaalrm.svg', categoryKey: 'utility' },
    { id: 'bitly', nameKey: 'integrations.bitly.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366229/bitly_r0ssrk.svg', categoryKey: 'utility' },
    { id: 'spotify', nameKey: 'integrations.spotify.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366255/spotify_wo0skl.svg', categoryKey: 'utility' },
    { id: 'youtube', nameKey: 'integrations.youtube.name', logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366277/youtube_byodkh.png', categoryKey: 'utility' },
];