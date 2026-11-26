import React, { useState } from 'react';
import {
  Phone,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button, Card, Container, TextField } from '../components/ui';
import { requestRemoteVerification } from '../services/kaamkavachService';

export const SignInPage: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);
    const result = await requestRemoteVerification(identifier.trim());
    setFeedback(
      result.ok
        ? `${result.data?.message ?? 'OTP request accepted.'} OTP verification and session creation are not implemented, so you are not signed in.`
        : result.error ?? 'The sign-in request could not be completed.'
    );
    setIsSubmitting(false);
  };

  return (
    <main className="bg-drafting-grid min-h-[calc(100vh-4rem)] bg-[#F8F7F3] py-10 sm:py-16">
      <Container size="narrow">
        <Card
          variant="raised"
          padding="none"
          className="overflow-hidden shadow-[0_18px_40px_-20px_rgba(23,59,120,0.2)]"
        >
          <div className="border-b border-white/12 bg-[#173B78] px-6 py-5 text-white">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#FF8A45]" />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85">
                KaamKavach Access
              </span>
            </div>
            <h1 className="mt-2 font-display text-2xl font-bold tracking-tight text-white">
              Sign in to your account
            </h1>
            <p className="mt-1 text-sm text-white/75">
              Enter your registered mobile number or Skill Passport ID.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 p-6">
            <TextField
              id="signin-identifier"
              label="Mobile Number or Passport ID"
              type="text"
              inputMode="tel"
              required
              value={identifier}
              onChange={(e) => {
                setIdentifier(e.target.value);
                setFeedback(null);
              }}
              placeholder="+91 98XXX XXXXX or KK-EL-4829"
              leadingAdornment={<Phone className="h-4 w-4" />}
            />

            {feedback && (
              <div
                role="status"
                className="flex items-start gap-2.5 rounded-control border border-status-warning/25 bg-status-warning-soft p-3.5 text-xs leading-relaxed text-status-warning"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{feedback}</span>
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? 'Contacting service…' : 'Request sign-in code'}</span>
              <ArrowRight className="h-4 w-4 text-[#FF8A45]" />
            </Button>
            <div className="flex flex-wrap justify-between gap-3 text-sm">
              <Link to="/forgot-password" className="font-semibold text-electric hover:text-navy">
                Forgot your password?
              </Link>
              <Link to="/register" className="font-semibold text-electric hover:text-navy">
                Create a local profile
              </Link>
            </div>
          </form>

          <div className="border-t border-[#173B78]/12 bg-[#F8F7F3] p-6">
            <p className="text-xs leading-relaxed text-text-muted">
              Sign-in is not complete until an authentication provider and OTP
              verification flow are connected.
            </p>
          </div>
        </Card>
      </Container>
    </main>
  );
};
