"use client";

import { useState, useMemo } from "react";
import type { Program, DegreeLevel } from "@/lib/types";
import { useTranslation, useLanguage } from "@/lib/i18n/LanguageContext";

interface ProgramsListProps {
  programs: Program[];
  universityName: string;
  onClose: () => void;
}

const DEGREE_LEVEL_ORDER: DegreeLevel[] = ["bachelor", "master", "ciclo_unico", "phd"];

// Map degree levels to CSS variable names for colors
const DEGREE_COLORS: Record<DegreeLevel, { var: string; label: string }> = {
  bachelor: { var: "statale", label: "bachelor" },
  master: { var: "non-statale", label: "master" },
  ciclo_unico: { var: "speciale", label: "cicloUnico" },
  phd: { var: "telematica", label: "phd" },
};

export default function ProgramsList({
  programs,
  universityName,
  onClose,
}: ProgramsListProps) {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [search, setSearch] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<DegreeLevel | "all">("all");
  const [selectedLanguage, setSelectedLanguage] = useState<string | "all">("all");

  // Helper to get the display name based on current language
  const getDisplayName = (program: Program): string => {
    if (language === "it") {
      // Prefer Italian name, fall back to original
      return program.programNameIt || program.programName;
    }
    // Prefer English name, fall back to original
    return program.programNameEn || program.programName;
  };

  // Get unique languages from programs
  const availableLanguages = useMemo(() => {
    const langs = new Set<string>();
    programs.forEach((p) => p.language.forEach((l) => langs.add(l)));
    return Array.from(langs).sort();
  }, [programs]);

  // Filter programs
  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      // Search filter - search in all language variants
      if (search) {
        const searchLower = search.toLowerCase();
        const matchesSearch =
          program.programName.toLowerCase().includes(searchLower) ||
          program.programNameEn?.toLowerCase().includes(searchLower) ||
          program.programNameIt?.toLowerCase().includes(searchLower) ||
          program.campusCity?.toLowerCase().includes(searchLower) ||
          program.classCode?.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Degree level filter
      if (selectedLevel !== "all" && program.degreeLevel !== selectedLevel) {
        return false;
      }

      // Language filter
      if (selectedLanguage !== "all" && !program.language.includes(selectedLanguage)) {
        return false;
      }

      return true;
    });
  }, [programs, search, selectedLevel, selectedLanguage]);

  // Group programs by degree level
  const groupedPrograms = useMemo(() => {
    const groups: Record<DegreeLevel, Program[]> = {
      bachelor: [],
      master: [],
      ciclo_unico: [],
      phd: [],
    };

    filteredPrograms.forEach((program) => {
      groups[program.degreeLevel].push(program);
    });

    // Sort programs within each group
    Object.values(groups).forEach((group) => {
      group.sort((a, b) => a.programName.localeCompare(b.programName));
    });

    return groups;
  }, [filteredPrograms]);

  // Count programs by degree level
  const levelCounts = useMemo(() => {
    const counts: Record<DegreeLevel, number> = {
      bachelor: 0,
      master: 0,
      ciclo_unico: 0,
      phd: 0,
    };
    programs.forEach((p) => counts[p.degreeLevel]++);
    return counts;
  }, [programs]);

  const degreeLevelLabels: Record<DegreeLevel, string> = {
    bachelor: t("bachelor"),
    master: t("master"),
    ciclo_unico: t("cicloUnico"),
    phd: t("phd"),
  };

  return (
    <div
      className="h-full flex flex-col w-full"
      style={{ background: "color-mix(in srgb, var(--bg-secondary) 95%, transparent)" }}
    >
      {/* Header */}
      <div
        className="p-4 flex-shrink-0"
        style={{ borderBottom: "1px solid var(--border-accent)" }}
      >
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-sm transition-colors"
            style={{ color: "var(--accent-primary)" }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t("backToList")}
          </button>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div
            className="w-1 h-4 rounded-full"
            style={{ background: "linear-gradient(to bottom, var(--accent-primary), var(--accent-secondary))" }}
          />
          <h2
            className="text-sm font-bold uppercase tracking-wider truncate"
            style={{ color: "var(--text-primary)" }}
          >
            {universityName}
          </h2>
        </div>

        <div
          className="text-xs font-mono mb-3"
          style={{ color: "var(--text-tertiary)" }}
        >
          <span style={{ color: "var(--accent-primary)" }}>{programs.length}</span>{" "}
          {t("programsCount")}
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <input
            type="text"
            placeholder={t("searchPrograms")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg pl-10 pr-10 py-2 text-sm font-mono transition-all focus:outline-none"
            style={{
              background: "var(--glass-bg)",
              border: "1px solid var(--border-primary)",
              color: "var(--text-primary)",
            }}
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: "var(--accent-primary)", opacity: 0.5 }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
              style={{ color: "var(--text-tertiary)" }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Degree level filters */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          <button
            onClick={() => setSelectedLevel("all")}
            className="px-2 py-1 rounded-md text-[10px] font-mono uppercase tracking-wide transition-all"
            style={{
              background: selectedLevel === "all" ? "var(--accent-primary-glow)" : "var(--glass-bg)",
              border: `1px solid ${selectedLevel === "all" ? "var(--accent-primary)" : "var(--border-secondary)"}`,
              color: selectedLevel === "all" ? "var(--accent-primary)" : "var(--text-tertiary)",
            }}
          >
            {t("allLevels")}
          </button>
          {DEGREE_LEVEL_ORDER.map((level) => {
            const isActive = selectedLevel === level;
            const colorVar = DEGREE_COLORS[level].var;
            const count = levelCounts[level];
            if (count === 0) return null;

            return (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-mono uppercase tracking-wide transition-all"
                style={{
                  background: isActive ? `var(--cat-${colorVar}-bg)` : "var(--glass-bg)",
                  border: `1px solid ${isActive ? `var(--cat-${colorVar})` : "var(--border-secondary)"}`,
                  color: isActive ? `var(--cat-${colorVar})` : "var(--text-tertiary)",
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: `var(--cat-${colorVar})`,
                    opacity: isActive ? 1 : 0.5,
                  }}
                />
                {degreeLevelLabels[level]}
                <span style={{ opacity: 0.7 }}>({count})</span>
              </button>
            );
          })}
        </div>

        {/* Language filters */}
        {availableLanguages.length > 1 && (
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedLanguage("all")}
              className="px-2 py-1 rounded-md text-[10px] font-mono uppercase tracking-wide transition-all"
              style={{
                background: selectedLanguage === "all" ? "var(--glass-bg-hover)" : "var(--glass-bg)",
                border: `1px solid ${selectedLanguage === "all" ? "var(--border-accent)" : "var(--border-secondary)"}`,
                color: selectedLanguage === "all" ? "var(--text-primary)" : "var(--text-tertiary)",
              }}
            >
              {t("allLanguages")}
            </button>
            {availableLanguages.map((lang) => {
              const isActive = selectedLanguage === lang;
              return (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className="px-2 py-1 rounded-md text-[10px] font-mono uppercase tracking-wide transition-all"
                  style={{
                    background: isActive ? "var(--glass-bg-hover)" : "var(--glass-bg)",
                    border: `1px solid ${isActive ? "var(--border-accent)" : "var(--border-secondary)"}`,
                    color: isActive ? "var(--text-primary)" : "var(--text-tertiary)",
                  }}
                >
                  {lang === "Italian" ? "IT" : lang === "English" ? "EN" : lang}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Results count */}
      <div
        className="px-4 py-2 flex-shrink-0 flex items-center justify-between"
        style={{ borderBottom: "1px solid var(--border-secondary)" }}
      >
        <span
          className="text-[11px] font-mono uppercase tracking-wide"
          style={{ color: "var(--text-tertiary)" }}
        >
          {t("results")}
        </span>
        <span
          className="text-xs font-mono font-bold"
          style={{ color: "var(--accent-primary)" }}
        >
          {filteredPrograms.length}
        </span>
      </div>

      {/* Programs list */}
      <div className="flex-1 overflow-y-auto">
        {filteredPrograms.length === 0 ? (
          <div className="p-8 text-center">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3"
              style={{
                background: "var(--glass-bg)",
                border: "1px solid var(--border-secondary)",
              }}
            >
              <svg
                className="w-6 h-6"
                style={{ color: "var(--text-muted)" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <p className="text-xs font-mono" style={{ color: "var(--text-tertiary)" }}>
              {t("noProgramsMatch")}
            </p>
          </div>
        ) : (
          <div>
            {DEGREE_LEVEL_ORDER.map((level) => {
              const levelPrograms = groupedPrograms[level];
              if (levelPrograms.length === 0) return null;

              const colorVar = DEGREE_COLORS[level].var;

              return (
                <div key={level}>
                  {/* Level header */}
                  <div
                    className="sticky top-0 px-4 py-2 flex items-center gap-2"
                    style={{
                      background: "color-mix(in srgb, var(--bg-secondary) 98%, transparent)",
                      borderBottom: "1px solid var(--border-secondary)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: `var(--cat-${colorVar})` }}
                    />
                    <span
                      className="text-[11px] font-mono font-bold uppercase tracking-wide"
                      style={{ color: `var(--cat-${colorVar})` }}
                    >
                      {degreeLevelLabels[level]}
                    </span>
                    <span
                      className="text-[10px] font-mono"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      ({levelPrograms.length})
                    </span>
                  </div>

                  {/* Programs */}
                  <ul>
                    {levelPrograms.map((program) => (
                      <li key={program.id}>
                        <div
                          className="px-4 py-3 transition-all"
                          style={{ borderBottom: "1px solid var(--border-secondary)" }}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <h4
                                className="text-sm font-medium"
                                style={{ color: "var(--text-primary)" }}
                              >
                                {getDisplayName(program)}
                              </h4>

                              <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-1.5">
                                {/* Duration */}
                                <span
                                  className="text-[10px] font-mono"
                                  style={{ color: "var(--text-tertiary)" }}
                                >
                                  {program.durationYears} {program.durationYears === 1 ? t("year") : t("years")}
                                </span>

                                {/* ECTS */}
                                {program.ectsTotal && (
                                  <span
                                    className="text-[10px] font-mono"
                                    style={{ color: "var(--text-tertiary)" }}
                                  >
                                    {program.ectsTotal} {t("ects")}
                                  </span>
                                )}

                                {/* Campus */}
                                {program.campusCity && (
                                  <span
                                    className="text-[10px] font-mono"
                                    style={{ color: "var(--text-tertiary)" }}
                                  >
                                    {program.campusCity}
                                  </span>
                                )}

                                {/* Class code */}
                                {program.classCode && (
                                  <span
                                    className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                                    style={{
                                      background: "var(--glass-bg)",
                                      color: "var(--text-tertiary)",
                                    }}
                                  >
                                    {program.classCode}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Language badges */}
                            <div className="flex flex-col gap-1 flex-shrink-0">
                              {program.language.map((lang) => (
                                <span
                                  key={lang}
                                  className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase"
                                  style={{
                                    background: lang === "English" ? "var(--cat-telematica-bg)" : "var(--glass-bg)",
                                    color: lang === "English" ? "var(--cat-telematica)" : "var(--text-tertiary)",
                                    border: `1px solid ${lang === "English" ? "var(--cat-telematica)" : "var(--border-secondary)"}`,
                                  }}
                                >
                                  {lang === "Italian" ? "IT" : lang === "English" ? "EN" : lang}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
