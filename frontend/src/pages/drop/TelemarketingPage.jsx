import { BpoServiceLandingPage } from './BpoServiceLandingPage.jsx'

export function TelemarketingPage() {
  return (
    <BpoServiceLandingPage
      eyebrow="Enterprise Telemarketing"
      heading="Telemarketing Services"
      subheading="Professional telemarketing solutions for lead generation, customer engagement, sales outreach, appointment booking, and business growth campaigns."
      primaryCta="Start Telemarketing Campaign"
      stats={['Sales-Focused Calling', 'Script-Based Campaigns', 'Daily Performance Reports']}
      features={[
        'Sales Outreach Calls',
        'Lead Generation Calls',
        'Product Promotion',
        'Customer Engagement',
        'Appointment Booking',
        'Campaign Follow-Up',
        'Market Survey Calls',
        'CRM-Based Tracking',
      ]}
      workflowTitle="How Telemarketing Works"
      workflow={['Campaign Planning', 'Script & Data Setup', 'Live Calling', 'Lead Reporting & Optimization']}
      trustItems={['Trained Telemarketing Agents', 'QA Call Monitoring', 'CRM Integration', 'Conversion-Focused Scripts', 'Daily MIS Reports', 'Scalable Calling Team']}
    />
  )
}
