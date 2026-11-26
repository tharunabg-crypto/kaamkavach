import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface ClosingCTAProps {
  onNavigateSection: (sectionId: string) => void;
}

export const ClosingCTA: React.FC<ClosingCTAProps> = ({
  onNavigateSection,
}) => {
  return (
    <section className="bg-drafting-grid border-b border-[#173B78]/12 bg-[#F8F7F3] py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.4 }}
          className="border-2 border-[#173B78] bg-white p-7 shadow-[8px_8px_0px_0px_#173B78] sm:p-14"
        >
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#FF8A45]">
            Your Skills. Your Proof. Your Protection.
          </span>

          <h2 className="mt-3.5 font-display text-3xl font-extrabold tracking-tight text-[#173B78] sm:text-5xl lg:text-6xl">
            Make your skills count.
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-[#102347]/75 sm:text-lg">
            Your experience matters. Give it the recognition it deserves.
          </p>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/register"
              className="inline-flex min-h-[50px] w-full items-center justify-center gap-2.5 bg-[#173B78] px-8 py-3.5 text-base font-bold text-white transition-colors hover:bg-[#3478F6] sm:w-auto"
            >
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4 text-[#FF8A45]" />
            </Link>
            <button
              type="button"
              onClick={() => onNavigateSection('kaamvaani')}
              className="inline-flex min-h-[50px] w-full items-center justify-center border border-[#173B78]/25 bg-[#F8F7F3] px-7 py-3.5 text-base font-semibold text-[#173B78] transition-colors hover:border-[#173B78] sm:w-auto"
            >
              Explore KaamVaani Voice
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
