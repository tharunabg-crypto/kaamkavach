import React, { useState } from 'react';
import {
  Phone,
  ShieldCheck,
  ArrowRight,
  HardHat,
  Building2,
  AlertCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const SignInPage: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [submittedNotice, setSubmittedNotice] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedNotice(true);
  };

  return (
    <main className="bg-drafting-grid min-h-[calc(100vh-4rem)] bg-[#F8F7F3] py-10 sm:py-16">
      <div className="mx-auto max-w-md px-4 sm:px-6">
        <div className="border border-[#173B78]/20 bg-white shadow-[0_18px_40px_-20px_rgba(23,59,120,0.2)]">
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
            <div>
              <label
                htmlFor="signin-identifier"
                className="block font-mono text-xs font-semibold uppercase tracking-wider text-[#173B78]"
              >
                Mobile Number or Passport ID
              </label>
              <div className="relative mt-2">
                <Phone className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#173B78]/50" />
                <input
                  id="signin-identifier"
                  type="text"
                  inputMode="tel"
                  required
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    setSubmittedNotice(false);
                  }}
                  placeholder="+91 98XXX XXXXX or KK-EL-4829"
                  className="min-h-[48px] w-full border border-[#173B78]/25 bg-[#F8F7F3] pr-4 pl-10 text-base text-[#102347] placeholder:text-[#102347]/40 focus:border-[#3478F6] focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            {submittedNotice && (
              <div
                role="status"
                className="flex items-start gap-2.5 border border-[#FF8A45] bg-[#FF8A45]/10 p-3.5 text-xs leading-relaxed text-[#102347]"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#FF8A45]" />
                <span>
                  OTP verification could not be completed because no live
                  account verification server is reachable from this device
                  session. You can explore the Worker and Employer workspaces
                  directly below.
                </span>
              </div>
            )}

            <button
              type="submit"
              className="flex min-h-[50px] w-full items-center justify-center gap-2 bg-[#173B78] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#3478F6]"
            >
              <span>Continue</span>
              <ArrowRight className="h-4 w-4 text-[#FF8A45]" />
            </button>
          </form>

          <div className="border-t border-[#173B78]/12 bg-[#F8F7F3] p-6">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#173B78]/70">
              Direct Workspace Access
            </p>
            <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <Link
                to="/worker"
                className="flex min-h-[46px] items-center justify-center gap-2 border border-[#173B78]/20 bg-white px-3 text-xs font-bold text-[#173B78] hover:border-[#3478F6]"
              >
                <HardHat className="h-4 w-4 text-[#FF8A45]" />
                <span>Worker View</span>
              </Link>
              <Link
                to="/employer"
                className="flex min-h-[46px] items-center justify-center gap-2 border border-[#173B78]/20 bg-white px-3 text-xs font-bold text-[#173B78] hover:border-[#3478F6]"
              >
                <Building2 className="h-4 w-4 text-[#3478F6]" />
                <span>Employer View</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
