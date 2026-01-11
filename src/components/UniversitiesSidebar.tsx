"use client";

import { useMemo } from "react";
import type { University, FilterState, UniversityCategory } from "@/lib/types";
import { CATEGORY_CONFIG } from "@/lib/types";
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

const BADGE_CLASSES: Record<UniversityCategory, string> = {
  statale: "badge-statale",
  non_statale: "badge-non-statale",
  telematica: "badge-telematica",
  ordinamento_speciale: "badge-speciale",
  other: "badge-other",
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

  // Category labels from translations
  const categoryLabels: Record<UniversityCategory, string> = {
    statale: t("statale"),
    non_statale: t("nonStatale"),
    telematica: t("telematica"),
    ordinamento_speciale: t("speciale"),
    other: t("other"),
  };

  // Sort universities alphabetically by name
  const sortedUniversities = useMemo(() => {
    return [...universities].sort((a, b) => a.name.localeCompare(b.name, "it"));
  }, [universities]);

  return (
    <div className="h-full flex flex-col w-full">
      {/* Header with close button */}
      <div className="p-3 sm:p-5 border-b border-white/5 flex-shrink-0">
        <div className="flex items-center justify-between mb-3 sm:mb-5">
          <h2 className="text-base sm:text-lg font-semibold text-white tracking-tight">{t("sidebarTitle")}</h2>
          <button
            onClick={onClose}
            className="sm:hidden p-2.5 hover:bg-white/5 rounded-xl transition-colors active:scale-95"
            aria-label="Close sidebar"
          >
            <svg
              className="w-5 h-5 text-white/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Search input */}
        <div className="relative">
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={filters.search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="glass-input w-full pl-10 sm:pl-11 pr-10 py-2.5 sm:py-3 text-sm"
          />
          <svg
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {filters.search && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors p-1 active:scale-95"
              aria-label="Clear search"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Category filters */}
        <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2">
          {ALL_CATEGORIES.map((category) => {
            const isActive = filters.categories.includes(category);
            return (
              <button
                key={category}
                onClick={() => onCategoryToggle(category)}
                className={`
                  px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200
                  active:scale-95 touch-manipulation
                  ${isActive ? BADGE_CLASSES[category] : "filter-pill"}
                `}
              >
                {categoryLabels[category]}
              </button>
            );
          })}
        </div>

        {/* Clear filters */}
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="mt-3 sm:mt-4 text-xs sm:text-sm text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5 active:scale-95 touch-manipulation"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            {t("clearFilters")}
          </button>
        )}
      </div>

      {/* Results count */}
      <div className="px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm text-white/40 border-b border-white/5 flex-shrink-0">
        <span className="text-white/70 font-medium">{sortedUniversities.length}</span>{" "}
        {sortedUniversities.length === 1 ? t("result") : t("results")}
      </div>

      {/* University list */}
      <div className="flex-1 overflow-y-auto">
        {sortedUniversities.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-white/20"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-white/50 text-sm">{t("noResults")}</p>
            {hasActiveFilters && (
              <button
                onClick={onClearFilters}
                className="mt-3 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                {t("clearFilters")}
              </button>
            )}
          </div>
        ) : (
          <ul>
            {sortedUniversities.map((uni, index) => {
              const isSelected = selectedId === uni.id;

              return (
                <li
                  key={uni.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${Math.min(index * 20, 200)}ms` }}
                >
                  <button
                    onClick={() => onUniversityClick(uni.id)}
                    className={`
                      w-full text-left px-3 sm:px-5 py-3 sm:py-4 transition-all duration-200
                      touch-manipulation active:scale-[0.99]
                      ${isSelected ? "uni-list-item selected" : "uni-list-item"}
                    `}
                  >
                    <div className="flex items-start justify-between gap-2 sm:gap-3">
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`text-xs sm:text-sm font-medium truncate ${
                            isSelected ? "text-cyan-400" : "text-white/90"
                          }`}
                        >
                          {uni.name}
                        </h3>
                        {uni.campusName && (
                          <p className="text-[10px] sm:text-xs text-white/40 mt-0.5 truncate">
                            {uni.campusName}
                          </p>
                        )}
                        <div className="flex items-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-2">
                          <span
                            className={`inline-flex px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-medium ${BADGE_CLASSES[uni.category]}`}
                          >
                            {categoryLabels[uni.category]}
                          </span>
                          {uni.city && (
                            <span className="text-[10px] sm:text-xs text-white/30 truncate">
                              {uni.city}
                            </span>
                          )}
                        </div>
                        {uni.needsCoordinates && (
                          <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-amber-400/80 mt-1.5 sm:mt-2">
                            <svg
                              className="w-2.5 sm:w-3 h-2.5 sm:h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                              />
                            </svg>
                            {t("missingCoordinates")}
                          </span>
                        )}
                      </div>
                      <a
                        href={uni.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-shrink-0 p-2 sm:p-2 text-white/20 hover:text-cyan-400 transition-colors rounded-lg hover:bg-white/5 touch-manipulation active:scale-95"
                        title="Open official website"
                        aria-label="Open university website"
                      >
                        <svg
                          className="w-3.5 sm:w-4 h-3.5 sm:h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
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
