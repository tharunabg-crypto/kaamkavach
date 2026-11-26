import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BrandMark } from './BrandMark';
import { PwaInstallButton } from './PwaInstallButton';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
}

const FOOTER_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Get started', to: '/get-started' },
  { label: 'Create a worker profile', to: '/register?role=worker' },
  { label: 'Create an employer profile', to: '/register?role=employer' },
];

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
    } else {
      onNavigateSection(id);
    }
  };

  return (
    <footer className="safe-bottom bg-[#0F2347] py-12 text-white sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 border-b border-white/12 pb-10 md:grid-cols-12">
          {/* Branding & Tagline */}
          <div className="md:col-span-6">
            <BrandMark inverted showTagline />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75">
              A skill-verification and digital work-protection ecosystem built
              for informal and blue-collar workers — connecting verifiable Skill
              Passports, multilingual voice logging, and co-signed WorkReceipts.
            </p>
            <div className="mt-5">
              <PwaInstallButton />
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#FF8A45]">
              Navigation
            </p>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="inline-flex min-h-[36px] items-center text-sm text-white/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Workers & For Employers */}
          <div className="md:col-span-3">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#FF8A45]">
              Ecosystem
            </p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <button
                  type="button"
                  onClick={() => handleSection('for-workers')}
                  className="min-h-[36px] text-left text-sm text-white/80 transition-colors hover:text-white"
                >
                  For Workers
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleSection('for-employers')}
                  className="min-h-[36px] text-left text-sm text-white/80 transition-colors hover:text-white"
                >
                  For Employers
                </button>
              </li>
              <li>
                <Link
                  to="/worker/home"
                  className="inline-flex min-h-[36px] items-center text-sm text-white/80 transition-colors hover:text-white"
                >
                  Worker Workspace
                </Link>
              </li>
              <li>
                <Link
                  to="/employer/dashboard"
                  className="inline-flex min-h-[36px] items-center text-sm text-white/80 transition-colors hover:text-white"
                >
                  Employer Workspace
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-2 text-xs text-white/60 sm:flex-row sm:items-center">
          <p>KaamKavach — Your Skills. Your Proof. Your Protection.</p>
          <p>Built for informal &amp; blue-collar tradespeople.</p>
        </div>
      </div>
    </footer>
  );
};
