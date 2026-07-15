export default function Lensy({ width = 170 }) {
  return (
    <div className="lensy-wrap" aria-hidden="true" style={{ width }}>
      <svg viewBox="130 60 460 540" xmlns="http://www.w3.org/2000/svg">
        <path fill="none" stroke="#F2B84B" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" d="M320 462 L310 520 L305 565" />
        <rect x="280" y="558" width="50" height="22" rx="11" fill="#F2B84B" />
        <path fill="none" stroke="#F2B84B" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" d="M385 462 L395 520 L400 565" />
        <rect x="375" y="558" width="50" height="22" rx="11" fill="#F2B84B" />
        <path fill="none" stroke="#F2B84B" strokeWidth="9" strokeLinejoin="round" d="M270 340 Q255 400 268 440 Q280 470 355 472 Q430 470 442 440 Q452 400 435 340 Q355 322 270 340 Z" />
        <line x1="290" y1="380" x2="420" y2="380" stroke="#F2B84B" strokeOpacity="0.35" strokeWidth="4" />
        <circle cx="305" cy="410" r="6" fill="#F2B84B" opacity="0.6" />
        <circle cx="325" cy="410" r="6" fill="#F2B84B" opacity="0.6" />
        <path fill="none" stroke="#F2B84B" strokeWidth="13" strokeLinecap="round" d="M425 360 Q470 375 465 415 Q462 435 435 442" />
        <path fill="#f5c76e" d="M320 330 Q350 355 380 330 L370 350 Q350 365 330 350 Z" />
        <path fill="none" stroke="#F2B84B" strokeWidth="13" strokeLinecap="round" d="M285 355 Q225 330 205 270 Q198 245 215 225" />
        <circle cx="218" cy="216" r="22" fill="#F2B84B" />
        <g transform="translate(190,175) rotate(-18)">
          <rect x="0" y="14" width="52" height="34" rx="3" fill="#241B4B" stroke="#F2B84B" strokeWidth="5" />
          <rect x="-2" y="0" width="56" height="16" rx="3" fill="#F2B84B" />
          <line x1="4" y1="8" x2="14" y2="0" stroke="#241B4B" strokeWidth="4" />
          <line x1="20" y1="8" x2="30" y2="0" stroke="#241B4B" strokeWidth="4" />
          <line x1="36" y1="8" x2="46" y2="0" stroke="#241B4B" strokeWidth="4" />
        </g>
        <g transform="rotate(-7 350 210)">
          <rect x="322" y="90" width="56" height="28" rx="6" fill="none" stroke="#F2B84B" strokeWidth="9" />
          <circle cx="350" cy="205" r="105" style={{ fill: "#241B4B", stroke: "#F2B84B", strokeWidth: "9px" }} />
          <circle cx="255" cy="185" r="11" fill="#F2B84B" />
          <circle cx="445" cy="185" r="11" fill="#F2B84B" />
          <circle cx="255" cy="185" r="4" fill="#150c28" />
          <circle cx="445" cy="185" r="4" fill="#150c28" />
          <g className="lensy-iris">
            <circle cx="350" cy="215" r="58" fill="none" stroke="#F2B84B" strokeWidth="9" />
            <circle cx="350" cy="215" r="42" fill="#16102e" stroke="#F2B84B" strokeWidth="4" />
            <path d="M350 215 L350 178 A37 37 0 0 1 382 197 Z" fill="#F2B84B" opacity="0.85" />
            <path d="M350 215 L382 197 A37 37 0 0 1 382 233 Z" fill="#f5c76e" opacity="0.9" />
            <path d="M350 215 L382 233 A37 37 0 0 1 350 252 Z" fill="#F2B84B" opacity="0.7" />
            <path d="M350 215 L350 252 A37 37 0 0 1 318 197 Z" fill="#f5c76e" opacity="0.75" />
            <circle cx="350" cy="215" r="16" fill="#150c28" />
            <circle cx="357" cy="207" r="6" fill="#F8F3E8" />
          </g>
          <path d="M295 145 Q315 128 345 138" fill="none" stroke="#F2B84B" strokeWidth="8" strokeLinecap="round" />
          <path d="M320 300 Q350 316 390 296" fill="none" stroke="#F2B84B" strokeWidth="8" strokeLinecap="round" />
          <circle className="lensy-tally" cx="440" cy="260" r="9" fill="#f5c76e" />
        </g>
      </svg>
    </div>
  );
}
