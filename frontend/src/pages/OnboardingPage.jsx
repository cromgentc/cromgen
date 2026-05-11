import { SectionHeading } from '../components/SectionHeading.jsx'

export function OnboardingPage({ option }) {
  const isVendor = option.slug === 'vendor'
  const checklist = isVendor
    ? ['Business registration details', 'Service portfolio', 'Team capacity', 'Compliance documents']
    : ['Personal profile', 'Skill portfolio', 'Hourly or project rate', 'Availability calendar']

  return (
    <main>
      <section className="bg-[#102021] text-white">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#ffb09c]">Onboarding</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            {option.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#d9e6e4]">{option.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="mailto:hello@cromgentechnology.com" className="rounded-full bg-white px-6 py-3 text-sm font-black text-[#102021]">
              Submit Profile
            </a>
            <a href="/" className="rounded-full border border-white/30 px-6 py-3 text-sm font-black text-white">
              Back Home
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading
            eyebrow="How it works"
            title={`${option.title} process`}
            copy="A simple, transparent, and professional onboarding flow from profile review to activation."
          />
          <div className="grid gap-4 md:grid-cols-4">
            {option.points.map((point, index) => (
              <div key={point} className="rounded-[8px] border border-[#dce7e5] bg-[#fbfdfd] p-5">
                <span className="text-sm font-black uppercase tracking-[0.15em] text-[#d95f43]">Step {index + 1}</span>
                <h2 className="mt-3 text-lg font-black text-[#0f191b]">{point}</h2>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#eaf3f1] py-14">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            eyebrow="Checklist"
            title="Keep the basic details ready for profile approval."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {checklist.map((item) => (
              <div key={item} className="rounded-[8px] border border-[#cbdcd8] bg-white p-5">
                <h3 className="font-black text-[#0f191b]">{item}</h3>
                <p className="mt-3 text-sm leading-6 text-[#617174]">
                  Submit clear, updated, and verifiable information for the review team.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
