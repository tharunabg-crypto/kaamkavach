import React from 'react';
import { ArrowRight, ArrowDown, Shield, Mic, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HeroProductShowcase } from './HeroProductShowcase';

interface HeroProps {
  onNavigateSection: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigateSection }) => {
  return (
    <section
      id="home"
      className="bg-drafting-grid relative overflow-hidden border-b border-[#173B78]/12 bg-[#F8F7F3] pt-7 pb-12 sm:pt-12 sm:pb-18 lg:pt-16 lg:pb-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-10">
          {/* Editorial Copy */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42 }}
            className="lg:col-span-6"
          >
            <div className="inline-flex items-center gap-2 border border-[#173B78]/18 bg-white px-3 py-1.5">
              <span className="h-2 w-2 shrink-0 bg-[#FF8A45]" />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#173B78]">
                Your Skills. Your Proof. Your Protection.
              </span>
            </div>

            <h1 className="mt-5 font-display text-[2.1rem] font-extrabold leading-[1.08] tracking-tight text-[#173B78] sm:text-5xl lg:text-[3.4rem]">
              Your skills deserve recognition.{' '}
              <span className="text-[#102347]">
                Your work deserves{' '}
                <span className="relative inline-block text-[#3478F6]">
                  protection.
                  <span
                    aria-hidden="true"
                    className="absolute right-0 -bottom-1 left-0 h-1.5 bg-[#FF8A45]/85"
                  />
                </span>
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#102347]/80 sm:text-lg">
              Build a trusted record of your skills, discover meaningful work
              opportunities and keep your work agreements documented — all in one
              place.
            </p>

            {/* Touch-Friendly Mobile-First CTAs */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/register"
                className="inline-flex min-h-[50px] items-center justify-center gap-2.5 bg-[#173B78] px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#3478F6]"
              >
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4 text-[#FF8A45]" />
              </Link>

              <button
                type="button"
                onClick={() => onNavigateSection('for-workers')}
                className="inline-flex min-h-[50px] items-center justify-center gap-2 border border-[#173B78]/25 bg-white px-6 py-3.5 text-base font-semibold text-[#173B78] transition-colors hover:border-[#173B78]"
              >
                <span>Explore the workspaces</span>
                <ArrowDown className="h-4 w-4 text-[#3478F6]" />
              </button>
            </div>

            {/* Trust Capabilities Strip */}
            <div className="mt-9 grid grid-cols-1 divide-y divide-[#173B78]/12 border border-[#173B78]/15 bg-white/85 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <div className="flex items-center gap-2.5 px-4 py-3">
                <Shield className="h-4 w-4 shrink-0 text-[#3478F6]" />
                <span className="text-xs font-semibold text-[#102347]">
                  Verified Skill Records
                </span>
              </div>
              <div className="flex items-center gap-2.5 px-4 py-3">
                <Mic className="h-4 w-4 shrink-0 text-[#FF8A45]" />
                <span className="text-xs font-semibold text-[#102347]">
                  Regional Voice Logging
                </span>
              </div>
              <div className="flex items-center gap-2.5 px-4 py-3">
                <FileText className="h-4 w-4 shrink-0 text-[#173B78]" />
                <span className="text-xs font-semibold text-[#102347]">
                  Co-Signed WorkReceipts
                </span>
              </div>
            </div>
          </motion.div>

          {/* Product Composition */}
          <div className="lg:col-span-6">
            <HeroProductShowcase />
          </div>
        </div>
      </div>
    </section>
  );
};
