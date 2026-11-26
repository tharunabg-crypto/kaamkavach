import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  ArrowRight,
  Mic,
  FileCheck2,
  CheckCircle2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppState } from '../../context/AppStateContext';
import type { WorkJobStatus } from '../../types/kaamkavach';
import { WorkerLayout } from '../../components/worker/WorkerLayout';

const STATUS_TABS: { id: WorkJobStatus; label: string }[] = [
  { id: 'available', label: 'Available' },
  { id: 'accepted', label: 'Accepted' },
  { id: 'ongoing', label: 'Ongoing' },
  { id: 'completed', label: 'Completed' },
];

export const MyWorkPage: React.FC = () => {
  const { jobs, updateJobStatus, createWorkReceipt, workerProfile } =
    useAppState();
  const [activeTab, setActiveTab] = useState<WorkJobStatus>('ongoing');
  const [notice, setNotice] = useState<string | null>(null);

  const tabJobs = jobs.filter((j) => j.status === activeTab);

  return (
    <WorkerLayout>
      <div className="space-y-5">
        <div className="border border-[#173B78]/18 bg-white p-4 sm:p-6">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#3478F6]">
            Work Management
          </p>
          <h1 className="mt-1 font-display text-2xl font-bold text-[#173B78]">
            My Work
          </h1>
          <p className="mt-1 text-sm text-[#102347]/75">
            Track opportunities from acceptance through site execution and
            WorkReceipt closure.
          </p>

          {/* 4-Stage Status Tabs */}
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {STATUS_TABS.map((tab) => {
              const count = jobs.filter((j) => j.status === tab.id).length;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    setNotice(null);
                  }}
                  className={`flex min-h-[44px] items-center justify-between border px-3 py-2 text-xs font-bold transition-colors ${
                    active
                      ? 'border-[#173B78] bg-[#173B78] text-white'
                      : 'border-[#173B78]/16 bg-[#F8F7F3] text-[#173B78]'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.5 font-mono text-[11px] ${
                      active ? 'bg-[#3478F6] text-white' : 'bg-white text-[#173B78]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {notice && (
          <div
            role="status"
            className="flex items-center gap-2 border border-[#3478F6] bg-white px-4 py-3 text-xs font-semibold text-[#173B78]"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0 text-[#3478F6]" />
            <span>{notice}</span>
          </div>
        )}

        {tabJobs.length === 0 ? (
          <div className="border border-[#173B78]/16 bg-white p-8 text-center">
            <p className="font-display text-lg font-bold text-[#173B78]">
              No {activeTab} work items
            </p>
            <p className="mt-1 text-sm text-[#102347]/70">
              Browse available jobs to accept new work into your schedule.
            </p>
            <Link
              to="/worker/find-work"
              className="mt-4 inline-flex min-h-[44px] items-center bg-[#173B78] px-5 text-xs font-bold text-white"
            >
              Open Find Work
            </Link>
          </div>
        ) : (
          <div className="space-y-3.5">
            {tabJobs.map((job) => (
              <article
                key={job.id}
                className="border border-[#173B78]/18 bg-white p-4 sm:p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-2 border-b border-[#173B78]/10 pb-3">
                  <div>
                    <span className="inline-block bg-[#173B78]/10 px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-[#173B78]">
                      {job.status}
                    </span>
                    <h2 className="mt-1.5 font-display text-lg font-bold text-[#102347]">
                      {job.title}
                    </h2>
                    <p className="text-xs font-semibold text-[#173B78]">
                      Employer: {job.employerName}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm font-bold text-[#3478F6]">
                      ₹{job.dailyRate}/day
                    </p>
                    <p className="font-mono text-xs font-bold text-[#FF8A45]">
                      Total ₹
                      {(job.dailyRate * job.durationDays).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-[#102347]/80">
                  {job.description}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-4 font-mono text-xs text-[#102347]/70">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-[#FF8A45]" />
                    {job.location}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-[#3478F6]" />
                    {job.durationDays} days · {job.scheduleTime}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2.5 border-t border-[#173B78]/10 pt-3.5">
                  {job.status === 'available' && (
                    <button
                      type="button"
                      onClick={() => {
                        updateJobStatus(job.id, 'accepted');
                        setNotice(`"${job.title}" moved to Accepted.`);
                      }}
                      className="inline-flex min-h-[42px] items-center gap-1.5 bg-[#3478F6] px-4 text-xs font-bold text-white hover:bg-[#173B78]"
                    >
                      <span>Accept Work</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  )}

                  {job.status === 'accepted' && (
                    <button
                      type="button"
                      onClick={() => {
                        updateJobStatus(job.id, 'ongoing');
                        setNotice(`"${job.title}" started — moved to Ongoing.`);
                      }}
                      className="inline-flex min-h-[42px] items-center gap-1.5 bg-[#173B78] px-4 text-xs font-bold text-white hover:bg-[#3478F6]"
                    >
                      <span>Start Work</span>
                      <ArrowRight className="h-3.5 w-3.5 text-[#FF8A45]" />
                    </button>
                  )}

                  {job.status === 'ongoing' && (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          updateJobStatus(job.id, 'completed');
                          setNotice(`"${job.title}" marked Completed.`);
                        }}
                        className="inline-flex min-h-[42px] items-center gap-1.5 bg-[#173B78] px-4 text-xs font-bold text-white hover:bg-[#3478F6]"
                      >
                        <CheckCircle2 className="h-4 w-4 text-[#FF8A45]" />
                        <span>Mark Completed</span>
                      </button>
                      <Link
                        to="/worker/kaamvaani"
                        className="inline-flex min-h-[42px] items-center gap-1.5 border border-[#FF8A45] bg-[#FF8A45]/15 px-4 text-xs font-bold text-[#102347]"
                      >
                        <Mic className="h-4 w-4 text-[#FF8A45]" />
                        <span>Log Hours via KaamVaani</span>
                      </Link>
                    </>
                  )}

                  {job.status === 'completed' && (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          const rec = createWorkReceipt({
                            employerName: job.employerName,
                            workerName: workerProfile.name,
                            workerPassportId: workerProfile.passportId,
                            workDescription: job.title,
                            location: job.location,
                            durationDays: job.durationDays,
                            dailyRate: job.dailyRate,
                            createdVia: 'Direct Record',
                            workerConfirmed: true,
                            employerConfirmed: false,
                          });
                          setNotice(
                            `WorkReceipt ${rec.receiptNo} created in Receipts.`
                          );
                        }}
                        className="inline-flex min-h-[42px] items-center gap-1.5 bg-[#173B78] px-4 text-xs font-bold text-white hover:bg-[#3478F6]"
                      >
                        <FileCheck2 className="h-4 w-4 text-[#FF8A45]" />
                        <span>Generate WorkReceipt</span>
                      </button>
                      <Link
                        to="/worker/receipts"
                        className="inline-flex min-h-[42px] items-center border border-[#173B78]/25 px-4 text-xs font-bold text-[#173B78]"
                      >
                        Open Receipts
                      </Link>
                    </>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </WorkerLayout>
  );
};
