import { BpoServiceLandingPage } from './BpoServiceLandingPage.jsx'

export function TechnicalSupportHelpdeskPage() {
  return (
    <BpoServiceLandingPage
      eyebrow="Enterprise Technical Helpdesk"
      heading="Technical Support Helpdesk"
      subheading="Reliable technical helpdesk support for customer issues, troubleshooting, ticket management, product assistance, and smooth business operations."
      primaryCta="Start Helpdesk Support"
      stats={['Tier 1 & Tier 2 Support', 'Ticket-Based Resolution', 'SLA-Focused Service']}
      features={[
        'Product Troubleshooting',
        'Software Support',
        'Hardware Issue Assistance',
        'Ticket Management',
        'Remote Support Guidance',
        'Customer Query Resolution',
        'Escalation Handling',
        'Helpdesk Reporting',
      ]}
      workflowTitle="How Technical Helpdesk Support Works"
      workflow={['Issue Logging', 'Initial Diagnosis', 'Resolution or Escalation', 'Closure & Reporting']}
      trustItems={['Trained Technical Agents', 'SLA-Based Support', 'Ticket Tracking', 'QA Monitoring', 'Escalation Process', 'Daily/Weekly Reports']}
    />
  )
}
