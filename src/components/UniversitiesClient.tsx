"use client";

import { useState, useCallback, useRef, useEffect } from "react";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Reference to map control functions
  const mapRef = useRef<{
    focusOnUniversity: (id: string) => void;
  } | null>(null);

  // Detect viewport size - mobile < 640px, tablet 640-1024px, desktop > 1024px
  useEffect(() => {
    setMounted(true);
    const checkViewport = () => {
      const width = window.innerWidth;
      const mobile = width < 640;
      const tablet = width >= 640 && width < 1024;
      setIsTablet(tablet);
      // Open sidebar by default on desktop only
      if (width >= 1024) {
        setSidebarOpen(true);
      }
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // Use CSS media query approach for mobile detection (works immediately)
  const isMobile = mounted ? window.innerWidth < 640 : false;

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

  // Determine layout mode
  const showBottomSheet = isMobile;
  const showSidePanel = !isMobile;

  return (
    <div className="flex h-full relative">
      {/* Mobile/Tablet backdrop overlay */}
      {showBottomSheet && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          style={{ zIndex: 9998 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Bottom sheet on mobile, side panel on tablet/desktop */}
      <div
        className={`
          ${showBottomSheet
            ? `fixed inset-x-0 bottom-0 h-[80vh] rounded-t-3xl transform transition-transform duration-300 ease-out
               ${sidebarOpen ? "translate-y-0" : "translate-y-full"}`
            : `${sidebarOpen ? "w-[340px] lg:w-[400px]" : "w-0"} relative h-full transition-all duration-300 ease-in-out overflow-hidden`
          }
          glass-panel-elevated
        `}
        style={{ zIndex: showBottomSheet ? 9999 : 20 }}
      >
        {/* Drag handle for mobile bottom sheet */}
        {showBottomSheet && (
          <div
            className="flex justify-center py-3 cursor-grab active:cursor-grabbing"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="w-12 h-1.5 rounded-full bg-white/30" />
          </div>
        )}
        <div className={showBottomSheet ? "h-[calc(100%-24px)] overflow-hidden" : "h-full"}>
          <UniversitiesSidebar
            universities={filteredUniversities}
            selectedId={selectedId}
            filters={filters}
            onUniversityClick={(id) => {
              handleUniversityClick(id);
              if (showBottomSheet) setSidebarOpen(false);
            }}
            onSearchChange={handleSearchChange}
            onCategoryToggle={handleCategoryToggle}
            onClearFilters={handleClearFilters}
            onClose={() => setSidebarOpen(false)}
          />
        </div>
      </div>

      {/* Floating Action Button - ALWAYS visible on mobile when sidebar closed */}
      <button
        onClick={() => setSidebarOpen(true)}
        className={`
          fixed bottom-6 left-1/2 -translate-x-1/2
          bg-gradient-to-r from-cyan-500 to-blue-500
          text-white px-6 py-4 rounded-full
          shadow-xl shadow-cyan-500/40
          flex items-center gap-3 touch-manipulation
          active:scale-95 transition-all duration-200
          sm:hidden
          ${sidebarOpen ? "opacity-0 pointer-events-none translate-y-4" : "opacity-100 translate-y-0"}
        `}
        style={{ zIndex: 10000 }}
        aria-label="Find universities"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="font-semibold">{t("sidebarTitle")}</span>
      </button>

      {/* Toggle button for tablet when sidebar is closed */}
      {showSidePanel && !sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="absolute top-4 left-4 z-30 btn-glass p-3 shadow-lg"
          aria-label="Open sidebar"
        >
          <svg className="w-6 h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      {/* Map */}
      <div className="flex-1 h-full relative" style={{ zIndex: 1 }}>
        {mappableUniversities.length > 0 ? (
          <UniversitiesMap
            universities={mappableUniversities}
            selectedId={selectedId}
            onSelect={(id) => {
              setSelectedId(id);
            }}
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
