// University categories recognized by MUR (Ministry of University and Research)
export type UniversityCategory =
  | "statale"
  | "non_statale"
  | "telematica"
  | "ordinamento_speciale"
  | "other";

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
  programs?: unknown[];
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
