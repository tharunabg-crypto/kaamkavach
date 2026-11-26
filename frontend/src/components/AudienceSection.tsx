import React from 'react';
import { HardHat, Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const WORKER_POINTS = [
  {
    title: 'Document professional experience',
    detail:
      'Keep practical field work, completed tasks, and years of craft organised in one reliable record.',
  },
  {
    title: 'Build a verifiable skill profile',
    detail:
      'Carry a portable QR Skill Passport backed by practical demonstrations and rubric assessments.',
  },
  {
    title: 'Keep records of completed work',
    detail:
      'Track daily rates, task duration, and payment confirmations with co-signed WorkReceipts.',
  },
  {
    title: 'Discover relevant opportunities',
    detail:
      'Match directly with employers seeking your exact trade skills nearby.',
  },
];

const EMPLOYER_POINTS = [
  {
    title: 'Discover skilled workers',
    detail:
      'Find qualified electricians, plumbers, masons, and technicians matched to your site requirements.',
  },
  {
    title: 'Review skill credentials',
    detail:
      'Inspect practical task evidence and verified skill indicators before hiring onto a project.',
  },
  {
    title: 'Document work agreements',
    detail:
      'Set clear daily rates, tasks, and duration upfront inside shared WorkReceipts.',
  },
  {
    title: 'Maintain transparent work records',
    detail:
      'Co-sign completed work logs and build dependable teams across ongoing sites.',
  },
];

export const AudienceSection: React.FC = () => {
  return (
    <section className="border-b border-[#173B78]/12 bg-[#F8F7F3] py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-2xl sm:mb-10">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#3478F6]">
            For Workers &amp; Employers
          </span>
          <h2 className="mt-2.5 font-display text-3xl font-bold tracking-tight text-[#173B78] sm:text-4xl">
            Shared trust on both sides of every job.
          </h2>
        </div>

        <div className="grid grid-cols-1 border border-[#173B78]/20 lg:grid-cols-2">
          {/* For Workers */}
          <motion.div
            id="for-workers"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.38 }}
            className="flex flex-col justify-between border-b border-[#173B78]/15 bg-white p-6 sm:p-10 lg:border-r lg:border-b-0"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 bg-[#FF8A45]/18 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[#102347]">
                  <HardHat className="h-4 w-4 text-[#FF8A45]" />
                  For Workers
                </span>
                <span className="font-mono text-[11px] font-semibold text-[#173B78]/60">
                  TRADESPEOPLE &amp; TECHNICIANS
                </span>
              </div>

              <h3 className="mt-5 font-display text-2xl font-bold leading-snug text-[#173B78] sm:text-3xl">
                Build your proof. Protect your pay.
              </h3>

              <ul className="mt-6 space-y-4">
                {WORKER_POINTS.map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#FF8A45]" />
                    <div>
                      <p className="font-display text-base font-bold text-[#102347]">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-sm leading-relaxed text-[#102347]/75">
                        {item.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 border-t border-[#173B78]/12 pt-6">
              <Link
                to="/worker"
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 bg-[#FF8A45] px-6 py-3 text-sm font-bold text-[#0F2347] transition-colors hover:bg-[#173B78] hover:text-white sm:w-auto"
              >
                <span>Open Worker Workspace</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          {/* For Employers */}
          <motion.div
            id="for-employers"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.38, delay: 0.06 }}
            className="flex flex-col justify-between bg-[#173B78] p-6 text-white sm:p-10"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 bg-[#3478F6]/25 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-white">
                  <Building2 className="h-4 w-4 text-[#3478F6]" />
                  For Employers
                </span>
                <span className="font-mono text-[11px] font-semibold text-white/60">
                  CONTRACTORS &amp; SITE LEADS
                </span>
              </div>

              <h3 className="mt-5 font-display text-2xl font-bold leading-snug text-white sm:text-3xl">
                Hire verified craftspeople with clarity.
              </h3>

              <ul className="mt-6 space-y-4">
                {EMPLOYER_POINTS.map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#3478F6]" />
                    <div>
                      <p className="font-display text-base font-bold text-white">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-sm leading-relaxed text-white/75">
                        {item.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 border-t border-white/15 pt-6">
              <Link
                to="/employer"
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 bg-white px-6 py-3 text-sm font-bold text-[#173B78] transition-colors hover:bg-[#3478F6] hover:text-white sm:w-auto"
              >
                <span>Open Employer Workspace</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
