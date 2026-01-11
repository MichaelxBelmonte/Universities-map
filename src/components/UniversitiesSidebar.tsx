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
}

const ALL_CATEGORIES: UniversityCategory[] = [
  "statale",
  "non_statale",
  "telematica",
  "ordinamento_speciale",
  "other",
];

const CATEGORY_COLORS: Record<UniversityCategory, string> = {
  statale: "bg-blue-400",
  non_statale: "bg-purple-400",
  telematica: "bg-emerald-400",
  ordinamento_speciale: "bg-amber-400",
  other: "bg-gray-400",
};

const CATEGORY_TEXT_COLORS: Record<UniversityCategory, string> = {
  statale: "text-blue-400",
  non_statale: "text-purple-400",
  telematica: "text-emerald-400",
  ordinamento_speciale: "text-amber-400",
  other: "text-gray-400",
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
    <div className="h-full flex flex-col w-full bg-[#0a0e17]/95">
      {/* Header */}
      <div className="p-4 border-b border-cyan-500/10 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              {t("sidebarTitle")}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="sm:hidden p-2 hover:bg-white/5 rounded-lg transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg pl-10 pr-10 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/40 focus:bg-white/[0.05] transition-all font-mono"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-500/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {filters.search && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
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
            return (
              <button
                key={category}
                onClick={() => onCategoryToggle(category)}
                className={`
                  flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-mono uppercase tracking-wide
                  transition-all duration-200 touch-manipulation
                  ${isActive
                    ? `bg-white/10 border border-white/20 ${CATEGORY_TEXT_COLORS[category]}`
                    : "bg-white/[0.02] border border-white/[0.06] text-white/40 hover:bg-white/[0.05] hover:text-white/60"
                  }
                `}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${CATEGORY_COLORS[category]} ${isActive ? "shadow-sm" : "opacity-50"}`} />
                {categoryLabels[category]}
              </button>
            );
          })}
        </div>

        {/* Clear filters */}
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="mt-3 text-[11px] text-cyan-400/80 hover:text-cyan-400 transition-colors flex items-center gap-1 font-mono uppercase tracking-wide"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear filters
          </button>
        )}
      </div>

      {/* Results count */}
      <div className="px-4 py-2 border-b border-white/[0.04] flex-shrink-0 flex items-center justify-between">
        <span className="text-[11px] text-white/40 font-mono uppercase tracking-wide">
          Results
        </span>
        <span className="text-xs font-mono text-cyan-400 font-bold">
          {sortedUniversities.length}
        </span>
      </div>

      {/* University list */}
      <div className="flex-1 overflow-y-auto">
        {sortedUniversities.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-12 h-12 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-white/40 text-xs font-mono">{t("noResults")}</p>
            {hasActiveFilters && (
              <button
                onClick={onClearFilters}
                className="mt-2 text-xs text-cyan-400 hover:text-cyan-300 transition-colors font-mono"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <ul>
            {sortedUniversities.map((uni, index) => {
              const isSelected = selectedId === uni.id;

              return (
                <li key={uni.id}>
                  <button
                    onClick={() => onUniversityClick(uni.id)}
                    className={`
                      w-full text-left px-4 py-3 transition-all duration-150
                      touch-manipulation border-b border-white/[0.04]
                      ${isSelected
                        ? "bg-cyan-500/10 border-l-2 border-l-cyan-400"
                        : "hover:bg-white/[0.03] border-l-2 border-l-transparent"
                      }
                    `}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${CATEGORY_COLORS[uni.category]} flex-shrink-0`} />
                          <h3 className={`text-sm font-medium truncate ${isSelected ? "text-cyan-400" : "text-white/90"}`}>
                            {uni.name}
                          </h3>
                        </div>
                        {uni.campusName && (
                          <p className="text-[11px] text-white/30 mt-0.5 ml-3.5 truncate font-mono">
                            {uni.campusName}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-1.5 ml-3.5">
                          <span className={`text-[10px] font-mono uppercase tracking-wide ${CATEGORY_TEXT_COLORS[uni.category]}`}>
                            {categoryLabels[uni.category]}
                          </span>
                          {uni.city && (
                            <>
                              <span className="text-white/20">•</span>
                              <span className="text-[10px] text-white/30 truncate font-mono">
                                {uni.city}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <a
                        href={uni.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-shrink-0 p-1.5 text-white/20 hover:text-cyan-400 transition-colors rounded hover:bg-white/5"
                        title="Open website"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
