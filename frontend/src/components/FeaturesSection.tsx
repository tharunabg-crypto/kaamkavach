import React from 'react';
import {
  ShieldCheck,
  QrCode,
  SlidersHorizontal,
  FileSpreadsheet,
  Check,
  Video,
  Cpu,
  UserCheck,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { INITIAL_WORK_RECEIPTS, TRADE_CATEGORIES } from '../data/seedData';
import { CategoryIcon } from './common/CategoryIcon';
import { KaamVaaniShowcase } from './KaamVaaniShowcase';
import { SectionHeading } from './ui';

export const FeaturesSection: React.FC = () => {
  const featuredReceipt = INITIAL_WORK_RECEIPTS[0];

  return (
    <section
      id="features"
      className="section-space border-b border-[#173B78]/12 bg-white"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Core Capabilities"
          size="lg"
          title="Built for skilled trades — from discovery to payment proof."
          description="Category-led work discovery paired with verifiable skill records, co-signable WorkReceipts, and voice-first regional logging."
        />

        <div className="mt-10 space-y-6 sm:mt-12">
          {/* ROW 1: Skill Verification + Skill Passport */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* 1. Skill Verification */}
            <motion.article
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.38 }}
              className="flex flex-col justify-between border border-[#173B78]/16 bg-[#F8F7F3] p-5 sm:p-8 lg:col-span-7"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#FF8A45]">
                    01 · Skill Validation
                  </span>
                  <ShieldCheck className="h-5 w-5 text-[#173B78]" />
                </div>

                <h3 className="mt-2.5 font-display text-2xl font-bold text-[#173B78]">
                  Skill Verification
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#102347]/80 sm:text-base">
                  A structured system for recording and validating practical
                  skills — clearly separating self-declared abilities from
                  independently assessed credentials.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="border border-[#173B78]/15 bg-white p-3.5">
                  <Video className="h-4 w-4 text-[#FF8A45]" />
                  <p className="mt-2 font-display text-sm font-bold text-[#173B78]">
                    1. Practical Video
                  </p>
                  <p className="mt-1 text-xs text-[#102347]/70">
                    Record core trade work on site or workshop.
                  </p>
                </div>
                <div className="border border-[#173B78]/15 bg-white p-3.5">
                  <Cpu className="h-4 w-4 text-[#3478F6]" />
                  <p className="mt-2 font-display text-sm font-bold text-[#173B78]">
                    2. Rubric Structure
                  </p>
                  <p className="mt-1 text-xs text-[#102347]/70">
                    Organises task execution &amp; safety checks.
                  </p>
                </div>
                <div className="border-2 border-[#173B78] bg-white p-3.5">
                  <UserCheck className="h-4 w-4 text-[#173B78]" />
                  <p className="mt-2 font-display text-sm font-bold text-[#173B78]">
                    3. Assessor Sign-off
                  </p>
                  <p className="mt-1 text-xs text-[#102347]/70">
                    Issues verified skill credentials.
                  </p>
                </div>
              </div>
            </motion.article>

            {/* 2. Skill Passport */}
            <motion.article
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.38, delay: 0.06 }}
              className="flex flex-col justify-between bg-[#173B78] p-5 text-white sm:p-8 lg:col-span-5"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#FF8A45]">
                    02 · Portable Identity
                  </span>
                  <div className="bg-white p-1.5 text-[#173B78]">
                    <QrCode className="h-5 w-5" />
                  </div>
                </div>

                <h3 className="mt-2.5 font-display text-2xl font-bold text-white">
                  Skill Passport
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80 sm:text-base">
                  A digital record of a worker&apos;s experience, verified
                  skills, and professional identity — portable across sites and
                  employers.
                </p>
              </div>

              <div className="mt-6 space-y-2.5 border-t border-white/15 pt-5">
                {[
                  'Independently verified vs self-declared clarity',
                  'Completed work records & attendance history',
                  'Instant QR sharing with employers',
                ].map((pillar) => (
                  <div
                    key={pillar}
                    className="flex items-center gap-2.5 text-sm font-medium text-white/90"
                  >
                    <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center bg-[#3478F6] text-white">
                      <Check className="h-3 w-3" />
                    </span>
                    <span>{pillar}</span>
                  </div>
                ))}
              </div>
            </motion.article>
          </div>

          {/* ROW 2: Category-Led Work Discovery + WorkReceipt */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* 3. Smart Employment Matching (Category Discovery) */}
            <motion.article
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.38 }}
              className="flex flex-col justify-between border border-[#173B78]/20 bg-white p-5 sm:p-8 lg:col-span-6"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#3478F6]">
                    03 · Category Discovery
                  </span>
                  <SlidersHorizontal className="h-5 w-5 text-[#173B78]" />
                </div>

                <h3 className="mt-2.5 font-display text-2xl font-bold text-[#173B78]">
                  Smart Employment Matching
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#102347]/75 sm:text-base">
                  Browse opportunities across 8 skilled trades by location,
                  daily rate, and project duration.
                </p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {TRADE_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/worker/find-work?category=${cat.id}`}
                    className="flex min-h-[68px] flex-col items-start justify-between border border-[#173B78]/15 bg-[#F8F7F3] p-2.5 transition-colors hover:border-[#3478F6] hover:bg-white"
                  >
                    <CategoryIcon
                      category={cat.id}
                      className="h-4 w-4 text-[#3478F6]"
                    />
                    <span className="mt-2 text-xs font-bold text-[#102347]">
                      {cat.shortLabel}
                    </span>
                  </Link>
                ))}
              </div>

              <div className="mt-5 border-t border-[#173B78]/10 pt-4">
                <Link
                  to="/worker/find-work"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#3478F6] hover:text-[#173B78]"
                >
                  <span>Browse all active work listings</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>

            {/* 4. WorkReceipt */}
            <motion.article
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.38, delay: 0.06 }}
              className="flex flex-col justify-between border border-[#173B78]/20 bg-[#F8F7F3] p-5 sm:p-8 lg:col-span-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#FF8A45]">
                    04 · Co-Signable Ledger
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-bold text-[#173B78]">
                    WorkReceipt
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#102347]/80 sm:text-base">
                    A digital record of work agreements, completed tasks,
                    payment details, and two-party confirmations.
                  </p>
                </div>
                <FileSpreadsheet className="h-6 w-6 shrink-0 text-[#173B78]" />
              </div>

              <div className="bg-ledger-lines mt-6 border border-[#173B78]/25 bg-white p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#173B78]/15 pb-3">
                  <div>
                    <p className="font-mono text-xs font-bold text-[#173B78]">
                      RECEIPT #{featuredReceipt.receiptNo}
                    </p>
                    <p className="font-mono text-[11px] text-[#102347]/60">
                      {featuredReceipt.dateRange} · {featuredReceipt.location}
                    </p>
                  </div>
                  <span className="border border-[#FF8A45]/50 bg-[#FF8A45]/12 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-[#102347]">
                    {featuredReceipt.paymentStatus}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-1 gap-2 border-b border-[#173B78]/12 pb-3 font-mono text-xs sm:grid-cols-2">
                  <div>
                    <span className="text-[#102347]/55">WORKER: </span>
                    <span className="font-semibold text-[#102347]">
                      {featuredReceipt.workerName}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#102347]/55">EMPLOYER: </span>
                    <span className="font-semibold text-[#102347]">
                      {featuredReceipt.employerName}
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between gap-3 font-mono text-xs">
                  <span className="text-[#102347]/85">
                    {featuredReceipt.workDescription} (
                    {featuredReceipt.durationDays} days × ₹
                    {featuredReceipt.dailyRate}/day)
                  </span>
                  <span className="font-semibold text-[#173B78]">
                    ₹{featuredReceipt.totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between border-t-2 border-[#173B78] pt-3">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#173B78]">
                    Total Agreed Amount
                  </span>
                  <span className="font-mono text-lg font-bold text-[#FF8A45]">
                    ₹{featuredReceipt.totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </motion.article>
          </div>

          {/* 5. KaamVaani Voice Assistant Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.42 }}
          >
            <KaamVaaniShowcase />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
