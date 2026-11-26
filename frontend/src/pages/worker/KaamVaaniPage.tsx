import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  CheckCircle2,
  Volume2,
  RotateCcw,
  ArrowRight,
  FileCheck2,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { VOICE_LANGUAGES } from '../../data/seedData';
import { parseVoiceTranscriptLocally } from '../../services/kaamkavachService';
import { useAppState } from '../../context/AppStateContext';
import { WorkerLayout } from '../../components/worker/WorkerLayout';

type VoiceStage =
  | 'listen'
  | 'transcribe'
  | 'extract'
  | 'review'
  | 'confirm'
  | 'saved';

const STAGES: { id: VoiceStage; label: string }[] = [
  { id: 'listen', label: 'Listen' },
  { id: 'transcribe', label: 'Transcribe' },
  { id: 'extract', label: 'Extract' },
  { id: 'review', label: 'Review' },
  { id: 'confirm', label: 'Confirm' },
  { id: 'saved', label: 'Save' },
];

const WAVE_HEIGHTS = [16, 30, 46, 24, 52, 34, 22, 48, 30, 18, 40, 28, 50, 22, 34, 18];

export const KaamVaaniPage: React.FC = () => {
  const { workerProfile, createWorkReceipt } = useAppState();
  const [langId, setLangId] = useState(VOICE_LANGUAGES[0].id);
  const [stage, setStage] = useState<VoiceStage>('review');
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState(VOICE_LANGUAGES[0].promptPhrase);

  const [employer, setEmployer] = useState(VOICE_LANGUAGES[0].parsedEmployer);
  const [work, setWork] = useState(VOICE_LANGUAGES[0].parsedWork);
  const [location, setLocation] = useState(workerProfile.location);
  const [durationDays, setDurationDays] = useState(VOICE_LANGUAGES[0].parsedDays);
  const [dailyRate, setDailyRate] = useState(VOICE_LANGUAGES[0].parsedRate);
  const [savedReceiptNo, setSavedReceiptNo] = useState<string | null>(null);
  const [micNote, setMicNote] = useState<string | null>(null);

  const timersRef = useRef<number[]>([]);

  const selectedLang =
    VOICE_LANGUAGES.find((l) => l.id === langId) ?? VOICE_LANGUAGES[0];

  const clearTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  useEffect(() => () => clearTimers(), []);

  const runPipelineFromPhrase = (
    phrase: string,
    parsed: {
      employer: string;
      work: string;
      durationDays: number;
      dailyRate: number;
    }
  ) => {
    clearTimers();
    setSavedReceiptNo(null);
    setStage('listen');
    setIsListening(true);

    const t1 = window.setTimeout(() => {
      setIsListening(false);
      setTranscript(phrase);
      setStage('transcribe');
    }, 900);

    const t2 = window.setTimeout(() => {
      setEmployer(parsed.employer);
      setWork(parsed.work);
      setDurationDays(parsed.durationDays);
      setDailyRate(parsed.dailyRate);
      setStage('extract');
    }, 1550);

    const t3 = window.setTimeout(() => {
      setStage('review');
    }, 2150);

    timersRef.current = [t1, t2, t3];
  };

  const handleSelectLanguage = (id: string) => {
    setLangId(id);
    setMicNote(null);
    const next =
      VOICE_LANGUAGES.find((l) => l.id === id) ?? VOICE_LANGUAGES[0];
    runPipelineFromPhrase(next.promptPhrase, {
      employer: next.parsedEmployer,
      work: next.parsedWork,
      durationDays: next.parsedDays,
      dailyRate: next.parsedRate,
    });
  };

  const handleMicTap = () => {
    if (isListening) {
      clearTimers();
      setIsListening(false);
      setStage('review');
      return;
    }

    setMicNote(null);

    const speechWin = window as unknown as {
      SpeechRecognition?: new () => {
        lang: string;
        interimResults: boolean;
        maxAlternatives: number;
        onresult: ((ev: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
        onerror: (() => void) | null;
        onend: (() => void) | null;
        start: () => void;
      };
      webkitSpeechRecognition?: new () => {
        lang: string;
        interimResults: boolean;
        maxAlternatives: number;
        onresult: ((ev: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
        onerror: (() => void) | null;
        onend: (() => void) | null;
        start: () => void;
      };
    };

    const SpeechCtor =
      speechWin.SpeechRecognition ?? speechWin.webkitSpeechRecognition;

    if (SpeechCtor) {
      try {
        const recognition = new SpeechCtor();
        recognition.lang = selectedLang.bcp47;
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        setStage('listen');
        setIsListening(true);

        recognition.onresult = (event) => {
          const spoken = event.results[0]?.[0]?.transcript?.trim();
          if (spoken) {
            const extracted = parseVoiceTranscriptLocally(spoken);
            runPipelineFromPhrase(spoken, extracted);
          } else {
            setIsListening(false);
            setStage('review');
          }
        };

        recognition.onerror = () => {
          setIsListening(false);
          setMicNote(
            'Microphone access was unavailable. Loaded the selected language prompt so you can review and edit details.'
          );
          runPipelineFromPhrase(selectedLang.promptPhrase, {
            employer: selectedLang.parsedEmployer,
            work: selectedLang.parsedWork,
            durationDays: selectedLang.parsedDays,
            dailyRate: selectedLang.parsedRate,
          });
        };

        recognition.start();
        return;
      } catch {
        // Fall through to language prompt sequence
      }
    }

    runPipelineFromPhrase(selectedLang.promptPhrase, {
      employer: selectedLang.parsedEmployer,
      work: selectedLang.parsedWork,
      durationDays: selectedLang.parsedDays,
      dailyRate: selectedLang.parsedRate,
    });
  };

  const handleSaveReceipt = () => {
    const rec = createWorkReceipt({
      employerName: employer,
      workerName: workerProfile.name,
      workerPassportId: workerProfile.passportId,
      workDescription: work,
      location,
      durationDays,
      dailyRate,
      createdVia: 'KaamVaani',
      workerConfirmed: true,
      employerConfirmed: false,
    });
    setSavedReceiptNo(rec.receiptNo);
    setStage('saved');
  };

  const totalAmount =
    Math.max(1, Number(durationDays) || 0) * Math.max(0, Number(dailyRate) || 0);
  const currentStageIdx = STAGES.findIndex((s) => s.id === stage);

  return (
    <WorkerLayout>
      <div className="space-y-5">
        {/* Top Stage Progression Bar */}
        <section className="border border-[#173B78] bg-[#0F2347] p-4 text-white sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#FF8A45]">
                Multilingual Voice Assistant
              </span>
              <h1 className="mt-1 font-display text-2xl font-bold text-white">
                KaamVaani
              </h1>
            </div>
            <button
              type="button"
              onClick={() => handleSelectLanguage(langId)}
              className="inline-flex min-h-[38px] items-center gap-1.5 border border-white/25 px-3 text-xs font-semibold text-white hover:bg-white/10"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Restart Flow</span>
            </button>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-1.5 sm:grid-cols-6">
            {STAGES.map((st, idx) => {
              const reached = idx <= currentStageIdx;
              const current = st.id === stage;
              return (
                <div
                  key={st.id}
                  className={`border px-2 py-1.5 text-center font-mono text-[10px] font-bold uppercase ${
                    current
                      ? 'border-[#FF8A45] bg-[#FF8A45] text-[#0F2347]'
                      : reached
                        ? 'border-[#3478F6] bg-[#3478F6]/25 text-white'
                        : 'border-white/15 bg-white/5 text-white/50'
                  }`}
                >
                  {st.label}
                </div>
              );
            })}
          </div>
        </section>

        {/* Main Voice + Extraction Grid */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Left: Language Selector, Mic, Waveform, Transcript */}
          <section className="border border-[#173B78] bg-[#132C59] p-4 text-white sm:p-6 lg:col-span-6">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-white/70">
              1. Select Language
            </span>
            <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {VOICE_LANGUAGES.map((lang) => {
                const active = lang.id === langId;
                return (
                  <button
                    key={lang.id}
                    type="button"
                    onClick={() => handleSelectLanguage(lang.id)}
                    className={`min-h-[44px] border px-3 py-2 text-xs font-bold transition-colors ${
                      active
                        ? 'border-[#3478F6] bg-[#3478F6] text-white'
                        : 'border-white/20 bg-[#0A1933] text-white/80'
                    }`}
                  >
                    {lang.nativeLabel} · {lang.label}
                  </button>
                );
              })}
            </div>

            {/* Large Tactile Microphone + Waveform */}
            <div className="mt-5 flex flex-col items-center border border-white/15 bg-[#0A1933] p-5 text-center">
              <button
                type="button"
                onClick={handleMicTap}
                aria-label={isListening ? 'Stop listening' : 'Tap to speak'}
                className={`flex h-20 w-20 items-center justify-center rounded-full border-2 transition-colors ${
                  isListening
                    ? 'border-white bg-[#FF8A45] text-[#0F2347]'
                    : 'border-[#FF8A45] bg-[#173B78] text-white hover:bg-[#3478F6]'
                }`}
              >
                {isListening ? (
                  <MicOff className="h-8 w-8" />
                ) : (
                  <Mic className="h-8 w-8" />
                )}
              </button>

              <p className="mt-3 font-mono text-xs font-semibold uppercase tracking-wider text-[#FF8A45]">
                {isListening
                  ? `Listening (${selectedLang.label})...`
                  : 'Tap microphone to speak or replay'}
              </p>

              <div
                aria-hidden="true"
                className="mt-4 flex h-12 w-full items-center justify-between gap-1"
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
                        : { height: `${Math.max(10, height * 0.45)}px` }
                    }
                    transition={
                      isListening
                        ? {
                            duration: 0.45,
                            repeat: Infinity,
                            repeatType: 'reverse',
                            delay: idx * 0.03,
                          }
                        : { duration: 0.2 }
                    }
                    className={`w-full ${
                      idx % 3 === 0 ? 'bg-[#FF8A45]' : 'bg-[#3478F6]'
                    }`}
                  />
                ))}
              </div>

              {micNote && (
                <p className="mt-3 text-xs text-white/75">{micNote}</p>
              )}
            </div>

            {/* Transcription Card */}
            <div className="mt-4 border border-white/15 bg-[#0F2347] p-4">
              <p className="font-mono text-[11px] uppercase tracking-wider text-[#FF8A45]">
                2. Spoken Transcription
              </p>
              <p className="mt-1.5 font-display text-base font-semibold leading-snug text-white sm:text-lg">
                “{transcript}”
              </p>
            </div>

            <div className="mt-4 border border-white/15 bg-[#173B78]/60 p-4">
              <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase text-[#FF8A45]">
                <Volume2 className="h-4 w-4" />
                <span>Readback Summary</span>
              </div>
              <p className="mt-1.5 text-sm text-white/90">
                “{selectedLang.ttsSummary}”
              </p>
            </div>
          </section>

          {/* Right: Extract -> Review -> Confirm -> Save */}
          <section className="flex flex-col justify-between border border-[#173B78]/20 bg-white p-4 sm:p-6 lg:col-span-6">
            <div>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#3478F6]">
                3. Extracted Work Details — Review &amp; Edit
              </span>
              <h2 className="mt-1 font-display text-xl font-bold text-[#173B78]">
                WorkReceipt Draft
              </h2>

              <div className="mt-4 space-y-3">
                <div>
                  <label
                    htmlFor="kv-page-employer"
                    className="block font-mono text-xs font-semibold uppercase text-[#173B78]"
                  >
                    Employer
                  </label>
                  <input
                    id="kv-page-employer"
                    type="text"
                    value={employer}
                    onChange={(e) => {
                      setEmployer(e.target.value);
                      setStage('review');
                    }}
                    className="mt-1 min-h-[46px] w-full border border-[#173B78]/25 bg-[#F8F7F3] px-3 text-sm font-semibold text-[#102347] focus:border-[#3478F6] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="kv-page-work"
                    className="block font-mono text-xs font-semibold uppercase text-[#173B78]"
                  >
                    Work Description
                  </label>
                  <input
                    id="kv-page-work"
                    type="text"
                    value={work}
                    onChange={(e) => {
                      setWork(e.target.value);
                      setStage('review');
                    }}
                    className="mt-1 min-h-[46px] w-full border border-[#173B78]/25 bg-[#F8F7F3] px-3 text-sm font-semibold text-[#102347] focus:border-[#3478F6] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="kv-page-location"
                    className="block font-mono text-xs font-semibold uppercase text-[#173B78]"
                  >
                    Site Location
                  </label>
                  <input
                    id="kv-page-location"
                    type="text"
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                      setStage('review');
                    }}
                    className="mt-1 min-h-[46px] w-full border border-[#173B78]/25 bg-[#F8F7F3] px-3 text-sm font-semibold text-[#102347] focus:border-[#3478F6] focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="kv-page-days"
                      className="block font-mono text-xs font-semibold uppercase text-[#173B78]"
                    >
                      Duration (Days)
                    </label>
                    <input
                      id="kv-page-days"
                      type="number"
                      min={1}
                      inputMode="numeric"
                      value={durationDays}
                      onChange={(e) => {
                        setDurationDays(Number(e.target.value));
                        setStage('review');
                      }}
                      className="mt-1 min-h-[46px] w-full border border-[#173B78]/25 bg-[#F8F7F3] px-3 font-mono text-sm font-semibold text-[#102347]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="kv-page-rate"
                      className="block font-mono text-xs font-semibold uppercase text-[#173B78]"
                    >
                      Daily Rate (₹)
                    </label>
                    <input
                      id="kv-page-rate"
                      type="number"
                      min={0}
                      step={50}
                      inputMode="numeric"
                      value={dailyRate}
                      onChange={(e) => {
                        setDailyRate(Number(e.target.value));
                        setStage('review');
                      }}
                      className="mt-1 min-h-[46px] w-full border border-[#173B78]/25 bg-[#F8F7F3] px-3 font-mono text-sm font-semibold text-[#102347]"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between border border-[#173B78] bg-[#173B78] px-4 py-3.5 text-white">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">
                    Total Amount
                  </span>
                  <span className="font-mono text-xl font-bold text-[#FF8A45]">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Confirm -> Save Steps */}
            <div className="mt-5 border-t border-[#173B78]/14 pt-4">
              {stage === 'saved' && savedReceiptNo ? (
                <div className="border-2 border-[#3478F6] bg-[#F8F7F3] p-4">
                  <div className="flex items-start gap-2.5">
                    <FileCheck2 className="mt-0.5 h-5 w-5 shrink-0 text-[#3478F6]" />
                    <div>
                      <p className="font-display text-base font-bold text-[#173B78]">
                        Saved as WorkReceipt {savedReceiptNo}
                      </p>
                      <p className="mt-0.5 text-xs text-[#102347]/75">
                        {employer} · {work} · {durationDays} days · ₹
                        {totalAmount.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link
                      to="/worker/receipts"
                      className="inline-flex min-h-[42px] items-center gap-1.5 bg-[#173B78] px-4 text-xs font-bold text-white"
                    >
                      <span>Open WorkReceipts</span>
                      <ArrowRight className="h-3.5 w-3.5 text-[#FF8A45]" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setSavedReceiptNo(null);
                        setStage('review');
                      }}
                      className="min-h-[42px] border border-[#173B78]/25 bg-white px-4 text-xs font-bold text-[#173B78]"
                    >
                      Log Another Entry
                    </button>
                  </div>
                </div>
              ) : stage === 'confirm' ? (
                <div className="space-y-3 border border-[#FF8A45] bg-[#FF8A45]/10 p-4">
                  <p className="text-xs font-bold text-[#102347]">
                    Confirm details before saving to your WorkReceipts:
                  </p>
                  <p className="font-mono text-xs text-[#102347]/80">
                    {employer} · {work} · {durationDays} days × ₹{dailyRate} = ₹
                    {totalAmount.toLocaleString('en-IN')}
                  </p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setStage('review')}
                      className="min-h-[46px] flex-1 border border-[#173B78]/25 bg-white text-xs font-bold text-[#173B78]"
                    >
                      Edit Again
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveReceipt}
                      className="min-h-[46px] flex-2 bg-[#173B78] px-4 text-xs font-bold text-white hover:bg-[#3478F6]"
                    >
                      Save WorkReceipt
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setStage('confirm')}
                  className="flex min-h-[50px] w-full items-center justify-center gap-2 bg-[#FF8A45] px-5 text-sm font-bold text-[#0F2347] hover:bg-[#173B78] hover:text-white"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Review &amp; Confirm Details</span>
                </button>
              )}
            </div>
          </section>
        </div>
      </div>
    </WorkerLayout>
  );
};
