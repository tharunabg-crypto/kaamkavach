import React, { useState } from 'react';
import { ArrowLeft, BriefcaseBusiness, CheckCircle2, Clock3, MapPin, ShieldCheck } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { WorkerLayout } from '../../components/worker/WorkerLayout';
import { Badge, Button, Card, SectionHeading } from '../../components/ui';
import { useAppState } from '../../context/AppStateContext';

export const WorkerJobDetailsPage: React.FC = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { jobs, updateJobStatus } = useAppState();
  const [notice, setNotice] = useState<string | null>(null);
  const job = jobs.find((item) => item.id === jobId);

  const handleApply = () => {
    if (!job || job.status !== 'available') return;
    updateJobStatus(job.id, 'applied');
    setNotice(
      'Saved to Applied in this browser preview. No application was sent to an employer.'
    );
  };

  return (
    <WorkerLayout>
      <div className="space-y-5">
        <Link
          to="/worker/find-work"
          className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-navy hover:text-electric"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Find Work
        </Link>

        {!job ? (
          <Card variant="surface" padding="lg">
            <SectionHeading
              title="Opportunity not found"
              description="This sample listing may have been removed or is no longer available."
            />
            <Button className="mt-5" onClick={() => navigate('/worker/find-work')}>
              Browse opportunities
            </Button>
          </Card>
        ) : (
          <>
            <Card variant="surface" padding="lg">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="max-w-3xl">
                  <Badge tone={job.status === 'available' ? 'success' : 'neutral'}>
                    {job.status}
                  </Badge>
                  <h1 className="mt-3 font-display text-2xl font-bold text-navy sm:text-3xl">
                    {job.title}
                  </h1>
                  <p className="mt-1 text-sm font-semibold text-text-muted">
                    {job.employerName}
                  </p>
                </div>
                <div className="rounded-control bg-cream px-4 py-3 text-right">
                  <p className="font-mono text-lg font-bold text-navy">
                    ₹{job.dailyRate.toLocaleString('en-IN')}
                  </p>
                  <p className="text-xs text-text-muted">per day</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 border-y border-navy/10 py-4 sm:grid-cols-3">
                <p className="inline-flex items-center gap-2 text-sm text-text-muted">
                  <MapPin className="h-4 w-4 text-accent" />
                  {job.location} · {job.distanceKm} km
                </p>
                <p className="inline-flex items-center gap-2 text-sm text-text-muted">
                  <Clock3 className="h-4 w-4 text-electric" />
                  {job.durationDays} days · {job.scheduleTime}
                </p>
                <p className="inline-flex items-center gap-2 text-sm text-text-muted">
                  <BriefcaseBusiness className="h-4 w-4 text-navy" />
                  {job.startDate ? `Starts ${job.startDate}` : job.postedAgo}
                </p>
              </div>

              <section className="mt-5">
                <h2 className="font-display text-lg font-bold text-navy">
                  Work description
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {job.description}
                </p>
              </section>

              <section className="mt-5">
                <h2 className="font-display text-lg font-bold text-navy">
                  Required skills
                </h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {job.requiredSkills.length > 0 ? (
                    job.requiredSkills.map((skill) => (
                      <Badge key={skill} tone="info">
                        {skill}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-text-muted">
                      No specific skills listed.
                    </p>
                  )}
                </div>
              </section>

              <div className="mt-5 flex items-center gap-2 border-t border-navy/10 pt-4 text-sm text-text-muted">
                <ShieldCheck className="h-4 w-4 shrink-0 text-electric" />
                {job.workReceiptIncluded
                  ? 'A WorkReceipt can document the agreed task and rate.'
                  : 'A WorkReceipt is not listed for this opportunity.'}
              </div>
            </Card>

            {notice && (
              <div
                role="status"
                className="flex items-start gap-2 rounded-control border border-status-warning/25 bg-status-warning-soft p-4 text-sm text-status-warning"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                {notice}
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              {job.status === 'available' ? (
                <Button size="lg" onClick={handleApply}>
                  Save to Applied
                </Button>
              ) : (
                <Badge tone="info">Current status: {job.status}</Badge>
              )}
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate('/worker/my-work')}
              >
                View My Work
              </Button>
            </div>
          </>
        )}
      </div>
    </WorkerLayout>
  );
};
