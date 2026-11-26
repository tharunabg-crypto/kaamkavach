import React from 'react';
import { ArrowLeft, BriefcaseBusiness, CheckCircle2, FileCheck2, MapPin, ShieldCheck } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { EmployerLayout } from '../../components/employer/EmployerLayout';
import { Badge, ButtonLink, Card, SectionHeading } from '../../components/ui';
import { DIRECTORY_WORKERS } from '../../data/seedData';

export const EmployerWorkerProfilePage: React.FC = () => {
  const { workerId } = useParams();
  const worker = DIRECTORY_WORKERS.find((item) => item.id === workerId);

  return (
    <EmployerLayout>
      <div className="space-y-5">
        <Link to="/employer/workers" className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-navy hover:text-electric">
          <ArrowLeft className="h-4 w-4" />
          Worker directory
        </Link>
        {!worker ? (
          <Card padding="lg">
            <SectionHeading title="Worker profile not found" description="This sample profile is not available in the directory." />
          </Card>
        ) : (
          <>
            <Card variant="brand" padding="lg">
              <div className="flex flex-wrap items-start justify-between gap-5">
                <div className="flex items-center gap-4">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 font-display text-xl font-bold">
                    {worker.initials}
                  </span>
                  <div>
                    <Badge tone={worker.availableForWork ? 'success' : 'neutral'}>
                      {worker.availableForWork ? 'Available for work' : 'Currently unavailable'}
                    </Badge>
                    <h1 className="mt-2 font-display text-2xl font-bold sm:text-3xl">{worker.name}</h1>
                    <p className="mt-1 text-sm text-white/75">{worker.profession} · {worker.experienceYears} years’ experience</p>
                  </div>
                </div>
                <ButtonLink
                  to={`/employer/agreements?workerId=${worker.id}`}
                  variant="accent"
                >
                  <FileCheck2 className="h-4 w-4" />
                  Draft WorkReceipt
                </ButtonLink>
              </div>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/15 pt-4 text-sm text-white/80">
                <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-accent" />{worker.location} · {worker.distanceKm} km away</span>
                <span className="inline-flex items-center gap-1.5"><BriefcaseBusiness className="h-4 w-4 text-accent" />{worker.completedJobs} sample WorkReceipts</span>
                <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-accent" />{worker.reliabilityScore}</span>
              </div>
            </Card>

            <section className="space-y-3">
              <SectionHeading
                title="Skill Passport"
                description="Verification labels and performance notes are sample data; they are not an independent certification."
              />
              {worker.skills.map((skill) => (
                <Card key={skill.id} padding="md" className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="font-semibold text-navy">{skill.name}</h2>
                    {skill.assessorNote && <p className="mt-1 text-sm text-text-muted">{skill.assessorNote}</p>}
                    {skill.rubricCode && <p className="mt-2 font-mono text-xs text-text-muted">{skill.rubricCode}{skill.score ? ` · ${skill.score}` : ''}</p>}
                  </div>
                  <Badge tone={skill.status === 'verified' ? 'success' : 'neutral'}>
                    {skill.status === 'verified' ? <CheckCircle2 className="h-3 w-3" /> : null}
                    {skill.status === 'verified' ? 'Sample verified' : 'Self-declared'}
                  </Badge>
                </Card>
              ))}
            </section>
          </>
        )}
      </div>
    </EmployerLayout>
  );
};
