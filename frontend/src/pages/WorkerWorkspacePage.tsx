import React, { useState } from 'react';
import {
  ShieldCheck,
  Mic,
  FileCheck2,
  Briefcase,
  QrCode,
  CheckCircle2,
  MapPin,
  Video,
  X,
  Plus,
} from 'lucide-react';
import {
  INITIAL_WORKER_PROFILE,
  INITIAL_WORKER_SKILLS,
  INITIAL_WORK_RECEIPTS,
  INITIAL_JOBS,
  VOICE_LANGUAGES,
} from '../data/seedData';
import type { WorkReceipt } from '../types/kaamkavach';

type WorkerTab = 'passport' | 'kaamvaani' | 'receipts' | 'jobs';

const VERIFIED_SKILLS = INITIAL_WORKER_SKILLS.filter(
  (skill) => skill.status === 'verified'
);

const MATCHED_OPPORTUNITIES = INITIAL_JOBS.filter(
  (job) =>
    job.status === 'available' &&
    job.requiredSkills.some((requiredSkill) =>
      VERIFIED_SKILLS.some((skill) =>
        skill.name.toLowerCase().includes(requiredSkill.toLowerCase())
      )
    )
);

export const WorkerWorkspacePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<WorkerTab>('passport');
  const [qrOpen, setQrOpen] = useState(false);
  const [receipts, setReceipts] = useState<WorkReceipt[]>(INITIAL_WORK_RECEIPTS);

  // KaamVaani voice entry state inside Worker Workspace
  const [langId, setLangId] = useState('hindi');
  const activeScenario =
    VOICE_LANGUAGES.find((s) => s.id === langId) ?? VOICE_LANGUAGES[0];
  const [employer, setEmployer] = useState(activeScenario.parsedEmployer);
  const [work, setWork] = useState(activeScenario.parsedWork);
  const [days, setDays] = useState(activeScenario.parsedDays);
  const [rate, setRate] = useState(activeScenario.parsedRate);
  const [savedToast, setSavedToast] = useState<string | null>(null);

  const handleSelectScenario = (id: string) => {
    setLangId(id);
    const next =
      VOICE_LANGUAGES.find((s) => s.id === id) ?? VOICE_LANGUAGES[0];
    setEmployer(next.parsedEmployer);
    setWork(next.parsedWork);
    setDays(next.parsedDays);
    setRate(next.parsedRate);
    setSavedToast(null);
  };

  const handleSaveReceipt = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanDays = Math.max(1, Number(days) || 1);
    const cleanRate = Math.max(0, Number(rate) || 0);
    const newEntry: WorkReceipt = {
      id: `wr-${Date.now()}`,
      receiptNo: `WR-2026-${Math.floor(1000 + Math.random() * 8999)}`,
      dateRange: 'Today',
      employerName: employer.trim() || 'Employer',
      workerName: INITIAL_WORKER_PROFILE.name,
      workerPassportId: INITIAL_WORKER_PROFILE.passportId,
      workDescription: work.trim() || 'Trade Work',
      location: INITIAL_WORKER_PROFILE.location,
      durationDays: cleanDays,
      dailyRate: cleanRate,
      totalAmount: cleanDays * cleanRate,
      paymentStatus: 'Agreed',
      workerConfirmed: true,
      employerConfirmed: false,
      createdVia: 'KaamVaani',
    };
    setReceipts((prev) => [newEntry, ...prev]);
    setSavedToast(`WorkReceipt ${newEntry.receiptNo} added to Receipts`);
    setActiveTab('receipts');
  };

  const totalReceiptValue = receipts.reduce((sum, r) => sum + r.totalAmount, 0);

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[#F8F7F3] pt-5 pb-24 md:py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Top Worker Identity Bar */}
        <div className="flex flex-col gap-4 border border-[#173B78]/20 bg-[#173B78] p-4 text-white sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#FF8A45] bg-[#0F2347] font-display text-lg font-bold text-white">
              {INITIAL_WORKER_PROFILE.initials}
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-[#FF8A45]">
                Worker Workspace · {INITIAL_WORKER_PROFILE.passportId}
              </p>
              <h1 className="font-display text-xl font-bold text-white sm:text-2xl">
                {INITIAL_WORKER_PROFILE.name}
              </h1>
              <p className="text-xs text-white/80">
                {INITIAL_WORKER_PROFILE.profession} · {INITIAL_WORKER_PROFILE.city}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setQrOpen(true)}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-white/25 bg-white px-4 py-2 text-xs font-bold text-[#173B78] transition-colors hover:bg-[#FF8A45] hover:text-[#0F2347]"
          >
            <QrCode className="h-4 w-4" />
            <span>Show QR Passport</span>
          </button>
        </div>

        {/* Desktop / Tablet Tabs */}
        <div className="mt-5 hidden gap-2 border-b border-[#173B78]/15 pb-3 md:flex">
          {(
            [
              { id: 'passport', label: 'Skill Passport', icon: ShieldCheck },
              { id: 'kaamvaani', label: 'KaamVaani Log', icon: Mic },
              {
                id: 'receipts',
                label: `WorkReceipts (${receipts.length})`,
                icon: FileCheck2,
              },
              { id: 'jobs', label: 'Opportunities', icon: Briefcase },
            ] as const
          ).map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex min-h-[44px] items-center gap-2 px-4 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? 'bg-[#173B78] text-white'
                    : 'border border-[#173B78]/18 bg-white text-[#173B78] hover:border-[#3478F6]'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {savedToast && (
          <div
            role="status"
            className="mt-4 flex items-center justify-between gap-3 border border-[#3478F6] bg-white px-4 py-3 text-xs font-semibold text-[#173B78]"
          >
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#3478F6]" />
              {savedToast}
            </span>
            <button
              type="button"
              onClick={() => setSavedToast(null)}
              aria-label="Dismiss notification"
              className="p-1 text-[#173B78]/60 hover:text-[#173B78]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* TAB 1: PASSPORT */}
        {activeTab === 'passport' && (
          <section className="mt-5 space-y-5">
            <div className="grid grid-cols-3 divide-x divide-[#173B78]/12 border border-[#173B78]/16 bg-white py-3.5 text-center">
              <div>
                <p className="font-mono text-base font-bold text-[#173B78]">
                  {VERIFIED_SKILLS.length}
                </p>
                <p className="text-[11px] font-medium text-[#102347]/70">
                  Verified Skills
                </p>
              </div>
              <div>
                <p className="font-mono text-base font-bold text-[#173B78]">
                  {receipts.length}
                </p>
                <p className="text-[11px] font-medium text-[#102347]/70">
                  WorkReceipts
                </p>
              </div>
              <div>
                <p className="font-mono text-base font-bold text-[#3478F6]">
                  ₹{totalReceiptValue.toLocaleString('en-IN')}
                </p>
                <p className="text-[11px] font-medium text-[#102347]/70">
                  Logged Value
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="font-display text-lg font-bold text-[#173B78]">
                Verified Skill Credentials
              </h2>
              {VERIFIED_SKILLS.map((skill) => (
                <div
                  key={skill.id}
                  className="border border-[#173B78]/16 bg-white p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#3478F6]" />
                      <div>
                        <p className="text-sm font-bold text-[#102347] sm:text-base">
                          {skill.name}
                        </p>
                        <div className="mt-1 flex flex-wrap items-center gap-3 font-mono text-xs text-[#102347]/65">
                          <span className="inline-flex items-center gap-1">
                            <Video className="h-3.5 w-3.5 text-[#FF8A45]" />
                            {skill.evidenceDuration}
                          </span>
                          {skill.assessorNote && <span>{skill.assessorNote}</span>}
                          {skill.rubricCode && <span>{skill.rubricCode}</span>}
                        </div>
                      </div>
                    </div>
                    <span className="shrink-0 border border-[#173B78]/15 bg-[#F8F7F3] px-2.5 py-1 font-mono text-xs font-bold text-[#173B78]">
                      {skill.score}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TAB 2: KAAMVAANI VOICE LOG */}
        {activeTab === 'kaamvaani' && (
          <section className="mt-5 border border-[#173B78]/20 bg-white p-4 sm:p-6">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-9 w-9 items-center justify-center bg-[#FF8A45] text-[#0F2347]">
                <Mic className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-display text-xl font-bold text-[#173B78]">
                  Log Work with KaamVaani
                </h2>
                <p className="text-xs text-[#102347]/70">
                  Choose a language prompt and edit details to create a
                  WorkReceipt.
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {VOICE_LANGUAGES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleSelectScenario(s.id)}
                  className={`min-h-[44px] border px-3 py-2 text-xs font-semibold ${
                    s.id === langId
                      ? 'border-[#3478F6] bg-[#173B78] text-white'
                      : 'border-[#173B78]/18 bg-[#F8F7F3] text-[#102347]'
                  }`}
                >
                  {s.nativeLabel} · {s.label}
                </button>
              ))}
            </div>

            <div className="mt-4 border-l-2 border-[#FF8A45] bg-[#F8F7F3] p-3.5">
              <p className="font-display text-sm font-semibold text-[#173B78] sm:text-base">
                {activeScenario.promptPhrase}
              </p>
              <p className="mt-1 text-xs text-[#102347]/70">
                {activeScenario.translation}
              </p>
            </div>

            <form onSubmit={handleSaveReceipt} className="mt-5 space-y-3.5">
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="w-employer"
                    className="block font-mono text-xs font-semibold uppercase text-[#173B78]"
                  >
                    Employer
                  </label>
                  <input
                    id="w-employer"
                    type="text"
                    required
                    value={employer}
                    onChange={(e) => setEmployer(e.target.value)}
                    className="mt-1.5 min-h-[46px] w-full border border-[#173B78]/25 bg-[#F8F7F3] px-3 text-sm font-semibold text-[#102347] focus:border-[#3478F6] focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="w-task"
                    className="block font-mono text-xs font-semibold uppercase text-[#173B78]"
                  >
                    Work Task
                  </label>
                  <input
                    id="w-task"
                    type="text"
                    required
                    value={work}
                    onChange={(e) => setWork(e.target.value)}
                    className="mt-1.5 min-h-[46px] w-full border border-[#173B78]/25 bg-[#F8F7F3] px-3 text-sm font-semibold text-[#102347] focus:border-[#3478F6] focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="w-days"
                    className="block font-mono text-xs font-semibold uppercase text-[#173B78]"
                  >
                    Duration (Days)
                  </label>
                  <input
                    id="w-days"
                    type="number"
                    min={1}
                    inputMode="numeric"
                    required
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    className="mt-1.5 min-h-[46px] w-full border border-[#173B78]/25 bg-[#F8F7F3] px-3 font-mono text-sm font-semibold text-[#102347] focus:border-[#3478F6] focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="w-rate"
                    className="block font-mono text-xs font-semibold uppercase text-[#173B78]"
                  >
                    Daily Rate (₹)
                  </label>
                  <input
                    id="w-rate"
                    type="number"
                    min={0}
                    step={50}
                    inputMode="numeric"
                    required
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="mt-1.5 min-h-[46px] w-full border border-[#173B78]/25 bg-[#F8F7F3] px-3 font-mono text-sm font-semibold text-[#102347] focus:border-[#3478F6] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between border border-[#173B78]/20 bg-[#173B78] px-4 py-3 text-white">
                <span className="font-mono text-xs uppercase tracking-wider">
                  Calculated Total
                </span>
                <span className="font-mono text-lg font-bold text-[#FF8A45]">
                  ₹{((Number(days) || 0) * (Number(rate) || 0)).toLocaleString('en-IN')}
                </span>
              </div>

              <button
                type="submit"
                className="flex min-h-[50px] w-full items-center justify-center gap-2 bg-[#FF8A45] px-5 py-3 text-sm font-bold text-[#0F2347] hover:bg-[#173B78] hover:text-white"
              >
                <Plus className="h-4 w-4" />
                <span>Add to WorkReceipts</span>
              </button>
            </form>
          </section>
        )}

        {/* TAB 3: WORKRECEIPTS */}
        {activeTab === 'receipts' && (
          <section className="mt-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-[#173B78]">
                WorkReceipts ({receipts.length})
              </h2>
              <button
                type="button"
                onClick={() => setActiveTab('kaamvaani')}
                className="inline-flex min-h-[40px] items-center gap-1.5 bg-[#173B78] px-3.5 text-xs font-bold text-white"
              >
                <Plus className="h-3.5 w-3.5 text-[#FF8A45]" />
                <span>New Voice Log</span>
              </button>
            </div>

            {receipts.map((rec) => (
              <div
                key={rec.id}
                className="border border-[#173B78]/20 bg-white p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#173B78]/10 pb-2.5">
                  <span className="font-mono text-xs font-bold text-[#173B78]">
                    {rec.receiptNo} · {rec.dateRange}
                  </span>
                  <span className="border border-[#3478F6]/40 bg-[#3478F6]/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-[#173B78]">
                    {rec.paymentStatus}
                  </span>
                </div>
                <div className="mt-3 flex items-end justify-between gap-3">
                  <div>
                    <p className="font-display text-base font-bold text-[#102347]">
                      {rec.workDescription}
                    </p>
                    <p className="text-xs text-[#102347]/70">
                      Employer: {rec.employerName} · {rec.durationDays} days × ₹
                      {rec.dailyRate}
                    </p>
                  </div>
                  <p className="font-mono text-lg font-bold text-[#FF8A45]">
                    ₹{rec.totalAmount.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* TAB 4: MATCHED OPPORTUNITIES */}
        {activeTab === 'jobs' && (
          <section className="mt-5 space-y-3">
            <h2 className="font-display text-lg font-bold text-[#173B78]">
              Skill-Matched Opportunities
            </h2>
            {MATCHED_OPPORTUNITIES.map((opp) => (
              <div
                key={opp.id}
                className="border border-[#173B78]/18 bg-white p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-base font-bold text-[#102347]">
                      {opp.title}
                    </p>
                    <p className="mt-0.5 text-xs text-[#102347]/75">
                      {opp.employerName} · {opp.durationDays} days
                    </p>
                  </div>
                  <span className="shrink-0 bg-[#173B78] px-2.5 py-1 font-mono text-xs font-semibold text-white">
                    ₹{opp.dailyRate.toLocaleString('en-IN')}/day
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[#173B78]/10 pt-3 text-xs">
                  <span className="inline-flex items-center gap-1 font-mono text-[#102347]/70">
                    <MapPin className="h-3.5 w-3.5 text-[#FF8A45]" />
                    {opp.location} ({opp.distanceKm} km)
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-[#3478F6]">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Matched: {opp.requiredSkills.join(', ')}
                  </span>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>

      {/* Mobile Sticky Bottom Navigation */}
      <nav
        aria-label="Worker App Navigation"
        className="safe-bottom fixed inset-x-0 bottom-0 z-30 border-t border-[#173B78]/18 bg-white/95 backdrop-blur-md md:hidden"
      >
        <div className="grid grid-cols-4">
          {(
            [
              { id: 'passport', label: 'Passport', icon: ShieldCheck },
              { id: 'kaamvaani', label: 'KaamVaani', icon: Mic },
              { id: 'receipts', label: 'Receipts', icon: FileCheck2 },
              { id: 'jobs', label: 'Jobs', icon: Briefcase },
            ] as const
          ).map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`flex min-h-[58px] flex-col items-center justify-center gap-1 px-1 py-2 text-[11px] font-semibold transition-colors ${
                  active
                    ? 'border-t-2 border-[#3478F6] bg-[#F8F7F3] text-[#173B78]'
                    : 'text-[#102347]/65'
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${active ? 'text-[#3478F6]' : ''}`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* QR Passport Modal */}
      {qrOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="QR Skill Passport"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F2347]/70 p-4"
          onClick={() => setQrOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm border-2 border-[#173B78] bg-white p-6 text-center"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase text-[#173B78]">
                {INITIAL_WORKER_PROFILE.passportId}
              </span>
              <button
                type="button"
                onClick={() => setQrOpen(false)}
                aria-label="Close QR Passport"
                className="p-1.5 text-[#173B78]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mx-auto my-5 flex h-44 w-44 items-center justify-center border border-[#173B78]/20 bg-[#F8F7F3] text-[#173B78]">
              <QrCode className="h-32 w-32 stroke-[1.4]" />
            </div>
            <p className="font-display text-lg font-bold text-[#173B78]">
              {INITIAL_WORKER_PROFILE.name}
            </p>
            <p className="text-xs text-[#102347]/70">
              {INITIAL_WORKER_PROFILE.profession} · {VERIFIED_SKILLS.length} Verified
              Skills
            </p>
          </div>
        </div>
      )}
    </main>
  );
};
