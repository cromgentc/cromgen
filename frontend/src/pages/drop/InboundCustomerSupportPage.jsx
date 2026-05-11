import { BpoServiceLandingPage } from './BpoServiceLandingPage.jsx'

export function InboundCustomerSupportPage() {
  return (
    <BpoServiceLandingPage
      eyebrow="Enterprise Inbound Support"
      heading="Inbound Customer Support"
      subheading="Professional inbound support services for customer queries, complaint handling, ticket resolution, order assistance, and smooth customer communication."
      primaryCta="Start Support Service"
      stats={['24/7 Support Option', 'Trained Agents', 'QA Call Monitoring']}
      features={[
        'Customer Query Handling',
        'Complaint Resolution',
        'Order Assistance',
        'Ticket Management',
        'Voice Support',
        'CRM-Based Support',
        'Escalation Handling',
        'Customer Satisfaction Follow-Up',
      ]}
      workflowTitle="How Inbound Customer Support Works"
      workflow={['Customer Contact', 'Query Logging', 'Agent Resolution', 'QA & Reporting']}
      trustItems={[
        'SLA-Based Operations',
        'Multi-Channel Support',
        'Secure Communication',
        'Daily MIS Reports',
        'Scalable Support Team',
        'Quality Monitoring',
      ]}
    />
  )
}
