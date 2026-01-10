import fs from "fs";
import path from "path";
import type { University, UniversityCategory, RawUniversityData } from "./types";
import { UNIVERSITY_COORDINATES, getCampuses, type CampusCoordinate } from "./coordinates";

const DATA_DIR = path.join(process.cwd(), "data", "universities");

// Known telematic universities (by university_id)
const TELEMATIC_IDS = new Set([
  "unipegaso",
  "ecampus",
  "uninettuno",
  "mercatorum",
  "unicusano",
  "sanraffaele",
  "unifortunato",
  "iul",
  "unitelma",
  "unimarconi",
  "unidav",
]);

// Known special status universities (Scuole Superiori)
const SPECIAL_IDS = new Set([
  "sns",
  "santanna",
  "imtlucca",
  "sissa",
  "gssi",
  "iuss",
  "ssm",
  "casd",
]);

// Known private (non-statale) universities
const PRIVATE_IDS = new Set([
  "bocconi",
  "unicatt",
  "luiss",
  "lumsa",
  "iulm",
  "unicampus",
  "hunimed",
  "unisr",
  "lum",
  "liuc",
  "linkcampus",
  "uer",
  "unint",
  "unisob",
  "unicamillus",
  "unisg",
  "johncabot",
  "aur",
  "gregoriana",
  "salesiana",
]);

/**
 * Determines the category of a university based on its ID and name
 */
function determineCategory(id: string, name: string): UniversityCategory {
  const lowerId = id.toLowerCase();
  const lowerName = name.toLowerCase();

  if (TELEMATIC_IDS.has(lowerId) || lowerName.includes("telematica")) {
    return "telematica";
  }

  if (SPECIAL_IDS.has(lowerId) || lowerName.includes("scuola superiore")) {
    return "ordinamento_speciale";
  }

  if (PRIVATE_IDS.has(lowerId)) {
    return "non_statale";
  }

  // Default to statale for public universities
  if (
    lowerName.includes("università degli studi") ||
    lowerName.includes("politecnico") ||
    lowerId.startsWith("uni") ||
    lowerId.startsWith("poli")
  ) {
    return "statale";
  }

  return "other";
}

// Extended raw data type to handle both formats
interface RawDataFile {
  university?: RawUniversityData["university"];
  universities?: RawUniversityData["university"][];
  programs?: unknown[];
  admissions?: unknown[];
  metadata?: unknown;
}

/**
 * Extracts the university object from different JSON formats
 */
function extractUniversity(data: RawDataFile): RawUniversityData["university"] | null {
  // Format 1: Direct university object
  if (data.university) {
    return data.university;
  }

  // Format 2: Universities array (take first entry)
  if (data.universities && Array.isArray(data.universities) && data.universities.length > 0) {
    return data.universities[0];
  }

  return null;
}

/**
 * Validates required fields in the raw data
 */
function validateRecord(
  uni: RawUniversityData["university"] | null,
  filename: string
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!uni) {
    errors.push(`${filename}: Missing 'university' object or 'universities' array`);
    return { valid: false, errors };
  }

  if (!uni.name) {
    errors.push(`${filename}: Missing 'name' field`);
  }

  if (!uni.official_url) {
    errors.push(`${filename}: Missing 'official_url' field`);
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Creates University entries for each campus of a university
 */
function createUniversityEntries(
  universityId: string,
  uni: RawUniversityData["university"],
  category: UniversityCategory,
  filename: string,
  warnings: string[]
): University[] {
  const entries: University[] = [];
  const campuses = getCampuses(universityId);

  if (campuses.length === 0) {
    // No coordinates found - create single entry with needsCoordinates flag
    warnings.push(`${filename}: Missing coordinates for '${universityId}'`);
    entries.push({
      id: universityId,
      universityId: universityId,
      name: uni.name,
      category,
      officialUrl: uni.official_url,
      city: uni.city || undefined,
      region: undefined,
      lat: 0,
      lng: 0,
      sourceFile: filename,
      needsCoordinates: true,
      isMainCampus: true,
    });
    return entries;
  }

  // Create an entry for each campus
  campuses.forEach((campus: CampusCoordinate, index: number) => {
    const isMain = campus.isMain === true;
    const campusId = campuses.length > 1 ? `${universityId}_campus_${index}` : universityId;

    entries.push({
      id: campusId,
      universityId: universityId,
      name: uni.name,
      category,
      officialUrl: uni.official_url,
      city: campus.city || uni.city || undefined,
      region: campus.region || undefined,
      lat: campus.lat,
      lng: campus.lng,
      sourceFile: filename,
      needsCoordinates: campus.lat === 0 && campus.lng === 0,
      campusName: campus.campusName,
      isMainCampus: isMain,
    });
  });

  return entries;
}

/**
 * Loads all university JSON files and normalizes them
 * Multi-campus universities will have multiple entries (one per campus)
 */
export async function loadUniversities(): Promise<University[]> {
  const universities: University[] = [];
  const warnings: string[] = [];

  // Check if data directory exists
  if (!fs.existsSync(DATA_DIR)) {
    console.warn(`Data directory not found: ${DATA_DIR}`);
    return [];
  }

  // Read all JSON files from the data directory
  const files = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith("_data.json"));

  for (const filename of files) {
    const filePath = path.join(DATA_DIR, filename);

    try {
      const content = fs.readFileSync(filePath, "utf-8");
      const data: RawDataFile = JSON.parse(content);

      // Extract university from different JSON formats
      const uni = extractUniversity(data);

      // Validate the record
      const { valid, errors } = validateRecord(uni, filename);
      if (!valid) {
        warnings.push(...errors);
        continue;
      }

      // Extract university_id from filename (e.g., "unibo_data.json" -> "unibo")
      const universityId = filename.replace("_data.json", "");

      // Determine category
      const category = determineCategory(universityId, uni!.name);

      // Create entries for each campus
      const entries = createUniversityEntries(
        universityId,
        uni!,
        category,
        filename,
        warnings
      );

      universities.push(...entries);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      warnings.push(`${filename}: Failed to parse - ${message}`);
    }
  }

  // Log warnings to console (visible during build/development)
  if (warnings.length > 0) {
    console.warn("\n⚠️  University data warnings:");
    warnings.forEach((w) => console.warn(`  - ${w}`));
    console.warn("");
  }

  // Sort by university name (A-Z), then by main campus first
  universities.sort((a, b) => {
    const nameCompare = a.name.localeCompare(b.name, "it");
    if (nameCompare !== 0) return nameCompare;
    // Main campus comes first
    if (a.isMainCampus && !b.isMainCampus) return -1;
    if (!a.isMainCampus && b.isMainCampus) return 1;
    return 0;
  });

  return universities;
}

/**
 * Get statistics about the loaded universities
 * Counts unique universities (not campuses)
 */
export function getUniversityStats(universities: University[]) {
  // Count unique universities by universityId
  const uniqueUniversities = new Set(universities.map(u => u.universityId));
  const total = uniqueUniversities.size;

  const byCategory: Record<UniversityCategory, number> = {
    statale: 0,
    non_statale: 0,
    telematica: 0,
    ordinamento_speciale: 0,
    other: 0,
  };

  // Count categories based on main campuses only
  const mainCampuses = universities.filter(u => u.isMainCampus);
  const missingCoords = universities.filter((u) => u.needsCoordinates).length;
  const byRegion: Record<string, number> = {};

  for (const uni of mainCampuses) {
    byCategory[uni.category]++;
  }

  // Count all campuses by region
  for (const uni of universities) {
    if (uni.region) {
      byRegion[uni.region] = (byRegion[uni.region] || 0) + 1;
    }
  }

  return {
    total,
    totalCampuses: universities.length,
    byCategory,
    byRegion,
    missingCoords,
    withCoords: universities.length - missingCoords,
  };
}
