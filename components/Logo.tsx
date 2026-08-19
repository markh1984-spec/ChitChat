export default function Logo({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* back bubble — ocean blue */}
      <rect x="3" y="6" width="26" height="20" rx="10" fill="#2980c9" />
      <path d="M9 25 L6 33 L15 25 Z" fill="#2980c9" />

      {/* front bubble — teal, overlapping */}
      <rect x="17" y="19" width="28" height="20" rx="10" fill="#1fae89" stroke="#f5faf8" strokeWidth="2" />
      <path d="M33 38 L36 45 L41 38 Z" fill="#1fae89" />

      {/* typing dots on the front bubble */}
      <circle cx="30" cy="29" r="2" fill="#f5faf8" />
      <circle cx="36" cy="29" r="2" fill="#f5faf8" />
      <circle cx="42" cy="29" r="2" fill="#f5faf8" />
    </svg>
  )
}
