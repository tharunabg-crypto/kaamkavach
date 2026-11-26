import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  SlidersHorizontal,
} from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';
import { useAppState } from '../../context/AppStateContext';
import { TRADE_CATEGORIES } from '../../data/seedData';
import type { JobOpportunity, TradeCategoryId } from '../../types/kaamkavach';
import { WorkerLayout } from '../../components/worker/WorkerLayout';
import { CategoryIcon } from '../../components/common/CategoryIcon';

type RateFilter = 'all' | '900' | '1050' | '1150';
type DurationFilter = 'all' | 'short' | 'medium' | 'long';

export const WorkDiscoveryPage: React.FC = () => {
  const { jobs, updateJobStatus } = useAppState();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCat = (searchParams.get('category') as TradeCategoryId | null) ?? 'all';

  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TradeCategoryId | 'all'>(
    initialCat
  );
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [rateFilter, setRateFilter] = useState<RateFilter>('all');
  const [durationFilter, setDurationFilter] = useState<DurationFilter>('all');
  const [appliedBanner, setAppliedBanner] = useState<string | null>(null);

  useEffect(() => {
    const paramCat = searchParams.get('category') as TradeCategoryId | null;
    if (paramCat) {
      setSelectedCategory(paramCat);
    }
  }, [searchParams]);

  const availableJobs = useMemo(
    () => jobs.filter((j) => j.status === 'available'),
    [jobs]
  );

  const uniqueLocations = useMemo(
    () => Array.from(new Set(availableJobs.map((j) => j.location))),
    [availableJobs]
  );

  const filteredJobs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return availableJobs.filter((job) => {
      if (selectedCategory !== 'all' && job.category !== selectedCategory) {
        return false;
      }
      if (locationFilter !== 'all' && job.location !== locationFilter) {
        return false;
      }
      if (rateFilter !== 'all' && job.dailyRate < Number(rateFilter)) {
        return false;
      }
      if (durationFilter === 'short' && job.durationDays > 4) return false;
      if (
        durationFilter === 'medium' &&
        (job.durationDays < 5 || job.durationDays > 9)
      ) {
        return false;
      }
      if (durationFilter === 'long' && job.durationDays < 10) return false;

      if (q) {
        const hay = `${job.title} ${job.employerName} ${job.location} ${job.requiredSkills.join(' ')}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [
    availableJobs,
    query,
    selectedCategory,
    locationFilter,
    rateFilter,
    durationFilter,
  ]);

  const handleCategorySelect = (cat: TradeCategoryId | 'all') => {
    setSelectedCategory(cat);
    if (cat === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  const resetFilters = () => {
    setQuery('');
    handleCategorySelect('all');
    setLocationFilter('all');
    setRateFilter('all');
    setDurationFilter('all');
  };

  const handleApply = (job: JobOpportunity) => {
    updateJobStatus(job.id, 'applied');
    setAppliedBanner(
      `"${job.title}" was saved to Applied in this browser preview. No application was sent to an employer.`
    );
  };

  return (
    <WorkerLayout>
      <div className="space-y-5">
        {/* Header + Search */}
        <section className="border border-[#173B78]/18 bg-white p-4 sm:p-6">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#3478F6]">
            Find Work
          </p>
          <h1 className="mt-1 font-display text-2xl font-bold text-[#173B78]">
            Discover jobs by trade &amp; location
          </h1>

          {/* Search Bar */}
          <div className="relative mt-4">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#173B78]/50" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search trade, task, employer or area..."
              aria-label="Search available jobs"
              className="min-h-[48px] w-full border border-[#173B78]/25 bg-[#F8F7F3] pr-4 pl-10 text-sm font-medium text-[#102347] placeholder:text-[#102347]/45 focus:border-[#3478F6] focus:bg-white focus:outline-none"
            />
          </div>

          {/* Urban Company-Inspired Category Grid */}
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#173B78]/70">
                Categories
              </span>
              {selectedCategory !== 'all' && (
                <button
                  type="button"
                  onClick={() => handleCategorySelect('all')}
                  className="text-xs font-bold text-[#3478F6]"
                >
                  Show All
                </button>
              )}
            </div>

            <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
              {TRADE_CATEGORIES.map((cat) => {
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() =>
                      handleCategorySelect(active ? 'all' : cat.id)
                    }
                    className={`flex min-h-[72px] flex-col items-start justify-between border p-2.5 text-left transition-colors ${
                      active
                        ? 'border-[#173B78] bg-[#173B78] text-white'
                        : 'border-[#173B78]/14 bg-[#F8F7F3] text-[#102347] hover:border-[#3478F6]'
                    }`}
                  >
                    <CategoryIcon
                      category={cat.id}
                      className={`h-4 w-4 ${
                        active ? 'text-[#FF8A45]' : 'text-[#3478F6]'
                      }`}
                    />
                    <span className="mt-2 text-xs font-bold leading-tight">
                      {cat.shortLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filter Strip: Location, Payment Range, Duration */}
          <div className="mt-4 grid grid-cols-1 gap-2.5 border-t border-[#173B78]/12 pt-4 sm:grid-cols-3">
            <div>
              <label
                htmlFor="filter-location"
                className="mb-1 flex items-center gap-1 font-mono text-[11px] font-semibold uppercase text-[#173B78]/70"
              >
                <MapPin className="h-3 w-3 text-[#FF8A45]" />
                Location
              </label>
              <select
                id="filter-location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="min-h-[42px] w-full border border-[#173B78]/20 bg-[#F8F7F3] px-3 text-xs font-semibold text-[#102347]"
              >
                <option value="all">All Pune Locations</option>
                {uniqueLocations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="filter-rate"
                className="mb-1 flex items-center gap-1 font-mono text-[11px] font-semibold uppercase text-[#173B78]/70"
              >
                <SlidersHorizontal className="h-3 w-3 text-[#3478F6]" />
                Payment Range
              </label>
              <select
                id="filter-rate"
                value={rateFilter}
                onChange={(e) => setRateFilter(e.target.value as RateFilter)}
                className="min-h-[42px] w-full border border-[#173B78]/20 bg-[#F8F7F3] px-3 text-xs font-semibold text-[#102347]"
              >
                <option value="all">Any Daily Rate</option>
                <option value="900">₹900+ / day</option>
                <option value="1050">₹1,050+ / day</option>
                <option value="1150">₹1,150+ / day</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="filter-duration"
                className="mb-1 flex items-center gap-1 font-mono text-[11px] font-semibold uppercase text-[#173B78]/70"
              >
                <Clock className="h-3 w-3 text-[#173B78]" />
                Work Duration
              </label>
              <select
                id="filter-duration"
                value={durationFilter}
                onChange={(e) =>
                  setDurationFilter(e.target.value as DurationFilter)
                }
                className="min-h-[42px] w-full border border-[#173B78]/20 bg-[#F8F7F3] px-3 text-xs font-semibold text-[#102347]"
              >
                <option value="all">Any Duration</option>
                <option value="short">Short (1–4 days)</option>
                <option value="medium">Medium (5–9 days)</option>
                <option value="long">Extended (10+ days)</option>
              </select>
            </div>
          </div>
        </section>

        {appliedBanner && (
          <div
            role="status"
            className="flex flex-wrap items-center justify-between gap-3 border border-[#3478F6] bg-white px-4 py-3 text-xs font-semibold text-[#173B78]"
          >
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#3478F6]" />
              {appliedBanner}
            </span>
            <Link
              to="/worker/my-work"
              className="bg-[#173B78] px-3 py-1.5 text-xs font-bold text-white"
            >
              View in My Work
            </Link>
          </div>
        )}

        {/* Job Listings */}
        <div className="flex items-center justify-between">
          <p className="font-mono text-xs font-semibold text-[#173B78]">
            {filteredJobs.length} AVAILABLE OPPORTUNITIES
          </p>
          {(query ||
            selectedCategory !== 'all' ||
            locationFilter !== 'all' ||
            rateFilter !== 'all' ||
            durationFilter !== 'all') && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs font-bold text-[#3478F6]"
            >
              Reset All Filters
            </button>
          )}
        </div>

        {filteredJobs.length === 0 ? (
          <div className="border border-[#173B78]/18 bg-white p-8 text-center">
            <p className="font-display text-lg font-bold text-[#173B78]">
              No matching opportunities found
            </p>
            <p className="mt-1 text-sm text-[#102347]/70">
              Try broadening your category, location, or daily rate filter.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 min-h-[44px] bg-[#173B78] px-5 text-xs font-bold text-white"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {filteredJobs.map((job) => (
              <article
                key={job.id}
                className="flex flex-col justify-between border border-[#173B78]/18 bg-white p-4 sm:p-5"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#173B78]/12 bg-[#F8F7F3] text-[#3478F6]">
                        <CategoryIcon category={job.category} className="h-5 w-5" />
                      </span>
                      <div>
                        <h2 className="font-display text-base font-bold leading-snug text-[#102347] sm:text-lg">
                          {job.title}
                        </h2>
                        <p className="text-xs font-medium text-[#102347]/75">
                          {job.employerName}
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 bg-[#173B78] px-2.5 py-1 font-mono text-xs font-bold text-white">
                      ₹{job.dailyRate}/d
                    </span>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-[#102347]/80 sm:text-sm">
                    {job.description}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-[11px] text-[#102347]/70">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-[#FF8A45]" />
                      {job.location} ({job.distanceKm} km)
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-[#3478F6]" />
                      {job.durationDays} days
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-[#173B78]">
                      <ShieldCheck className="h-3.5 w-3.5 text-[#3478F6]" />
                      WorkReceipt
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#173B78]/12 pt-3">
                  <span className="font-mono text-xs font-bold text-[#173B78]">
                    Est. ₹{(job.dailyRate * job.durationDays).toLocaleString('en-IN')}
                  </span>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/worker/jobs/${job.id}`}
                      className="min-h-[42px] border border-[#173B78]/25 px-3.5 text-xs font-bold text-[#173B78] hover:border-[#173B78]"
                    >
                      Details
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleApply(job)}
                      className="min-h-[42px] bg-[#3478F6] px-4 text-xs font-bold text-white transition-colors hover:bg-[#173B78] disabled:opacity-60"
                    >
                      Save to Applied
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

    </WorkerLayout>
  );
};
