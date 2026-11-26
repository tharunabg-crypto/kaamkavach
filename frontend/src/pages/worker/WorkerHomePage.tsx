import React from 'react';
import {
  Mic,
  ShieldCheck,
  FileCheck2,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  Briefcase,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppState } from '../../context/AppStateContext';
import { WorkerLayout } from '../../components/worker/WorkerLayout';
import { CategoryIcon } from '../../components/common/CategoryIcon';

export const WorkerHomePage: React.FC = () => {
  const {
    workerProfile,
    workerSkills,
    jobs,
    workReceipts,
    toggleWorkerAvailability,
  } = useAppState();

  const verifiedCount = workerSkills.filter((s) => s.status === 'verified').length;
  const declaredCount = workerSkills.filter((s) => s.status === 'self-declared').length;

  const scheduleJobs = jobs.filter(
    (j) => j.status === 'ongoing' || j.status === 'accepted'
  );
  const upcomingOpportunities = jobs
    .filter((j) => j.status === 'available')
    .slice(0, 3);
  const recentReceipts = workReceipts.slice(0, 2);

  // Dynamic profile completeness
  const checks = [
    Boolean(workerProfile.name),
    Boolean(workerProfile.profession),
    Boolean(workerProfile.location),
    Boolean(workerProfile.bio),
    verifiedCount > 0,
    workReceipts.length > 0,
  ];
  const completionPct = Math.round(
    (checks.filter(Boolean).length / checks.length) * 100
  );

  return (
    <WorkerLayout>
      <div className="space-y-5">
        {/* Personal Greeting + Work Status + Profile Completion */}
        <section className="border border-[#173B78]/20 bg-[#173B78] p-5 text-white sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-[#FF8A45]">
                Namaste · {workerProfile.passportId}
              </p>
              <h1 className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">
                {workerProfile.name}
              </h1>
              <p className="mt-0.5 text-sm text-white/80">
                {workerProfile.profession} · {workerProfile.location}
              </p>
            </div>

            <button
              type="button"
              onClick={toggleWorkerAvailability}
              className={`inline-flex min-h-[44px] w-fit items-center gap-2 border px-4 py-2 text-xs font-bold transition-colors ${
                workerProfile.availableForWork
                  ? 'border-[#FF8A45] bg-[#FF8A45] text-[#0F2347]'
                  : 'border-white/25 bg-[#0F2347] text-white'
              }`}
            >
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  workerProfile.availableForWork ? 'bg-[#0F2347]' : 'bg-white/60'
                }`}
              />
              <span>
                {workerProfile.availableForWork
                  ? 'Available for Work'
                  : 'Currently Busy'}
              </span>
            </button>
          </div>

          {/* Profile Completion Bar */}
          <div className="mt-5 border-t border-white/15 pt-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-white/85">
                Profile completion
              </span>
              <span className="font-mono font-bold text-[#FF8A45]">
                {completionPct}%
              </span>
            </div>
            <div className="mt-2 h-2 w-full bg-[#0F2347]">
              <div
                className="h-full bg-[#3478F6] transition-all duration-300"
                style={{ width: `${completionPct}%` }}
              />
            </div>
          </div>
        </section>

        {/* Prominent KaamVaani Action */}
        <Link
          to="/worker/kaamvaani"
          className="flex items-center justify-between gap-4 border-2 border-[#173B78] bg-[#FF8A45] p-4 text-[#0F2347] transition-colors hover:bg-[#173B78] hover:text-white sm:p-5"
        >
          <div className="flex items-center gap-3.5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0F2347] text-white">
              <Mic className="h-6 w-6 text-[#FF8A45]" />
            </span>
            <div>
              <p className="font-display text-lg font-extrabold leading-tight">
                Log Work with KaamVaani
              </p>
              <p className="mt-0.5 text-xs font-medium opacity-85 sm:text-sm">
                Speak in {workerProfile.preferredLanguage} or your regional
                language to record work &amp; pay
              </p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 shrink-0" />
        </Link>

        {/* Main 2-Column Responsive Workspace Grid */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Left Column: Today's Schedule + Upcoming Opportunities */}
          <div className="space-y-5 lg:col-span-7">
            {/* Today's Schedule */}
            <section className="border border-[#173B78]/16 bg-white p-4 sm:p-5">
              <div className="flex items-center justify-between border-b border-[#173B78]/10 pb-3">
                <h2 className="font-display text-lg font-bold text-[#173B78]">
                  Today&apos;s Schedule
                </h2>
                <Link
                  to="/worker/my-work"
                  className="text-xs font-bold text-[#3478F6] hover:underline"
                >
                  Open My Work
                </Link>
              </div>

              {scheduleJobs.length === 0 ? (
                <div className="py-6 text-center">
                  <p className="text-sm text-[#102347]/70">
                    No active jobs scheduled today.
                  </p>
                  <Link
                    to="/worker/find-work"
                    className="mt-3 inline-flex min-h-[40px] items-center bg-[#173B78] px-4 text-xs font-bold text-white"
                  >
                    Find Work Nearby
                  </Link>
                </div>
              ) : (
                <div className="mt-3 space-y-3">
                  {scheduleJobs.map((job) => (
                    <div
                      key={job.id}
                      className="border border-[#173B78]/14 bg-[#F8F7F3] p-3.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="inline-block bg-[#173B78] px-2 py-0.5 font-mono text-[10px] font-semibold uppercase text-white">
                            {job.status}
                          </span>
                          <p className="mt-1.5 font-display text-base font-bold text-[#102347]">
                            {job.title}
                          </p>
                          <p className="text-xs text-[#102347]/75">
                            {job.employerName}
                          </p>
                        </div>
                        <span className="font-mono text-xs font-bold text-[#3478F6]">
                          ₹{job.dailyRate}/day
                        </span>
                      </div>
                      <div className="mt-2.5 flex flex-wrap items-center gap-3 font-mono text-[11px] text-[#102347]/70">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-[#FF8A45]" />
                          {job.location}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3 w-3 text-[#3478F6]" />
                          {job.scheduleTime}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Upcoming Opportunities */}
            <section className="border border-[#173B78]/16 bg-white p-4 sm:p-5">
              <div className="flex items-center justify-between border-b border-[#173B78]/10 pb-3">
                <h2 className="font-display text-lg font-bold text-[#173B78]">
                  Upcoming Opportunities
                </h2>
                <Link
                  to="/worker/find-work"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#3478F6] hover:underline"
                >
                  <span>Browse All</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="mt-3 space-y-2.5">
                {upcomingOpportunities.map((opp) => (
                  <Link
                    key={opp.id}
                    to={`/worker/find-work?category=${opp.category}`}
                    className="flex items-center justify-between gap-3 border border-[#173B78]/12 bg-[#F8F7F3] p-3.5 transition-colors hover:border-[#3478F6]"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-white text-[#3478F6] border border-[#173B78]/12">
                        <CategoryIcon category={opp.category} className="h-4 w-4" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-[#102347]">
                          {opp.title}
                        </p>
                        <p className="text-xs text-[#102347]/70">
                          {opp.location} · {opp.durationDays} days
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 font-mono text-xs font-bold text-[#173B78]">
                      ₹{opp.dailyRate}/d
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Skill Passport Summary + Recent WorkReceipts */}
          <div className="space-y-5 lg:col-span-5">
            {/* Skill Passport Summary */}
            <section className="border border-[#173B78]/20 bg-white p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-[#3478F6]" />
                  <h2 className="font-display text-lg font-bold text-[#173B78]">
                    Skill Passport
                  </h2>
                </div>
                <span className="font-mono text-xs font-semibold text-[#173B78]/70">
                  {workerProfile.passportId}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="border border-[#3478F6]/30 bg-[#3478F6]/8 p-3">
                  <p className="font-mono text-xl font-bold text-[#173B78]">
                    {verifiedCount}
                  </p>
                  <p className="text-xs font-semibold text-[#102347]/80">
                    Verified Skills
                  </p>
                </div>
                <div className="border border-[#173B78]/15 bg-[#F8F7F3] p-3">
                  <p className="font-mono text-xl font-bold text-[#173B78]">
                    {declaredCount}
                  </p>
                  <p className="text-xs font-semibold text-[#102347]/80">
                    Self-Declared
                  </p>
                </div>
              </div>

              <Link
                to="/worker/passport"
                className="mt-4 flex min-h-[44px] w-full items-center justify-between border border-[#173B78] px-4 text-xs font-bold text-[#173B78] transition-colors hover:bg-[#173B78] hover:text-white"
              >
                <span>View Full Skill Passport</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </section>

            {/* Recent WorkReceipts */}
            <section className="border border-[#173B78]/20 bg-white p-4 sm:p-5">
              <div className="flex items-center justify-between border-b border-[#173B78]/10 pb-3">
                <div className="flex items-center gap-2">
                  <FileCheck2 className="h-5 w-5 text-[#FF8A45]" />
                  <h2 className="font-display text-lg font-bold text-[#173B78]">
                    Recent WorkReceipts
                  </h2>
                </div>
                <Link
                  to="/worker/receipts"
                  className="text-xs font-bold text-[#3478F6] hover:underline"
                >
                  View All
                </Link>
              </div>

              <div className="mt-3 space-y-2.5">
                {recentReceipts.map((rec) => (
                  <div
                    key={rec.id}
                    className="border border-[#173B78]/12 bg-[#F8F7F3] p-3.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[11px] font-bold text-[#173B78]">
                        {rec.receiptNo}
                      </span>
                      <span className="border border-[#173B78]/20 bg-white px-2 py-0.5 font-mono text-[10px] font-semibold text-[#102347]">
                        {rec.paymentStatus}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm font-bold text-[#102347]">
                      {rec.workDescription}
                    </p>
                    <div className="mt-1.5 flex items-center justify-between text-xs">
                      <span className="text-[#102347]/70">
                        {rec.employerName} · {rec.durationDays}d
                      </span>
                      <span className="font-mono font-bold text-[#FF8A45]">
                        ₹{rec.totalAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-3 font-mono text-[10px] text-[#102347]/65">
                      <span className="inline-flex items-center gap-1">
                        <CheckCircle2
                          className={`h-3 w-3 ${
                            rec.workerConfirmed
                              ? 'text-[#3478F6]'
                              : 'text-[#102347]/30'
                          }`}
                        />
                        Worker {rec.workerConfirmed ? 'Confirmed' : 'Pending'}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Briefcase
                          className={`h-3 w-3 ${
                            rec.employerConfirmed
                              ? 'text-[#3478F6]'
                              : 'text-[#102347]/30'
                          }`}
                        />
                        Employer {rec.employerConfirmed ? 'Confirmed' : 'Pending'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </WorkerLayout>
  );
};
