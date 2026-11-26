import React from 'react';

interface BrandMarkProps {
  inverted?: boolean;
  showTagline?: boolean;
}

export const BrandMark: React.FC<BrandMarkProps> = ({
  inverted = false,
  showTagline = false,
}) => {
  return (
    <div className="inline-flex items-center gap-3 select-none">
      {/* Custom geometric Kavach (Shield) + interlocking proof mark */}
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M18 2.5L31 7.8V17.4C31 25.3 25.4 31.3 18 33.8C10.6 31.3 5 25.3 5 17.4V7.8L18 2.5Z"
          fill={inverted ? '#FFFFFF' : '#173B78'}
        />
        <path
          d="M18 6.2L27.5 10.1V17.3C27.5 23.1 23.4 27.6 18 29.8C12.6 27.6 8.5 23.1 8.5 17.3V10.1L18 6.2Z"
          stroke={inverted ? '#173B78' : '#3478F6'}
          strokeWidth="1.5"
        />
        <path
          d="M13 18.2L16.4 21.6L23.5 14.2"
          stroke="#FF8A45"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="flex flex-col leading-none">
        <span
          className={`font-display text-xl font-bold tracking-tight ${
            inverted ? 'text-white' : 'text-[#173B78]'
          }`}
        >
          Kaam<span className="text-[#3478F6]">Kavach</span>
        </span>
        {showTagline && (
          <span
            className={`mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${
              inverted ? 'text-white/70' : 'text-[#173B78]/65'
            }`}
          >
            Your Skills. Your Proof. Your Protection.
          </span>
        )}
      </div>
    </div>
  );
};
