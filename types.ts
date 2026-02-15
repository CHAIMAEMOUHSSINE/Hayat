
export type PriorityLevel = 'P1' | 'P2' | 'P3' | 'P4' | 'P5';
export type ViewState = 'landing' | 'dashboard' | 'about' | 'contact';

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  vitals: {
    hr: number;
    bp: string;
    spo2: number;
    temp: number;
    history?: { hr: number; spo2: number; time: string }[];
  };
  symptoms: string;
  priority: PriorityLevel;
  arrival_time: string;
  waitTimeSeconds: number;
  assignedDoctor: string | null;
  riskScore: number; // 0-100
  predictedWaitMinutes: number;
  shapValues: {
    feature: string;
    value: number;
  }[];
  explanation?: string;
  isHighRisk?: boolean;
}

export type Language = 'en' | 'fr' | 'ar' | 'dar' | 'ber';

export interface TranslationSet {
  title: string;
  tagline: string;
  hero_title: string;
  hero_subtitle: string;
  get_started: string;
  learn_more: string;
  intake: string;
  queue: string;
  analytics: string;
  patient_name: string;
  age: string;
  vitals: string;
  hr: string;
  bp: string;
  spo2: string;
  temp: string;
  symptoms: string;
  submit: string;
  waiting: string;
  priority_p1: string;
  priority_p2: string;
  priority_p3: string;
  priority_p4: string;
  priority_p5: string;
  explanation: string;
  impact_title: string;
  wait_time_reduction: string;
  critical_detection: string;
  burnout_reduction: string;
  data_driven_title: string;
  data_driven_desc: string;
}
