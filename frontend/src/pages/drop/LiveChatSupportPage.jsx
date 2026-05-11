import { BpoServiceLandingPage } from './BpoServiceLandingPage.jsx'

export function LiveChatSupportPage() {
  return (
    <BpoServiceLandingPage
      eyebrow="Enterprise Live Chat"
      heading="Live Chat Support"
      subheading="Real-time chat support services to handle website visitors, customer queries, product questions, and lead assistance."
      primaryCta="Start Live Chat Support"
      stats={['Real-Time Query Handling', 'Lead Capture Ready', 'Chat Performance Reports']}
      features={[
        'Website Chat Handling',
        'Customer Query Support',
        'Lead Capture',
        'Product Assistance',
        'Escalation Handling',
        'Chat Performance Reports',
      ]}
      workflowTitle="How Live Chat Support Works"
      workflow={['Chat Setup', 'Agent Training', 'Live Query Handling', 'Reporting & Optimization']}
    />
  )
}
