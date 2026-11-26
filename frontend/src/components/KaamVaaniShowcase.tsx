import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  CheckCircle2,
  PencilLine,
  RotateCcw,
  FileCheck2,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { VOICE_LANGUAGES } from '../data/seedData';

const WAVE_HEIGHTS = [16, 28, 44, 24, 48, 34, 20, 44, 30, 18, 38, 26, 46, 22, 32, 18];

export const KaamVaaniShowcase: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(VOICE_LANGUAGES[0].id);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [confirmed, setConfirmed] = useState<boolean>(false);

  const scenario =
    VOICE_LANGUAGES.find((s) => s.id === activeId) ?? VOICE_LANGUAGES[0];

  const [employer, setEmployer] = useState<string>(scenario.parsedEmployer);
  const [work, setWork] = useState<string>(scenario.parsedWork);
  const [durationDays, setDurationDays] = useState<number>(scenario.parsedDays);
  const [dailyRate, setDailyRate] = useState<number>(scenario.parsedRate);

  useEffect(() => {
    setEmployer(scenario.parsedEmployer);
    setWork(scenario.parsedWork);
    setDurationDays(scenario.parsedDays);
    setDailyRate(scenario.parsedRate);
    setConfirmed(false);
    setIsEditing(false);
  }, [scenario]);

  useEffect(() => {
    if (!isListening) return;
    const timer = window.setTimeout(() => {
      setIsListening(false);
    }, 2000);
    return () => window.clearTimeout(timer);
  }, [isListening]);

  const safeDays = Number.isFinite(durationDays) && durationDays > 0 ? durationDays : 0;
  const safeRate = Number.isFinite(dailyRate) && dailyRate >= 0 ? dailyRate : 0;
  const totalAmount = safeDays * safeRate;

  const handleLanguageChange = (id: string) => {
    setActiveId(id);
    setIsListening(true);
  };

  const handleReset = () => {
    setEmployer(scenario.parsedEmployer);
    setWork(scenario.parsedWork);
    setDurationDays(scenario.parsedDays);
    setDailyRate(scenario.parsedRate);
    setConfirmed(false);
    setIsEditing(false);
  };

  return (
    <div
      id="kaamvaani"
      className="relative overflow-hidden border border-[#173B78] bg-[#0F2347] text-white"
    >
      <div className="flex flex-col gap-3 border-b border-white/12 bg-[#173B78]/70 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center bg-[#FF8A45] text-[#0F2347]">
            <Mic className="h-5 w-5" />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                KaamVaani
              </h3>
              <span className="border border-[#FF8A45]/50 bg-[#FF8A45]/15 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#FF8A45]">
                Voice-First Assistant
              </span>
            </div>
            <p className="mt-0.5 text-xs leading-snug text-white/75 sm:text-sm">
              Listen → Transcribe → Extract → Review → Confirm → Save in your
              regional language.
            </p>
          </div>
        </div>

        <Link
          to="/worker/kaamvaani"
          className="inline-flex min-h-[40px] w-fit items-center gap-1.5 border border-white/25 bg-white/10 px-3.5 text-xs font-semibold text-white hover:bg-white hover:text-[#173B78]"
        >
          <span>Open Full KaamVaani</span>
          <ArrowRight className="h-3.5 w-3.5 text-[#FF8A45]" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="border-b border-white/12 p-4 sm:p-8 lg:col-span-6 lg:border-r lg:border-b-0">
          <div>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-white/65">
              Choose Language
            </span>
            <div
              role="tablist"
              aria-label="Select regional language"
              className="mt-2.5 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap"
            >
              {VOICE_LANGUAGES.map((item) => {
                const active = item.id === activeId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => handleLanguageChange(item.id)}
                    className={`min-h-[44px] border px-3.5 py-2 text-xs font-semibold transition-colors sm:text-sm ${
                      active
                        ? 'border-[#3478F6] bg-[#3478F6] text-white'
                        : 'border-white/18 bg-[#0A1933] text-white/80 hover:border-white/40 hover:text-white'
                    }`}
                  >
                    <span>{item.nativeLabel}</span>
                    <span className="ml-1.5 text-[11px] opacity-75">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 border border-white/14 bg-[#0A1933] p-4 sm:p-5">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => setIsListening((prev) => !prev)}
                aria-label={
                  isListening
                    ? 'Stop voice listening animation'
                    : 'Tap microphone to activate voice capture'
                }
                className={`relative flex h-18 w-18 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  isListening
                    ? 'border-white bg-[#FF8A45] text-[#0F2347]'
                    : 'border-[#FF8A45] bg-[#173B78] text-white hover:bg-[#3478F6]'
                }`}
              >
                {isListening ? (
                  <MicOff className="h-7 w-7" />
                ) : (
                  <Mic className="h-7 w-7" />
                )}
              </button>

              <div className="w-full text-center sm:text-left">
                <div className="flex items-center justify-center gap-2 sm:justify-start">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isListening ? 'animate-ping bg-[#FF8A45]' : 'bg-[#3478F6]'
                    }`}
                  />
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white/85">
                    {isListening
                      ? `Listening in ${scenario.label}...`
                      : `Tap microphone · ${scenario.label}`}
                  </span>
                </div>

                <div
                  aria-hidden="true"
                  className="mt-3 flex h-11 items-center justify-between gap-1"
                >
                  {WAVE_HEIGHTS.map((height, idx) => (
                    <motion.span
                      key={idx}
                      animate={
                        isListening
                          ? {
                              height: [
                                `${Math.max(10, height * 0.4)}px`,
                                `${height}px`,
                                `${Math.max(10, height * 0.35)}px`,
                              ],
                            }
                          : { height: `${Math.max(10, height * 0.52)}px` }
                      }
                      transition={
                        isListening
                          ? {
                              duration: 0.48,
                              repeat: Infinity,
                              repeatType: 'reverse',
                              delay: idx * 0.035,
                            }
                          : { duration: 0.25 }
                      }
                      className={`w-full ${
                        idx % 3 === 0 ? 'bg-[#FF8A45]' : 'bg-[#3478F6]'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 border-t border-white/12 pt-4">
              <p className="font-mono text-[11px] uppercase tracking-wider text-[#FF8A45]">
                Transcription ({scenario.label})
              </p>
              <blockquote className="mt-1.5 font-display text-lg font-semibold leading-snug text-white sm:text-xl">
                “{scenario.promptPhrase}”
              </blockquote>
              <p className="mt-2 text-xs leading-relaxed text-white/70 sm:text-sm">
                “{scenario.translation}”
              </p>
            </div>
          </div>

          <div className="mt-4 border border-white/14 bg-[#173B78]/45 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#FF8A45]">
              <Volume2 className="h-4 w-4 shrink-0" />
              <span className="font-mono uppercase tracking-wider">
                Spoken Readback Summary
              </span>
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-white/90">
              “{scenario.ttsSummary}”
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between bg-[#132C59] p-4 sm:p-8 lg:col-span-6">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#FF8A45]">
                Extracted Work Information
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing((prev) => !prev);
                    setConfirmed(false);
                  }}
                  className="inline-flex min-h-[38px] items-center gap-1.5 border border-white/25 bg-white/10 px-3 text-xs font-semibold text-white transition-colors hover:bg-white/20"
                >
                  <PencilLine className="h-3.5 w-3.5 text-[#FF8A45]" />
                  <span>{isEditing ? 'Done Editing' : 'Edit Details'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  aria-label="Reset voice entry fields"
                  className="inline-flex min-h-[38px] items-center gap-1 border border-white/15 px-2.5 text-xs text-white/75 hover:border-white/35 hover:text-white"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <p className="mt-2 text-sm text-white/75">
              Review and edit any field below before confirming your WorkReceipt
              record.
            </p>

            <div className="mt-5 space-y-2.5">
              <div className="flex flex-col justify-between gap-1.5 border border-white/14 bg-[#0F2347] px-4 py-3 sm:flex-row sm:items-center">
                <label
                  htmlFor="kv-employer"
                  className="font-mono text-xs uppercase tracking-wider text-white/65"
                >
                  Employer
                </label>
                {isEditing ? (
                  <input
                    id="kv-employer"
                    type="text"
                    value={employer}
                    onChange={(e) => setEmployer(e.target.value)}
                    className="min-h-[40px] w-full border border-[#3478F6] bg-[#0A1933] px-3 text-sm font-semibold text-white focus:outline-none sm:w-56 sm:text-right"
                  />
                ) : (
                  <span className="font-display text-base font-bold text-white">
                    {employer || '—'}
                  </span>
                )}
              </div>

              <div className="flex flex-col justify-between gap-1.5 border border-white/14 bg-[#0F2347] px-4 py-3 sm:flex-row sm:items-center">
                <label
                  htmlFor="kv-work"
                  className="font-mono text-xs uppercase tracking-wider text-white/65"
                >
                  Work
                </label>
                {isEditing ? (
                  <input
                    id="kv-work"
                    type="text"
                    value={work}
                    onChange={(e) => setWork(e.target.value)}
                    className="min-h-[40px] w-full border border-[#3478F6] bg-[#0A1933] px-3 text-sm font-semibold text-white focus:outline-none sm:w-56 sm:text-right"
                  />
                ) : (
                  <span className="font-display text-base font-bold text-white">
                    {work || '—'}
                  </span>
                )}
              </div>

              <div className="flex flex-col justify-between gap-1.5 border border-white/14 bg-[#0F2347] px-4 py-3 sm:flex-row sm:items-center">
                <label
                  htmlFor="kv-duration"
                  className="font-mono text-xs uppercase tracking-wider text-white/65"
                >
                  Duration
                </label>
                {isEditing ? (
                  <div className="flex items-center gap-2 sm:justify-end">
                    <input
                      id="kv-duration"
                      type="number"
                      min={1}
                      max={365}
                      inputMode="numeric"
                      value={durationDays}
                      onChange={(e) => setDurationDays(Number(e.target.value))}
                      className="min-h-[40px] w-24 border border-[#3478F6] bg-[#0A1933] px-3 text-right font-mono text-sm font-semibold text-white focus:outline-none"
                    />
                    <span className="text-xs text-white/75">days</span>
                  </div>
                ) : (
                  <span className="font-display text-base font-bold text-white">
                    {safeDays} {safeDays === 1 ? 'day' : 'days'}
                  </span>
                )}
              </div>

              <div className="flex flex-col justify-between gap-1.5 border border-white/14 bg-[#0F2347] px-4 py-3 sm:flex-row sm:items-center">
                <label
                  htmlFor="kv-rate"
                  className="font-mono text-xs uppercase tracking-wider text-white/65"
                >
                  Daily rate
                </label>
                {isEditing ? (
                  <div className="flex items-center gap-2 sm:justify-end">
                    <span className="font-mono text-sm text-white/75">₹</span>
                    <input
                      id="kv-rate"
                      type="number"
                      min={0}
                      step={50}
                      inputMode="numeric"
                      value={dailyRate}
                      onChange={(e) => setDailyRate(Number(e.target.value))}
                      className="min-h-[40px] w-28 border border-[#3478F6] bg-[#0A1933] px-3 text-right font-mono text-sm font-semibold text-white focus:outline-none"
                    />
                  </div>
                ) : (
                  <span className="font-mono text-base font-bold text-white">
                    ₹{safeRate.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between border border-[#FF8A45]/60 bg-[#FF8A45]/12 px-4 py-3.5">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white">
                  Total
                </span>
                <span className="font-mono text-xl font-bold text-[#FF8A45]">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 border-t border-white/12 pt-5">
            {confirmed ? (
              <div className="flex flex-col gap-3 border border-[#3478F6] bg-[#0F2347] p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-2.5">
                  <FileCheck2 className="mt-0.5 h-5 w-5 shrink-0 text-[#3478F6]" />
                  <div>
                    <p className="text-sm font-bold text-white">
                      Confirmed work entry ready
                    </p>
                    <p className="text-xs text-white/75">
                      {employer} · {work} · {safeDays} days · ₹
                      {totalAmount.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
                <Link
                  to="/worker/kaamvaani"
                  className="inline-flex min-h-[40px] shrink-0 items-center justify-center bg-[#3478F6] px-3.5 text-xs font-semibold text-white hover:bg-white hover:text-[#173B78]"
                >
                  Save in Worker App
                </Link>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setConfirmed(true);
                }}
                className="flex min-h-[50px] w-full items-center justify-center gap-2 bg-[#FF8A45] px-6 py-3 text-sm font-bold text-[#0F2347] transition-colors hover:bg-white"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Confirm Work Details</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
