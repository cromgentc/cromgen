export function ServiceIcon({ name, className = 'h-6 w-6' }) {
  const commonProps = {
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: '1.8',
  }

  const paths = {
    brain: (
      <>
        <path {...commonProps} d="M12 3v18M6.5 7.5h11M6.5 16.5h11M5 12h14" />
        <path
          {...commonProps}
          d="M8 5.5 5.5 8 8 10.5M16 5.5 18.5 8 16 10.5M8 13.5 5.5 16 8 18.5M16 13.5l2.5 2.5-2.5 2.5"
        />
      </>
    ),
    chart: (
      <>
        <path {...commonProps} d="M4 17.5 9.5 12l3.5 3.5L20 7M16 7h4v4M5 20h14" />
        <path {...commonProps} d="M7 15v3M12 17v1M17 12v6" />
      </>
    ),
    headset: (
      <>
        <path
          {...commonProps}
          d="M6.5 11.5v-2A5.5 5.5 0 0 1 12 4a5.5 5.5 0 0 1 5.5 5.5v2"
        />
        <path
          {...commonProps}
          d="M6.5 11.5h-1A1.5 1.5 0 0 0 4 13v2a1.5 1.5 0 0 0 1.5 1.5h1v-5ZM17.5 11.5h1A1.5 1.5 0 0 1 20 13v2a1.5 1.5 0 0 1-1.5 1.5h-1v-5ZM17 17c-.8 2-2.5 3-5 3h-1.5"
        />
        <path {...commonProps} d="M10.5 20a1.5 1.5 0 0 1 0-3H12a1.5 1.5 0 0 1 0 3h-1.5Z" />
      </>
    ),
    cloud: (
      <>
        <path {...commonProps} d="M7 18h10.2a3.8 3.8 0 0 0 .5-7.6A6 6 0 0 0 6.2 8.8 4.7 4.7 0 0 0 7 18Z" />
        <path {...commonProps} d="M9 13h6M12 10v6" />
      </>
    ),
    code: (
      <>
        <path {...commonProps} d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" />
        <path {...commonProps} d="M5 20h14" />
      </>
    ),
    users: (
      <>
        <path {...commonProps} d="M16 19v-1.5a3.5 3.5 0 0 0-7 0V19M12.5 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path {...commonProps} d="M17 11a2.5 2.5 0 0 0 0-5M20 19v-1a3 3 0 0 0-2.3-2.9" />
      </>
    ),
    telecom: (
      <>
        <path {...commonProps} d="M12 20V9M8 20h8M9 9a3 3 0 1 1 6 0" />
        <path {...commonProps} d="M6.5 6.5a7 7 0 0 0 0 5M17.5 6.5a7 7 0 0 1 0 5M4 4a11 11 0 0 0 0 10M20 4a11 11 0 0 1 0 10" />
      </>
    ),
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      {paths[name]}
    </svg>
  )
}
