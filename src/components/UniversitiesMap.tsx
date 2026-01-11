"use client";

import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import type { University } from "@/lib/types";
import type { Language } from "@/lib/i18n/translations";
import { translations } from "@/lib/i18n/translations";
import { useTheme } from "@/lib/theme/ThemeContext";

// Fix for default marker icons
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;

// Category colors for dark and light themes
const CATEGORY_COLORS = {
  dark: {
    statale: { main: "#60a5fa", glow: "rgba(96,165,250,0.6)" },
    non_statale: { main: "#c084fc", glow: "rgba(192,132,252,0.6)" },
    telematica: { main: "#34d399", glow: "rgba(52,211,153,0.6)" },
    ordinamento_speciale: { main: "#fbbf24", glow: "rgba(251,191,36,0.6)" },
    other: { main: "#9ca3af", glow: "rgba(156,163,175,0.6)" },
  },
  light: {
    statale: { main: "#2563eb", glow: "rgba(37,99,235,0.4)" },
    non_statale: { main: "#9333ea", glow: "rgba(147,51,234,0.4)" },
    telematica: { main: "#059669", glow: "rgba(5,150,105,0.4)" },
    ordinamento_speciale: { main: "#d97706", glow: "rgba(217,119,6,0.4)" },
    other: { main: "#6b7280", glow: "rgba(107,114,128,0.4)" },
  },
} as const;

// Theme colors for UI elements
const THEME_COLORS = {
  dark: {
    bg: "rgba(10,14,23,0.9)",
    bgSecondary: "rgba(10,14,23,0.8)",
    border: "rgba(255,255,255,0.1)",
    text: "rgba(255,255,255,0.95)",
    textSecondary: "rgba(255,255,255,0.4)",
    textMuted: "rgba(255,255,255,0.2)",
    accent: "#22d3ee",
    accentBg: "rgba(34,211,238,0.1)",
    accentBorder: "rgba(34,211,238,0.2)",
  },
  light: {
    bg: "rgba(255,255,255,0.95)",
    bgSecondary: "rgba(255,255,255,0.9)",
    border: "rgba(0,0,0,0.1)",
    text: "rgba(0,0,0,0.9)",
    textSecondary: "rgba(0,0,0,0.5)",
    textMuted: "rgba(0,0,0,0.2)",
    accent: "#0891b2",
    accentBg: "rgba(8,145,178,0.1)",
    accentBorder: "rgba(8,145,178,0.2)",
  },
} as const;

// Tech-style marker - minimal dot with glow
const createCategoryIcon = (category: string, isDark: boolean) => {
  const colors = isDark ? CATEGORY_COLORS.dark : CATEGORY_COLORS.light;
  const config = colors[category as keyof typeof colors] || colors.other;
  const borderColor = isDark ? "rgba(10,14,23,0.8)" : "rgba(255,255,255,0.9)";

  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        width: 16px;
        height: 16px;
        background: ${config.main};
        border-radius: 50%;
        border: 2px solid ${borderColor};
        box-shadow: 0 0 12px ${config.glow}, 0 0 4px ${config.glow};
        cursor: pointer;
      "></div>
    `,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -12],
  });
};

// Get category labels
const getCategoryLabels = (language: Language) => ({
  statale: translations[language].statale,
  non_statale: translations[language].nonStatale,
  telematica: translations[language].telematica,
  ordinamento_speciale: translations[language].speciale,
  other: translations[language].other,
});

// Marker cluster component
function MarkerClusterGroup({
  universities,
  selectedId,
  onSelect,
  language,
  isDark,
}: {
  universities: University[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  language: Language;
  isDark: boolean;
}) {
  const map = useMap();
  const clusterGroupRef = useRef<L.MarkerClusterGroup | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const activePopupRef = useRef<L.Popup | null>(null);

  // Theme-aware popup content
  const createPopupContent = (uni: University) => {
    const categoryLabels = getCategoryLabels(language);
    const openWebsiteText = translations[language].openWebsite;
    const catColors = isDark ? CATEGORY_COLORS.dark : CATEGORY_COLORS.light;
    const theme = isDark ? THEME_COLORS.dark : THEME_COLORS.light;
    const config = catColors[uni.category as keyof typeof catColors] || catColors.other;
    const categoryLabel = categoryLabels[uni.category as keyof typeof categoryLabels] || categoryLabels.other;

    return `
      <div style="
        font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace;
        min-width: 200px;
        max-width: 280px;
        padding: 4px;
        box-sizing: border-box;
      ">
        <div style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 8px;">
          <div style="
            width: 8px;
            height: 8px;
            background: ${config.main};
            border-radius: 50%;
            box-shadow: 0 0 8px ${config.glow};
            flex-shrink: 0;
            margin-top: 4px;
          "></div>
          <h3 style="
            font-weight: 600;
            font-size: 13px;
            margin: 0;
            color: ${theme.text};
            line-height: 1.3;
            word-wrap: break-word;
            overflow-wrap: break-word;
            hyphens: auto;
          ">${uni.name}</h3>
        </div>

        ${uni.campusName ? `
          <p style="
            font-size: 11px;
            color: ${theme.textSecondary};
            margin: 0 0 8px 16px;
            word-wrap: break-word;
            overflow-wrap: break-word;
          ">${uni.campusName}</p>
        ` : ''}

        <div style="
          display: flex;
          align-items: center;
          gap: 8px;
          margin-left: 16px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        ">
          <span style="
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: ${config.main};
          ">${categoryLabel}</span>
          ${uni.city ? `
            <span style="color: ${theme.textMuted};">•</span>
            <span style="
              font-size: 10px;
              color: ${theme.textSecondary};
            ">${uni.city}</span>
          ` : ''}
        </div>

        <a
          href="${uni.officialUrl}"
          target="_blank"
          rel="noopener noreferrer"
          style="
            display: inline-flex;
            align-items: center;
            gap: 6px;
            color: ${theme.accent};
            font-size: 11px;
            text-decoration: none;
            margin-left: 16px;
            padding: 6px 10px;
            background: ${theme.accentBg};
            border: 1px solid ${theme.accentBorder};
            border-radius: 6px;
            transition: all 0.2s;
          "
        >
          <span style="text-transform: uppercase; letter-spacing: 0.05em;">${openWebsiteText}</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
          </svg>
        </a>
      </div>
    `;
  };

  useEffect(() => {
    const theme = isDark ? THEME_COLORS.dark : THEME_COLORS.light;

    // Remove existing cluster group if theme changed
    if (clusterGroupRef.current) {
      map.removeLayer(clusterGroupRef.current);
      clusterGroupRef.current = null;
    }

    clusterGroupRef.current = L.markerClusterGroup({
      chunkedLoading: true,
      maxClusterRadius: 50,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
      removeOutsideVisibleBounds: false,
      animate: true,
      iconCreateFunction: (cluster) => {
        const count = cluster.getChildCount();
        let size = 36;
        let fontSize = 11;

        if (count > 50) {
          size = 48;
          fontSize = 13;
        } else if (count > 10) {
          size = 42;
          fontSize = 12;
        }

        return L.divIcon({
          html: `
            <div style="
              width: ${size}px;
              height: ${size}px;
              background: ${theme.bg};
              border: 1px solid ${theme.accentBorder};
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-family: ui-monospace, SFMono-Regular, monospace;
              font-size: ${fontSize}px;
              font-weight: 700;
              color: ${theme.accent};
              box-shadow: 0 0 20px ${theme.accentBg};
            ">${count}</div>
          `,
          className: "custom-cluster",
          iconSize: L.point(size, size),
        });
      },
    });
    map.addLayer(clusterGroupRef.current);

    markersRef.current.clear();

    universities.forEach((uni) => {
      const icon = createCategoryIcon(uni.category, isDark);
      const marker = L.marker([uni.lat, uni.lng], { icon });

      const popup = L.popup({
        autoClose: false,
        closeOnClick: false,
        closeOnEscapeKey: true,
        className: "tech-popup",
      }).setContent(createPopupContent(uni));

      marker.bindPopup(popup);

      marker.on("click", (e) => {
        L.DomEvent.stopPropagation(e);

        if (activePopupRef.current && activePopupRef.current !== popup) {
          activePopupRef.current.close();
        }

        activePopupRef.current = popup;
        onSelect(uni.id);

        setTimeout(() => {
          if (!marker.isPopupOpen()) {
            marker.openPopup();
          }
        }, 50);
      });

      markersRef.current.set(uni.id, marker);
      clusterGroupRef.current?.addLayer(marker);
    });

    return () => {
      if (clusterGroupRef.current) {
        map.removeLayer(clusterGroupRef.current);
        clusterGroupRef.current = null;
      }
    };
  }, [universities, map, onSelect, language, isDark]);

  useEffect(() => {
    if (selectedId) {
      const marker = markersRef.current.get(selectedId);
      if (marker) {
        if (activePopupRef.current) {
          activePopupRef.current.close();
        }

        const latLng = marker.getLatLng();
        const parent = clusterGroupRef.current?.getVisibleParent(marker);

        if (parent && parent !== marker) {
          map.setView(latLng, 14, { animate: true });
        } else {
          map.setView(latLng, Math.max(map.getZoom(), 10), { animate: true });
        }

        setTimeout(() => {
          marker.openPopup();
          activePopupRef.current = marker.getPopup() || null;
        }, 400);
      }
    }
  }, [selectedId, map]);

  return null;
}

// Theme-aware tile layer
function ThemeAwareTileLayer() {
  const { isDark } = useTheme();
  const tileUrl = isDark
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

  return (
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
      url={tileUrl}
    />
  );
}

// Map controls
function MapControls({ language }: { language: Language }) {
  const map = useMap();
  const resetViewText = translations[language].resetView;
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const toggleFullscreen = () => {
    const container = map.getContainer().closest('.map-fullscreen-container');
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().then(() => {
        setIsFullscreen(true);
        setTimeout(() => map.invalidateSize(), 100);
      }).catch(() => {});
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
        setTimeout(() => map.invalidateSize(), 100);
      }).catch(() => {});
    }
  };

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      setTimeout(() => map.invalidateSize(), 100);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [map]);

  return (
    <div className="leaflet-top leaflet-right" style={{ marginTop: "10px", marginRight: "10px" }}>
      <div className="leaflet-control flex flex-col gap-2">
        <button
          onClick={toggleFullscreen}
          className="w-9 h-9 flex items-center justify-center rounded-lg transition-all"
          style={{
            background: "color-mix(in srgb, var(--bg-secondary) 90%, transparent)",
            border: "1px solid var(--border-accent)",
          }}
          title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
        >
          {isFullscreen ? (
            <svg className="w-4 h-4" style={{ color: "var(--accent-primary)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
            </svg>
          ) : (
            <svg className="w-4 h-4" style={{ color: "var(--accent-primary)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
            </svg>
          )}
        </button>
        <button
          onClick={() => map.setView([42.5, 12.5], 6, { animate: true })}
          className="w-9 h-9 flex items-center justify-center rounded-lg transition-all"
          style={{
            background: "color-mix(in srgb, var(--bg-secondary) 90%, transparent)",
            border: "1px solid var(--border-accent)",
          }}
          title={resetViewText}
        >
          <svg className="w-4 h-4" style={{ color: "var(--accent-primary)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

interface UniversitiesMapProps {
  universities: University[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  language: Language;
}

export interface MapRef {
  focusOnUniversity: (id: string) => void;
}

const UniversitiesMap = forwardRef<MapRef, UniversitiesMapProps>(
  function UniversitiesMap({ universities, selectedId, onSelect, language }, ref) {
    const mapInstanceRef = useRef<L.Map | null>(null);
    const { isDark } = useTheme();

    useImperativeHandle(ref, () => ({
      focusOnUniversity: (id: string) => {
        const uni = universities.find((u) => u.id === id);
        if (uni && mapInstanceRef.current) {
          mapInstanceRef.current.setView([uni.lat, uni.lng], 12, { animate: true });
        }
        onSelect(id);
      },
    }));

    const italyBounds: L.LatLngBoundsExpression = [
      [35.5, 6.5],
      [47.5, 18.5],
    ];

    return (
      <div className="map-fullscreen-container w-full h-full">
        <MapContainer
          center={[42.5, 12.5]}
          zoom={6}
          minZoom={5}
          maxZoom={18}
          maxBounds={italyBounds}
          maxBoundsViscosity={0.8}
          className="w-full h-full touch-pan-xy"
          zoomControl={true}
          scrollWheelZoom={true}
          doubleClickZoom={true}
          dragging={true}
          ref={(map) => {
            if (map) {
              mapInstanceRef.current = map;
            }
          }}
        >
          <ThemeAwareTileLayer />
          <MarkerClusterGroup
            universities={universities}
            selectedId={selectedId}
            onSelect={onSelect}
            language={language}
            isDark={isDark}
          />
          <MapControls language={language} />
        </MapContainer>
      </div>
    );
  }
);

export default UniversitiesMap;
