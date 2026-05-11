export function SectionHeading({ eyebrow, title, copy, className = '' }) {
  return (
    <div className={`mb-9 max-w-3xl ${className}`}>
      <p className="text-sm font-black uppercase tracking-[0.18em] text-[#d95f43]">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black leading-tight text-[#0f191b] sm:text-4xl">{title}</h2>
      {copy ? <p className="mt-4 text-base leading-7 text-[#53676a]">{copy}</p> : null}
    </div>
  )
}
