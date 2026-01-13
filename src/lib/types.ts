// University categories recognized by MUR (Ministry of University and Research)
export type UniversityCategory =
  | "statale"
  | "non_statale"
  | "telematica"
  | "ordinamento_speciale"
  | "other";

// Degree levels for programs
export type DegreeLevel = "bachelor" | "master" | "ciclo_unico" | "phd";

// Program/Course offered by a university
export interface Program {
  id: string; // Generated: university_id + program_name hash
  universityId: string;
  programName: string; // Original name from data
  programNameEn?: string; // English name
  programNameIt?: string; // Italian name
  degreeLevel: DegreeLevel;
  classCode?: string; // e.g., "L-9", "LM-32"
  language: string[]; // e.g., ["Italian"], ["English"], ["Italian", "English"]
  campusCity?: string;
  durationYears: number;
  ectsTotal?: number;
  department?: string;
  sourceUrl?: string;
  notes?: string;
}

export interface University {
  id: string;
  name: string;
  category: UniversityCategory;
  officialUrl: string;
  city?: string;
  region?: string;
  lat: number;
  lng: number;
  sourceFile?: string;
  needsCoordinates?: boolean;
  // Multi-campus support
  campusName?: string; // e.g., "Sede di Pescara", "Campus Bovisa"
  isMainCampus?: boolean;
  universityId: string; // Original university ID (same for all campuses)
  // Programs
  programs?: Program[];
  programCount?: number;
}

// Raw program structure from JSON files
export interface RawProgram {
  type: string;
  university_id: string;
  degree_level: string;
  program_name: string;
  program_name_en?: string; // English name
  program_name_it?: string; // Italian name
  class_code?: string;
  language: string[];
  campus_city?: string;
  duration_years: number;
  ects_total?: number;
  department?: string;
  source_url?: string;
  last_checked?: string;
  confidence?: number;
  notes?: string;
}

// Raw JSON structure from data files
export interface RawUniversityData {
  university: {
    type: string;
    university_id: string;
    name: string;
    official_url: string;
    country?: string;
    city?: string;
    campuses?: Array<{
      city: string;
      address?: string;
      notes?: string;
    }>;
    languages_offered?: string[];
    contacts?: {
      email?: string;
      phone?: string;
      address?: string;
    };
    source_url?: string;
    last_checked?: string;
    confidence?: number;
    notes?: string;
  };
  programs?: RawProgram[];
  admissions?: unknown[];
}

// Coordinates mapping entry
export interface CoordinateEntry {
  lat: number;
  lng: number;
  city?: string;
  region?: string;
}

// Filter state for the sidebar
export interface FilterState {
  search: string;
  categories: UniversityCategory[];
  // Program filters
  degreeLevels: DegreeLevel[];
  programLanguages: string[]; // "Italian", "English"
  programSearch: string;
}

// Category display configuration
export const CATEGORY_CONFIG: Record<
  UniversityCategory,
  { label: string; color: string; bgColor: string }
> = {
  statale: {
    label: "Statale",
    color: "text-blue-800",
    bgColor: "bg-blue-100",
  },
  non_statale: {
    label: "Non Statale",
    color: "text-purple-800",
    bgColor: "bg-purple-100",
  },
  telematica: {
    label: "Telematica",
    color: "text-green-800",
    bgColor: "bg-green-100",
  },
  ordinamento_speciale: {
    label: "Ordinamento Speciale",
    color: "text-amber-800",
    bgColor: "bg-amber-100",
  },
  other: {
    label: "Altro",
    color: "text-gray-800",
    bgColor: "bg-gray-100",
  },
};
