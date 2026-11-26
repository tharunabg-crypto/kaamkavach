import React, { useState } from 'react';
import {
  Users,
  ShieldCheck,
  FileCheck2,
  MapPin,
  CheckCircle2,
  Plus,
} from 'lucide-react';
import {
  WORKER_DIRECTORY,
  INITIAL_WORK_RECEIPTS,
  type WorkReceiptRecord,
} from '../data/platformData';

type EmployerTab = 'discover' | 'agreements';

const TRADES = ['All', 'Electrician', 'Plumber', 'Mason', 'Carpenter'];

export const EmployerWorkspacePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<EmployerTab>('discover');
  const [selectedTrade, setSelectedTrade] = useState<string>('All');
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(false);
  const [agreements, setAgreements] = useState<WorkReceiptRecord[]>(
    INITIAL_WORK_RECEIPTS
  );

  // New WorkReceipt agreement form state
  const [workerName, setWorkerName] = useState(WORKER_DIRECTORY[0].name);
  const [taskName, setTaskName] = useState('Electrical panel upgrade');
  const [days, setDays] = useState(5);
  const [rate, setRate] = useState(1100);
  const [agreementNote, setAgreementNote] = useState<string | null>(null);

  const filteredWorkers = WORKER_DIRECTORY.filter((w) => {
    const tradeMatch = selectedTrade === 'All' || w.trade === selectedTrade;
    const availMatch = !onlyAvailable || w.availableNow;
    return tradeMatch && availMatch;
  });

  const handleCreateAgreement = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanDays = Math.max(1, Number(days) || 1);
    const cleanRate = Math.max(0, Number(rate) || 0);
    const created: WorkReceiptRecord = {
      id: `emp-wr-${Date.now()}`,
      receiptNo: `WR-2026-${Math.floor(1000 + Math.random() * 8999)}`,
      dateRange: 'Scheduled Agreement',
      worker: workerName,
      contractor: 'Employer Workspace',
      workTitle: taskName.trim() || 'Trade Scope',
      durationDays: cleanDays,
      dailyRate: cleanRate,
      totalAmount: cleanDays * cleanRate,
      status: 'Pending Employer Sign-off',
    };
    setAgreements((prev) => [created, ...prev]);
    setAgreementNote(`WorkReceipt ${created.receiptNo} drafted for ${workerName}.`);
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[#F8F7F3] pt-5 pb-24 md:py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header Bar */}
        <div className="border border-[#173B78] bg-[#173B78] p-5 text-white sm:p-6">
          <p className="font-mono text-[11px] uppercase tracking-wider text-[#FF8A45]">
            Employer &amp; Contractor Workspace
          </p>
          <h1 className="mt-1 font-display text-xl font-bold text-white sm:text-2xl">
            Discover verified tradespeople &amp; document agreements
          </h1>
          <p className="mt-1 text-xs text-white/80 sm:text-sm">
            Review verified Skill Passports and maintain transparent
            WorkReceipts across every site.
          </p>
        </div>

        {/* Desktop Tabs */}
        <div className="mt-5 hidden gap-2 border-b border-[#173B78]/15 pb-3 md:flex">
          <button
            type="button"
            onClick={() => setActiveTab('discover')}
            className={`inline-flex min-h-[44px] items-center gap-2 px-4 py-2 text-sm font-semibold ${
              activeTab === 'discover'
                ? 'bg-[#173B78] text-white'
                : 'border border-[#173B78]/18 bg-white text-[#173B78]'
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Discover Workers</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('agreements')}
            className={`inline-flex min-h-[44px] items-center gap-2 px-4 py-2 text-sm font-semibold ${
              activeTab === 'agreements'
                ? 'bg-[#173B78] text-white'
                : 'border border-[#173B78]/18 bg-white text-[#173B78]'
            }`}
          >
            <FileCheck2 className="h-4 w-4" />
            <span>Work Agreements ({agreements.length})</span>
          </button>
        </div>

        {/* TAB 1: DISCOVER WORKERS */}
        {activeTab === 'discover' && (
          <section className="mt-5 space-y-4">
            {/* Filters */}
            <div className="border border-[#173B78]/15 bg-white p-4">
              <div className="flex flex-wrap items-center gap-2">
                {TRADES.map((trade) => (
                  <button
                    key={trade}
                    type="button"
                    onClick={() => setSelectedTrade(trade)}
                    className={`min-h-[40px] border px-3 text-xs font-semibold transition-colors ${
                      selectedTrade === trade
                        ? 'border-[#3478F6] bg-[#3478F6] text-white'
                        : 'border-[#173B78]/18 bg-[#F8F7F3] text-[#173B78]'
                    }`}
                  >
                    {trade}
                  </button>
                ))}
              </div>

              <label className="mt-3 inline-flex min-h-[36px] cursor-pointer items-center gap-2 text-xs font-semibold text-[#102347]">
                <input
                  type="checkbox"
                  checked={onlyAvailable}
                  onChange={(e) => setOnlyAvailable(e.target.checked)}
                  className="h-4 w-4 accent-[#173B78]"
                />
                <span>Show immediately available workers only</span>
              </label>
            </div>

            {/* Worker Directory Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {filteredWorkers.map((worker) => (
                <article
                  key={worker.id}
                  className="flex flex-col justify-between border border-[#173B78]/18 bg-white p-4 sm:p-5"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#173B78] font-display text-sm font-bold text-white">
                          {worker.initials}
                        </div>
                        <div>
                          <h2 className="font-display text-base font-bold text-[#102347]">
                            {worker.name}
                          </h2>
                          <p className="text-xs font-medium text-[#102347]/70">
                            {worker.trade} · {worker.experience} exp
                          </p>
                        </div>
                      </div>
                      <span className="shrink-0 border border-[#173B78]/15 bg-[#F8F7F3] px-2 py-0.5 font-mono text-xs font-bold text-[#173B78]">
                        {worker.rubricScore}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-3 font-mono text-[11px] text-[#102347]/70">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-[#FF8A45]" />
                        {worker.distance}
                      </span>
                      <span>Passport: {worker.passportId}</span>
                      <span>{worker.dailyRate}</span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {worker.verifiedSkills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1 border border-[#3478F6]/30 bg-[#3478F6]/8 px-2 py-0.5 text-[11px] font-semibold text-[#173B78]"
                        >
                          <CheckCircle2 className="h-3 w-3 text-[#3478F6]" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-[#173B78]/10 pt-3">
                    <span className="font-mono text-[11px] text-[#102347]/65">
                      {worker.completedReceipts} WorkReceipts
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setWorkerName(worker.name);
                        setActiveTab('agreements');
                      }}
                      className="inline-flex min-h-[40px] items-center gap-1.5 bg-[#173B78] px-3.5 text-xs font-bold text-white hover:bg-[#3478F6]"
                    >
                      <ShieldCheck className="h-3.5 w-3.5 text-[#FF8A45]" />
                      <span>Draft WorkReceipt</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* TAB 2: WORK AGREEMENTS */}
        {activeTab === 'agreements' && (
          <section className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Create Agreement Form */}
            <form
              onSubmit={handleCreateAgreement}
              className="space-y-3.5 border border-[#173B78]/20 bg-white p-5 lg:col-span-5"
            >
              <h2 className="font-display text-lg font-bold text-[#173B78]">
                Document Work Agreement
              </h2>

              <div>
                <label
                  htmlFor="emp-worker"
                  className="block font-mono text-xs font-semibold uppercase text-[#173B78]"
                >
                  Worker
                </label>
                <select
                  id="emp-worker"
                  value={workerName}
                  onChange={(e) => setWorkerName(e.target.value)}
                  className="mt-1.5 min-h-[46px] w-full border border-[#173B78]/25 bg-[#F8F7F3] px-3 text-sm font-semibold text-[#102347]"
                >
                  {WORKER_DIRECTORY.map((w) => (
                    <option key={w.id} value={w.name}>
                      {w.name} ({w.trade})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="emp-task"
                  className="block font-mono text-xs font-semibold uppercase text-[#173B78]"
                >
                  Agreed Work Scope
                </label>
                <input
                  id="emp-task"
                  type="text"
                  required
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  className="mt-1.5 min-h-[46px] w-full border border-[#173B78]/25 bg-[#F8F7F3] px-3 text-sm font-semibold text-[#102347]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="emp-days"
                    className="block font-mono text-xs font-semibold uppercase text-[#173B78]"
                  >
                    Days
                  </label>
                  <input
                    id="emp-days"
                    type="number"
                    min={1}
                    inputMode="numeric"
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    className="mt-1.5 min-h-[46px] w-full border border-[#173B78]/25 bg-[#F8F7F3] px-3 font-mono text-sm font-semibold text-[#102347]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="emp-rate"
                    className="block font-mono text-xs font-semibold uppercase text-[#173B78]"
                  >
                    Daily Rate (₹)
                  </label>
                  <input
                    id="emp-rate"
                    type="number"
                    min={0}
                    step={50}
                    inputMode="numeric"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="mt-1.5 min-h-[46px] w-full border border-[#173B78]/25 bg-[#F8F7F3] px-3 font-mono text-sm font-semibold text-[#102347]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between border border-[#173B78]/15 bg-[#F8F7F3] px-3.5 py-3">
                <span className="font-mono text-xs font-bold text-[#173B78]">
                  TOTAL AGREEMENT
                </span>
                <span className="font-mono text-base font-bold text-[#FF8A45]">
                  ₹{((Number(days) || 0) * (Number(rate) || 0)).toLocaleString('en-IN')}
                </span>
              </div>

              {agreementNote && (
                <p
                  role="status"
                  className="border border-[#3478F6] bg-[#3478F6]/10 px-3 py-2 text-xs font-semibold text-[#173B78]"
                >
                  {agreementNote}
                </p>
              )}

              <button
                type="submit"
                className="flex min-h-[48px] w-full items-center justify-center gap-2 bg-[#173B78] px-4 py-3 text-sm font-bold text-white hover:bg-[#3478F6]"
              >
                <Plus className="h-4 w-4 text-[#FF8A45]" />
                <span>Create WorkReceipt Draft</span>
              </button>
            </form>

            {/* Existing Transparent Records */}
            <div className="space-y-3 lg:col-span-7">
              <h2 className="font-display text-lg font-bold text-[#173B78]">
                Work Records ({agreements.length})
              </h2>
              {agreements.map((rec) => (
                <div
                  key={rec.id}
                  className="border border-[#173B78]/18 bg-white p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#173B78]/10 pb-2">
                    <span className="font-mono text-xs font-bold text-[#173B78]">
                      {rec.receiptNo}
                    </span>
                    <span className="border border-[#3478F6]/40 bg-[#3478F6]/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-[#173B78]">
                      {rec.status}
                    </span>
                  </div>
                  <div className="mt-2.5 flex items-end justify-between gap-3">
                    <div>
                      <p className="font-display text-base font-bold text-[#102347]">
                        {rec.workTitle}
                      </p>
                      <p className="text-xs text-[#102347]/70">
                        Worker: {rec.worker} · {rec.durationDays} days × ₹
                        {rec.dailyRate}
                      </p>
                    </div>
                    <p className="font-mono text-base font-bold text-[#FF8A45]">
                      ₹{rec.totalAmount.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Mobile Sticky Bottom Navigation */}
      <nav
        aria-label="Employer App Navigation"
        className="safe-bottom fixed inset-x-0 bottom-0 z-30 border-t border-[#173B78]/18 bg-white/95 backdrop-blur-md md:hidden"
      >
        <div className="grid grid-cols-2">
          <button
            type="button"
            onClick={() => setActiveTab('discover')}
            className={`flex min-h-[58px] flex-col items-center justify-center gap-1 py-2 text-xs font-semibold ${
              activeTab === 'discover'
                ? 'border-t-2 border-[#3478F6] bg-[#F8F7F3] text-[#173B78]'
                : 'text-[#102347]/65'
            }`}
          >
            <Users
              className={`h-5 w-5 ${
                activeTab === 'discover' ? 'text-[#3478F6]' : ''
              }`}
            />
            <span>Discover Workers</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('agreements')}
            className={`flex min-h-[58px] flex-col items-center justify-center gap-1 py-2 text-xs font-semibold ${
              activeTab === 'agreements'
                ? 'border-t-2 border-[#3478F6] bg-[#F8F7F3] text-[#173B78]'
                : 'text-[#102347]/65'
            }`}
          >
            <FileCheck2
              className={`h-5 w-5 ${
                activeTab === 'agreements' ? 'text-[#3478F6]' : ''
              }`}
            />
            <span>Work Agreements</span>
          </button>
        </div>
      </nav>
    </main>
  );
};
