import { ServiceIcon } from './ServiceIcon.jsx'
import { getServiceImage } from '../data/serviceImages.js'

export function ServiceCard({ service }) {
  const image = getServiceImage(service)

  return (
    <a
      href={`/${service.slug}`}
      className="group h-full rounded-[8px] bg-white p-7 shadow-lg shadow-[#5c736f]/10 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#5c736f]/16"
    >
      <img src={image} alt={`${service.title} visual`} className="mb-6 aspect-[16/9] w-full rounded-[8px] object-cover" />
      <div className="mb-6 flex items-start gap-5">
        <div
          className="grid h-14 w-14 shrink-0 place-items-center rounded-[8px] text-white"
          style={{ backgroundColor: service.accent }}
        >
          <ServiceIcon name={service.icon} className="h-8 w-8" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-[#0f191b]">{service.title}</h3>
          <p className="mt-2 text-base leading-7 text-[#617174]">{service.kicker}</p>
        </div>
      </div>
      <ul className="grid gap-2">
        {service.services.slice(0, 7).map((item) => (
          <li key={item} className="flex gap-3 text-[15px] font-semibold leading-7 text-[#344548]">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: service.warm }} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <span className="mt-6 inline-flex text-sm font-black text-[#0b6868] transition group-hover:translate-x-1">
        Read More
      </span>
    </a>
  )
}
