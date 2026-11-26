import React, { useState } from 'react';
import { ArrowRight, Building2, HardHat } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAppState } from '../context/AppStateContext';
import { TRADE_CATEGORIES } from '../data/seedData';
import type { TradeCategoryId, UserRole } from '../types/kaamkavach';
import { Badge, Button, Card, Container, SectionHeading, TextField } from '../components/ui';

const LANGUAGES = [
  { value: 'Hindi', label: 'हिन्दी · Hindi', code: 'hi' },
  { value: 'Marathi', label: 'मराठी · Marathi', code: 'mr' },
  { value: 'Tamil', label: 'தமிழ் · Tamil', code: 'ta' },
  { value: 'English', label: 'English', code: 'en' },
];

export const RegisterPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { completeOnboarding } = useAppState();
  const initialRole = searchParams.get('role') === 'employer' ? 'employer' : 'worker';
  const initialLanguage =
    LANGUAGES.find((language) => language.code === searchParams.get('language'))
      ?.value ?? 'Hindi';

  const [role, setRole] = useState<UserRole>(initialRole);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [language, setLanguage] = useState(initialLanguage);
  const [category, setCategory] = useState<TradeCategoryId>('electrician');
  const [experienceYears, setExperienceYears] = useState(0);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    completeOnboarding({
      role,
      name,
      city,
      language,
      phone,
      tradeOrCompany: role === 'worker' ? TRADE_CATEGORIES.find((trade) => trade.id === category)?.label ?? 'Skilled Worker' : company,
      category: role === 'worker' ? category : undefined,
      experienceYears: role === 'worker' ? experienceYears : undefined,
    });
    navigate(role === 'worker' ? '/worker/home' : '/employer/dashboard');
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-cream py-10 sm:py-14">
      <Container size="narrow">
        <div className="mx-auto max-w-2xl">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <Badge tone="warning">Local demo profile</Badge>
            <Link to="/sign-in" className="text-sm font-semibold text-electric hover:text-navy">
              Already have an account?
            </Link>
          </div>
          <SectionHeading
            title="Set up your KaamKavach workspace"
            description="Choose a role and enter the details you want to use in this local preview."
          />

          <Card variant="surface" padding="lg" className="mt-7">
            <div className="grid grid-cols-2 gap-2">
              {([
                { id: 'worker', label: 'Worker', icon: HardHat },
                { id: 'employer', label: 'Employer', icon: Building2 },
              ] as const).map(({ id, label, icon: Icon }) => (
                <Button
                  key={id}
                  type="button"
                  variant={role === id ? 'primary' : 'secondary'}
                  aria-pressed={role === id}
                  onClick={() => setRole(id)}
                  className="min-h-12"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <TextField
                label={role === 'worker' ? 'Full name' : 'Contact name'}
                autoComplete="name"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              {role === 'employer' ? (
                <TextField
                  label="Company or contractor name"
                  required
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                />
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="register-trade" className="block text-xs font-semibold text-navy">
                      Primary trade
                    </label>
                    <select
                      id="register-trade"
                      value={category}
                      onChange={(event) => setCategory(event.target.value as TradeCategoryId)}
                      className="min-h-12 w-full rounded-control border border-navy/25 bg-cream px-3 text-sm text-ink focus:border-electric"
                    >
                      {TRADE_CATEGORIES.map((trade) => (
                        <option key={trade.id} value={trade.id}>
                          {trade.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <TextField
                    label="Experience (years)"
                    type="number"
                    min={0}
                    max={60}
                    required
                    value={experienceYears}
                    onChange={(event) => setExperienceYears(Number(event.target.value))}
                  />
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <TextField
                  label="City or work area"
                  autoComplete="address-level2"
                  required
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                />
                <TextField
                  label="Mobile number"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="register-language" className="block text-xs font-semibold text-navy">
                  Preferred language
                </label>
                <select
                  id="register-language"
                  value={language}
                  onChange={(event) => setLanguage(event.target.value)}
                  className="min-h-12 w-full rounded-control border border-navy/25 bg-cream px-3 text-sm text-ink focus:border-electric"
                >
                  {LANGUAGES.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="border-l-2 border-accent bg-cream px-4 py-3 text-xs leading-relaxed text-text-muted">
                This only saves a sample workspace profile in this browser. It does not create an account, verify identity, or protect access.
              </div>
              <Button type="submit" size="lg" className="w-full">
                Continue to {role === 'worker' ? 'Worker' : 'Employer'} workspace
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </Card>
        </div>
      </Container>
    </main>
  );
};
