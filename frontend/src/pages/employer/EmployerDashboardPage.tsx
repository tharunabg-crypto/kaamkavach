import React from 'react';
import { ArrowRight, BriefcaseBusiness, CheckCircle2, FileCheck2, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EmployerLayout } from '../../components/employer/EmployerLayout';
import { Badge, Button, ButtonLink, Card, SectionHeading } from '../../components/ui';
import { useAppState } from '../../context/AppStateContext';

export const EmployerDashboardPage: React.FC = () => {
  const { employerProfile, jobs, workReceipts, updateJobStatus } = useAppState();
  const applications = jobs.filter((job) => job.status === 'applied');

  return (
    <EmployerLayout>
      <div className="space-y-7">
        <SectionHeading
          eyebrow="Employer workspace · sample data"
          title={`Good to see you, ${employerProfile.contactName.split(' ')[0]}`}
          description="Manage work opportunities, review local preview applications, and keep agreements in one place."
        />

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Card padding="md">
            <BriefcaseBusiness className="h-5 w-5 text-electric" />
            <p className="mt-4 font-mono text-2xl font-bold text-navy">{jobs.length}</p>
            <p className="text-sm text-text-muted">Sample opportunities</p>
          </Card>
          <Card padding="md">
            <Users className="h-5 w-5 text-electric" />
            <p className="mt-4 font-mono text-2xl font-bold text-navy">{applications.length}</p>
            <p className="text-sm text-text-muted">Preview applications</p>
          </Card>
          <Card padding="md">
            <FileCheck2 className="h-5 w-5 text-electric" />
            <p className="mt-4 font-mono text-2xl font-bold text-navy">{workReceipts.length}</p>
            <p className="text-sm text-text-muted">WorkReceipts</p>
          </Card>
          <Card padding="md">
            <CheckCircle2 className="h-5 w-5 text-electric" />
            <p className="mt-4 font-mono text-2xl font-bold text-navy">
              {jobs.filter((job) => job.status === 'ongoing').length}
            </p>
            <p className="text-sm text-text-muted">Ongoing preview work</p>
          </Card>
        </div>

        <Card padding="lg" className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <Badge tone="warning">Local preview</Badge>
            <h2 className="mt-3 font-display text-xl font-bold text-navy">
              Need people for a new job?
            </h2>
            <p className="mt-1 max-w-xl text-sm text-text-muted">
              Post an opportunity using the existing sample profile. It is saved only in this browser.
            </p>
          </div>
          <ButtonLink to="/employer/post-work" size="md">
            Post work
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </Card>

        <section className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-electric">
                Review
              </p>
              <h2 className="mt-1 font-display text-xl font-bold text-navy">
                Recent applications
              </h2>
            </div>
            <Link to="/employer/workers" className="text-sm font-semibold text-navy hover:text-electric">
              Browse workers
            </Link>
          </div>
          {applications.length === 0 ? (
            <Card variant="subtle" padding="md">
              <p className="text-sm text-text-muted">
                No applications in the local preview yet. Worker applications appear here when the sample job state is updated.
              </p>
            </Card>
          ) : (
            <div className="space-y-3">
              {applications.map((job) => (
                <Card key={job.id} padding="md" className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <Badge tone="info">Application · sample worker</Badge>
                    <h3 className="mt-2 font-semibold text-navy">{job.title}</h3>
                    <p className="text-sm text-text-muted">{job.employerName} · {job.location}</p>
                  </div>
                  <Button
                    variant="secondary"
                    onClick={() => updateJobStatus(job.id, 'accepted')}
                  >
                    Mark as accepted
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
    </EmployerLayout>
  );
};
