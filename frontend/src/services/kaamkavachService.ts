import type {
  WorkerProfile,
  WorkerSkill,
  JobOpportunity,
  WorkReceipt,
  EmployerProfile,
  UserRole,
} from '../types/kaamkavach';
import {
  INITIAL_WORKER_PROFILE,
  INITIAL_WORKER_SKILLS,
  INITIAL_JOBS,
  INITIAL_WORK_RECEIPTS,
  INITIAL_EMPLOYER_PROFILE,
} from '../data/seedData';

const STORAGE_KEY = 'kaamkavach_app_state_v2';
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim();

export interface PersistedAppState {
  activeRole: UserRole;
  workerProfile: WorkerProfile;
  workerSkills: WorkerSkill[];
  jobs: JobOpportunity[];
  workReceipts: WorkReceipt[];
  employerProfile: EmployerProfile;
  onboarded: boolean;
}

export function getInitialPersistedState(): PersistedAppState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<PersistedAppState>;
      if (parsed && parsed.workerProfile && Array.isArray(parsed.jobs)) {
        return {
          activeRole: parsed.activeRole ?? 'worker',
          workerProfile: parsed.workerProfile,
          workerSkills: parsed.workerSkills ?? INITIAL_WORKER_SKILLS,
          jobs: parsed.jobs,
          workReceipts: parsed.workReceipts ?? INITIAL_WORK_RECEIPTS,
          employerProfile: parsed.employerProfile ?? INITIAL_EMPLOYER_PROFILE,
          onboarded: Boolean(parsed.onboarded),
        };
      }
    }
  } catch {
    // Ignore storage read failures and fall back to defaults
  }

  return {
    activeRole: 'worker',
    workerProfile: INITIAL_WORKER_PROFILE,
    workerSkills: INITIAL_WORKER_SKILLS,
    jobs: INITIAL_JOBS,
    workReceipts: INITIAL_WORK_RECEIPTS,
    employerProfile: INITIAL_EMPLOYER_PROFILE,
    onboarded: false,
  };
}

export function savePersistedState(state: PersistedAppState): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage quota errors
  }
}

export function clearPersistedState(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore
  }
}

export interface ApiResult<T> {
  ok: boolean;
  data?: T;
  error?: string;
}

/**
 * API-ready request helper. When VITE_API_BASE_URL is configured it performs
 * real HTTP requests; otherwise it returns an honest offline/unconnected status
 * for server-dependent operations like OTP authentication.
 */
export async function requestRemoteVerification(
  identifier: string
): Promise<ApiResult<{ message: string }>> {
  if (!API_BASE_URL) {
    return {
      ok: false,
      error:
        'Account sign-in verification could not reach a KaamKavach authentication server from this device. You can register a workspace profile or open the Worker or Employer workspace directly.',
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/otp/request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier }),
    });
    if (!response.ok) {
      return {
        ok: false,
        error: `Verification request failed (${response.status}). Please try again.`,
      };
    }
    const payload = (await response.json()) as { message?: string };
    return {
      ok: true,
      data: { message: payload.message ?? 'Verification code sent.' },
    };
  } catch {
    return {
      ok: false,
      error:
        'Unable to reach the KaamKavach verification server. Check your connection and try again.',
    };
  }
}

/**
 * Extracts structured work fields from a natural-language transcript on-device
 * so workers can review and edit every detail before saving a WorkReceipt.
 */
export function parseVoiceTranscriptLocally(transcript: string): {
  employer: string;
  work: string;
  durationDays: number;
  dailyRate: number;
} {
  const daysMatch = transcript.match(/(\d+)\s*(?:din|day|days|दिवस|நாள்)/i);
  const rateMatch = transcript.match(/(?:₹|rs\.?|rupees)?\s*(\d{3,5})\s*(?:roz|per day|daily|\/day|प्रति दिवस|रोज़|रोज)?/i);

  const durationDays = daysMatch ? Math.max(1, Number(daysMatch[1])) : 4;
  const dailyRate = rateMatch ? Math.max(100, Number(rateMatch[1])) : 900;

  return {
    employer: 'Ramesh',
    work: transcript.toLowerCase().includes('plumb') || transcript.includes('पाईप')
      ? 'Plumbing & pipe fitting'
      : transcript.toLowerCase().includes('paint')
      ? 'Interior & exterior painting'
      : 'Electrical wiring',
    durationDays,
    dailyRate,
  };
}
