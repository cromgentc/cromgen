const chatbotFeatures = [
  ['Website Chatbots', 'AI chat support for website visitors, product questions, enquiry handling, and lead capture.'],
  ['Lead Capture Automation', 'Qualify visitors, collect details, route hot leads, and reduce manual follow-up delay.'],
  ['Customer Support Bots', 'Answer common questions, guide customers, and escalate complex issues to the right team.'],
  ['WhatsApp Chatbot', 'Automate WhatsApp conversations for enquiries, reminders, service updates, and support workflows.'],
  ['CRM Integration', 'Push chatbot leads, notes, tags, and customer activity into your existing business systems.'],
  ['Multilingual Conversations', 'Support customers across multiple languages with structured conversation flows.'],
  ['FAQ Knowledge Bot', 'Train bots on business FAQs, policies, services, and operational documentation.'],
  ['Human Handoff Flow', 'Move conversations from bot to agent with context, status, and customer history intact.'],
]

const workflow = ['Discovery & Use Case', 'Conversation Design', 'AI Bot Development', 'Testing & Go Live']

const trustItems = [
  'Business Process Automation',
  'Secure Data Handling',
  'CRM-Ready Workflows',
  'Lead-Focused Conversations',
  'Analytics & Reporting',
  'Human Escalation Support',
]

export function AIChatbotDevelopmentPage() {
  return (
    <main className="min-h-screen bg-white pt-32 text-[#0f172a] sm:pt-36 lg:pt-28">
      <section className="relative isolate overflow-hidden px-5 py-16 sm:py-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_14%,rgba(255,75,45,0.16),transparent_30%),radial-gradient(circle_at_84%_18%,rgba(255,107,74,0.12),transparent_28%),linear-gradient(180deg,#ffffff,#f8fafc)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.04fr_0.96fr]">
          <div>
            <span className="inline-flex rounded-full border border-[rgba(15,23,42,0.08)] bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#ff4b2d] shadow-xl shadow-slate-900/5 backdrop-blur">
              AI Solutions
            </span>
            <h1 className="mt-7 text-4xl font-black leading-[1.03] text-[#0f172a] sm:text-6xl lg:text-7xl">
              AI Chatbot Development
            </h1>
            <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-[#475569] sm:text-lg">
              Intelligent chatbot solutions for customer support, lead generation, WhatsApp automation, website enquiries, and business workflow automation.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href="mailto:hello@cromgentechnology.com?subject=AI%20Chatbot%20Development" className="rounded-2xl bg-gradient-to-r from-[#ff4b2d] to-[#ff6b4a] px-7 py-4 text-sm font-black uppercase tracking-[0.12em] text-white shadow-2xl shadow-[#ff4b2d]/25 transition duration-300 hover:-translate-y-1">
                Start Chatbot Project
              </a>
              <a href="/artificial-intelligence" className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white/80 px-7 py-4 text-sm font-black uppercase tracking-[0.12em] text-[#0f172a] shadow-xl shadow-slate-900/5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#ff4b2d]/40 hover:text-[#ff4b2d]">
                Back to AI Services
              </a>
            </div>
            <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
              {['24/7 AI Support', 'Lead Automation', 'CRM Integration'].map((item) => (
                <article key={item} className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white/80 p-5 shadow-xl shadow-slate-900/5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#ff4b2d]/40">
                  <strong className="text-lg font-black text-[#0f172a]">{item}</strong>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[rgba(15,23,42,0.08)] bg-white/85 p-6 shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
            <div className="rounded-3xl border border-[#ff4b2d]/15 bg-[#f8fafc] p-5">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#64748b]">Live Bot Preview</p>
                  <h2 className="mt-2 text-2xl font-black text-[#0f172a]">Cromgen AI Assistant</h2>
                </div>
                <span className="rounded-full bg-[#fff1ed] px-3 py-1 text-xs font-black text-[#ff4b2d]">Online</span>
              </div>
              {[
                ['Visitor', 'I need help choosing the right service.'],
                ['AI Assistant', 'Sure. Are you looking for AI automation, support, marketing, or IT services?'],
                ['Visitor', 'AI chatbot for website and WhatsApp.'],
                ['AI Assistant', 'Great. I can capture your requirements and route this to the Cromgen AI team.'],
              ].map(([role, message]) => (
                <div key={message} className={`mb-4 rounded-2xl border border-[rgba(15,23,42,0.08)] p-4 shadow-sm ${role === 'AI Assistant' ? 'ml-8 bg-[#fff1ed]' : 'mr-8 bg-white'}`}>
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-[#ff4b2d]">{role}</p>
                  <p className="mt-2 text-sm font-bold leading-6 text-[#334155]">{message}</p>
                </div>
              ))}
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#e2e8f0]">
                <span className="block h-full w-[78%] rounded-full bg-gradient-to-r from-[#ff4b2d] to-[#ff6b4a]" />
              </div>
              <p className="mt-3 text-xs font-black uppercase tracking-[0.14em] text-[#64748b]">Automation readiness 78%</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Capabilities"
            title="AI chatbot features built for real business workflows."
            copy="Deploy intelligent chat experiences that support customers, capture leads, connect systems, and reduce repetitive manual work."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {chatbotFeatures.map(([title, copy], index) => (
              <PremiumCard key={title} index={index} title={title} copy={copy} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Delivery Process"
            title="From chatbot idea to live automation."
            copy="A clear delivery workflow for conversation planning, development, integration, testing, and launch."
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-4">
            {workflow.map((step, index) => (
              <article key={step} className="group relative rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white p-6 shadow-xl shadow-slate-900/5 transition duration-300 hover:-translate-y-2 hover:border-[#ff4b2d]/50 hover:shadow-[#ff4b2d]/10">
                {index < workflow.length - 1 ? <span className="absolute left-[calc(100%-8px)] top-10 hidden h-px w-8 bg-gradient-to-r from-[#ff4b2d] to-transparent lg:block" /> : null}
                <span className="absolute -top-4 left-6 grid h-10 w-10 place-items-center rounded-2xl bg-[#ff4b2d] text-sm font-black text-white">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-8 text-xl font-black text-[#0f172a]">{step}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[rgba(15,23,42,0.08)] bg-[#f8fafc] px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Enterprise Trust" title="Automation designed for business confidence." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {trustItems.map((item, index) => (
              <PremiumCard key={item} index={index} title={item} copy="Professional AI chatbot delivery with secure workflows, practical reporting, and scalable support." />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function SectionTitle({ eyebrow, title, copy }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ff4b2d]">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-black leading-tight text-[#0f172a] sm:text-5xl">{title}</h2>
      {copy ? <p className="mt-4 text-base font-semibold leading-8 text-[#475569]">{copy}</p> : null}
    </div>
  )
}

function PremiumCard({ index, title, copy }) {
  return (
    <article className="group rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white/90 p-6 shadow-xl shadow-slate-900/5 backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-[#ff4b2d]/50 hover:shadow-[#ff4b2d]/10">
      <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-[#fff1ed] text-sm font-black text-[#ff4b2d] transition duration-300 group-hover:bg-[#ff4b2d] group-hover:text-white">
        {String(index + 1).padStart(2, '0')}
      </div>
      <h3 className="text-xl font-black text-[#0f172a]">{title}</h3>
      <p className="mt-4 text-sm font-semibold leading-7 text-[#475569]">{copy}</p>
    </article>
  )
}
