import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type {
  UserRole,
  WorkerProfile,
  WorkerSkill,
  WorkReceipt,
  WorkJobStatus,
  EmployerProfile,
  PaymentStatus,
  TradeCategoryId,
} from '../types/kaamkavach';
import {
  getInitialPersistedState,
  savePersistedState,
  clearPersistedState,
  type PersistedAppState,
} from '../services/kaamkavachService';

interface AppStateContextValue extends PersistedAppState {
  setActiveRole: (role: UserRole) => void;
  toggleWorkerAvailability: () => void;
  updateWorkerProfile: (updates: Partial<WorkerProfile>) => void;
  addSelfDeclaredSkill: (name: string, category: TradeCategoryId) => void;
  updateJobStatus: (jobId: string, status: WorkJobStatus) => void;
  createWorkReceipt: (input: {
    employerName: string;
    workerName: string;
    workerPassportId: string;
    workDescription: string;
    location: string;
    durationDays: number;
    dailyRate: number;
    createdVia: WorkReceipt['createdVia'];
    workerConfirmed: boolean;
    employerConfirmed: boolean;
  }) => WorkReceipt;
  confirmWorkReceiptSide: (receiptId: string, side: 'worker' | 'employer') => void;
  updateReceiptPaymentStatus: (receiptId: string, status: PaymentStatus) => void;
  updateEmployerProfile: (updates: Partial<EmployerProfile>) => void;
  completeOnboarding: (payload: {
    role: UserRole;
    name: string;
    city: string;
    language: string;
    phone: string;
    tradeOrCompany: string;
    category?: TradeCategoryId;
    experienceYears?: number;
  }) => void;
  resetSession: () => void;
}

const AppStateContext = createContext<AppStateContextValue | null>(null);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<PersistedAppState>(() =>
    getInitialPersistedState()
  );

  useEffect(() => {
    savePersistedState(state);
  }, [state]);

  const setActiveRole = useCallback((role: UserRole) => {
    setState((prev) => ({ ...prev, activeRole: role }));
  }, []);

  const toggleWorkerAvailability = useCallback(() => {
    setState((prev) => ({
      ...prev,
      workerProfile: {
        ...prev.workerProfile,
        availableForWork: !prev.workerProfile.availableForWork,
      },
    }));
  }, []);

  const updateWorkerProfile = useCallback((updates: Partial<WorkerProfile>) => {
    setState((prev) => ({
      ...prev,
      workerProfile: { ...prev.workerProfile, ...updates },
    }));
  }, []);

  const addSelfDeclaredSkill = useCallback(
    (name: string, category: TradeCategoryId) => {
      const trimmed = name.trim();
      if (!trimmed) return;
      const newSkill: WorkerSkill = {
        id: `sk-${Date.now()}`,
        name: trimmed,
        category,
        status: 'self-declared',
      };
      setState((prev) => ({
        ...prev,
        workerSkills: [...prev.workerSkills, newSkill],
      }));
    },
    []
  );

  const updateJobStatus = useCallback(
    (jobId: string, status: WorkJobStatus) => {
      setState((prev) => ({
        ...prev,
        jobs: prev.jobs.map((job) =>
          job.id === jobId ? { ...job, status } : job
        ),
      }));
    },
    []
  );

  const createWorkReceipt = useCallback(
    (input: {
      employerName: string;
      workerName: string;
      workerPassportId: string;
      workDescription: string;
      location: string;
      durationDays: number;
      dailyRate: number;
      createdVia: WorkReceipt['createdVia'];
      workerConfirmed: boolean;
      employerConfirmed: boolean;
    }): WorkReceipt => {
      const cleanDays = Math.max(1, Math.round(input.durationDays));
      const cleanRate = Math.max(0, Math.round(input.dailyRate));
      const created: WorkReceipt = {
        id: `wr-${Date.now()}`,
        receiptNo: `WR-2026-${Math.floor(1000 + Math.random() * 8999)}`,
        employerName: input.employerName.trim() || 'Employer',
        workerName: input.workerName.trim() || 'Worker',
        workerPassportId: input.workerPassportId,
        workDescription: input.workDescription.trim() || 'Skilled Trade Work',
        location: input.location.trim() || 'Pune',
        dateRange: 'Recorded Today',
        durationDays: cleanDays,
        dailyRate: cleanRate,
        totalAmount: cleanDays * cleanRate,
        paymentStatus: 'Agreed',
        workerConfirmed: input.workerConfirmed,
        employerConfirmed: input.employerConfirmed,
        createdVia: input.createdVia,
      };
      setState((prev) => ({
        ...prev,
        workReceipts: [created, ...prev.workReceipts],
      }));
      return created;
    },
    []
  );

  const confirmWorkReceiptSide = useCallback(
    (receiptId: string, side: 'worker' | 'employer') => {
      setState((prev) => ({
        ...prev,
        workReceipts: prev.workReceipts.map((rec) => {
          if (rec.id !== receiptId) return rec;
          return side === 'worker'
            ? { ...rec, workerConfirmed: true }
            : { ...rec, employerConfirmed: true };
        }),
      }));
    },
    []
  );

  const updateReceiptPaymentStatus = useCallback(
    (receiptId: string, paymentStatus: PaymentStatus) => {
      setState((prev) => ({
        ...prev,
        workReceipts: prev.workReceipts.map((rec) =>
          rec.id === receiptId ? { ...rec, paymentStatus } : rec
        ),
      }));
    },
    []
  );

  const updateEmployerProfile = useCallback(
    (updates: Partial<EmployerProfile>) => {
      setState((prev) => ({
        ...prev,
        employerProfile: { ...prev.employerProfile, ...updates },
      }));
    },
    []
  );

  const completeOnboarding = useCallback(
    (payload: {
      role: UserRole;
      name: string;
      city: string;
      language: string;
      phone: string;
      tradeOrCompany: string;
      category?: TradeCategoryId;
      experienceYears?: number;
    }) => {
      const cleanName = payload.name.trim();
      const initials = cleanName
        ? cleanName
            .split(/\s+/)
            .slice(0, 2)
            .map((p) => p[0]?.toUpperCase() ?? '')
            .join('')
        : 'KK';

      setState((prev) => {
        if (payload.role === 'worker') {
          return {
            ...prev,
            activeRole: 'worker',
            onboarded: true,
            workerProfile: {
              ...prev.workerProfile,
              name: cleanName || prev.workerProfile.name,
              initials: initials || prev.workerProfile.initials,
              city: payload.city.trim() || prev.workerProfile.city,
              location: payload.city.trim() || prev.workerProfile.location,
              preferredLanguage: payload.language,
              phone: payload.phone.trim() || prev.workerProfile.phone,
              profession:
                payload.tradeOrCompany.trim() || prev.workerProfile.profession,
              category: payload.category ?? prev.workerProfile.category,
              experienceYears:
                payload.experienceYears ?? prev.workerProfile.experienceYears,
            },
          };
        }
        return {
          ...prev,
          activeRole: 'employer',
          onboarded: true,
          employerProfile: {
            ...prev.employerProfile,
            contactName: cleanName || prev.employerProfile.contactName,
            companyName:
              payload.tradeOrCompany.trim() || prev.employerProfile.companyName,
            city: payload.city.trim() || prev.employerProfile.city,
            location: payload.city.trim() || prev.employerProfile.location,
            preferredLanguage: payload.language,
            phone: payload.phone.trim() || prev.employerProfile.phone,
          },
        };
      });
    },
    []
  );

  const resetSession = useCallback(() => {
    clearPersistedState();
    setState(getInitialPersistedState());
  }, []);

  return (
    <AppStateContext.Provider
      value={{
        ...state,
        setActiveRole,
        toggleWorkerAvailability,
        updateWorkerProfile,
        addSelfDeclaredSkill,
        updateJobStatus,
        createWorkReceipt,
        confirmWorkReceiptSide,
        updateReceiptPaymentStatus,
        updateEmployerProfile,
        completeOnboarding,
        resetSession,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export function useAppState(): AppStateContextValue {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error('useAppState must be used inside AppStateProvider');
  }
  return ctx;
}
