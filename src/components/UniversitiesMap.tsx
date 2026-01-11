"use client";

import {
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

// Fix for default marker icons in Leaflet with webpack
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Custom marker icons by category with glow effects
const createCategoryIcon = (category: string) => {
  const colorConfig: Record<string, { main: string; glow: string }> = {
    statale: { main: "#3b82f6", glow: "rgba(59,130,246,0.5)" },
    non_statale: { main: "#a855f7", glow: "rgba(168,85,247,0.5)" },
    telematica: { main: "#10b981", glow: "rgba(16,185,129,0.5)" },
    ordinamento_speciale: { main: "#f59e0b", glow: "rgba(245,158,11,0.5)" },
    other: { main: "#6b7280", glow: "rgba(107,114,128,0.5)" },
  };

  const config = colorConfig[category] || colorConfig.other;

  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        background: linear-gradient(135deg, ${config.main} 0%, ${config.main}dd 100%);
        width: 32px;
        height: 32px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 2px solid rgba(255,255,255,0.3);
        box-shadow: 0 0 16px ${config.glow}, 0 4px 8px rgba(0,0,0,0.4);
      ">
        <div style="
          transform: rotate(45deg);
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
            <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z"/>
          </svg>
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

// Get category label translations
const getCategoryLabels = (language: Language) => ({
  statale: translations[language].statale,
  non_statale: translations[language].nonStatale,
  telematica: translations[language].telematica,
  ordinamento_speciale: translations[language].speciale,
  other: translations[language].other,
});

// Component to handle marker clustering
function MarkerClusterGroup({
  universities,
  selectedId,
  onSelect,
  language,
}: {
  universities: University[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  language: Language;
}) {
  const map = useMap();
  const clusterGroupRef = useRef<L.MarkerClusterGroup | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const activePopupRef = useRef<L.Popup | null>(null);

  // Create popup content
  const createPopupContent = (uni: University) => {
    const categoryLabels = getCategoryLabels(language);
    const openWebsiteText = translations[language].openWebsite;

    const campusLabel = uni.campusName
      ? `<p style="font-size: 12px; color: rgba(255,255,255,0.5); margin: 4px 0 10px 0; font-weight: 500;">${uni.campusName}</p>`
      : "";
    const locationLabel = uni.city || uni.region
      ? `<p style="font-size: 12px; color: rgba(255,255,255,0.4); margin: 6px 0 0 0;">${[uni.city, uni.region].filter(Boolean).join(", ")}</p>`
      : "";

    // Badge colors for dark theme
    const badgeStyles: Record<string, { bg: string; color: string; border: string }> = {
      statale: { bg: "rgba(59,130,246,0.15)", color: "#60a5fa", border: "rgba(59,130,246,0.3)" },
      non_statale: { bg: "rgba(168,85,247,0.15)", color: "#c084fc", border: "rgba(168,85,247,0.3)" },
      telematica: { bg: "rgba(16,185,129,0.15)", color: "#34d399", border: "rgba(16,185,129,0.3)" },
      ordinamento_speciale: { bg: "rgba(245,158,11,0.15)", color: "#fbbf24", border: "rgba(245,158,11,0.3)" },
      other: { bg: "rgba(107,114,128,0.15)", color: "#9ca3af", border: "rgba(107,114,128,0.3)" },
    };
    const badge = badgeStyles[uni.category] || badgeStyles.other;
    const categoryLabel = categoryLabels[uni.category as keyof typeof categoryLabels] || categoryLabels.other;

    return `
      <div class="university-popup" style="min-width: 240px;">
        <h3 style="font-weight: 600; font-size: 14px; margin: 0 0 4px 0; color: rgba(255,255,255,0.95);">
          ${uni.name}
        </h3>
        ${campusLabel}
        <span style="
          display: inline-block;
          padding: 3px 10px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 500;
          background-color: ${badge.bg};
          color: ${badge.color};
          border: 1px solid ${badge.border};
        ">
          ${categoryLabel}
        </span>
        ${locationLabel}
        <a
          href="${uni.officialUrl}"
          target="_blank"
          rel="noopener noreferrer"
          style="
            display: inline-flex;
            align-items: center;
            gap: 6px;
            color: #00d4ff;
            font-size: 12px;
            text-decoration: none;
            margin-top: 12px;
            font-weight: 500;
            transition: all 0.2s;
          "
        >
          ${openWebsiteText}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
          </svg>
        </a>
      </div>
    `;
  };

  useEffect(() => {
    // Create cluster group if it doesn't exist
    if (!clusterGroupRef.current) {
      clusterGroupRef.current = L.markerClusterGroup({
        chunkedLoading: true,
        maxClusterRadius: 50,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        // Keep markers visible longer during animation
        removeOutsideVisibleBounds: false,
        animate: true,
        iconCreateFunction: (cluster) => {
          const count = cluster.getChildCount();
          let size = "small";
          let diameter = 40;

          if (count > 50) {
            size = "large";
            diameter = 60;
          } else if (count > 10) {
            size = "medium";
            diameter = 50;
          }

          return L.divIcon({
            html: `<div class="cluster-marker cluster-${size}">${count}</div>`,
            className: "custom-cluster",
            iconSize: L.point(diameter, diameter),
          });
        },
      });
      map.addLayer(clusterGroupRef.current);
    }

    // Clear existing markers
    clusterGroupRef.current.clearLayers();
    markersRef.current.clear();

    // Add markers for each university
    universities.forEach((uni) => {
      const icon = createCategoryIcon(uni.category);
      const marker = L.marker([uni.lat, uni.lng], { icon });

      // Create popup with options to prevent auto-close
      const popup = L.popup({
        autoClose: false,
        closeOnClick: false,
        closeOnEscapeKey: true,
        className: "university-popup-container",
      }).setContent(createPopupContent(uni));

      marker.bindPopup(popup);

      // Handle marker click - prevent event bubbling issues
      marker.on("click", (e) => {
        L.DomEvent.stopPropagation(e);

        // Close any previously open popup
        if (activePopupRef.current && activePopupRef.current !== popup) {
          activePopupRef.current.close();
        }

        activePopupRef.current = popup;
        onSelect(uni.id);

        // Ensure popup stays open
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
      // Cleanup on unmount
      if (clusterGroupRef.current) {
        clusterGroupRef.current.clearLayers();
      }
    };
  }, [universities, map, onSelect, language]);

  // Handle selected university changes (from sidebar click)
  useEffect(() => {
    if (selectedId) {
      const marker = markersRef.current.get(selectedId);
      if (marker) {
        // Close any other open popup
        if (activePopupRef.current) {
          activePopupRef.current.close();
        }

        // Zoom to marker
        const latLng = marker.getLatLng();

        // Spiderfy the cluster if needed, then open popup
        const parent = clusterGroupRef.current?.getVisibleParent(marker);
        if (parent && parent !== marker) {
          // Marker is inside a cluster, zoom in first
          map.setView(latLng, 14, { animate: true });
        } else {
          map.setView(latLng, Math.max(map.getZoom(), 10), { animate: true });
        }

        // Open popup after animation
        setTimeout(() => {
          marker.openPopup();
          activePopupRef.current = marker.getPopup() || null;
        }, 400);
      }
    }
  }, [selectedId, map]);

  return null;
}

// Map controls component with glass styling
function MapControls({ language }: { language: Language }) {
  const map = useMap();
  const resetViewText = translations[language].resetView;

  const resetView = () => {
    map.setView([42.5, 12.5], 6, { animate: true });
  };

  return (
    <div className="leaflet-top leaflet-right" style={{ marginTop: "10px", marginRight: "10px" }}>
      <div className="leaflet-control">
        <button
          onClick={resetView}
          className="btn-glass p-2.5"
          title={resetViewText}
        >
          <svg
            className="w-5 h-5 text-white/80"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
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

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
      focusOnUniversity: (id: string) => {
        const uni = universities.find((u) => u.id === id);
        if (uni && mapInstanceRef.current) {
          mapInstanceRef.current.setView([uni.lat, uni.lng], 12, {
            animate: true,
          });
        }
        onSelect(id);
      },
    }));

    // Italy bounds
    const italyBounds: L.LatLngBoundsExpression = [
      [35.5, 6.5],
      [47.5, 18.5],
    ];

    return (
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
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup
          universities={universities}
          selectedId={selectedId}
          onSelect={onSelect}
          language={language}
        />
        <MapControls language={language} />
      </MapContainer>
    );
  }
);

export default UniversitiesMap;
