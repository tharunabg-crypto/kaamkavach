import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { EmployerLayout } from '../../components/employer/EmployerLayout';
import { Button, Card, SectionHeading, TextField } from '../../components/ui';
import { useAppState } from '../../context/AppStateContext';
import { TRADE_CATEGORIES } from '../../data/seedData';
import type { TradeCategoryId } from '../../types/kaamkavach';

export const EmployerPostWorkPage: React.FC = () => {
  const { employerProfile, createJob } = useAppState();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<TradeCategoryId>('electrician');
  const [location, setLocation] = useState(employerProfile.location);
  const [dailyRate, setDailyRate] = useState('1000');
  const [durationDays, setDurationDays] = useState('1');
  const [scheduleTime, setScheduleTime] = useState('09:00 AM – 05:00 PM');
  const [startDate, setStartDate] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState('');
  const [createdJobId, setCreatedJobId] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const job = createJob({
      title: title.trim(),
      category,
      employerName: employerProfile.companyName,
      location: location.trim(),
      city: employerProfile.city,
      dailyRate: Number(dailyRate),
      durationDays: Number(durationDays),
      description: description.trim(),
      requiredSkills: skills.split(',').map((skill) => skill.trim()).filter(Boolean),
      scheduleTime: scheduleTime.trim(),
      ...(startDate ? { startDate } : {}),
    });
    setCreatedJobId(job.id);
    setTitle('');
    setDescription('');
    setSkills('');
  };

  return (
    <EmployerLayout>
      <div className="mx-auto max-w-3xl space-y-6">
        <SectionHeading
          eyebrow="Create an opportunity · local preview"
          title="Post work"
          description="Add the task, rate, schedule, and required skills. This listing is stored in this browser only and is not published to workers."
        />
        {createdJobId && (
          <div role="status" className="rounded-control border border-status-success/25 bg-status-success-soft p-4 text-sm text-status-success">
            Opportunity added to the local preview.{' '}
            <Link to={`/worker/jobs/${createdJobId}`} className="font-semibold underline">
              Preview job details
            </Link>
          </div>
        )}
        <Card padding="lg">
          <form onSubmit={handleSubmit} className="space-y-5">
            <TextField
              label="Job title"
              placeholder="e.g. Apartment electrical repairs"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
              maxLength={100}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="post-category" className="block text-xs font-semibold text-navy">Trade category</label>
                <select
                  id="post-category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value as TradeCategoryId)}
                  className="min-h-12 w-full rounded-control border border-navy/25 bg-cream px-3 text-sm text-ink focus:border-electric focus:bg-white focus:outline-none"
                >
                  {TRADE_CATEGORIES.map((trade) => <option key={trade.id} value={trade.id}>{trade.label}</option>)}
                </select>
              </div>
              <TextField label="Work location" value={location} onChange={(event) => setLocation(event.target.value)} required maxLength={100} />
              <TextField label="Daily rate (₹)" type="number" min="1" step="1" value={dailyRate} onChange={(event) => setDailyRate(event.target.value)} required />
              <TextField label="Duration (days)" type="number" min="1" max="365" step="1" value={durationDays} onChange={(event) => setDurationDays(event.target.value)} required />
              <TextField label="Schedule" value={scheduleTime} onChange={(event) => setScheduleTime(event.target.value)} required maxLength={80} />
              <TextField label="Start date (optional)" type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} />
            </div>
            <TextField
              label="Required skills"
              hint="Separate skills with commas."
              placeholder="e.g. Safe wiring, conduit fitting"
              value={skills}
              onChange={(event) => setSkills(event.target.value)}
              maxLength={300}
            />
            <div className="space-y-1.5">
              <label htmlFor="post-description" className="block text-xs font-semibold text-navy">Work description</label>
              <textarea
                id="post-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
                maxLength={1200}
                rows={5}
                className="w-full rounded-control border border-navy/25 bg-cream px-3 py-3 text-sm text-ink focus:border-electric focus:bg-white focus:outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-3 border-t border-navy/10 pt-5">
              <Button type="submit" size="lg">Save sample opportunity</Button>
              <Link to="/employer/dashboard" className="inline-flex min-h-[50px] items-center px-4 text-sm font-semibold text-navy hover:text-electric">
                Cancel
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </EmployerLayout>
  );
};
