import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Clock3, FileCheck2 } from 'lucide-react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { EmployerLayout } from '../../components/employer/EmployerLayout';
import { Badge, Button, Card, SectionHeading, TextField } from '../../components/ui';
import { useAppState } from '../../context/AppStateContext';
import { DIRECTORY_WORKERS } from '../../data/seedData';
import type { PaymentStatus } from '../../types/kaamkavach';

const PAYMENT_FILTERS: Array<'all' | PaymentStatus> = [
  'all',
  'Agreed',
  'Pending Payment',
  'Paid',
];

export const EmployerRecordsPage: React.FC = () => {
  const { receiptId } = useParams();
  const [searchParams] = useSearchParams();
  const {
    employerProfile,
    workReceipts,
    createWorkReceipt,
    confirmWorkReceiptSide,
    updateReceiptPaymentStatus,
  } = useAppState();
  const [filter, setFilter] = useState<'all' | PaymentStatus>('all');
  const [workerId, setWorkerId] = useState(
    searchParams.get('workerId') ?? DIRECTORY_WORKERS[0]?.id ?? ''
  );
  const [workDescription, setWorkDescription] = useState('');
  const [durationDays, setDurationDays] = useState('1');
  const [dailyRate, setDailyRate] = useState('1000');
  const [notice, setNotice] = useState<string | null>(null);
  const selectedReceipt = workReceipts.find((receipt) => receipt.id === receiptId);

  const handleCreateAgreement = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const worker = DIRECTORY_WORKERS.find((item) => item.id === workerId);
    if (!worker) {
      setNotice('Choose a worker from the sample directory before creating a record.');
      return;
    }
    const receipt = createWorkReceipt({
      employerName: employerProfile.companyName,
      workerName: worker.name,
      workerPassportId: worker.passportId,
      workDescription: workDescription.trim(),
      location: employerProfile.location,
      durationDays: Number(durationDays),
      dailyRate: Number(dailyRate),
      createdVia: 'Employer Agreement',
      workerConfirmed: false,
      employerConfirmed: true,
    });
    setNotice(`WorkReceipt ${receipt.receiptNo} was added to this browser preview.`);
    setWorkDescription('');
  };

  const filtered = workReceipts.filter(
    (receipt) => filter === 'all' || receipt.paymentStatus === filter
  );

  return (
    <EmployerLayout>
      <div className="space-y-6">
        {receiptId ? (
          <>
            <Link to="/employer/receipts" className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-navy hover:text-electric">
              <ArrowLeft className="h-4 w-4" />
              All records
            </Link>
            {!selectedReceipt ? (
              <Card padding="lg">
                <SectionHeading title="WorkReceipt not found" description="This record is not in the current local preview." />
              </Card>
            ) : (
              <Card padding="lg">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-xs font-semibold uppercase tracking-wide text-electric">WorkReceipt details</p>
                    <h1 className="mt-1 font-display text-2xl font-bold text-navy">{selectedReceipt.receiptNo}</h1>
                  </div>
                  <Badge tone={selectedReceipt.paymentStatus === 'Paid' ? 'success' : 'warning'}>
                    {selectedReceipt.paymentStatus}
                  </Badge>
                </div>
                <dl className="mt-6 grid gap-4 border-t border-navy/10 pt-5 sm:grid-cols-2">
                  <div><dt className="text-xs text-text-muted">Worker</dt><dd className="mt-1 font-semibold text-navy">{selectedReceipt.workerName}</dd></div>
                  <div><dt className="text-xs text-text-muted">Employer</dt><dd className="mt-1 font-semibold text-navy">{selectedReceipt.employerName}</dd></div>
                  <div><dt className="text-xs text-text-muted">Work</dt><dd className="mt-1 font-semibold text-navy">{selectedReceipt.workDescription}</dd></div>
                  <div><dt className="text-xs text-text-muted">Location</dt><dd className="mt-1 font-semibold text-navy">{selectedReceipt.location}</dd></div>
                  <div><dt className="text-xs text-text-muted">Duration and rate</dt><dd className="mt-1 font-semibold text-navy">{selectedReceipt.durationDays} days × ₹{selectedReceipt.dailyRate.toLocaleString('en-IN')}</dd></div>
                  <div><dt className="text-xs text-text-muted">Total amount</dt><dd className="mt-1 font-mono text-lg font-bold text-navy">₹{selectedReceipt.totalAmount.toLocaleString('en-IN')}</dd></div>
                </dl>
                <div className="mt-5 flex flex-wrap gap-3 border-t border-navy/10 pt-4 text-sm">
                  <span className="inline-flex items-center gap-1.5 text-text-muted">
                    {selectedReceipt.employerConfirmed ? <CheckCircle2 className="h-4 w-4 text-status-success" /> : <Clock3 className="h-4 w-4 text-accent" />}
                    Employer {selectedReceipt.employerConfirmed ? 'confirmed' : 'confirmation pending'}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-text-muted">
                    {selectedReceipt.workerConfirmed ? <CheckCircle2 className="h-4 w-4 text-status-success" /> : <Clock3 className="h-4 w-4 text-accent" />}
                    Worker {selectedReceipt.workerConfirmed ? 'confirmed' : 'confirmation pending'}
                  </span>
                </div>
                {!selectedReceipt.employerConfirmed && (
                  <Button
                    className="mt-5"
                    onClick={() => confirmWorkReceiptSide(selectedReceipt.id, 'employer')}
                  >
                    Confirm this record locally
                  </Button>
                )}
              </Card>
            )}
          </>
        ) : (
          <>
            <SectionHeading
              eyebrow="Agreements · sample data"
              title="Work records"
              description="Review sample WorkReceipts or create a local agreement record. These actions do not send documents or change live payment status."
            />
            <Card padding="lg">
              <div className="flex items-start gap-3">
                <FileCheck2 className="mt-1 h-5 w-5 shrink-0 text-electric" />
                <div>
                  <h2 className="font-display text-lg font-bold text-navy">Draft a work agreement</h2>
                  <p className="mt-1 text-sm text-text-muted">Record the agreed scope and rate with a sample worker.</p>
                </div>
              </div>
              <form onSubmit={handleCreateAgreement} className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="agreement-worker" className="block text-xs font-semibold text-navy">Worker</label>
                  <select
                    id="agreement-worker"
                    value={workerId}
                    onChange={(event) => setWorkerId(event.target.value)}
                    className="min-h-12 w-full rounded-control border border-navy/25 bg-cream px-3 text-sm text-ink focus:border-electric focus:bg-white focus:outline-none"
                  >
                    {DIRECTORY_WORKERS.map((worker) => <option key={worker.id} value={worker.id}>{worker.name} · {worker.profession}</option>)}
                  </select>
                </div>
                <TextField label="Work description" value={workDescription} onChange={(event) => setWorkDescription(event.target.value)} required maxLength={120} />
                <TextField label="Duration (days)" type="number" min="1" max="365" value={durationDays} onChange={(event) => setDurationDays(event.target.value)} required />
                <TextField label="Daily rate (₹)" type="number" min="1" value={dailyRate} onChange={(event) => setDailyRate(event.target.value)} required />
                <div className="sm:col-span-2">
                  <Button type="submit"><FileCheck2 className="h-4 w-4" />Create local WorkReceipt</Button>
                </div>
              </form>
            </Card>

            {notice && <p role="status" className="rounded-control border border-status-success/25 bg-status-success-soft p-3 text-sm text-status-success">{notice}</p>}

            <section className="space-y-4">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="font-mono text-xs font-semibold uppercase tracking-wide text-electric">Ledger</p>
                  <h2 className="mt-1 font-display text-xl font-bold text-navy">WorkReceipts</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {PAYMENT_FILTERS.map((status) => (
                    <button
                      key={status}
                      type="button"
                      aria-pressed={filter === status}
                      onClick={() => setFilter(status)}
                      className={`min-h-9 rounded-control border px-3 text-xs font-semibold ${filter === status ? 'border-navy bg-navy text-white' : 'border-navy/15 bg-white text-navy'}`}
                    >
                      {status === 'all' ? 'All' : status}
                    </button>
                  ))}
                </div>
              </div>
              {filtered.length === 0 ? (
                <Card variant="subtle" padding="lg" className="text-center text-sm text-text-muted">No records match this filter.</Card>
              ) : (
                <div className="space-y-3">
                  {filtered.map((receipt) => (
                    <Card key={receipt.id} padding="md" className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold text-navy">{receipt.receiptNo}</span>
                          <Badge tone={receipt.paymentStatus === 'Paid' ? 'success' : 'warning'}>{receipt.paymentStatus}</Badge>
                        </div>
                        <h3 className="mt-2 font-semibold text-navy">{receipt.workDescription}</h3>
                        <p className="text-sm text-text-muted">{receipt.workerName} · {receipt.location} · ₹{receipt.totalAmount.toLocaleString('en-IN')}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {receipt.paymentStatus !== 'Paid' && (
                          <Button variant="secondary" size="sm" onClick={() => updateReceiptPaymentStatus(receipt.id, 'Paid')}>
                            Mark paid in preview
                          </Button>
                        )}
                        <Link to={`/employer/receipts/${receipt.id}`} className="inline-flex min-h-10 items-center rounded-control border border-navy/15 px-3 text-xs font-semibold text-navy hover:border-electric">
                          View record
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </EmployerLayout>
  );
};
