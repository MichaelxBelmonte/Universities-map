export type Language = "en" | "it";

export const translations = {
  en: {
    // Header
    appTitle: "Universities Map",
    appSubtitle: "Currently: Italy",
    universities: "universities",
    campuses: "campuses",
    onMap: "on map",
    statale: "Public",
    nonStatale: "Private",
    telematica: "Online",
    speciale: "Special",
    other: "Other",

    // Sidebar
    sidebarTitle: "Universities",
    searchPlaceholder: "Search by name, city, or region...",
    clearFilters: "Clear all filters",
    results: "results",
    result: "result",
    noResults: "No universities match your filters",
    missingCoordinates: "Missing coordinates",

    // Map
    loadingMap: "Loading map...",
    noUniversities: "No universities to display",
    adjustFilters: "Try adjusting your filters",
    noValidCoords: "No universities with valid coordinates found",
    openWebsite: "Open official website",
    resetView: "Reset view",

    // Language
    language: "Language",
    english: "English",
    italian: "Italiano",
  },
  it: {
    // Header
    appTitle: "Universities Map",
    appSubtitle: "Attualmente: Italia",
    universities: "università",
    campuses: "sedi",
    onMap: "sulla mappa",
    statale: "Statale",
    nonStatale: "Non Statale",
    telematica: "Telematica",
    speciale: "Speciale",
    other: "Altro",

    // Sidebar
    sidebarTitle: "Università",
    searchPlaceholder: "Cerca per nome, città o regione...",
    clearFilters: "Cancella filtri",
    results: "risultati",
    result: "risultato",
    noResults: "Nessuna università corrisponde ai filtri",
    missingCoordinates: "Coordinate mancanti",

    // Map
    loadingMap: "Caricamento mappa...",
    noUniversities: "Nessuna università da visualizzare",
    adjustFilters: "Prova a modificare i filtri",
    noValidCoords: "Nessuna università con coordinate valide",
    openWebsite: "Apri sito ufficiale",
    resetView: "Reimposta vista",

    // Language
    language: "Lingua",
    english: "English",
    italian: "Italiano",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
