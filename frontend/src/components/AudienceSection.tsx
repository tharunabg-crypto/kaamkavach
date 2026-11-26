import React from 'react';
import { HardHat, Building2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AudienceSection: React.FC = () => {
  return (
    <section className="section-space border-t border-navy/10 bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-[var(--layout-gutter)] md:grid-cols-2 md:gap-16">
        <article id="for-workers" className="scroll-mt-24">
          <div className="flex items-center gap-2 text-sm font-semibold text-electric">
            <HardHat className="h-4 w-4" />
            Worker workspace
          </div>
          <h2 className="mt-3 font-display text-2xl font-bold text-navy sm:text-3xl">
            Keep your skills and work history together.
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-text-muted sm:text-base">
            Explore relevant work, keep a Skill Passport, and record agreements
            with KaamVaani and WorkReceipts.
          </p>
          <Link
            to="/register?role=worker"
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-control bg-accent px-5 text-sm font-bold text-navy-deep hover:bg-navy hover:text-white"
          >
            Create worker profile
            <ArrowRight className="h-4 w-4" />
          </Link>
        </article>

        <article id="for-employers" className="scroll-mt-24">
          <div className="flex items-center gap-2 text-sm font-semibold text-electric">
            <Building2 className="h-4 w-4" />
            Employer workspace
          </div>
          <h2 className="mt-3 font-display text-2xl font-bold text-navy sm:text-3xl">
            Find tradespeople and make work terms clear.
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-text-muted sm:text-base">
            Review skill records, post a role, and keep agreements and payment
            confirmations in one place.
          </p>
          <Link
            to="/register?role=employer"
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-control bg-navy px-5 text-sm font-bold text-white hover:bg-navy-deep"
          >
            Create employer profile
            <ArrowRight className="h-4 w-4 text-accent" />
          </Link>
        </article>
      </div>
    </section>
  );
};
