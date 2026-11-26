import React, { useState } from 'react';
import {
  FileCheck2,
  CheckCircle2,
  Clock,
  Mic,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppState } from '../../context/AppStateContext';
import type { PaymentStatus, WorkReceipt } from '../../types/kaamkavach';
import { WorkerLayout } from '../../components/worker/WorkerLayout';

export const WorkReceiptPage: React.FC = () => {
  const { workReceipts, confirmWorkReceiptSide } = useAppState();
  const [filterStatus, setFilterStatus] = useState<'all' | PaymentStatus>(
    'all'
  );
  const [selectedReceipt, setSelectedReceipt] = useState<WorkReceipt | null>(
    null
  );

  const filtered =
    filterStatus === 'all'
      ? workReceipts
      : workReceipts.filter((r) => r.paymentStatus === filterStatus);

  const totalLogged = workReceipts.reduce((s, r) => s + r.totalAmount, 0);
  const totalPaid = workReceipts
    .filter((r) => r.paymentStatus === 'Paid')
    .reduce((s, r) => s + r.totalAmount, 0);

  return (
    <WorkerLayout>
      <div className="space-y-5">
        {/* Header & Totals */}
        <section className="border border-[#173B78]/20 bg-white p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#FF8A45]">
                Digital Work Ledger
              </p>
              <h1 className="mt-1 font-display text-2xl font-bold text-[#173B78]">
                WorkReceipts
              </h1>
            </div>
            <Link
              to="/worker/kaamvaani"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 bg-[#173B78] px-4 text-xs font-bold text-white hover:bg-[#3478F6]"
            >
              <Mic className="h-4 w-4 text-[#FF8A45]" />
              <span>Record via KaamVaani</span>
            </Link>
          </div>

          <div className="mt-4 grid grid-cols-3 divide-x divide-[#173B78]/12 border border-[#173B78]/14 bg-[#F8F7F3] py-3 text-center">
            <div>
              <p className="font-mono text-sm font-bold text-[#173B78] sm:text-base">
                {workReceipts.length}
              </p>
              <p className="text-[11px] text-[#102347]/70">Receipts</p>
            </div>
            <div>
              <p className="font-mono text-sm font-bold text-[#3478F6] sm:text-base">
                ₹{totalPaid.toLocaleString('en-IN')}
              </p>
              <p className="text-[11px] text-[#102347]/70">Paid</p>
            </div>
            <div>
              <p className="font-mono text-sm font-bold text-[#FF8A45] sm:text-base">
                ₹{totalLogged.toLocaleString('en-IN')}
              </p>
              <p className="text-[11px] text-[#102347]/70">Total Value</p>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {(['all', 'Paid', 'Pending Payment', 'Agreed'] as const).map(
              (status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setFilterStatus(status)}
                  className={`min-h-[38px] border px-3 text-xs font-semibold ${
                    filterStatus === status
                      ? 'border-[#173B78] bg-[#173B78] text-white'
                      : 'border-[#173B78]/18 bg-[#F8F7F3] text-[#173B78]'
                  }`}
                >
                  {status === 'all' ? 'All Receipts' : status}
                </button>
              )
            )}
          </div>
        </section>

        {/* Receipt List */}
        {filtered.length === 0 ? (
          <div className="border border-[#173B78]/16 bg-white p-8 text-center">
            <p className="font-display text-lg font-bold text-[#173B78]">
              No receipts match this status
            </p>
          </div>
        ) : (
          <div className="space-y-3.5">
            {filtered.map((rec) => (
              <article
                key={rec.id}
                className="bg-ledger-lines border border-[#173B78]/22 bg-white p-4 sm:p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#173B78]/12 pb-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#173B78]">
                      #{rec.receiptNo}
                    </span>
                    <span className="ml-2 font-mono text-[11px] text-[#102347]/60">
                      {rec.dateRange}
                    </span>
                  </div>
                  <span
                    className={`border px-2.5 py-0.5 font-mono text-[11px] font-bold ${
                      rec.paymentStatus === 'Paid'
                        ? 'border-[#3478F6]/40 bg-[#3478F6]/10 text-[#173B78]'
                        : 'border-[#FF8A45] bg-[#FF8A45]/12 text-[#102347]'
                    }`}
                  >
                    {rec.paymentStatus}
                  </span>
                </div>

                <div className="mt-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                  <div>
                    <h2 className="font-display text-lg font-bold text-[#102347]">
                      {rec.workDescription}
                    </h2>
                    <p className="mt-0.5 text-xs text-[#102347]/75">
                      Employer: <strong>{rec.employerName}</strong> · Worker:{' '}
                      {rec.workerName}
                    </p>
                    <p className="mt-1 font-mono text-xs text-[#102347]/70">
                      {rec.durationDays} days × ₹{rec.dailyRate}/day ·{' '}
                      {rec.location}
                    </p>
                  </div>
                  <p className="font-mono text-xl font-bold text-[#FF8A45]">
                    ₹{rec.totalAmount.toLocaleString('en-IN')}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#173B78]/12 pt-3">
                  <div className="flex flex-wrap items-center gap-3 font-mono text-[11px]">
                    <span className="inline-flex items-center gap-1 text-[#102347]">
                      {rec.workerConfirmed ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#3478F6]" />
                      ) : (
                        <Clock className="h-3.5 w-3.5 text-[#FF8A45]" />
                      )}
                      Worker: {rec.workerConfirmed ? 'Confirmed' : 'Pending'}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[#102347]">
                      {rec.employerConfirmed ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#3478F6]" />
                      ) : (
                        <Clock className="h-3.5 w-3.5 text-[#FF8A45]" />
                      )}
                      Employer:{' '}
                      {rec.employerConfirmed ? 'Confirmed' : 'Pending'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {!rec.workerConfirmed && (
                      <button
                        type="button"
                        onClick={() => confirmWorkReceiptSide(rec.id, 'worker')}
                        className="min-h-[38px] bg-[#3478F6] px-3.5 text-xs font-bold text-white hover:bg-[#173B78]"
                      >
                        Confirm Record
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setSelectedReceipt(rec)}
                      className="min-h-[38px] border border-[#173B78]/25 px-3.5 text-xs font-bold text-[#173B78]"
                    >
                      View Receipt
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Receipt Inspection Modal */}
      {selectedReceipt && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="WorkReceipt Details"
          className="fixed inset-0 z-50 flex items-end justify-center bg-[#0F2347]/70 sm:items-center sm:p-4"
          onClick={() => setSelectedReceipt(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="safe-bottom w-full border-t-2 border-[#173B78] bg-white p-5 sm:max-w-md sm:border-2 sm:p-6"
          >
            <div className="flex items-center justify-between border-b border-[#173B78]/15 pb-3">
              <div className="flex items-center gap-2">
                <FileCheck2 className="h-5 w-5 text-[#173B78]" />
                <span className="font-mono text-sm font-bold text-[#173B78]">
                  {selectedReceipt.receiptNo}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedReceipt(null)}
                aria-label="Close receipt modal"
                className="p-1.5 text-[#173B78]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <dl className="mt-4 space-y-2.5 text-sm">
              <div className="flex justify-between gap-2">
                <dt className="text-[#102347]/65">Employer</dt>
                <dd className="font-semibold text-[#102347]">
                  {selectedReceipt.employerName}
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-[#102347]/65">Worker</dt>
                <dd className="font-semibold text-[#102347]">
                  {selectedReceipt.workerName}
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-[#102347]/65">Work</dt>
                <dd className="text-right font-semibold text-[#102347]">
                  {selectedReceipt.workDescription}
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-[#102347]/65">Duration</dt>
                <dd className="font-mono font-semibold text-[#102347]">
                  {selectedReceipt.durationDays} days
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-[#102347]/65">Agreed Daily Rate</dt>
                <dd className="font-mono font-semibold text-[#102347]">
                  ₹{selectedReceipt.dailyRate}
                </dd>
              </div>
              <div className="flex justify-between gap-2 border-t border-[#173B78]/15 pt-2.5">
                <dt className="font-bold text-[#173B78]">Total Amount</dt>
                <dd className="font-mono text-lg font-bold text-[#FF8A45]">
                  ₹{selectedReceipt.totalAmount.toLocaleString('en-IN')}
                </dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={() => setSelectedReceipt(null)}
              className="mt-6 min-h-[46px] w-full bg-[#173B78] font-bold text-white"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </WorkerLayout>
  );
};
