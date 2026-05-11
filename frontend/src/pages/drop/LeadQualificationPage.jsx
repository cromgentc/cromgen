import { BpoServiceLandingPage } from './BpoServiceLandingPage.jsx'

export function LeadQualificationPage() {
  return (
    <BpoServiceLandingPage
      eyebrow="Enterprise Lead Qualification"
      heading="Lead Qualification Services"
      subheading="Professional lead qualification support to identify high-intent prospects, verify customer interest, and improve sales conversion quality."
      primaryCta="Start Lead Qualification"
      stats={['High-Intent Prospect Focus', 'CRM Lead Updates', 'Sales Handoff Ready']}
      features={[
        'Prospect Verification',
        'Interest Validation',
        'Budget & Requirement Check',
        'Lead Scoring',
        'CRM Lead Updates',
        'Sales Team Handoff',
      ]}
      workflowTitle="How Lead Qualification Works"
      workflow={['Lead Data Review', 'Qualification Calling', 'Lead Scoring', 'Report & Handoff']}
    />
  )
}
