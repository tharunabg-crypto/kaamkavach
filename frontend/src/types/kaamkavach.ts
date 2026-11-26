export type UserRole = 'worker' | 'employer';

export type TradeCategoryId =
  | 'electrician'
  | 'plumber'
  | 'carpenter'
  | 'painter'
  | 'cleaner'
  | 'construction'
  | 'appliance'
  | 'other';

export interface TradeCategory {
  id: TradeCategoryId;
  label: string;
  shortLabel: string;
  description: string;
}

export type SkillVerificationStatus = 'verified' | 'self-declared';

export interface WorkerSkill {
  id: string;
  name: string;
  category: TradeCategoryId;
  status: SkillVerificationStatus;
  rubricCode?: string;
  score?: string;
  assessorNote?: string;
  evidenceDuration?: string;
}

export interface WorkerProfile {
  id: string;
  name: string;
  initials: string;
  profession: string;
  category: TradeCategoryId;
  location: string;
  city: string;
  experienceYears: number;
  passportId: string;
  phone: string;
  preferredLanguage: string;
  availableForWork: boolean;
  dailyRateExpectation: number;
  bio: string;
  reliabilityScore: string;
  notificationsEnabled: boolean;
  whatsappAlertsEnabled: boolean;
}

export type WorkJobStatus =
  | 'available'
  | 'applied'
  | 'accepted'
  | 'ongoing'
  | 'completed';

export interface JobOpportunity {
  id: string;
  title: string;
  category: TradeCategoryId;
  employerName: string;
  location: string;
  city: string;
  distanceKm: number;
  dailyRate: number;
  durationDays: number;
  description: string;
  requiredSkills: string[];
  workReceiptIncluded: boolean;
  scheduleTime: string;
  postedAgo: string;
  status: WorkJobStatus;
  startDate?: string;
}

export interface NewJobOpportunity {
  title: string;
  category: TradeCategoryId;
  employerName: string;
  location: string;
  city: string;
  dailyRate: number;
  durationDays: number;
  description: string;
  requiredSkills: string[];
  scheduleTime: string;
  startDate?: string;
}

export type PaymentStatus = 'Agreed' | 'Pending Payment' | 'Paid';

export interface WorkReceipt {
  id: string;
  receiptNo: string;
  employerName: string;
  workerName: string;
  workerPassportId: string;
  workDescription: string;
  location: string;
  dateRange: string;
  durationDays: number;
  dailyRate: number;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  workerConfirmed: boolean;
  employerConfirmed: boolean;
  createdVia: 'KaamVaani' | 'Employer Agreement' | 'Direct Record';
}

export interface DirectoryWorker {
  id: string;
  name: string;
  initials: string;
  profession: string;
  category: TradeCategoryId;
  location: string;
  distanceKm: number;
  passportId: string;
  experienceYears: number;
  dailyRate: number;
  availableForWork: boolean;
  completedJobs: number;
  reliabilityScore: string;
  skills: WorkerSkill[];
}

export interface EmployerProfile {
  id: string;
  contactName: string;
  companyName: string;
  city: string;
  location: string;
  phone: string;
  preferredLanguage: string;
  activeSitesCount: number;
}

export interface VoiceLanguageOption {
  id: string;
  label: string;
  nativeLabel: string;
  bcp47: string;
  promptPhrase: string;
  translation: string;
  parsedEmployer: string;
  parsedWork: string;
  parsedDays: number;
  parsedRate: number;
  ttsSummary: string;
}
