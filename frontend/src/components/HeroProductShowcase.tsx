import React, { useState } from 'react';
import {
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Video,
  Briefcase,
  FileCheck2,
  QrCode,
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  INITIAL_WORKER_PROFILE,
  INITIAL_WORKER_SKILLS,
  INITIAL_JOBS,
} from '../data/seedData';

export const HeroProductShowcase: React.FC = () => {
  const verifiedSkills = INITIAL_WORKER_SKILLS.filter(
    (s) => s.status === 'verified'
  );
  const [selectedSkillId, setSelectedSkillId] = useState<string>(
    verifiedSkills[0]?.id ?? ''
  );

  const featuredOpp = INITIAL_JOBS[0];

  return (
    <div className="relative mx-auto w-full max-w-[560px] pt-2 pb-2 sm:pt-4 sm:pb-8">
      {/* Work Verification Status Strip */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.16 }}
        className="relative z-20 mb-3 flex w-fit items-center gap-2 border border-[#173B78]/20 bg-white px-3 py-2 shadow-sm sm:ml-auto sm:mr-2 sm:-mb-3.5"
      >
        <span className="h-2 w-2 rounded-full bg-[#FF8A45]" />
        <FileCheck2 className="h-4 w-4 text-[#173B78]" />
        <span className="font-mono text-[11px] font-semibold text-[#173B78]">
          WORKRECEIPT PROTECTED · 24 RECORDS
        </span>
      </motion.div>

      {/* Main Digital Skill Passport Frame */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, delay: 0.08 }}
        className="relative z-10 border border-[#173B78]/22 bg-white shadow-[0_20px_48px_-20px_rgba(23,59,120,0.22)]"
      >
        <div className="border-b border-white/12 bg-[#173B78] px-4 py-4 text-white sm:px-6">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#FF8A45]" />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-white/90">
                Digital Skill Passport
              </span>
            </div>
            <span className="border border-white/25 bg-white/10 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-white">
              Verified Identity
            </span>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#FF8A45]/70 bg-[#0F2347] font-display text-base font-bold text-white sm:h-13 sm:w-13 sm:text-lg">
                {INITIAL_WORKER_PROFILE.initials}
              </div>
              <div className="min-w-0">
                <h2 className="truncate font-display text-lg font-bold tracking-tight text-white sm:text-xl">
                  {INITIAL_WORKER_PROFILE.name}
                </h2>
                <p className="mt-0.5 text-xs font-medium text-white/85 sm:text-sm">
                  {INITIAL_WORKER_PROFILE.profession} ·{' '}
                  {INITIAL_WORKER_PROFILE.experienceYears} yrs
                </p>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-white/75">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-[#FF8A45]" />
                    {INITIAL_WORKER_PROFILE.location}
                  </span>
                  <span>ID: {INITIAL_WORKER_PROFILE.passportId}</span>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 flex-col items-center border border-white/20 bg-white p-1.5 text-[#173B78]">
              <QrCode className="h-9 w-9 stroke-[1.6] sm:h-11 sm:w-11" />
              <span className="mt-0.5 font-mono text-[8px] font-bold uppercase tracking-wider">
                QR Proof
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.11em] text-[#173B78]/70">
              Independently Verified Skills
            </span>
            <span className="font-mono text-[11px] font-medium text-[#3478F6]">
              Tap to inspect
            </span>
          </div>

          <div className="mt-3 space-y-2.5">
            {verifiedSkills.map((cred) => {
              const isSelected = cred.id === selectedSkillId;
              return (
                <button
                  key={cred.id}
                  type="button"
                  onClick={() => setSelectedSkillId(cred.id)}
                  className={`min-h-[56px] w-full border px-3.5 py-3 text-left transition-colors ${
                    isSelected
                      ? 'border-[#3478F6] bg-[#F8F7F3]'
                      : 'border-[#173B78]/14 bg-white hover:border-[#173B78]/35'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2.5">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <CheckCircle2
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          isSelected ? 'text-[#3478F6]' : 'text-[#173B78]/45'
                        }`}
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-bold leading-snug text-[#102347]">
                          {cred.name}
                        </p>
                        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-[#102347]/65">
                          <span className="inline-flex items-center gap-1">
                            <Video className="h-3 w-3 text-[#FF8A45]" />
                            {cred.evidenceDuration}
                          </span>
                          <span>{cred.rubricCode}</span>
                        </div>
                      </div>
                    </div>

                    <span className="shrink-0 border border-[#173B78]/15 bg-white px-2 py-0.5 font-mono text-xs font-semibold text-[#173B78]">
                      {cred.score}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-4 grid grid-cols-3 divide-x divide-[#173B78]/12 border border-[#173B78]/12 bg-[#F8F7F3] py-2.5 text-center">
            <div className="px-1">
              <p className="font-mono text-xs font-bold text-[#173B78]">24</p>
              <p className="text-[11px] font-medium text-[#102347]/70">
                WorkReceipts
              </p>
            </div>
            <div className="px-1">
              <p className="font-mono text-xs font-bold text-[#173B78]">
                {INITIAL_WORKER_PROFILE.reliabilityScore}
              </p>
              <p className="text-[11px] font-medium text-[#102347]/70">
                Attendance
              </p>
            </div>
            <div className="px-1">
              <p className="font-mono text-xs font-bold text-[#3478F6]">
                3 Verified
              </p>
              <p className="text-[11px] font-medium text-[#102347]/70">
                2 Declared
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Matched Opportunity Preview */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, delay: 0.22 }}
        className="relative z-20 mt-4 border-2 border-[#173B78] bg-[#F8F7F3] p-4 shadow-[0_16px_32px_-14px_rgba(15,35,71,0.25)] sm:-mt-6 sm:mr-12 sm:-ml-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center bg-[#FF8A45] text-[#0F2347]">
              <Briefcase className="h-3.5 w-3.5" />
            </span>
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#173B78]">
              Matched Opportunity · {featuredOpp.distanceKm} km away
            </span>
          </div>
          <span className="bg-[#173B78] px-2.5 py-0.5 font-mono text-xs font-semibold text-white">
            ₹{featuredOpp.dailyRate.toLocaleString('en-IN')}/day
          </span>
        </div>

        <div className="mt-2.5 flex flex-col justify-between gap-2.5 sm:flex-row sm:items-end">
          <div>
            <p className="font-display text-base font-bold text-[#102347]">
              {featuredOpp.title}
            </p>
            <p className="text-xs text-[#102347]/75">
              {featuredOpp.employerName} · {featuredOpp.location} ·{' '}
              {featuredOpp.durationDays} Days
            </p>
          </div>
          <span className="inline-flex w-fit items-center gap-1.5 border border-[#3478F6]/35 bg-white px-2.5 py-1 text-xs font-semibold text-[#173B78]">
            <ShieldCheck className="h-3.5 w-3.5 text-[#3478F6]" />
            WorkReceipt Ready
          </span>
        </div>
      </motion.div>
    </div>
  );
};
