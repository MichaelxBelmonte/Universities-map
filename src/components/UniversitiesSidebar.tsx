"use client";

import { useMemo } from "react";
import type { University, FilterState, UniversityCategory } from "@/lib/types";
import { useTranslation } from "@/lib/i18n/LanguageContext";

interface UniversitiesSidebarProps {
  universities: University[];
  selectedId: string | null;
  filters: FilterState;
  onUniversityClick: (id: string) => void;
  onSearchChange: (search: string) => void;
  onCategoryToggle: (category: UniversityCategory) => void;
  onClearFilters: () => void;
  onClose: () => void;
  onViewPrograms?: (university: University) => void;
}

const ALL_CATEGORIES: UniversityCategory[] = [
  "statale",
  "non_statale",
  "telematica",
  "ordinamento_speciale",
  "other",
];

// Map categories to CSS variable names
const CATEGORY_VAR_MAP: Record<UniversityCategory, string> = {
  statale: "statale",
  non_statale: "non-statale",
  telematica: "telematica",
  ordinamento_speciale: "speciale",
  other: "other",
};

export default function UniversitiesSidebar({
  universities,
  selectedId,
  filters,
  onUniversityClick,
  onSearchChange,
  onCategoryToggle,
  onClearFilters,
  onClose,
  onViewPrograms,
}: UniversitiesSidebarProps) {
  const { t } = useTranslation();
  const hasActiveFilters = filters.search || filters.categories.length > 0;

  const categoryLabels: Record<UniversityCategory, string> = {
    statale: t("statale"),
    non_statale: t("nonStatale"),
    telematica: t("telematica"),
    ordinamento_speciale: t("speciale"),
    other: t("other"),
  };

  const sortedUniversities = useMemo(() => {
    return [...universities].sort((a, b) => a.name.localeCompare(b.name, "it"));
  }, [universities]);

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
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div
              className="w-1 h-4 rounded-full"
              style={{ background: "linear-gradient(to bottom, var(--accent-primary), var(--accent-secondary))" }}
            />
            <h2
              className="text-sm font-bold uppercase tracking-wider"
              style={{ color: "var(--text-primary)" }}
            >
              {t("sidebarTitle")}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="sm:hidden p-2 rounded-lg transition-colors"
            style={{ color: "var(--text-tertiary)" }}
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={filters.search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-lg pl-10 pr-10 py-2.5 text-sm font-mono transition-all focus:outline-none"
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
          {filters.search && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
              style={{ color: "var(--text-tertiary)" }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Category filters */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {ALL_CATEGORIES.map((category) => {
            const isActive = filters.categories.includes(category);
            const varName = CATEGORY_VAR_MAP[category];
            return (
              <button
                key={category}
                onClick={() => onCategoryToggle(category)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-mono uppercase tracking-wide transition-all duration-200 touch-manipulation"
                style={{
                  background: isActive ? `var(--cat-${varName}-bg)` : "var(--glass-bg)",
                  border: `1px solid ${isActive ? `var(--cat-${varName})` : "var(--border-secondary)"}`,
                  color: isActive ? `var(--cat-${varName})` : "var(--text-tertiary)",
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: `var(--cat-${varName})`,
                    opacity: isActive ? 1 : 0.5,
                    boxShadow: isActive ? `0 0 6px var(--cat-${varName}-glow)` : "none",
                  }}
                />
                {categoryLabels[category]}
              </button>
            );
          })}
        </div>

        {/* Clear filters */}
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="mt-3 text-[11px] transition-colors flex items-center gap-1 font-mono uppercase tracking-wide"
            style={{ color: "var(--accent-primary)" }}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear filters
          </button>
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
          Results
        </span>
        <span
          className="text-xs font-mono font-bold"
          style={{ color: "var(--accent-primary)" }}
        >
          {sortedUniversities.length}
        </span>
      </div>

      {/* University list */}
      <div className="flex-1 overflow-y-auto">
        {sortedUniversities.length === 0 ? (
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-xs font-mono" style={{ color: "var(--text-tertiary)" }}>
              {t("noResults")}
            </p>
            {hasActiveFilters && (
              <button
                onClick={onClearFilters}
                className="mt-2 text-xs font-mono transition-colors"
                style={{ color: "var(--accent-primary)" }}
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <ul>
            {sortedUniversities.map((uni) => {
              const isSelected = selectedId === uni.id;
              const varName = CATEGORY_VAR_MAP[uni.category];

              return (
                <li key={uni.id}>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => onUniversityClick(uni.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onUniversityClick(uni.id);
                      }
                    }}
                    className="w-full text-left px-4 py-3 transition-all duration-150 touch-manipulation cursor-pointer"
                    style={{
                      background: isSelected ? "var(--selected-bg)" : "transparent",
                      borderBottom: "1px solid var(--border-secondary)",
                      borderLeft: isSelected ? "2px solid var(--selected-border)" : "2px solid transparent",
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ background: `var(--cat-${varName})` }}
                          />
                          <h3
                            className="text-sm font-medium truncate"
                            style={{ color: isSelected ? "var(--accent-primary)" : "var(--text-primary)" }}
                          >
                            {uni.name}
                          </h3>
                        </div>
                        {uni.campusName && (
                          <p
                            className="text-[11px] mt-0.5 ml-3.5 truncate font-mono"
                            style={{ color: "var(--text-tertiary)" }}
                          >
                            {uni.campusName}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-1.5 ml-3.5">
                          <span
                            className="text-[10px] font-mono uppercase tracking-wide"
                            style={{ color: `var(--cat-${varName})` }}
                          >
                            {categoryLabels[uni.category]}
                          </span>
                          {uni.city && (
                            <>
                              <span style={{ color: "var(--text-muted)" }}>•</span>
                              <span
                                className="text-[10px] truncate font-mono"
                                style={{ color: "var(--text-tertiary)" }}
                              >
                                {uni.city}
                              </span>
                            </>
                          )}
                          {uni.programCount && uni.programCount > 0 && (
                            <>
                              <span style={{ color: "var(--text-muted)" }}>•</span>
                              <span
                                className="text-[10px] font-mono"
                                style={{ color: "var(--accent-primary)" }}
                              >
                                {uni.programCount} {t("programsCount")}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 flex-shrink-0">
                        {uni.programCount && uni.programCount > 0 && onViewPrograms && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onViewPrograms(uni);
                            }}
                            className="p-1.5 transition-colors rounded"
                            style={{ color: "var(--accent-primary)" }}
                            title={t("viewPrograms")}
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          </button>
                        )}
                        <a
                          href={uni.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 transition-colors rounded"
                          style={{ color: "var(--text-muted)" }}
                          title={t("openWebsite")}
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
