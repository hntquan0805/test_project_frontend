// API Response Types
interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export type ScoreApiResponse = ApiResponse<ScoreData>;
export type DistributionApiResponse = ApiResponse<SubjectData>;
export type Top10StudentApiResponse = ApiResponse<Top10StudentData[]>;
export type AllStudentsCountApiResponse = ApiResponse<number>;

export interface Top10StudentData {
  id: number;
  student_id: string;
  math: string;
  physics: string;
  chemistry: string;
  total: string;
}

export interface ScoreData {
  id: number;
  student_id: string;
  math: string | null;
  vietnamese: string | null;
  foreign_language: string | null;
  physics: string | null;
  chemistry: string | null;
  biology: string | null;
  history: string | null;
  geography: string | null;
  civic_education: string | null;
  language_code: string;
}

export interface Student {
  regNumber: string;
  scores: Record<string, number | null>;
  total?: number;
}

export interface SubjectData {
  [key: string]: ScoreDistribution;
}

export interface ScoreDistribution {
  total: number;
  excellent: number;
  good: number;
  average: number;
  poor: number;
}