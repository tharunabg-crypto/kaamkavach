import React, { useMemo, useState } from 'react';
import { Search, MapPin, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EmployerLayout } from '../../components/employer/EmployerLayout';
import { Badge, Card, SectionHeading } from '../../components/ui';
import { DIRECTORY_WORKERS, TRADE_CATEGORIES } from '../../data/seedData';
import type { TradeCategoryId } from '../../types/kaamkavach';

export const EmployerWorkersPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<TradeCategoryId | 'all'>('all');
  const [availableOnly, setAvailableOnly] = useState(false);

  const workers = useMemo(() => {
    const search = query.trim().toLowerCase();
    return DIRECTORY_WORKERS.filter((worker) => {
      if (category !== 'all' && worker.category !== category) return false;
      if (availableOnly && !worker.availableForWork) return false;
      if (
        search &&
        !`${worker.name} ${worker.profession} ${worker.location} ${worker.skills.map((skill) => skill.name).join(' ')}`
          .toLowerCase()
          .includes(search)
      ) {
        return false;
      }
      return true;
    });
  }, [availableOnly, category, query]);

  return (
    <EmployerLayout>
      <div className="space-y-6">
        <SectionHeading
          eyebrow="Sample worker directory"
          title="Find skilled workers"
          description="Explore sample Skill Passports, compare verified skills, and review availability. Contact details are not exposed in this preview."
        />

        <Card padding="md" className="space-y-4">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <input
              type="search"
              aria-label="Search workers"
              placeholder="Search name, trade, skill or area"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="min-h-12 w-full rounded-control border border-navy/20 bg-cream pl-10 pr-3 text-sm focus:border-electric focus:bg-white focus:outline-none"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setCategory('all')}
              aria-pressed={category === 'all'}
              className={`min-h-9 rounded-control border px-3 text-xs font-semibold ${category === 'all' ? 'border-navy bg-navy text-white' : 'border-navy/15 bg-white text-navy'}`}
            >
              All trades
            </button>
            {TRADE_CATEGORIES.map((trade) => (
              <button
                key={trade.id}
                type="button"
                onClick={() => setCategory(trade.id)}
                aria-pressed={category === trade.id}
                className={`min-h-9 rounded-control border px-3 text-xs font-semibold ${category === trade.id ? 'border-navy bg-navy text-white' : 'border-navy/15 bg-white text-navy'}`}
              >
                {trade.shortLabel}
              </button>
            ))}
          </div>
          <label className="inline-flex min-h-9 items-center gap-2 text-sm text-text-muted">
            <input
              type="checkbox"
              checked={availableOnly}
              onChange={(event) => setAvailableOnly(event.target.checked)}
              className="h-4 w-4 accent-electric"
            />
            Available for work
          </label>
        </Card>

        <p className="font-mono text-xs font-semibold uppercase tracking-wide text-text-muted">
          {workers.length} sample profiles
        </p>
        {workers.length === 0 ? (
          <Card variant="subtle" padding="lg" className="text-center">
            <p className="font-semibold text-navy">No matching workers</p>
            <p className="mt-1 text-sm text-text-muted">Try another trade or search term.</p>
          </Card>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {workers.map((worker) => {
              const verifiedSkills = worker.skills.filter(
                (skill) => skill.status === 'verified'
              );
              return (
                <Card key={worker.id} padding="md">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy font-display font-bold text-white">
                        {worker.initials}
                      </span>
                      <div>
                        <h2 className="font-display text-lg font-bold text-navy">{worker.name}</h2>
                        <p className="text-sm text-text-muted">{worker.profession}</p>
                      </div>
                    </div>
                    <Badge tone={worker.availableForWork ? 'success' : 'neutral'}>
                      {worker.availableForWork ? 'Available' : 'Not available'}
                    </Badge>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-text-muted">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-accent" />
                      {worker.location} · {worker.distanceKm} km
                    </span>
                    <span>{worker.experienceYears} years’ experience</span>
                    <span>₹{worker.dailyRate.toLocaleString('en-IN')}/day</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {verifiedSkills.length ? verifiedSkills.slice(0, 3).map((skill) => (
                      <Badge key={skill.id} tone="info">
                        <CheckCircle2 className="h-3 w-3" />
                        {skill.name}
                      </Badge>
                    )) : <Badge tone="neutral">No verified skills listed</Badge>}
                  </div>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-navy/10 pt-4">
                    <span className="text-xs text-text-muted">{worker.completedJobs} sample WorkReceipts · {worker.reliabilityScore}</span>
                    <Link
                      to={`/employer/workers/${worker.id}`}
                      className="inline-flex min-h-10 items-center gap-1.5 rounded-control bg-navy px-3.5 text-xs font-semibold text-white hover:bg-electric"
                    >
                      View profile
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </EmployerLayout>
  );
};
