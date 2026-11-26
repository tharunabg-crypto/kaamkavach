import React, { useState } from 'react';
import { HardHat, Building2, ArrowRight, Globe, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LANGUAGES = [
  { id: 'hi', label: 'हिन्दी', sub: 'Hindi' },
  { id: 'mr', label: 'मराठी', sub: 'Marathi' },
  { id: 'ta', label: 'தமிழ்', sub: 'Tamil' },
  { id: 'en', label: 'English', sub: 'English' },
];

export const GetStartedPage: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState('hi');
  const navigate = useNavigate();

  return (
    <main className="bg-drafting-grid min-h-[calc(100vh-4rem)] bg-[#F8F7F3] py-10 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 border border-[#173B78]/18 bg-white px-3 py-1.5">
            <ShieldCheck className="h-4 w-4 text-[#FF8A45]" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#173B78]">
              Your Skills. Your Proof. Your Protection.
            </span>
          </div>

          <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-[#173B78] sm:text-4xl">
            Choose how you use KaamKavach
          </h1>
          <p className="mt-3 text-base leading-relaxed text-[#102347]/75">
            Select your preferred language and open the workspace built for your
            role.
          </p>
        </div>

        {/* Language Preference */}
        <div className="mt-7 border border-[#173B78]/16 bg-white p-4 sm:p-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#173B78]">
            <Globe className="h-4 w-4 text-[#3478F6]" />
            <span>Preferred Language</span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {LANGUAGES.map((lang) => {
              const active = lang.id === selectedLang;
              return (
                <button
                  key={lang.id}
                  type="button"
                  onClick={() => setSelectedLang(lang.id)}
                  className={`min-h-[48px] border px-3 py-2 text-left transition-colors ${
                    active
                      ? 'border-[#3478F6] bg-[#173B78] text-white'
                      : 'border-[#173B78]/16 bg-[#F8F7F3] text-[#102347] hover:border-[#173B78]/40'
                  }`}
                >
                  <p className="font-display text-sm font-bold">{lang.label}</p>
                  <p
                    className={`text-[11px] ${
                      active ? 'text-white/75' : 'text-[#102347]/60'
                    }`}
                  >
                    {lang.sub}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Two-Role Entry Cards */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => navigate('/worker')}
            className="group flex flex-col justify-between border-2 border-[#173B78] bg-white p-6 text-left transition-colors hover:bg-[#F8F7F3]"
          >
            <div>
              <span className="inline-flex h-11 w-11 items-center justify-center bg-[#FF8A45]/20 text-[#102347]">
                <HardHat className="h-5 w-5 text-[#FF8A45]" />
              </span>
              <h2 className="mt-4 font-display text-2xl font-bold text-[#173B78]">
                I am a Worker
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#102347]/75">
                Build your Skill Passport, log work by voice with KaamVaani,
                create WorkReceipts, and find verified opportunities.
              </p>
            </div>
            <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#3478F6] group-hover:text-[#173B78]">
              <span>Open Worker App</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </button>

          <button
            type="button"
            onClick={() => navigate('/employer')}
            className="group flex flex-col justify-between border-2 border-[#173B78] bg-[#173B78] p-6 text-left text-white transition-colors hover:bg-[#0F2347]"
          >
            <div>
              <span className="inline-flex h-11 w-11 items-center justify-center bg-[#3478F6]/25 text-white">
                <Building2 className="h-5 w-5 text-[#3478F6]" />
              </span>
              <h2 className="mt-4 font-display text-2xl font-bold text-white">
                I am an Employer
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                Discover verified tradespeople, inspect Skill Passport
                credentials, and co-sign transparent WorkReceipts.
              </p>
            </div>
            <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#FF8A45]">
              <span>Open Employer App</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </button>
        </div>
      </div>
    </main>
  );
};
