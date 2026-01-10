"use client";

import { useState, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import type { University, FilterState, UniversityCategory } from "@/lib/types";
import { useTranslation, useLanguage } from "@/lib/i18n/LanguageContext";
import UniversitiesSidebar from "./UniversitiesSidebar";

// Loading component that uses translations
function MapLoader() {
  const { t } = useTranslation();
  return (
    <div className="w-full h-full flex items-center justify-center bg-yl-dark">
      <div className="text-center">
        <div className="spinner-glow mx-auto mb-4"></div>
        <p className="text-white/50 text-sm">{t("loadingMap")}</p>
      </div>
    </div>
  );
}

// Dynamically import the map component to avoid SSR issues with Leaflet
const UniversitiesMap = dynamic(() => import("./UniversitiesMap"), {
  ssr: false,
  loading: () => <MapLoader />,
});

interface UniversitiesClientProps {
  universities: University[];
}

export default function UniversitiesClient({
  universities,
}: UniversitiesClientProps) {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    categories: [],
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Reference to map control functions
  const mapRef = useRef<{
    focusOnUniversity: (id: string) => void;
  } | null>(null);

  // Filter universities based on search and category filters
  const filteredUniversities = universities.filter((uni) => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        uni.name.toLowerCase().includes(searchLower) ||
        uni.city?.toLowerCase().includes(searchLower) ||
        uni.region?.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    // Category filter
    if (filters.categories.length > 0) {
      if (!filters.categories.includes(uni.category)) return false;
    }

    return true;
  });

  // Universities with valid coordinates for the map
  const mappableUniversities = filteredUniversities.filter(
    (uni) => !uni.needsCoordinates
  );

  // Handle clicking on a university in the sidebar
  const handleUniversityClick = useCallback((id: string) => {
    setSelectedId(id);
    mapRef.current?.focusOnUniversity(id);
  }, []);

  // Handle filter changes
  const handleSearchChange = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  }, []);

  const handleCategoryToggle = useCallback((category: UniversityCategory) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({ search: "", categories: [] });
  }, []);

  return (
    <div className="flex h-full relative">
      {/* Sidebar */}
      <div
        className={`
          ${sidebarOpen ? "w-full sm:w-[400px]" : "w-0"}
          transition-all duration-300 ease-in-out
          absolute sm:relative z-20 h-full
          glass-panel-elevated
          overflow-hidden
        `}
      >
        <UniversitiesSidebar
          universities={filteredUniversities}
          selectedId={selectedId}
          filters={filters}
          onUniversityClick={handleUniversityClick}
          onSearchChange={handleSearchChange}
          onCategoryToggle={handleCategoryToggle}
          onClearFilters={handleClearFilters}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Toggle sidebar button (mobile) */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="absolute top-4 left-4 z-30 btn-glass p-3"
          aria-label="Open sidebar"
        >
          <svg
            className="w-6 h-6 text-white/80"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}

      {/* Map */}
      <div className="flex-1 h-full">
        {mappableUniversities.length > 0 ? (
          <UniversitiesMap
            universities={mappableUniversities}
            selectedId={selectedId}
            onSelect={setSelectedId}
            language={language}
            ref={mapRef}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-yl-dark">
            <div className="text-center p-8 glass-panel rounded-2xl max-w-sm mx-4">
              <svg
                className="w-16 h-16 text-white/20 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
              <h3 className="text-lg font-medium text-white mb-2">
                {t("noUniversities")}
              </h3>
              <p className="text-white/50 text-sm">
                {filters.search || filters.categories.length > 0
                  ? t("adjustFilters")
                  : t("noValidCoords")}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
