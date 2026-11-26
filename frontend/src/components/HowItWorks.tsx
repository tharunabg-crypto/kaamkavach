import React from 'react';
import {
  Video,
  CheckCircle2,
  QrCode,
  Briefcase,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'framer-motion';

const JOURNEY_STEPS = [
  {
    number: '01',
    title: 'Prove Your Skills',
    subtitle: 'Practical Proof & Assessor Validation',
    description:
      'Capture a short video performing a core trade task or log field experience by voice with KaamVaani. Key safety and execution checkpoints are structured for certified assessor validation.',
    artifactLabel: 'Practical Assessment Record',
    renderArtifact: () => (
      <div className="border border-[#173B78]/16 bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#173B78]/10 pb-2.5">
          <div className="flex items-center gap-2">
            <Video className="h-4 w-4 text-[#FF8A45]" />
            <span className="font-mono text-xs font-semibold text-[#173B78]">
              PVC PRESSURE JOINTING
            </span>
          </div>
          <span className="bg-[#3478F6]/10 px-2 py-0.5 font-mono text-[11px] font-bold text-[#3478F6]">
            01:28 CLIP
          </span>
        </div>
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between gap-2 text-xs sm:text-sm">
            <span className="inline-flex items-center gap-1.5 text-[#102347]">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#3478F6]" />
              Chamfer &amp; dry-fit alignment
            </span>
            <span className="font-mono text-[11px] font-semibold text-[#173B78]">
              VERIFIED
            </span>
          </div>
          <div className="flex items-center justify-between gap-2 text-xs sm:text-sm">
            <span className="inline-flex items-center gap-1.5 text-[#102347]">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#3478F6]" />
              Assessor rubric sign-off
            </span>
            <span className="font-mono text-[11px] font-semibold text-[#FF8A45]">
              95 / 100
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: '02',
    title: 'Build Your Passport',
    subtitle: 'Portable Digital Skill Identity',
    description:
      'Verified skills, practical video evidence, and co-signed WorkReceipts bind into one portable Skill Passport — easy to share with any contractor via QR code or secure link.',
    artifactLabel: 'Skill Passport Assembly',
    renderArtifact: () => (
      <div className="border border-[#173B78] bg-[#173B78] p-4 text-white">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#FF8A45]">
              Passport ID · KK-PL-2104
            </p>
            <p className="mt-1 font-display text-base font-bold">
              3 Trust Pillars Connected
            </p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              <span className="border border-white/20 bg-white/10 px-2 py-0.5 font-mono text-[10px]">
                Task Video
              </span>
              <span className="border border-white/20 bg-white/10 px-2 py-0.5 font-mono text-[10px]">
                Assessor Sign
              </span>
              <span className="border border-white/20 bg-white/10 px-2 py-0.5 font-mono text-[10px]">
                WorkReceipts
              </span>
            </div>
          </div>
          <div className="shrink-0 bg-white p-1.5 text-[#173B78]">
            <QrCode className="h-10 w-10 stroke-[1.6]" />
          </div>
        </div>
      </div>
    ),
  },
  {
    number: '03',
    title: 'Find Opportunities',
    subtitle: 'Skill-Matched Work & Protected Pay',
    description:
      'Connect with nearby employers looking for your exact verified skills. Document rates, tasks, and duration upfront inside a co-signed WorkReceipt before starting work.',
    artifactLabel: 'Matched Opportunity',
    renderArtifact: () => (
      <div className="border border-[#173B78]/16 bg-white p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5 min-w-0">
            <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center bg-[#FF8A45]/18 text-[#102347]">
              <Briefcase className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold text-[#102347]">
                Residential Booster Pump Retrofit
              </p>
              <p className="text-xs text-[#102347]/70">
                Required: High-Pressure PVC &amp; Valve Fitment
              </p>
            </div>
          </div>
          <span className="shrink-0 bg-[#173B78] px-2.5 py-1 font-mono text-xs font-semibold text-white">
            ₹1,100/day
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-[#173B78]/10 pt-2.5 text-xs">
          <span className="inline-flex items-center gap-1 font-semibold text-[#3478F6]">
            <ShieldCheck className="h-3.5 w-3.5" />
            WorkReceipt Protected
          </span>
          <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[#173B78]">
            4.1 km <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    ),
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section
      id="how-it-works"
      className="border-b border-[#173B78]/12 bg-[#F8F7F3] py-14 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#3478F6]">
              How It Works
            </span>
            <h2 className="mt-2.5 font-display text-3xl font-bold tracking-tight text-[#173B78] sm:text-4xl lg:text-[2.7rem]">
              Three steps from practical craft to protected work.
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-[#102347]/75 sm:text-base lg:col-span-5">
            Each stage strengthens your standing: verified proof builds your
            portable Passport, which opens doors to documented, fairly paid
            jobs.
          </p>
        </div>

        {/* Connected Numbered Architectural Timeline */}
        <div className="relative mt-11 sm:mt-14">
          <div
            aria-hidden="true"
            className="absolute top-5 bottom-5 left-6 hidden w-px bg-[#173B78]/20 lg:block"
          />

          <div className="space-y-8 lg:space-y-10">
            {JOURNEY_STEPS.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.38, delay: idx * 0.06 }}
                className="relative grid grid-cols-1 gap-5 border-t border-[#173B78]/14 pt-7 lg:grid-cols-12 lg:items-center lg:gap-8 lg:border-t-0 lg:pt-0"
              >
                <div className="flex items-center gap-3.5 lg:col-span-2">
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center border-2 border-[#173B78] bg-[#F8F7F3] font-mono text-base font-bold text-[#173B78]">
                    {step.number}
                  </div>
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#FF8A45] lg:hidden">
                    Step {step.number}
                  </span>
                </div>

                <div className="lg:col-span-5">
                  <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#3478F6]">
                    {step.subtitle}
                  </p>
                  <h3 className="mt-1.5 font-display text-2xl font-bold text-[#173B78]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#102347]/80 sm:text-base">
                    {step.description}
                  </p>
                </div>

                <div className="lg:col-span-5">
                  <p className="mb-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#173B78]/55">
                    {step.artifactLabel}
                  </p>
                  {step.renderArtifact()}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
