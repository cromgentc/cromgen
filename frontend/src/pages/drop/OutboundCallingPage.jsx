import { BpoServiceLandingPage } from './BpoServiceLandingPage.jsx'

export function OutboundCallingPage() {
  return (
    <BpoServiceLandingPage
      eyebrow="Enterprise Outbound Calling"
      heading="Outbound Calling Services"
      subheading="Professional outbound calling solutions for lead follow-up, customer engagement, appointment setting, surveys, reminders, and business growth campaigns."
      primaryCta="Start Calling Campaign"
      stats={['Trained Calling Agents', 'Campaign-Based Execution', 'Daily Reporting']}
      features={[
        'Lead Follow-Up Calls',
        'Sales Calling',
        'Appointment Setting',
        'Customer Feedback Calls',
        'Payment Reminder Calls',
        'Verification Calls',
        'Survey Calling',
        'CRM-Based Call Tracking',
      ]}
      workflowTitle="How Outbound Calling Works"
      workflow={['Campaign Brief', 'Script & Data Setup', 'Live Calling', 'Reporting & Optimization']}
    />
  )
}
