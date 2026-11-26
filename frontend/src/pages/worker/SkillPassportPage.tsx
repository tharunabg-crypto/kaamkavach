import React, { useState } from 'react';
import {
  ShieldCheck,
  MapPin,
  QrCode,
  Video,
  CheckCircle2,
  Plus,
  X,
  FileCheck2,
  UserCheck,
} from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';
import { TRADE_CATEGORIES } from '../../data/seedData';
import type { TradeCategoryId } from '../../types/kaamkavach';
import { WorkerLayout } from '../../components/worker/WorkerLayout';

export const SkillPassportPage: React.FC = () => {
  const {
    workerProfile,
    workerSkills,
    workReceipts,
    jobs,
    addSelfDeclaredSkill,
  } = useAppState();

  const [qrOpen, setQrOpen] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<TradeCategoryId>(
    workerProfile.category
  );

  const verifiedSkills = workerSkills.filter((s) => s.status === 'verified');
  const selfDeclaredSkills = workerSkills.filter(
    (s) => s.status === 'self-declared'
  );
  const completedJobs = jobs.filter((j) => j.status === 'completed');

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    addSelfDeclaredSkill(newSkillName, newSkillCategory);
    setNewSkillName('');
  };

  return (
    <WorkerLayout>
      <div className="space-y-5">
        {/* Digital Professional Identity Card */}
        <section className="border border-[#173B78] bg-[#173B78] p-5 text-white sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 pb-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#FF8A45]" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.14em]">
                KaamKavach Skill Passport
              </span>
            </div>
            <button
              type="button"
              onClick={() => setQrOpen(true)}
              className="inline-flex min-h-[40px] items-center gap-2 bg-white px-3.5 text-xs font-bold text-[#173B78] hover:bg-[#FF8A45] hover:text-[#0F2347]"
            >
              <QrCode className="h-4 w-4" />
              <span>Show QR Code</span>
            </button>
          </div>

          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              {/* Worker Portrait Emblem */}
              <div className="relative flex h-18 w-18 shrink-0 items-center justify-center border-2 border-[#FF8A45] bg-[#0F2347] font-display text-2xl font-extrabold text-white">
                {workerProfile.initials}
                <span
                  title="Verified Identity"
                  className="absolute -right-1.5 -bottom-1.5 flex h-6 w-6 items-center justify-center bg-[#3478F6] text-white"
                >
                  <UserCheck className="h-3.5 w-3.5" />
                </span>
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-white">
                  {workerProfile.name}
                </h1>
                <p className="text-sm font-medium text-white/85">
                  {workerProfile.profession} · {workerProfile.experienceYears}{' '}
                  years experience
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-3 font-mono text-xs text-white/75">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-[#FF8A45]" />
                    {workerProfile.location}
                  </span>
                  <span>ID: {workerProfile.passportId}</span>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-4 border-t border-white/15 pt-4 text-sm leading-relaxed text-white/80">
            {workerProfile.bio}
          </p>
        </section>

        {/* SECTION 1: Independently Verified Skills */}
        <section className="border border-[#173B78]/20 bg-white p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#173B78]/12 pb-3">
            <div>
              <span className="inline-flex items-center gap-1.5 bg-[#3478F6]/12 px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase text-[#173B78]">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#3478F6]" />
                Independently Verified
              </span>
              <h2 className="mt-1.5 font-display text-xl font-bold text-[#173B78]">
                Verified Skill Credentials ({verifiedSkills.length})
              </h2>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {verifiedSkills.map((skill) => (
              <div
                key={skill.id}
                className="border border-[#3478F6]/35 bg-[#F8F7F3] p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-display text-base font-bold text-[#102347]">
                      {skill.name}
                    </p>
                    {skill.assessorNote && (
                      <p className="mt-1 text-xs text-[#102347]/75">
                        {skill.assessorNote}
                      </p>
                    )}
                  </div>
                  <span className="border border-[#173B78]/20 bg-white px-2.5 py-1 font-mono text-xs font-bold text-[#173B78]">
                    {skill.score}
                  </span>
                </div>

                <div className="mt-2.5 flex flex-wrap items-center gap-3 font-mono text-[11px] text-[#102347]/70">
                  <span className="inline-flex items-center gap-1">
                    <Video className="h-3.5 w-3.5 text-[#FF8A45]" />
                    {skill.evidenceDuration}
                  </span>
                  <span>Rubric: {skill.rubricCode}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: Self-Declared Skills (Explicitly Separated) */}
        <section className="border border-[#173B78]/18 bg-white p-4 sm:p-6">
          <div className="border-b border-[#173B78]/12 pb-3">
            <span className="inline-block border border-[#173B78]/25 bg-[#F8F7F3] px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase text-[#173B78]">
              Self-Declared
            </span>
            <h2 className="mt-1.5 font-display text-xl font-bold text-[#173B78]">
              Self-Declared Skills ({selfDeclaredSkills.length})
            </h2>
            <p className="mt-1 text-xs text-[#102347]/70">
              Skills listed by the worker that have not yet undergone rubric
              assessment.
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {selfDeclaredSkills.map((skill) => (
              <span
                key={skill.id}
                className="border border-[#173B78]/20 bg-[#F8F7F3] px-3 py-2 text-xs font-semibold text-[#102347]"
              >
                {skill.name}
              </span>
            ))}
          </div>

          <form
            onSubmit={handleAddSkill}
            className="mt-5 grid grid-cols-1 gap-2.5 border-t border-[#173B78]/12 pt-4 sm:grid-cols-12"
          >
            <input
              type="text"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              placeholder="Add another self-declared skill..."
              aria-label="Add self-declared skill"
              className="min-h-[44px] border border-[#173B78]/25 bg-[#F8F7F3] px-3 text-sm text-[#102347] sm:col-span-6"
            />
            <select
              value={newSkillCategory}
              onChange={(e) =>
                setNewSkillCategory(e.target.value as TradeCategoryId)
              }
              aria-label="Select skill category"
              className="min-h-[44px] border border-[#173B78]/25 bg-[#F8F7F3] px-3 text-xs font-semibold text-[#102347] sm:col-span-3"
            >
              {TRADE_CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.shortLabel}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="inline-flex min-h-[44px] items-center justify-center gap-1.5 bg-[#173B78] px-4 text-xs font-bold text-white hover:bg-[#3478F6] sm:col-span-3"
            >
              <Plus className="h-4 w-4 text-[#FF8A45]" />
              <span>Add Skill</span>
            </button>
          </form>
        </section>

        {/* SECTION 3: Completed Work Records */}
        <section className="border border-[#173B78]/18 bg-white p-4 sm:p-6">
          <div className="flex items-center gap-2 border-b border-[#173B78]/12 pb-3">
            <FileCheck2 className="h-5 w-5 text-[#FF8A45]" />
            <h2 className="font-display text-xl font-bold text-[#173B78]">
              Completed Work Records ({completedJobs.length + workReceipts.length})
            </h2>
          </div>

          <div className="mt-4 space-y-2.5">
            {workReceipts.map((rec) => (
              <div
                key={rec.id}
                className="flex flex-col justify-between gap-2 border border-[#173B78]/14 bg-[#F8F7F3] p-3.5 sm:flex-row sm:items-center"
              >
                <div>
                  <p className="font-display text-sm font-bold text-[#102347]">
                    {rec.workDescription}
                  </p>
                  <p className="text-xs text-[#102347]/70">
                    {rec.employerName} · {rec.location} · {rec.durationDays}{' '}
                    days ({rec.dateRange})
                  </p>
                </div>
                <span className="font-mono text-xs font-bold text-[#173B78]">
                  {rec.receiptNo} · {rec.paymentStatus}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* QR Code Modal */}
      {qrOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Skill Passport QR Code"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F2347]/70 p-4"
          onClick={() => setQrOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm border-2 border-[#173B78] bg-white p-6 text-center"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#173B78]">
                {workerProfile.passportId}
              </span>
              <button
                type="button"
                onClick={() => setQrOpen(false)}
                aria-label="Close QR modal"
                className="p-1.5 text-[#173B78]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mx-auto my-5 flex h-44 w-44 items-center justify-center border border-[#173B78]/20 bg-[#F8F7F3] text-[#173B78]">
              <QrCode className="h-32 w-32 stroke-[1.4]" />
            </div>
            <p className="font-display text-lg font-bold text-[#173B78]">
              {workerProfile.name}
            </p>
            <p className="text-xs text-[#102347]/70">
              {verifiedSkills.length} Verified Skills · {workReceipts.length}{' '}
              WorkReceipts
            </p>
          </div>
        </div>
      )}
    </WorkerLayout>
  );
};
