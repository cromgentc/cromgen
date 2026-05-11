import { SectionHeading } from '../components/SectionHeading.jsx'
import { ServiceIcon } from '../components/ServiceIcon.jsx'
import { getServiceLink } from '../data/services.js'
import { getServiceImage } from '../data/serviceImages.js'

export function ServicePage({ service }) {
  const heroImage = getServiceImage(service)

  return (
    <main>
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-16">
          <div>
            <div
              className="mb-5 grid h-16 w-16 place-items-center rounded-[8px] text-white"
              style={{ backgroundColor: service.accent }}
            >
              <ServiceIcon name={service.icon} className="h-9 w-9" />
            </div>
            <p className="text-sm font-black uppercase tracking-[0.18em]" style={{ color: service.warm }}>
              {service.eyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight text-[#0f191b] sm:text-5xl lg:text-6xl">
              {service.heroTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#53676a]">{service.heroCopy}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="mailto:hello@cromgentechnology.com"
                className="rounded-full px-6 py-3 text-sm font-black text-white shadow-lg transition hover:opacity-90"
                style={{ backgroundColor: service.accent }}
              >
                Start Project
              </a>
              <a
                href="/"
                className="rounded-full border border-[#b8cbc7] bg-white px-6 py-3 text-sm font-black text-[#142123] transition hover:border-[#0b6868]"
              >
                Back Home
              </a>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[8px] border border-[#d8e5e2] shadow-2xl shadow-[#5a716d]/20">
            <img src={heroImage} alt={`${service.title} professional service visual`} className="aspect-[4/3] w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#101d1f]/86 to-transparent p-5">
              <p className="max-w-lg text-sm font-semibold leading-6 text-white">{service.kicker}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#dce7e5] bg-[#f6faf9] py-14">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid gap-4 sm:grid-cols-3">
            {service.metrics.map(([value, label]) => (
              <div key={label} className="rounded-[8px] border border-[#dce7e5] bg-white p-6">
                <div className="text-4xl font-black" style={{ color: service.accent }}>
                  {value}
                </div>
                <div className="mt-3 text-sm font-black uppercase tracking-[0.13em] text-[#66777a]">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading
            eyebrow={`${service.title} list`}
            title={`Services under ${service.title}`}
            copy="The complete list is presented in a professional layout so visitors can compare options and choose quickly."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {service.services.map((item, index) => (
              <a
                key={item}
                href={getServiceLink(service.slug, item)}
                className="group rounded-[8px] border border-[#dce7e5] bg-[#fbfdfd] p-5 transition hover:-translate-y-1 hover:border-[#b6cbc7] hover:shadow-xl hover:shadow-[#5c736f]/10"
              >
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full text-sm font-black text-white" style={{ backgroundColor: service.accent }}>
                  {index + 1}
                </div>
                <h3 className="text-base font-black text-[#0f191b]">{item}</h3>
                <p className="mt-3 text-sm leading-6 text-[#617174]">
                  Planning, setup, execution, and reporting support aligned with business requirements.
                </p>
                <span className="mt-4 inline-flex text-sm font-black text-[#0b6868] transition group-hover:translate-x-1">
                  Open service page
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#eaf3f1] py-14">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading
            eyebrow="Delivery process"
            title="Simple process, clear reporting, professional execution."
          />
          <div className="grid gap-4 md:grid-cols-4">
            {service.process.map((step, index) => (
              <div key={step} className="rounded-[8px] border border-[#cbdcd8] bg-white p-5">
                <span className="text-sm font-black uppercase tracking-[0.15em]" style={{ color: service.warm }}>
                  Step {index + 1}
                </span>
                <h3 className="mt-3 text-lg font-black text-[#0f191b]">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
