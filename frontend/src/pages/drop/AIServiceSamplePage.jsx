import { useState } from 'react'
import { BrainCircuit, Download, Languages, Mail, MapPin, Sparkles } from 'lucide-react'
import { City, Country, State } from 'country-state-city'
import aiServicesImage from '../../assets/artificial-intelligence-services.png'
import { LEAD_ENDPOINTS, apiRequest } from '../../api/apiEndpoint.js'

const googleDriveSampleLink = 'https://drive.google.com/drive/folders/service-samples'

export const aiServiceConfigs = {
  nlp: {
    title: 'Natural Language Processing (NLP)',
    subtitle: 'Enterprise language intelligence for documents, conversations, search, analytics, and multilingual business workflows.',
    sampleName: 'Cromgen NLP Enterprise Sample',
    items: ['Text Classification', 'Sentiment Analysis', 'Language Translation', 'Speech-to-Text', 'Text-to-Speech', 'AI Summarization', 'Keyword Extraction', 'Intent Detection', 'AI Document Processing', 'Multilingual NLP Systems'],
    outcomes: ['Automated text understanding', 'Faster document review', 'Multilingual customer support', 'Search-ready knowledge workflows'],
  },
  computerVision: {
    title: 'Computer Vision',
    subtitle: 'Production-grade visual intelligence for face recognition, object detection, OCR, CCTV monitoring, video analysis, and image automation.',
    sampleName: 'Cromgen Computer Vision Sample',
    items: ['Face Recognition', 'Object Detection', 'Image Annotation', 'OCR (Image to Text)', 'CCTV AI Monitoring', 'Self-Driving Car Vision', 'Medical Image Analysis', 'Barcode/QR Scanning', 'Gesture Recognition', 'Video Analysis', 'AI Photo Moderation'],
    outcomes: ['Visual quality automation', 'Real-time detection workflows', 'Structured image intelligence', 'Operational monitoring at scale'],
  },
  predictiveAnalytics: {
    title: 'Predictive Analytics',
    subtitle: 'Forecasting and intelligence systems that help enterprise teams plan demand, risk, revenue, inventory, and operations.',
    sampleName: 'Cromgen Predictive Analytics Sample',
    items: ['Demand Forecasting', 'Customer Prediction Models', 'Risk Analysis', 'Revenue Forecasting', 'Inventory Prediction', 'Marketing Analytics', 'Business Intelligence Dashboards', 'Financial Forecasting', 'AI Trend Analysis', 'Operational Analytics'],
    outcomes: ['Forecast-driven planning', 'Revenue and demand visibility', 'Risk-aware decisions', 'Executive analytics dashboards'],
  },
  automation: {
    title: 'Business Process Automation',
    subtitle: 'AI-powered workflow automation for operations, CRM, HR, finance, documents, email, and customer support.',
    sampleName: 'Cromgen Automation Workflow Sample',
    items: ['Workflow Automation', 'AI Email Automation', 'HR Process Automation', 'CRM Automation', 'Invoice Automation', 'Document Processing Automation', 'Customer Support Automation', 'Data Entry Automation', 'Task Scheduling Systems', 'AI Operations Management'],
    outcomes: ['Reduced manual workload', 'Cleaner process handoffs', 'Faster operational cycles', 'Traceable automation governance'],
  },
  recommendations: {
    title: 'Recommendation Systems',
    subtitle: 'Personalization engines for products, content, shopping journeys, learning paths, upselling, and customer interest prediction.',
    sampleName: 'Cromgen Recommendation Engine Sample',
    items: ['Product Recommendation Engine', 'Personalized Content Suggestions', 'AI Shopping Recommendations', 'Movie/Music Recommendation', 'Learning Recommendation System', 'AI Upselling Engine', 'Cross-Selling Recommendations', 'Customer Interest Prediction', 'Smart Search Systems', 'Personalized Marketing AI'],
    outcomes: ['Personalized customer journeys', 'Higher conversion relevance', 'Better cross-sell targeting', 'Smart discovery experiences'],
  },
  generativeContent: {
    title: 'Generative AI Content Tools',
    subtitle: 'Enterprise content generation tools for marketing, blogs, images, scripts, ads, product descriptions, emails, resumes, and design content.',
    sampleName: 'Cromgen Generative Content Sample',
    items: ['AI Content Generator', 'AI Blog Writing Tools', 'AI Image Generation', 'AI Video Script Generator', 'AI Social Media Content', 'AI Ad Copy Generator', 'AI Product Description Generator', 'AI Email Writer', 'AI Resume Builder', 'AI Design Content Tools'],
    outcomes: ['Faster content production', 'Brand-aligned content systems', 'Campaign-ready creative output', 'Reusable generation workflows'],
  },
  voiceAssistant: {
    title: 'Voice AI Assistant',
    subtitle: 'Voice automation for calling, IVR, search, speech recognition, analytics, multilingual support, and call operations.',
    sampleName: 'Cromgen Voice AI Sample',
    items: ['AI Voice Bot', 'Virtual Call Assistant', 'AI IVR Systems', 'Voice Search Assistant', 'AI Telecalling Assistant', 'Smart Voice Commands', 'Speech Recognition Systems', 'AI Voice Analytics', 'Multilingual Voice Support', 'AI Call Automation'],
    outcomes: ['Automated voice interactions', 'Smarter call routing', 'Multilingual voice support', 'Voice analytics for operations'],
  },
  aiCrm: {
    title: 'AI CRM Integration',
    subtitle: 'AI-driven CRM automation for lead scoring, customer insights, sales prediction, follow-ups, WhatsApp, email, and dashboards.',
    sampleName: 'Cromgen AI CRM Integration Sample',
    items: ['AI Lead Scoring', 'CRM Workflow Automation', 'Customer Insights AI', 'Sales Prediction AI', 'AI Customer Support Integration', 'WhatsApp CRM Integration', 'Email Automation Integration', 'AI Follow-Up System', 'AI Sales Assistant', 'Customer Analytics Dashboard'],
    outcomes: ['Better lead prioritization', 'Automated sales follow-up', 'Integrated customer intelligence', 'CRM-ready AI workflows'],
  },
  dataLabeling: {
    title: 'Data Labeling & Model Training',
    subtitle: 'Human-in-the-loop dataset preparation for conversational AI, speech, voice, multilingual audio, and model training workflows.',
    sampleName: 'Cromgen Data Labeling Sample',
    items: ['Conversational AI Data Collection', 'Speech & Voice Data Collection', 'Multilingual Audio Data Collection', 'AI Training Data Services', 'Transcription', 'Audio Labeling', 'Speech Datasets', 'Conversation Collection', 'AI Training Data', 'Annotation Work'],
    outcomes: ['Training-ready voice and text datasets', 'Native-language collection coverage', 'Quality-controlled annotation', 'Human-reviewed model inputs'],
  },
  strategy: {
    title: 'AI Strategy Consulting',
    subtitle: 'Enterprise AI strategy for transformation planning, product roadmaps, infrastructure, governance, adoption, and business optimization.',
    sampleName: 'Cromgen AI Strategy Sample',
    items: ['AI Transformation Strategy', 'AI Workflow Planning', 'AI Product Roadmap', 'Enterprise AI Consulting', 'AI Infrastructure Planning', 'Automation Strategy', 'Data Strategy Consulting', 'AI Adoption Planning', 'AI Compliance & Governance', 'AI Business Optimization Solutions'],
    outcomes: ['Clear AI roadmap', 'Governed adoption planning', 'Infrastructure readiness', 'Business-aligned automation strategy'],
  },
  chatbot: {
    title: 'AI Chatbot Development',
    subtitle: 'Enterprise chatbot systems for support, WhatsApp, website live chat, FAQ automation, CRM integration, and lead generation.',
    sampleName: 'Cromgen AI Chatbot Sample',
    items: ['Customer Support Chatbots', 'WhatsApp AI Bots', 'Website Live Chat Bots', 'Voice Chatbots', 'FAQ Automation Bots', 'E-commerce Chatbots', 'AI Sales Assistant', 'Multi-language Chatbots', 'CRM-integrated Chatbots', 'Lead Generation Bots'],
    outcomes: ['24/7 customer support', 'Automated lead capture', 'CRM-connected conversations', 'Multi-language service journeys'],
  },
}

export const aiServiceRouteTypeMap = {
  'natural-language-processing': 'nlp',
  'computer-vision': 'computerVision',
  'predictive-analytics': 'predictiveAnalytics',
  'business-process-automation': 'automation',
  'recommendation-systems': 'recommendations',
  'generative-ai-content-tools': 'generativeContent',
  'voice-ai-assistant': 'voiceAssistant',
  'ai-crm-integration': 'aiCrm',
  'data-labeling-and-model-training': 'dataLabeling',
  'ai-strategy-consulting': 'strategy',
  'ai-chatbot-development': 'chatbot',
}

export function slugifyAiValue(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function findAiCapabilityDetail(route) {
  const parts = String(route || '').split('/')
  if (parts[0] !== 'artificial-intelligence' || parts.length < 3) return null

  const serviceSlug = parts[1]
  const capabilitySlug = parts.slice(2).join('/')
  const type = aiServiceRouteTypeMap[serviceSlug]
  const config = aiServiceConfigs[type]
  if (!config) return null

  const capability = config.items.find((item) => slugifyAiValue(item) === capabilitySlug)
  if (!capability) return null

  return { type, serviceSlug, capability, config }
}

const languageCoverageMap = {
  India: [
    {
      state: 'Maharashtra',
      cities: [
        { city: 'Mumbai', language: 'Marathi' },
        { city: 'Pune', language: 'Marathi' },
        { city: 'Nagpur', language: 'Marathi' },
      ],
    },
    {
      state: 'Delhi',
      cities: [
        { city: 'New Delhi', language: 'Hindi' },
        { city: 'Dwarka', language: 'Hindi' },
        { city: 'Rohini', language: 'Hindi' },
      ],
    },
    {
      state: 'Karnataka',
      cities: [
        { city: 'Bengaluru', language: 'Kannada' },
        { city: 'Mysuru', language: 'Kannada' },
        { city: 'Mangaluru', language: 'Kannada' },
      ],
    },
    {
      state: 'Tamil Nadu',
      cities: [
        { city: 'Chennai', language: 'Tamil' },
        { city: 'Coimbatore', language: 'Tamil' },
        { city: 'Madurai', language: 'Tamil' },
      ],
    },
    {
      state: 'Telangana',
      cities: [
        { city: 'Hyderabad', language: 'Telugu' },
        { city: 'Warangal', language: 'Telugu' },
        { city: 'Nizamabad', language: 'Telugu' },
      ],
    },
    {
      state: 'West Bengal',
      cities: [
        { city: 'Kolkata', language: 'Bengali' },
        { city: 'Siliguri', language: 'Bengali' },
        { city: 'Durgapur', language: 'Bengali' },
      ],
    },
    {
      state: 'Gujarat',
      cities: [
        { city: 'Ahmedabad', language: 'Gujarati' },
        { city: 'Surat', language: 'Gujarati' },
        { city: 'Vadodara', language: 'Gujarati' },
      ],
    },
    {
      state: 'Punjab',
      cities: [
        { city: 'Ludhiana', language: 'Punjabi' },
        { city: 'Amritsar', language: 'Punjabi' },
        { city: 'Jalandhar', language: 'Punjabi' },
      ],
    },
    { state: 'Andhra Pradesh', cities: [{ city: 'Visakhapatnam', language: 'Telugu' }, { city: 'Vijayawada', language: 'Telugu' }, { city: 'Guntur', language: 'Telugu' }] },
    { state: 'Arunachal Pradesh', cities: [{ city: 'Itanagar', language: 'Nyishi / Hindi' }, { city: 'Naharlagun', language: 'Nyishi / Hindi' }, { city: 'Pasighat', language: 'Adi' }] },
    { state: 'Assam', cities: [{ city: 'Guwahati', language: 'Assamese' }, { city: 'Dibrugarh', language: 'Assamese' }, { city: 'Silchar', language: 'Bengali / Assamese' }] },
    { state: 'Bihar', cities: [{ city: 'Patna', language: 'Hindi / Bhojpuri' }, { city: 'Gaya', language: 'Hindi / Magahi' }, { city: 'Bhagalpur', language: 'Hindi / Angika' }] },
    { state: 'Chhattisgarh', cities: [{ city: 'Raipur', language: 'Hindi / Chhattisgarhi' }, { city: 'Bhilai', language: 'Hindi / Chhattisgarhi' }, { city: 'Bilaspur', language: 'Hindi / Chhattisgarhi' }] },
    { state: 'Goa', cities: [{ city: 'Panaji', language: 'Konkani' }, { city: 'Margao', language: 'Konkani' }, { city: 'Vasco da Gama', language: 'Konkani' }] },
    { state: 'Haryana', cities: [{ city: 'Gurugram', language: 'Hindi / Haryanvi' }, { city: 'Faridabad', language: 'Hindi / Haryanvi' }, { city: 'Panipat', language: 'Hindi / Haryanvi' }] },
    { state: 'Himachal Pradesh', cities: [{ city: 'Shimla', language: 'Hindi / Pahari' }, { city: 'Dharamshala', language: 'Hindi / Kangri' }, { city: 'Mandi', language: 'Hindi / Mandeali' }] },
    { state: 'Jharkhand', cities: [{ city: 'Ranchi', language: 'Hindi / Nagpuri' }, { city: 'Jamshedpur', language: 'Hindi' }, { city: 'Dhanbad', language: 'Hindi' }] },
    { state: 'Kerala', cities: [{ city: 'Kochi', language: 'Malayalam' }, { city: 'Thiruvananthapuram', language: 'Malayalam' }, { city: 'Kozhikode', language: 'Malayalam' }] },
    { state: 'Madhya Pradesh', cities: [{ city: 'Indore', language: 'Hindi' }, { city: 'Bhopal', language: 'Hindi' }, { city: 'Gwalior', language: 'Hindi' }] },
    { state: 'Manipur', cities: [{ city: 'Imphal', language: 'Manipuri / Meitei' }, { city: 'Thoubal', language: 'Manipuri / Meitei' }, { city: 'Bishnupur', language: 'Manipuri / Meitei' }] },
    { state: 'Meghalaya', cities: [{ city: 'Shillong', language: 'Khasi / English' }, { city: 'Tura', language: 'Garo' }, { city: 'Jowai', language: 'Pnar / Khasi' }] },
    { state: 'Mizoram', cities: [{ city: 'Aizawl', language: 'Mizo' }, { city: 'Lunglei', language: 'Mizo' }, { city: 'Champhai', language: 'Mizo' }] },
    { state: 'Nagaland', cities: [{ city: 'Kohima', language: 'Nagamese / English' }, { city: 'Dimapur', language: 'Nagamese / English' }, { city: 'Mokokchung', language: 'Ao' }] },
    { state: 'Odisha', cities: [{ city: 'Bhubaneswar', language: 'Odia' }, { city: 'Cuttack', language: 'Odia' }, { city: 'Rourkela', language: 'Odia / Hindi' }] },
    { state: 'Rajasthan', cities: [{ city: 'Jaipur', language: 'Hindi / Rajasthani' }, { city: 'Jodhpur', language: 'Hindi / Marwari' }, { city: 'Udaipur', language: 'Hindi / Mewari' }] },
    { state: 'Sikkim', cities: [{ city: 'Gangtok', language: 'Nepali' }, { city: 'Namchi', language: 'Nepali' }, { city: 'Gyalshing', language: 'Nepali' }] },
    { state: 'Tripura', cities: [{ city: 'Agartala', language: 'Bengali / Kokborok' }, { city: 'Udaipur', language: 'Bengali / Kokborok' }, { city: 'Dharmanagar', language: 'Bengali' }] },
    { state: 'Uttar Pradesh', cities: [{ city: 'Lucknow', language: 'Hindi / Awadhi' }, { city: 'Kanpur', language: 'Hindi' }, { city: 'Varanasi', language: 'Hindi / Bhojpuri' }] },
    { state: 'Uttarakhand', cities: [{ city: 'Dehradun', language: 'Hindi / Garhwali' }, { city: 'Haridwar', language: 'Hindi' }, { city: 'Haldwani', language: 'Hindi / Kumaoni' }] },
    { state: 'Andaman and Nicobar Islands', cities: [{ city: 'Port Blair', language: 'Hindi / Bengali' }, { city: 'Mayabunder', language: 'Hindi / Bengali' }, { city: 'Diglipur', language: 'Hindi / Bengali' }] },
    { state: 'Chandigarh', cities: [{ city: 'Chandigarh', language: 'Hindi / Punjabi' }, { city: 'Manimajra', language: 'Hindi / Punjabi' }, { city: 'Daria', language: 'Hindi / Punjabi' }] },
    { state: 'Dadra and Nagar Haveli and Daman and Diu', cities: [{ city: 'Silvassa', language: 'Gujarati / Hindi' }, { city: 'Daman', language: 'Gujarati / Hindi' }, { city: 'Diu', language: 'Gujarati' }] },
    { state: 'Jammu and Kashmir', cities: [{ city: 'Srinagar', language: 'Kashmiri / Urdu' }, { city: 'Jammu', language: 'Dogri / Hindi' }, { city: 'Anantnag', language: 'Kashmiri' }] },
    { state: 'Ladakh', cities: [{ city: 'Leh', language: 'Ladakhi' }, { city: 'Kargil', language: 'Balti / Purigi' }, { city: 'Diskit', language: 'Ladakhi' }] },
    { state: 'Lakshadweep', cities: [{ city: 'Kavaratti', language: 'Malayalam / Jeseri' }, { city: 'Agatti', language: 'Malayalam / Jeseri' }, { city: 'Minicoy', language: 'Mahl' }] },
    { state: 'Puducherry', cities: [{ city: 'Puducherry', language: 'Tamil / French' }, { city: 'Karaikal', language: 'Tamil' }, { city: 'Mahe', language: 'Malayalam' }] },
  ],
  'United States': [
    {
      state: 'California',
      cities: [
        { city: 'Los Angeles', language: 'English / Spanish' },
        { city: 'San Francisco', language: 'English' },
        { city: 'San Diego', language: 'English / Spanish' },
      ],
    },
    {
      state: 'New York',
      cities: [
        { city: 'New York City', language: 'English' },
        { city: 'Buffalo', language: 'English' },
        { city: 'Rochester', language: 'English' },
      ],
    },
    {
      state: 'Texas',
      cities: [
        { city: 'Houston', language: 'English / Spanish' },
        { city: 'Dallas', language: 'English' },
        { city: 'Austin', language: 'English / Spanish' },
      ],
    },
  ],
  'United Kingdom': [
    {
      state: 'England',
      cities: [
        { city: 'London', language: 'English' },
        { city: 'Manchester', language: 'English' },
        { city: 'Birmingham', language: 'English' },
      ],
    },
    {
      state: 'Scotland',
      cities: [
        { city: 'Edinburgh', language: 'English / Scots' },
        { city: 'Glasgow', language: 'English / Scots' },
        { city: 'Aberdeen', language: 'English' },
      ],
    },
    {
      state: 'Wales',
      cities: [
        { city: 'Cardiff', language: 'English / Welsh' },
        { city: 'Swansea', language: 'English / Welsh' },
        { city: 'Newport', language: 'English / Welsh' },
      ],
    },
  ],
  Canada: [
    {
      state: 'Ontario',
      cities: [
        { city: 'Toronto', language: 'English' },
        { city: 'Ottawa', language: 'English / French' },
        { city: 'Mississauga', language: 'English' },
      ],
    },
    {
      state: 'Quebec',
      cities: [
        { city: 'Montreal', language: 'French / English' },
        { city: 'Quebec City', language: 'French' },
        { city: 'Laval', language: 'French' },
      ],
    },
    {
      state: 'British Columbia',
      cities: [
        { city: 'Vancouver', language: 'English' },
        { city: 'Victoria', language: 'English' },
        { city: 'Surrey', language: 'English' },
      ],
    },
  ],
  Australia: [
    {
      state: 'New South Wales',
      cities: [
        { city: 'Sydney', language: 'English' },
        { city: 'Newcastle', language: 'English' },
        { city: 'Wollongong', language: 'English' },
      ],
    },
    {
      state: 'Victoria',
      cities: [
        { city: 'Melbourne', language: 'English' },
        { city: 'Geelong', language: 'English' },
        { city: 'Ballarat', language: 'English' },
      ],
    },
    {
      state: 'Queensland',
      cities: [
        { city: 'Brisbane', language: 'English' },
        { city: 'Gold Coast', language: 'English' },
        { city: 'Cairns', language: 'English' },
      ],
    },
  ],
  'United Arab Emirates': [
    {
      state: 'Dubai',
      cities: [
        { city: 'Dubai', language: 'Arabic / English' },
        { city: 'Jebel Ali', language: 'Arabic / English' },
        { city: 'Deira', language: 'Arabic / English' },
      ],
    },
    {
      state: 'Abu Dhabi',
      cities: [
        { city: 'Abu Dhabi', language: 'Arabic / English' },
        { city: 'Al Ain', language: 'Arabic' },
        { city: 'Madinat Zayed', language: 'Arabic' },
      ],
    },
    {
      state: 'Sharjah',
      cities: [
        { city: 'Sharjah', language: 'Arabic / English' },
        { city: 'Khor Fakkan', language: 'Arabic' },
        { city: 'Kalba', language: 'Arabic' },
      ],
    },
  ],
  Singapore: [
    {
      state: 'Central Region',
      cities: [
        { city: 'Downtown Core', language: 'English / Mandarin / Malay / Tamil' },
        { city: 'Bukit Merah', language: 'English / Mandarin' },
        { city: 'Toa Payoh', language: 'English / Mandarin' },
      ],
    },
    {
      state: 'East Region',
      cities: [
        { city: 'Tampines', language: 'English / Mandarin / Malay' },
        { city: 'Bedok', language: 'English / Mandarin / Malay' },
        { city: 'Pasir Ris', language: 'English / Malay' },
      ],
    },
    {
      state: 'West Region',
      cities: [
        { city: 'Jurong East', language: 'English / Mandarin' },
        { city: 'Clementi', language: 'English / Mandarin' },
        { city: 'Bukit Batok', language: 'English / Mandarin' },
      ],
    },
  ],
}

const coverageCountries = Country.getAllCountries().sort((first, second) => first.name.localeCompare(second.name))
const defaultCountry = coverageCountries.find((country) => country.isoCode === 'IN') || coverageCountries[0]
const defaultStates = State.getStatesOfCountry(defaultCountry.isoCode)
const defaultState = defaultStates[0] || { name: 'All Regions', isoCode: '' }
const defaultCities = defaultState.isoCode ? City.getCitiesOfState(defaultCountry.isoCode, defaultState.isoCode) : []
const defaultCity = defaultCities[0] || { name: 'All Cities' }

const indiaStateLanguageMap = {
  'Andaman and Nicobar Islands': 'Hindi / Bengali',
  'Andhra Pradesh': 'Telugu',
  'Arunachal Pradesh': 'Nyishi / Hindi',
  Assam: 'Assamese',
  Bihar: 'Hindi / Bhojpuri',
  Chandigarh: 'Hindi / Punjabi',
  Chhattisgarh: 'Hindi / Chhattisgarhi',
  'Dadra and Nagar Haveli and Daman and Diu': 'Gujarati / Hindi',
  Delhi: 'Hindi',
  Goa: 'Konkani',
  Gujarat: 'Gujarati',
  Haryana: 'Hindi / Haryanvi',
  'Himachal Pradesh': 'Hindi / Pahari',
  'Jammu and Kashmir': 'Kashmiri / Urdu',
  Jharkhand: 'Hindi / Nagpuri',
  Karnataka: 'Kannada',
  Kerala: 'Malayalam',
  Ladakh: 'Ladakhi',
  Lakshadweep: 'Malayalam / Jeseri',
  'Madhya Pradesh': 'Hindi',
  Maharashtra: 'Marathi',
  Manipur: 'Manipuri / Meitei',
  Meghalaya: 'Khasi / Garo',
  Mizoram: 'Mizo',
  Nagaland: 'Nagamese / English',
  Odisha: 'Odia',
  Puducherry: 'Tamil / French',
  Punjab: 'Punjabi',
  Rajasthan: 'Hindi / Rajasthani',
  Sikkim: 'Nepali',
  'Tamil Nadu': 'Tamil',
  Telangana: 'Telugu',
  Tripura: 'Bengali / Kokborok',
  'Uttar Pradesh': 'Hindi / Awadhi',
  Uttarakhand: 'Hindi / Garhwali',
  'West Bengal': 'Bengali',
}

const countryLanguageMap = {
  AF: 'Dari / Pashto',
  AE: 'Arabic / English',
  AU: 'English',
  BD: 'Bengali',
  BR: 'Portuguese',
  CA: 'English / French',
  CN: 'Mandarin Chinese',
  DE: 'German',
  ES: 'Spanish',
  FR: 'French',
  GB: 'English',
  ID: 'Indonesian',
  JP: 'Japanese',
  LK: 'Sinhala / Tamil',
  MX: 'Spanish',
  MY: 'Malay / English / Mandarin / Tamil',
  NP: 'Nepali',
  PH: 'Filipino / English',
  PK: 'Urdu / Punjabi',
  RU: 'Russian',
  SA: 'Arabic',
  SG: 'English / Mandarin / Malay / Tamil',
  TH: 'Thai',
  US: 'English / Spanish',
  VN: 'Vietnamese',
  ZA: 'Zulu / Xhosa / Afrikaans / English',
}

const dataLabelingContent = {
  overview: [
    ['Human-reviewed data pipelines', 'Managed collection, screening, annotation, review, and delivery workflows for AI teams that need dependable training data.'],
    ['Voice and conversation coverage', 'Speech, dialogue, call, prompt-response, and multilingual audio datasets prepared for voice bots, assistants, analytics, and LLM workflows.'],
    ['Flexible project delivery', 'One-time sample batches, ongoing collection programs, and scale-ready annotation work for enterprise and startup AI use cases.'],
  ],
  workflow: ['Requirement mapping', 'Collection plan', 'Annotator briefing', 'Data capture', 'Quality review', 'Secure delivery'],
  deliverables: [
    'Audio recordings with speaker and language metadata',
    'Conversation transcripts with intent and topic tagging',
    'Speech datasets organized by country, state, city, and native language',
    'Audio labels for speaker, noise, emotion, intent, and quality checks',
    'Annotation sheets and QA summary reports',
    'Model-training-ready files for AI, NLP, speech, and voice systems',
  ],
  quality: [
    ['Native language review', 'City and region-aware language checks help keep samples closer to real speaking patterns.'],
    ['Multi-pass QA', 'Collection, annotation, and final review checkpoints reduce noisy, duplicate, or unusable records.'],
    ['Consent-aware collection', 'Project instructions can include consent, privacy, source, and usage requirements before delivery.'],
    ['Structured handoff', 'Final files are grouped with metadata so engineering and ML teams can move faster.'],
  ],
}

const nlpContent = {
  overview: [
    ['Text intelligence workflows', 'Classify, extract, summarize, translate, and route business text from chats, emails, documents, tickets, and knowledge bases.'],
    ['Multilingual NLP support', 'Plan language coverage for customer support, search, analytics, document operations, and AI assistant workflows across regions.'],
    ['Enterprise-ready implementation', 'Convert NLP ideas into scoped modules with sample outputs, integration notes, evaluation checks, and handoff documentation.'],
  ],
  useCases: [
    ['Intent Detection', 'Identify customer intent from chats, calls, forms, emails, and helpdesk tickets.'],
    ['Sentiment Analysis', 'Track customer emotion, satisfaction, risk, urgency, and feedback trends from text data.'],
    ['Document Processing', 'Extract fields, summarize content, classify files, and structure unorganized documents.'],
    ['Language Translation', 'Support multilingual workflows for teams serving users across regions and markets.'],
    ['AI Summarization', 'Condense long conversations, policies, reports, and documents into useful summaries.'],
    ['Keyword Extraction', 'Pull topics, entities, product names, issues, and business signals from text streams.'],
  ],
  workflow: ['Use case discovery', 'Data review', 'Language planning', 'Model workflow design', 'Evaluation setup', 'Integration handoff'],
  deliverables: [
    'NLP feature scope and sample output format',
    'Intent, sentiment, keyword, or classification taxonomy',
    'Document processing field map and validation notes',
    'Multilingual language coverage plan',
    'Evaluation checklist for accuracy and business fit',
    'Integration-ready handoff for CRM, support, search, or analytics systems',
  ],
}

const automationContent = {
  overview: [
    ['Workflow automation planning', 'Map repetitive tasks, approvals, handoffs, alerts, documents, and CRM actions into structured automation flows.'],
    ['AI-assisted operations', 'Use AI for email handling, ticket routing, document review, lead follow-up, data entry, summaries, and task coordination.'],
    ['Business-ready implementation', 'Turn manual processes into trackable systems with clear triggers, ownership, integrations, reporting, and support notes.'],
  ],
  workflows: [
    ['CRM Automation', 'Lead capture, qualification, follow-ups, status updates, reminders, and sales activity routing.'],
    ['Document Automation', 'Invoice processing, form extraction, file classification, approval routing, and record updates.'],
    ['Email Automation', 'Inbound email sorting, response drafts, notifications, escalation rules, and campaign follow-up.'],
    ['HR Process Automation', 'Candidate updates, onboarding checklists, employee requests, document collection, and internal alerts.'],
    ['Customer Support Automation', 'Ticket triage, SLA reminders, response suggestions, issue tagging, and customer update workflows.'],
    ['Operations Dashboards', 'Task status, automation volume, exceptions, handoff points, and business reporting views.'],
  ],
  process: ['Process audit', 'Trigger mapping', 'Tool integration', 'Automation build', 'Testing and QA', 'Launch and optimization'],
  deliverables: [
    'Automation workflow map with triggers and actions',
    'Tool and integration recommendations',
    'CRM, email, document, HR, or support automation sample',
    'Exception handling and approval logic',
    'Dashboard and reporting outline',
    'Implementation handoff with maintenance notes',
  ],
  quality: [
    ['Human approval controls', 'Critical steps can include approval gates before emails, status changes, invoices, or customer updates are finalized.'],
    ['Exception routing', 'Unclear, risky, or incomplete tasks can be routed to the right team member instead of failing silently.'],
    ['Audit-ready tracking', 'Automation logs and status fields help teams understand what happened, when, and why.'],
    ['Scalable rollout', 'Start with one workflow, validate results, then expand across CRM, HR, support, finance, and operations.'],
  ],
}

const computerVisionContent = {
  overview: [
    ['Visual recognition systems', 'Build workflows that identify faces, objects, gestures, barcodes, QR codes, scenes, and visual events from images or video.'],
    ['Image and video intelligence', 'Process CCTV feeds, photos, medical scans, documents, vehicles, products, and moderation queues into actionable visual data.'],
    ['Model-ready implementation', 'Scope datasets, annotation rules, detection targets, quality checks, deployment needs, and sample outputs for computer vision teams.'],
  ],
  useCases: [
    ['Face Recognition', 'Identity matching, attendance, access control, verification, and known-person detection workflows.'],
    ['Object Detection', 'Detect products, vehicles, tools, people, safety gear, defects, and environment-specific objects.'],
    ['OCR Image to Text', 'Read text from documents, labels, invoices, images, forms, IDs, receipts, and screenshots.'],
    ['CCTV AI Monitoring', 'Monitor movement, restricted areas, crowd activity, safety incidents, and alert-based surveillance events.'],
    ['Medical Image Analysis', 'Support scan review workflows for segmentation, visual classification, and assisted analysis.'],
    ['AI Photo Moderation', 'Flag unsafe, duplicate, low-quality, policy-violating, or inappropriate visual content.'],
  ],
  process: ['Use case mapping', 'Image/video source review', 'Annotation plan', 'Model workflow design', 'QA evaluation', 'Deployment handoff'],
  deliverables: [
    'Computer vision feature scope and detection target list',
    'Annotation guideline for images, video frames, OCR, or moderation',
    'Sample output format with labels, confidence, and metadata',
    'Dataset requirements for model training or evaluation',
    'Camera, upload, API, or dashboard integration notes',
    'QA checklist for false positives, misses, edge cases, and review rules',
  ],
  quality: [
    ['Detection accuracy planning', 'Define target classes, confidence thresholds, false positive handling, and review criteria early.'],
    ['Annotation consistency', 'Image labels, bounding boxes, OCR fields, and moderation tags can follow a clear quality checklist.'],
    ['Privacy-aware workflows', 'Face, CCTV, medical, and identity-related projects can include consent, masking, and access rules.'],
    ['Operational monitoring', 'Outputs can be tracked through alerts, dashboards, reports, and human review queues.'],
  ],
}

export function AIServiceSamplePage({ type }) {
  const config = aiServiceConfigs[type] || aiServiceConfigs.nlp
  const [selectedItem, setSelectedItem] = useState(config.items[0])
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry.isoCode)
  const [selectedState, setSelectedState] = useState(defaultState.isoCode)
  const [selectedCity, setSelectedCity] = useState(defaultCity.name)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isBusy, setIsBusy] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', useCase: '' })
  const isDataLabelingPage = type === 'dataLabeling'
  const isNlpPage = type === 'nlp'
  const isAutomationPage = type === 'automation'
  const isComputerVisionPage = type === 'computerVision'
  const hasGlobalLanguagePicker = isDataLabelingPage || isNlpPage
  const selectedCountryRecord = coverageCountries.find((country) => country.isoCode === selectedCountry) || defaultCountry
  const selectedCountryRecords = State.getStatesOfCountry(selectedCountryRecord.isoCode)
  const selectedStateRecord = selectedCountryRecords.find((state) => state.isoCode === selectedState) || selectedCountryRecords[0] || { name: 'All Regions', isoCode: '' }
  const selectedStateCities = selectedStateRecord.isoCode ? City.getCitiesOfState(selectedCountryRecord.isoCode, selectedStateRecord.isoCode) : []
  const selectedCityRecord = selectedStateCities.find((city) => city.name === selectedCity) || selectedStateCities[0] || { name: selectedCity || 'All Cities' }
  const selectedNativeLanguage = getNativeLanguage(selectedCountryRecord, selectedStateRecord)
  const currentServiceSlug = Object.entries(aiServiceRouteTypeMap).find(([, routeType]) => routeType === type)?.[0] || 'natural-language-processing'

  const handleCountryChange = (event) => {
    const nextCountry = event.target.value
    const nextCountryRecord = coverageCountries.find((country) => country.isoCode === nextCountry) || defaultCountry
    const nextRecords = State.getStatesOfCountry(nextCountryRecord.isoCode)
    const nextStateRecord = nextRecords[0] || { name: 'All Regions', isoCode: '' }
    const nextCities = nextStateRecord.isoCode ? City.getCitiesOfState(nextCountryRecord.isoCode, nextStateRecord.isoCode) : []
    setSelectedCountry(nextCountry)
    setSelectedState(nextStateRecord.isoCode)
    setSelectedCity(nextCities[0]?.name || 'All Cities')
  }

  const handleStateChange = (event) => {
    const nextState = event.target.value
    const nextStateRecord = selectedCountryRecords.find((item) => item.isoCode === nextState) || selectedCountryRecords[0] || { isoCode: '' }
    const nextCities = nextStateRecord.isoCode ? City.getCitiesOfState(selectedCountryRecord.isoCode, nextStateRecord.isoCode) : []
    setSelectedState(nextState)
    setSelectedCity(nextCities[0]?.name || 'All Cities')
  }

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value)
  }

  const openSample = (item = selectedItem) => {
    setSelectedItem(item)
    setStatus({ type: '', message: '' })
    setIsModalOpen(true)
  }

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const submitLead = async (event) => {
    event.preventDefault()
    setIsBusy(true)
    setStatus({ type: '', message: '' })

    try {
      await apiRequest(LEAD_ENDPOINTS.publicCreate, {
        method: 'POST',
        body: JSON.stringify({
          name: form.name,
          email: form.email.trim().toLowerCase(),
          service: `${config.title} - ${selectedItem}`,
          query: [
            form.phone ? `Phone: ${form.phone}` : '',
            form.company ? `Company: ${form.company}` : '',
            `Selected service: ${selectedItem}`,
            hasGlobalLanguagePicker ? `Country: ${selectedCountryRecord.name}` : '',
            hasGlobalLanguagePicker ? `State / Region: ${selectedStateRecord.name}` : '',
            hasGlobalLanguagePicker ? `City: ${selectedCityRecord.name}` : '',
            hasGlobalLanguagePicker ? `Native language: ${selectedNativeLanguage}` : '',
            form.useCase ? `Use case: ${form.useCase}` : '',
            `Google Drive sample link: ${googleDriveSampleLink}`,
          ].filter(Boolean).join('\n\n'),
        }),
      })

      downloadSample(config, selectedItem)
      setStatus({ type: 'success', message: 'Lead submitted. Your sample download has started.' })
      setForm({ name: '', email: '', phone: '', company: '', useCase: '' })
      window.setTimeout(() => setIsModalOpen(false), 1400)
    } catch (error) {
      setStatus({ type: 'error', message: error instanceof Error ? error.message : 'Unable to submit lead.' })
    } finally {
      setIsBusy(false)
    }
  }

  return (
    <main className="overflow-hidden bg-white pt-32 text-[#0f172a] sm:pt-36 lg:pt-28">
      <section className="relative isolate px-5 py-16">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#ffffff,#f5fbff_48%,#fff7f4)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#ff4b2d]/20 bg-[#fff4ef] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#ff4b2d]">
              <BrainCircuit size={16} /> Enterprise AI Service
            </span>
            <h1 className="mt-7 text-4xl font-black leading-[1.03] sm:text-6xl lg:text-7xl">{config.title}</h1>
            <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-[#475569] sm:text-lg">{config.subtitle}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <button type="button" onClick={() => openSample(selectedItem)} className="inline-flex items-center gap-3 rounded-2xl bg-[#ff4b2d] px-7 py-4 text-sm font-black uppercase tracking-[0.12em] text-white shadow-2xl shadow-[#ff4b2d]/25 transition hover:-translate-y-1">
                <Download size={18} /> Get Sample
              </button>
              <a href="/artificial-intelligence" className="inline-flex items-center rounded-2xl border border-[rgba(15,23,42,0.1)] bg-white px-7 py-4 text-sm font-black uppercase tracking-[0.12em] text-[#0f172a] shadow-xl shadow-slate-900/5 transition hover:-translate-y-1 hover:text-[#ff4b2d]">
                Back to AI
              </a>
            </div>
          </div>
          <div className="relative">
            <img src={aiServicesImage} alt={`${config.title} enterprise AI dashboard`} className="w-full rounded-[2rem] border border-white shadow-2xl shadow-slate-900/14" />
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/50 bg-white/90 p-4 shadow-xl backdrop-blur">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#64748b]">Premium sample includes</p>
              <h2 className="mt-2 text-xl font-black">{selectedItem}</h2>
              <p className="mt-2 text-sm font-bold text-[#475569]">Download file includes service scope, enterprise actions, and Google Drive sample link.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Service Portfolio" title={`Specialized ${config.title} capabilities.`} copy="Select any capability to view its enterprise context and request a service-specific sample after submitting lead details." />
          <div className={`mt-10 grid gap-4 sm:grid-cols-2 ${isDataLabelingPage ? 'lg:grid-cols-4' : 'lg:grid-cols-5'}`}>
            {config.items.map((item, index) => (
              <div key={item} className={`rounded-2xl border p-5 text-left shadow-xl shadow-slate-900/5 transition hover:-translate-y-1 ${selectedItem === item ? 'border-[#ff4b2d] bg-[#fff7f4]' : 'border-[rgba(15,23,42,0.08)] bg-white'}`}>
                <a href={`/artificial-intelligence/${currentServiceSlug}/${slugifyAiValue(item)}`} onClick={() => setSelectedItem(item)} className="block w-full text-left">
                  <span className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-[#fff1ed] text-sm font-black text-[#ff4b2d]">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="text-base font-black leading-6">{item}</h3>
                  <span className="mt-4 inline-block text-xs font-black uppercase tracking-[0.12em] text-[#ff4b2d]">View Detail</span>
                </a>
                {isDataLabelingPage ? (
                  <button type="button" onClick={() => openSample(item)} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0f172a] px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:bg-[#ff4b2d]">
                    <Mail size={15} /> Get Sample
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {isDataLabelingPage ? (
        <section className="px-5 py-16">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow="Data Collection Programs" title="Built for speech, conversation, transcription, and AI training data operations." copy="Cromgen helps teams collect and prepare practical datasets for conversational AI, voice bots, speech analytics, multilingual models, and annotation-heavy AI workflows." />
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {dataLabelingContent.overview.map(([title, copy], index) => (
                <article key={title} className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white p-6 shadow-xl shadow-slate-900/5">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#fff1ed] text-sm font-black text-[#ff4b2d]">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="mt-5 text-xl font-black text-[#0f172a]">{title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-7 text-[#475569]">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {isNlpPage ? (
        <section className="px-5 py-16">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow="NLP Programs" title="Language intelligence for text, documents, conversations, and support workflows." copy="Cromgen helps businesses design NLP capabilities that turn unstructured language into searchable, classifiable, measurable, and automation-ready data." />
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {nlpContent.overview.map(([title, copy], index) => (
                <article key={title} className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white p-6 shadow-xl shadow-slate-900/5">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#fff1ed] text-sm font-black text-[#ff4b2d]">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="mt-5 text-xl font-black text-[#0f172a]">{title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-7 text-[#475569]">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {isAutomationPage ? (
        <section className="px-5 py-16">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow="Automation Programs" title="AI-powered business process automation for daily operations." copy="Cromgen helps teams replace repetitive manual work with reliable automation across CRM, email, HR, documents, finance, customer support, and operations." />
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {automationContent.overview.map(([title, copy], index) => (
                <article key={title} className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white p-6 shadow-xl shadow-slate-900/5">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#fff1ed] text-sm font-black text-[#ff4b2d]">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="mt-5 text-xl font-black text-[#0f172a]">{title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-7 text-[#475569]">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {isComputerVisionPage ? (
        <section className="px-5 py-16">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow="Computer Vision Programs" title="AI systems that understand images, videos, cameras, documents, and visual events." copy="Cromgen helps teams design visual AI workflows for detection, recognition, OCR, monitoring, moderation, scanning, and model training." />
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {computerVisionContent.overview.map(([title, copy], index) => (
                <article key={title} className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white p-6 shadow-xl shadow-slate-900/5">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#fff1ed] text-sm font-black text-[#ff4b2d]">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="mt-5 text-xl font-black text-[#0f172a]">{title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-7 text-[#475569]">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {hasGlobalLanguagePicker ? (
        <section className="px-5 py-16">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
            <SectionTitle
              eyebrow={isNlpPage ? 'Global Language Coverage' : 'Global Voice Coverage'}
              title="Choose country, state, and city to see native language coverage."
              copy={isNlpPage ? 'Use this picker for translation, intent, sentiment, document AI, multilingual NLP, and language workflow sample requests.' : 'Use this picker for conversational AI, speech, multilingual audio, and model training data sample requests.'}
            />
            <div className="rounded-[2rem] border border-[rgba(15,23,42,0.08)] bg-white p-5 shadow-2xl shadow-slate-900/8">
              <div className="grid gap-5 lg:grid-cols-4">
                <label className="block">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#475569]">Service</span>
                  <select value={selectedItem} onChange={(event) => setSelectedItem(event.target.value)} className="min-h-[52px] w-full rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-4 text-sm font-black text-[#0f172a] outline-none focus:border-[#ff4b2d]">
                    {config.items.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#475569]">Country</span>
                  <select value={selectedCountry} onChange={handleCountryChange} className="min-h-[52px] w-full rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-4 text-sm font-black text-[#0f172a] outline-none focus:border-[#ff4b2d]">
                    {coverageCountries.map((country) => (
                      <option key={country.isoCode} value={country.isoCode}>{country.name}</option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#475569]">State / Region</span>
                  <select value={selectedState} onChange={handleStateChange} className="min-h-[52px] w-full rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-4 text-sm font-black text-[#0f172a] outline-none focus:border-[#ff4b2d]">
                    {selectedCountryRecords.length ? selectedCountryRecords.map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                    )) : <option value="">All Regions</option>}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#475569]">City</span>
                  <select value={selectedCityRecord.name} onChange={handleCityChange} className="min-h-[52px] w-full rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-4 text-sm font-black text-[#0f172a] outline-none focus:border-[#ff4b2d]">
                    {selectedStateCities.length ? selectedStateCities.map((item) => (
                      <option key={`${item.name}-${item.latitude}-${item.longitude}`} value={item.name}>{item.name}</option>
                    )) : <option value="All Cities">All Cities</option>}
                  </select>
                </label>
              </div>

              <div className="mt-5 rounded-2xl bg-[#0f172a] p-5 text-white">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#ffb7a8]">
                      <Languages size={16} /> Selected native language
                    </p>
                    <h3 className="mt-2 text-2xl font-black">{selectedNativeLanguage}</h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-300">{selectedCityRecord.name}, {selectedStateRecord.name}, {selectedCountryRecord.name} voice and language sample for {selectedItem}.</p>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white">
                    <MapPin size={15} /> {selectedCountryRecord.name}
                  </span>
                </div>
                <button type="button" onClick={() => openSample(`${selectedItem} - ${selectedCityRecord.name} ${selectedNativeLanguage}`)} className="mt-5 inline-flex items-center gap-3 rounded-2xl bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-[#0f172a] transition hover:-translate-y-1 hover:text-[#ff4b2d]">
                  <Mail size={17} /> Get Sample
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {isDataLabelingPage ? (
        <section className="border-y border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-5 py-16">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <SectionTitle eyebrow="Delivery Workflow" title="From sample brief to model-ready dataset." copy="Every project can be scoped by service type, geography, native language, collection volume, file format, labeling rules, and QA expectations." />
              <div className="mt-8 grid gap-3">
                {dataLabelingContent.workflow.map((step, index) => (
                  <div key={step} className="flex items-center gap-4 rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white p-4 shadow-lg shadow-slate-900/5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#ff4b2d] text-xs font-black text-white">{String(index + 1).padStart(2, '0')}</span>
                    <strong className="text-sm font-black uppercase tracking-[0.1em] text-[#0f172a]">{step}</strong>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] bg-[#0f172a] p-6 text-white shadow-2xl shadow-slate-900/20">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ffb7a8]">Deliverables</p>
              <h2 className="mt-4 text-3xl font-black leading-tight">What clients can request.</h2>
              <div className="mt-6 grid gap-3">
                {dataLabelingContent.deliverables.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm font-semibold leading-6 text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {isNlpPage ? (
        <section className="border-y border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-5 py-16">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <SectionTitle eyebrow="NLP Workflow" title="From language use case to integration-ready output." copy="Each NLP project can be scoped by language, channel, taxonomy, expected accuracy, downstream system, and reporting needs." />
              <div className="mt-8 grid gap-3">
                {nlpContent.workflow.map((step, index) => (
                  <div key={step} className="flex items-center gap-4 rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white p-4 shadow-lg shadow-slate-900/5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#ff4b2d] text-xs font-black text-white">{String(index + 1).padStart(2, '0')}</span>
                    <strong className="text-sm font-black uppercase tracking-[0.1em] text-[#0f172a]">{step}</strong>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] bg-[#0f172a] p-6 text-white shadow-2xl shadow-slate-900/20">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ffb7a8]">NLP Deliverables</p>
              <h2 className="mt-4 text-3xl font-black leading-tight">What the sample can include.</h2>
              <div className="mt-6 grid gap-3">
                {nlpContent.deliverables.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm font-semibold leading-6 text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {isAutomationPage ? (
        <section className="border-y border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-5 py-16">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <SectionTitle eyebrow="Automation Workflow" title="From process audit to launch-ready automation." copy="Each automation project can be scoped by process owner, trigger, system, approval rule, exception path, reporting need, and support plan." />
              <div className="mt-8 grid gap-3">
                {automationContent.process.map((step, index) => (
                  <div key={step} className="flex items-center gap-4 rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white p-4 shadow-lg shadow-slate-900/5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#ff4b2d] text-xs font-black text-white">{String(index + 1).padStart(2, '0')}</span>
                    <strong className="text-sm font-black uppercase tracking-[0.1em] text-[#0f172a]">{step}</strong>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] bg-[#0f172a] p-6 text-white shadow-2xl shadow-slate-900/20">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ffb7a8]">Automation Deliverables</p>
              <h2 className="mt-4 text-3xl font-black leading-tight">What the sample can include.</h2>
              <div className="mt-6 grid gap-3">
                {automationContent.deliverables.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm font-semibold leading-6 text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {isComputerVisionPage ? (
        <section className="border-y border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-5 py-16">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <SectionTitle eyebrow="Vision Workflow" title="From visual use case to deployment-ready plan." copy="Each computer vision project can be scoped by image source, camera setup, target classes, annotation rules, detection threshold, review workflow, and output format." />
              <div className="mt-8 grid gap-3">
                {computerVisionContent.process.map((step, index) => (
                  <div key={step} className="flex items-center gap-4 rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white p-4 shadow-lg shadow-slate-900/5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#ff4b2d] text-xs font-black text-white">{String(index + 1).padStart(2, '0')}</span>
                    <strong className="text-sm font-black uppercase tracking-[0.1em] text-[#0f172a]">{step}</strong>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] bg-[#0f172a] p-6 text-white shadow-2xl shadow-slate-900/20">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ffb7a8]">Vision Deliverables</p>
              <h2 className="mt-4 text-3xl font-black leading-tight">What the sample can include.</h2>
              <div className="mt-6 grid gap-3">
                {computerVisionContent.deliverables.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm font-semibold leading-6 text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-5 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionTitle eyebrow="Selected Capability" title={selectedItem} copy={`Cromgen maps ${selectedItem.toLowerCase()} into secure workflows, measurable KPIs, operational reporting, and enterprise-ready handoff documentation.`} />
          <div className="grid gap-4 sm:grid-cols-2">
            {config.outcomes.map((outcome, index) => (
              <article key={outcome} className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[#f8fafc] p-5 shadow-lg shadow-slate-900/5">
                <Sparkles className="text-[#ff4b2d]" size={22} />
                <h3 className="mt-4 text-lg font-black">{outcome}</h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-[#475569]">Built for scale, governance, and measurable business value.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {isDataLabelingPage ? (
        <section className="bg-white px-5 py-16">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow="Quality & Governance" title="Data quality controls for practical AI training." copy="The goal is not just more data. The goal is useful, reviewable, well-labeled data that supports training, testing, evaluation, and model improvement." />
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {dataLabelingContent.quality.map(([title, copy]) => (
                <article key={title} className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[#f8fafc] p-6 shadow-lg shadow-slate-900/5">
                  <Sparkles className="text-[#ff4b2d]" size={22} />
                  <h3 className="mt-4 text-lg font-black text-[#0f172a]">{title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-7 text-[#475569]">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {isNlpPage ? (
        <section className="bg-white px-5 py-16">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow="NLP Use Cases" title="Practical language AI modules for business teams." copy="Pick one NLP capability, select your target market language coverage, and request a sample aligned to your workflow." />
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {nlpContent.useCases.map(([title, copy]) => (
                <article key={title} className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[#f8fafc] p-6 shadow-lg shadow-slate-900/5">
                  <Sparkles className="text-[#ff4b2d]" size={22} />
                  <h3 className="mt-4 text-lg font-black text-[#0f172a]">{title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-7 text-[#475569]">{copy}</p>
                  <button type="button" onClick={() => openSample(`${title} - ${selectedCityRecord.name} ${selectedNativeLanguage}`)} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0f172a] px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:bg-[#ff4b2d]">
                    <Mail size={15} /> Get Sample
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {isAutomationPage ? (
        <section className="bg-white px-5 py-16">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow="Automation Use Cases" title="Practical automation modules for business teams." copy="Pick one workflow area and request a sample that shows process structure, automation logic, and implementation direction." />
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {automationContent.workflows.map(([title, copy]) => (
                <article key={title} className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[#f8fafc] p-6 shadow-lg shadow-slate-900/5">
                  <Sparkles className="text-[#ff4b2d]" size={22} />
                  <h3 className="mt-4 text-lg font-black text-[#0f172a]">{title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-7 text-[#475569]">{copy}</p>
                  <button type="button" onClick={() => openSample(title)} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0f172a] px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:bg-[#ff4b2d]">
                    <Mail size={15} /> Get Sample
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {isComputerVisionPage ? (
        <section className="bg-white px-5 py-16">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow="Computer Vision Use Cases" title="Practical visual AI modules for real operations." copy="Pick one vision capability and request a sample that shows detection targets, output structure, annotation needs, and implementation direction." />
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {computerVisionContent.useCases.map(([title, copy]) => (
                <article key={title} className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[#f8fafc] p-6 shadow-lg shadow-slate-900/5">
                  <Sparkles className="text-[#ff4b2d]" size={22} />
                  <h3 className="mt-4 text-lg font-black text-[#0f172a]">{title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-7 text-[#475569]">{copy}</p>
                  <button type="button" onClick={() => openSample(title)} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0f172a] px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:bg-[#ff4b2d]">
                    <Mail size={15} /> Get Sample
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {isAutomationPage ? (
        <section className="border-t border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-5 py-16">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow="Controls & Governance" title="Automation that stays measurable and reviewable." copy="Cromgen structures automation with practical safeguards, clear ownership, and reporting so teams can trust the process after launch." />
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {automationContent.quality.map(([title, copy]) => (
                <article key={title} className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white p-6 shadow-lg shadow-slate-900/5">
                  <Sparkles className="text-[#ff4b2d]" size={22} />
                  <h3 className="mt-4 text-lg font-black text-[#0f172a]">{title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-7 text-[#475569]">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {isComputerVisionPage ? (
        <section className="border-t border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-5 py-16">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow="Vision Quality & Safety" title="Computer vision built with review, privacy, and accuracy controls." copy="Cromgen structures visual AI projects with practical safeguards for sensitive images, camera feeds, medical scans, identity use cases, and operational alerts." />
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {computerVisionContent.quality.map(([title, copy]) => (
                <article key={title} className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white p-6 shadow-lg shadow-slate-900/5">
                  <Sparkles className="text-[#ff4b2d]" size={22} />
                  <h3 className="mt-4 text-lg font-black text-[#0f172a]">{title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-7 text-[#475569]">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-t border-[rgba(15,23,42,0.08)] bg-[#0f172a] px-5 py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.8fr]">
          <SectionTitle dark eyebrow="Sample Request" title={`${selectedItem} enterprise sample.`} copy="Submit the contact form and Cromgen will capture the lead with selected service, city, and native language details." />
          <button type="button" onClick={() => openSample(selectedItem)} className="inline-flex h-14 items-center justify-center gap-3 self-center rounded-2xl bg-white px-7 text-sm font-black uppercase tracking-[0.12em] text-[#0f172a] transition hover:-translate-y-1 hover:text-[#ff4b2d]">
            <Mail size={18} /> Get Full Sample
          </button>
        </div>
      </section>

      {isModalOpen ? (
        <LeadSampleModal config={config} selectedItem={selectedItem} form={form} status={status} isBusy={isBusy} onChange={handleChange} onClose={() => !isBusy && setIsModalOpen(false)} onSubmit={submitLead} />
      ) : null}
    </main>
  )
}

export function AIServiceCapabilityPage({ detail }) {
  const { config, capability, serviceSlug } = detail
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isBusy, setIsBusy] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', useCase: '' })
  const relatedItems = config.items.filter((item) => item !== capability).slice(0, 6)
  const capabilitySteps = ['Requirement review', 'Data and workflow mapping', 'Sample design', 'Quality checks', 'Integration planning', 'Delivery handoff']
  const deliverables = buildCapabilityDeliverables(config.title, capability)

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const submitLead = async (event) => {
    event.preventDefault()
    setIsBusy(true)
    setStatus({ type: '', message: '' })

    try {
      await apiRequest(LEAD_ENDPOINTS.publicCreate, {
        method: 'POST',
        body: JSON.stringify({
          name: form.name,
          email: form.email.trim().toLowerCase(),
          service: `${config.title} - ${capability}`,
          query: [
            form.phone ? `Phone: ${form.phone}` : '',
            form.company ? `Company: ${form.company}` : '',
            `Selected capability page: ${capability}`,
            form.useCase ? `Use case: ${form.useCase}` : '',
          ].filter(Boolean).join('\n\n'),
        }),
      })

      setStatus({ type: 'success', message: 'Lead submitted. Cromgen team will share the sample details shortly.' })
      setForm({ name: '', email: '', phone: '', company: '', useCase: '' })
      window.setTimeout(() => setIsModalOpen(false), 1400)
    } catch (error) {
      setStatus({ type: 'error', message: error instanceof Error ? error.message : 'Unable to submit lead.' })
    } finally {
      setIsBusy(false)
    }
  }

  return (
    <main className="overflow-hidden bg-white pt-32 text-[#0f172a] sm:pt-36 lg:pt-28">
      <section className="relative isolate px-5 py-16">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#ffffff,#f5fbff_48%,#fff7f4)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#ff4b2d]/20 bg-[#fff4ef] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#ff4b2d]">
              <BrainCircuit size={16} /> {config.title}
            </span>
            <h1 className="mt-7 text-4xl font-black leading-[1.03] sm:text-6xl lg:text-7xl">{capability}</h1>
            <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-[#475569] sm:text-lg">
              Cromgen builds {capability.toLowerCase()} workflows as part of {config.title.toLowerCase()} projects, with clear scope, sample output, quality checks, and implementation handoff.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <button type="button" onClick={() => setIsModalOpen(true)} className="inline-flex items-center gap-3 rounded-2xl bg-[#ff4b2d] px-7 py-4 text-sm font-black uppercase tracking-[0.12em] text-white shadow-2xl shadow-[#ff4b2d]/25 transition hover:-translate-y-1">
                <Mail size={18} /> Get Sample
              </button>
              <a href={`/artificial-intelligence/${serviceSlug}`} className="inline-flex items-center rounded-2xl border border-[rgba(15,23,42,0.1)] bg-white px-7 py-4 text-sm font-black uppercase tracking-[0.12em] text-[#0f172a] shadow-xl shadow-slate-900/5 transition hover:-translate-y-1 hover:text-[#ff4b2d]">
                Back to {config.title}
              </a>
            </div>
          </div>
          <div className="rounded-[2rem] border border-[rgba(15,23,42,0.08)] bg-[#0f172a] p-6 text-white shadow-2xl shadow-slate-900/20">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ffb7a8]">Capability Snapshot</p>
            <h2 className="mt-3 text-3xl font-black">{capability}</h2>
            <p className="mt-4 text-sm font-semibold leading-7 text-slate-300">{config.subtitle}</p>
            <div className="mt-6 grid gap-3">
              {config.outcomes.map((outcome) => (
                <div key={outcome} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm font-bold text-slate-100">
                  {outcome}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-5 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <SectionTitle eyebrow="How It Works" title={`${capability} delivery workflow.`} copy="This page gives the client a focused view of the selected service capability and moves them directly into the sample request flow." />
            <div className="mt-8 grid gap-3">
              {capabilitySteps.map((step, index) => (
                <div key={step} className="flex items-center gap-4 rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white p-4 shadow-lg shadow-slate-900/5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#ff4b2d] text-xs font-black text-white">{String(index + 1).padStart(2, '0')}</span>
                  <strong className="text-sm font-black uppercase tracking-[0.1em] text-[#0f172a]">{step}</strong>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionTitle eyebrow="Sample Includes" title="What the detail sample can cover." />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {deliverables.map((item) => (
                <article key={item} className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white p-5 shadow-lg shadow-slate-900/5">
                  <Sparkles className="text-[#ff4b2d]" size={22} />
                  <h3 className="mt-4 text-base font-black leading-6">{item}</h3>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {relatedItems.length ? (
        <section className="px-5 py-16">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow="Related Capabilities" title={`More from ${config.title}.`} />
            <div className="mt-8 flex flex-wrap gap-3">
              {relatedItems.map((item) => (
                <a key={item} href={`/artificial-intelligence/${serviceSlug}/${slugifyAiValue(item)}`} className="rounded-full border border-[rgba(15,23,42,0.08)] bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.12em] text-[#475569] shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:border-[#ff4b2d]/40 hover:text-[#ff4b2d]">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-[#0f172a] px-5 py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.8fr]">
          <SectionTitle dark eyebrow="Sample Request" title={`Get ${capability} sample details.`} copy="Submit the contact form and Cromgen will capture the lead for this exact capability page." />
          <button type="button" onClick={() => setIsModalOpen(true)} className="inline-flex h-14 items-center justify-center gap-3 self-center rounded-2xl bg-white px-7 text-sm font-black uppercase tracking-[0.12em] text-[#0f172a] transition hover:-translate-y-1 hover:text-[#ff4b2d]">
            <Mail size={18} /> Get Sample
          </button>
        </div>
      </section>

      {isModalOpen ? (
        <LeadSampleModal config={config} selectedItem={capability} form={form} status={status} isBusy={isBusy} onChange={handleChange} onClose={() => !isBusy && setIsModalOpen(false)} onSubmit={submitLead} />
      ) : null}
    </main>
  )
}

function LeadSampleModal({ config, selectedItem, form, status, isBusy, onChange, onClose, onSubmit }) {
  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-[#0f172a]/55 px-4 py-6 backdrop-blur-md" role="dialog" aria-modal="true">
      <div className="max-h-[92vh] w-full max-w-[720px] overflow-y-auto rounded-[2rem] border border-white/60 bg-white text-[#0f172a] shadow-2xl">
        <div className="border-b border-[rgba(15,23,42,0.08)] bg-[#fff7f4] px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff4b2d]">Contact Details Required</p>
              <h2 className="mt-2 text-2xl font-black">Get {config.sampleName}</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-[#475569]">Selected capability: {selectedItem}. Your request will be saved as a backend lead.</p>
            </div>
            <button type="button" onClick={onClose} disabled={isBusy} className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white text-xl font-black text-[#475569]">x</button>
          </div>
        </div>
        <form onSubmit={onSubmit} className="space-y-5 p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <LeadField label="Your Name" name="name" value={form.name} onChange={onChange} required />
            <LeadField label="Email Address" name="email" type="email" value={form.email} onChange={onChange} required />
            <LeadField label="Mobile Number" name="phone" type="tel" value={form.phone} onChange={onChange} />
            <LeadField label="Company Name" name="company" value={form.company} onChange={onChange} />
          </div>
          <label className="block">
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#475569]">Requirement</span>
            <textarea name="useCase" value={form.useCase} onChange={onChange} required rows="3" placeholder={`Tell us about your ${selectedItem} requirement`} className="w-full resize-none rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-4 py-4 text-sm font-bold text-[#0f172a] outline-none focus:border-[#ff4b2d]" />
          </label>
          {status.message ? <p className={`rounded-2xl px-4 py-3 text-sm font-bold ${status.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>{status.message}</p> : null}
          <button type="submit" disabled={isBusy} className="w-full rounded-2xl bg-gradient-to-r from-[#ff4b2d] to-[#ff6b4a] px-6 py-4 text-sm font-black uppercase tracking-[0.12em] text-white shadow-2xl shadow-[#ff4b2d]/25 disabled:cursor-wait disabled:opacity-70">
            {isBusy ? 'Processing...' : 'Submit Lead & Get Sample'}
          </button>
        </form>
      </div>
    </div>
  )
}

function LeadField({ label, name, type = 'text', value, onChange, required = false }) {
  return (
    <label>
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#475569]">{label}</span>
      <input name={name} type={type} value={value} onChange={onChange} required={required} placeholder={label} className="min-h-[52px] w-full rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-4 py-4 text-sm font-bold text-[#0f172a] outline-none focus:border-[#ff4b2d]" />
    </label>
  )
}

function SectionTitle({ eyebrow, title, copy, dark = false }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ff4b2d]">{eyebrow}</p>
      <h2 className={`mt-4 text-3xl font-black leading-tight sm:text-5xl ${dark ? 'text-white' : 'text-[#0f172a]'}`}>{title}</h2>
      {copy ? <p className={`mt-4 text-base font-semibold leading-8 ${dark ? 'text-slate-300' : 'text-[#475569]'}`}>{copy}</p> : null}
    </div>
  )
}

function getNativeLanguage(country, state) {
  if (country.isoCode === 'IN') {
    return indiaStateLanguageMap[state.name] || 'Hindi / English'
  }

  return countryLanguageMap[country.isoCode] || 'Local native language'
}

function buildCapabilityDeliverables(serviceTitle, capability) {
  return [
    `${capability} scope and requirement notes`,
    'Recommended workflow and implementation plan',
    'Sample output or data structure',
    'Quality review checklist',
    `${serviceTitle} integration guidance`,
    'Timeline, handoff, and next-step recommendations',
  ]
}

function downloadSample(config, selectedItem) {
  const sample = [
    `Cromgen Technology - ${config.sampleName}`,
    '',
    `Service: ${config.title}`,
    `Selected capability: ${selectedItem}`,
    `Google Drive sample link: ${googleDriveSampleLink}`,
    '',
    'Enterprise overview:',
    config.subtitle,
    '',
    'Included service capabilities:',
    ...config.items.map((item) => `- ${item}`),
    '',
    'Recommended enterprise actions:',
    ...config.outcomes.map((item) => `- ${item}`),
  ].join('\n')

  const blob = new Blob([sample], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${config.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-sample.txt`
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
