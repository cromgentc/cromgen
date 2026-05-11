import { BpoServiceLandingPage } from './BpoServiceLandingPage.jsx'

export function AppointmentSettingPage() {
  return (
    <BpoServiceLandingPage
      eyebrow="Enterprise Appointment Setting"
      heading="Appointment Setting Services"
      subheading="Reliable appointment setting support for sales meetings, demos, consultations, and follow-up scheduling."
      primaryCta="Start Appointment Campaign"
      stats={['Demo Booking Support', 'Calendar Coordination', 'Confirmation Reporting']}
      features={[
        'Meeting Scheduling',
        'Demo Booking',
        'Follow-Up Calls',
        'Calendar Coordination',
        'Reminder Calls',
        'CRM Appointment Tracking',
      ]}
      workflowTitle="How Appointment Setting Works"
      workflow={['Campaign Brief', 'Script & Calendar Setup', 'Calling & Scheduling', 'Confirmation & Reporting']}
    />
  )
}
