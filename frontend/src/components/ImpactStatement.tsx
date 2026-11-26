import React from 'react';
import { motion } from 'framer-motion';

const REALITY_PILLARS = [
  {
    index: '01',
    title: 'Experience Without Documentation',
    detail:
      'Years of practical mastery in wiring, plumbing, masonry, or carpentry go unrecognised when employers have no reliable way to verify real-world capability.',
  },
  {
    index: '02',
    title: 'Unrecorded Wage Agreements',
    detail:
      'Verbal understandings on daily pay, extra tasks, and timelines leave workers vulnerable to deductions and disputes with zero documented proof.',
  },
  {
    index: '03',
    title: 'Accessible Beyond Literacy Barriers',
    detail:
      'Employment tools should never demand fluent English typing. Practical demonstrations and natural voice records belong at the centre.',
  },
];

export const ImpactStatement: React.FC = () => {
  return (
    <section className="bg-navy-drafting-grid relative border-b border-white/10 bg-[#173B78] py-14 text-white sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.42 }}
            className="lg:col-span-8"
          >
            <div className="flex items-center gap-3">
              <span className="h-0.5 w-9 bg-[#FF8A45]" />
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#FF8A45]">
                Recognition &amp; Protection
              </span>
            </div>

            <h2 className="mt-4 font-display text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-5xl">
              Good work deserves to be recognised.
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              Millions of informal and blue-collar workers power homes,
              factories, and infrastructure — yet carry almost no documented
              proof of their skills, completed jobs, or fair payment terms.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.42, delay: 0.08 }}
            className="border-l-2 border-[#FF8A45] pl-5 lg:col-span-4"
          >
            <p className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              ~88%
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/80">
              of India&apos;s workforce works outside formal documentation,
              without portable skill credentials or written work agreements.
            </p>
          </motion.div>
        </div>

        {/* Clean Horizontal Editorial Strip */}
        <div className="mt-12 grid grid-cols-1 gap-8 border-t border-white/15 pt-9 md:grid-cols-3 md:gap-10">
          {REALITY_PILLARS.map((item) => (
            <div key={item.index} className="space-y-2">
              <span className="font-mono text-xs font-semibold text-[#FF8A45]">
                {item.index} / WHY IT MATTERS
              </span>
              <h3 className="font-display text-xl font-bold text-white">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/75">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
