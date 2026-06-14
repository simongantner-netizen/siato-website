export function SiatoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <defs>
        <linearGradient
          id="siato-grad"
          x1="6"
          y1="4"
          x2="42"
          y2="46"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A4D65E" />
          <stop offset="0.55" stopColor="#80BA2B" />
          <stop offset="1" stopColor="#4E7717" />
        </linearGradient>
        <linearGradient
          id="siato-shine"
          x1="24"
          y1="2"
          x2="24"
          y2="46"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.25" />
          <stop offset="0.4" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="44" height="44" rx="14" fill="url(#siato-grad)" />
      <rect x="2" y="2" width="44" height="44" rx="14" fill="url(#siato-shine)" />
      {/* Fliessende S-Linie: der kontinuierliche Verbesserungsfluss */}
      <path
        d="M33.5 15.5 C30.5 11 17.5 10.5 15.5 16 C13.5 21.5 21.5 23 24 24 C26.5 25 34.5 26.5 32.5 32 C30.5 37.5 17.5 37 14.5 32.5"
        stroke="white"
        strokeWidth="4.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SiatoLogo({
  markClassName = "h-9 w-9",
  textClassName = "text-xl text-slate-900",
}: {
  markClassName?: string;
  textClassName?: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <SiatoMark className={markClassName} />
      <span className={`font-semibold tracking-tight ${textClassName}`}>
        siato
      </span>
    </div>
  );
}
