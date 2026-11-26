import React, { useState } from 'react';
import {
  ShieldCheck,
  Bell,
  HelpCircle,
  LogOut,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppState } from '../../context/AppStateContext';
import { WorkerLayout } from '../../components/worker/WorkerLayout';

const SUPPORT_FAQS = [
  {
    q: 'How do self-declared skills become verified?',
    a: 'Submit a short practical video performing the task from your trade category. Certified assessors evaluate safety and workmanship against a trade rubric before marking the skill as verified.',
  },
  {
    q: 'What does a WorkReceipt protect?',
    a: 'A WorkReceipt records the employer, worker, task description, duration, daily rate, and confirmation status so both parties share the same record of agreed pay and completed work.',
  },
  {
    q: 'Can I use KaamVaani in regional languages?',
    a: 'Yes. Select Hindi, Marathi, Tamil, or English in KaamVaani to record daily work details and review the structured confirmation card before saving.',
  },
];

export const WorkerProfilePage: React.FC = () => {
  const {
    workerProfile,
    workerSkills,
    updateWorkerProfile,
    resetSession,
  } = useAppState();
  const navigate = useNavigate();

  const [name, setName] = useState(workerProfile.name);
  const [profession, setProfession] = useState(workerProfile.profession);
  const [location, setLocation] = useState(workerProfile.location);
  const [experienceYears, setExperienceYears] = useState(
    workerProfile.experienceYears
  );
  const [phone, setPhone] = useState(workerProfile.phone);
  const [language, setLanguage] = useState(workerProfile.preferredLanguage);
  const [savedNotice, setSavedNotice] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const initials = name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase() ?? '')
      .join('');

    updateWorkerProfile({
      name: name.trim() || workerProfile.name,
      initials: initials || workerProfile.initials,
      profession: profession.trim() || workerProfile.profession,
      location: location.trim() || workerProfile.location,
      experienceYears: Math.max(0, Number(experienceYears) || 0),
      phone: phone.trim() || workerProfile.phone,
      preferredLanguage: language,
    });
    setSavedNotice(true);
  };

  const handleLogout = () => {
    resetSession();
    navigate('/');
  };

  return (
    <WorkerLayout>
      <div className="space-y-5">
        {/* Profile Header */}
        <section className="flex flex-col gap-4 border border-[#173B78]/20 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3.5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-[#173B78] font-display text-xl font-bold text-white">
              {workerProfile.initials}
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-[#173B78]">
                {workerProfile.name}
              </h1>
              <p className="text-xs text-[#102347]/75">
                {workerProfile.profession} · {workerProfile.passportId}
              </p>
            </div>
          </div>

          <Link
            to="/worker/passport"
            className="inline-flex min-h-[42px] items-center justify-center gap-2 border border-[#173B78] px-4 text-xs font-bold text-[#173B78] hover:bg-[#173B78] hover:text-white"
          >
            <ShieldCheck className="h-4 w-4 text-[#FF8A45]" />
            <span>View Skill Passport ({workerSkills.length} Skills)</span>
          </Link>
        </section>

        {/* Personal Details & Language Preferences */}
        <form
          onSubmit={handleSave}
          className="space-y-4 border border-[#173B78]/18 bg-white p-4 sm:p-6"
        >
          <h2 className="font-display text-lg font-bold text-[#173B78]">
            Personal Details &amp; Language
          </h2>

          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="prof-name"
                className="block font-mono text-xs font-semibold uppercase text-[#173B78]"
              >
                Full Name
              </label>
              <input
                id="prof-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setSavedNotice(false);
                }}
                className="mt-1 min-h-[46px] w-full border border-[#173B78]/25 bg-[#F8F7F3] px-3 text-sm font-semibold text-[#102347]"
              />
            </div>

            <div>
              <label
                htmlFor="prof-trade"
                className="block font-mono text-xs font-semibold uppercase text-[#173B78]"
              >
                Profession
              </label>
              <input
                id="prof-trade"
                type="text"
                value={profession}
                onChange={(e) => {
                  setProfession(e.target.value);
                  setSavedNotice(false);
                }}
                className="mt-1 min-h-[46px] w-full border border-[#173B78]/25 bg-[#F8F7F3] px-3 text-sm font-semibold text-[#102347]"
              />
            </div>

            <div>
              <label
                htmlFor="prof-loc"
                className="block font-mono text-xs font-semibold uppercase text-[#173B78]"
              >
                Location
              </label>
              <input
                id="prof-loc"
                type="text"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  setSavedNotice(false);
                }}
                className="mt-1 min-h-[46px] w-full border border-[#173B78]/25 bg-[#F8F7F3] px-3 text-sm font-semibold text-[#102347]"
              />
            </div>

            <div>
              <label
                htmlFor="prof-exp"
                className="block font-mono text-xs font-semibold uppercase text-[#173B78]"
              >
                Experience (Years)
              </label>
              <input
                id="prof-exp"
                type="number"
                min={0}
                inputMode="numeric"
                value={experienceYears}
                onChange={(e) => {
                  setExperienceYears(Number(e.target.value));
                  setSavedNotice(false);
                }}
                className="mt-1 min-h-[46px] w-full border border-[#173B78]/25 bg-[#F8F7F3] px-3 font-mono text-sm font-semibold text-[#102347]"
              />
            </div>

            <div>
              <label
                htmlFor="prof-phone"
                className="block font-mono text-xs font-semibold uppercase text-[#173B78]"
              >
                Mobile Number
              </label>
              <input
                id="prof-phone"
                type="tel"
                inputMode="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setSavedNotice(false);
                }}
                className="mt-1 min-h-[46px] w-full border border-[#173B78]/25 bg-[#F8F7F3] px-3 font-mono text-sm font-semibold text-[#102347]"
              />
            </div>

            <div>
              <label
                htmlFor="prof-lang"
                className="block font-mono text-xs font-semibold uppercase text-[#173B78]"
              >
                Preferred Language
              </label>
              <select
                id="prof-lang"
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value);
                  setSavedNotice(false);
                }}
                className="mt-1 min-h-[46px] w-full border border-[#173B78]/25 bg-[#F8F7F3] px-3 text-sm font-semibold text-[#102347]"
              >
                <option value="Hindi">Hindi (हिन्दी)</option>
                <option value="Marathi">Marathi (मराठी)</option>
                <option value="Tamil">Tamil (தமிழ்)</option>
                <option value="Bengali">Bengali (বাংলা)</option>
                <option value="English">English</option>
              </select>
            </div>
          </div>

          {savedNotice && (
            <div
              role="status"
              className="flex items-center gap-2 border border-[#3478F6] bg-[#3478F6]/10 px-3.5 py-2.5 text-xs font-semibold text-[#173B78]"
            >
              <CheckCircle2 className="h-4 w-4 text-[#3478F6]" />
              <span>Profile settings updated.</span>
            </div>
          )}

          <button
            type="submit"
            className="min-h-[46px] bg-[#173B78] px-6 text-xs font-bold text-white hover:bg-[#3478F6]"
          >
            Save Profile Changes
          </button>
        </form>

        {/* Notifications & Account Settings */}
        <section className="border border-[#173B78]/18 bg-white p-4 sm:p-6">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-[#3478F6]" />
            <h2 className="font-display text-lg font-bold text-[#173B78]">
              Notifications &amp; Account Settings
            </h2>
          </div>

          <div className="mt-4 space-y-3">
            <label className="flex min-h-[48px] cursor-pointer items-center justify-between gap-3 border border-[#173B78]/14 bg-[#F8F7F3] px-4 py-2.5">
              <div>
                <p className="text-sm font-bold text-[#102347]">
                  Opportunity alerts
                </p>
                <p className="text-xs text-[#102347]/70">
                  Receive notifications when nearby work matches your skills
                </p>
              </div>
              <input
                type="checkbox"
                checked={workerProfile.notificationsEnabled}
                onChange={(e) =>
                  updateWorkerProfile({
                    notificationsEnabled: e.target.checked,
                  })
                }
                className="h-5 w-5 accent-[#173B78]"
              />
            </label>

            <label className="flex min-h-[48px] cursor-pointer items-center justify-between gap-3 border border-[#173B78]/14 bg-[#F8F7F3] px-4 py-2.5">
              <div>
                <p className="text-sm font-bold text-[#102347]">
                  WorkReceipt confirmation alerts
                </p>
                <p className="text-xs text-[#102347]/70">
                  Alert when an employer co-signs or updates payment status
                </p>
              </div>
              <input
                type="checkbox"
                checked={workerProfile.whatsappAlertsEnabled}
                onChange={(e) =>
                  updateWorkerProfile({
                    whatsappAlertsEnabled: e.target.checked,
                  })
                }
                className="h-5 w-5 accent-[#173B78]"
              />
            </label>
          </div>

          <div className="mt-4">
            <Link
              to="/worker/passport"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3478F6]"
            >
              <span>Manage verified and declared skills in Skill Passport</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>

        {/* Help & Support */}
        <section className="border border-[#173B78]/18 bg-white p-4 sm:p-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-[#FF8A45]" />
            <h2 className="font-display text-lg font-bold text-[#173B78]">
              Help &amp; Support
            </h2>
          </div>

          <div className="mt-4 divide-y divide-[#173B78]/12 border border-[#173B78]/14">
            {SUPPORT_FAQS.map((item, idx) => {
              const open = openFaq === idx;
              return (
                <div key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : idx)}
                    className="flex min-h-[48px] w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-bold text-[#102347]"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 transition-transform ${
                        open ? 'rotate-180 text-[#3478F6]' : ''
                      }`}
                    />
                  </button>
                  {open && (
                    <p className="bg-[#F8F7F3] px-4 pt-2 pb-3.5 text-xs leading-relaxed text-[#102347]/80">
                      {item.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="flex min-h-[48px] w-full items-center justify-center gap-2 border border-[#173B78]/25 bg-white text-sm font-bold text-[#173B78] hover:bg-[#173B78] hover:text-white"
        >
          <LogOut className="h-4 w-4 text-[#FF8A45]" />
          <span>Log Out &amp; Return to Home</span>
        </button>
      </div>
    </WorkerLayout>
  );
};
