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

    // Programs
    programs: "Programs",
    program: "Program",
    viewPrograms: "View Programs",
    searchPrograms: "Search programs...",
    noPrograms: "No programs available",
    noProgramsMatch: "No programs match your filters",
    allPrograms: "All Programs",
    programsCount: "programs",

    // Degree levels
    degreeLevel: "Degree Level",
    bachelor: "Bachelor",
    master: "Master",
    cicloUnico: "Single Cycle",
    phd: "PhD",
    allLevels: "All Levels",

    // Program details
    duration: "Duration",
    years: "years",
    year: "year",
    ects: "ECTS",
    campus: "Campus",
    taughtIn: "Taught in",
    classCode: "Class Code",

    // Program language filter
    programLanguage: "Language",
    langItalian: "Italian",
    langEnglish: "English",
    allLanguages: "All Languages",

    // Actions
    showDetails: "Show Details",
    hideDetails: "Hide Details",
    backToList: "Back to list",
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

    // Programs
    programs: "Corsi di Laurea",
    program: "Corso",
    viewPrograms: "Vedi Corsi",
    searchPrograms: "Cerca corsi...",
    noPrograms: "Nessun corso disponibile",
    noProgramsMatch: "Nessun corso corrisponde ai filtri",
    allPrograms: "Tutti i Corsi",
    programsCount: "corsi",

    // Degree levels
    degreeLevel: "Livello",
    bachelor: "Triennale",
    master: "Magistrale",
    cicloUnico: "Ciclo Unico",
    phd: "Dottorato",
    allLevels: "Tutti i Livelli",

    // Program details
    duration: "Durata",
    years: "anni",
    year: "anno",
    ects: "CFU",
    campus: "Sede",
    taughtIn: "Lingua",
    classCode: "Classe",

    // Program language filter
    programLanguage: "Lingua",
    langItalian: "Italiano",
    langEnglish: "Inglese",
    allLanguages: "Tutte le Lingue",

    // Actions
    showDetails: "Mostra Dettagli",
    hideDetails: "Nascondi Dettagli",
    backToList: "Torna alla lista",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
