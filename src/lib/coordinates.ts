import type { CoordinateEntry } from "./types";

/**
 * Campus coordinate entry with optional campus name
 */
export interface CampusCoordinate extends CoordinateEntry {
  campusName?: string;
  isMain?: boolean;
}

/**
 * Coordinates mapping for Italian universities.
 * Universities with multiple campuses have an array of locations.
 *
 * To add or update coordinates:
 * 1. Find the university_id (filename without _data.json)
 * 2. Add/update the entry with lat, lng, city, region, and optional campusName
 * 3. Use Google Maps or OpenStreetMap to find accurate coordinates
 * 4. For multi-campus universities, use an array of CampusCoordinate
 *
 * Entries with lat: 0, lng: 0 will be marked as "needs coordinates"
 * and won't appear on the map.
 */
export const UNIVERSITY_COORDINATES: Record<string, CampusCoordinate | CampusCoordinate[]> = {
  // === MULTI-CAMPUS UNIVERSITIES ===

  // Chieti-Pescara - Università G. D'Annunzio
  unich: [
    { lat: 42.3509, lng: 14.1715, city: "Chieti", region: "Abruzzo", campusName: "Sede di Chieti", isMain: true },
    { lat: 42.4618, lng: 14.2139, city: "Pescara", region: "Abruzzo", campusName: "Sede di Pescara" },
    { lat: 42.1114, lng: 14.7103, city: "Vasto", region: "Abruzzo", campusName: "Polo di Vasto" },
  ],

  // Bologna - Alma Mater Studiorum
  unibo: [
    { lat: 44.4964, lng: 11.3528, city: "Bologna", region: "Emilia-Romagna", campusName: "Campus di Bologna", isMain: true },
    { lat: 44.1396, lng: 12.2431, city: "Cesena", region: "Emilia-Romagna", campusName: "Campus di Cesena" },
    { lat: 44.2227, lng: 12.0407, city: "Forlì", region: "Emilia-Romagna", campusName: "Campus di Forlì" },
    { lat: 44.4175, lng: 12.1996, city: "Ravenna", region: "Emilia-Romagna", campusName: "Campus di Ravenna" },
    { lat: 44.0594, lng: 12.5683, city: "Rimini", region: "Emilia-Romagna", campusName: "Campus di Rimini" },
  ],

  // Politecnico di Milano
  polimi: [
    { lat: 45.4784, lng: 9.2275, city: "Milano", region: "Lombardia", campusName: "Campus Leonardo", isMain: true },
    { lat: 45.5035, lng: 9.1558, city: "Milano", region: "Lombardia", campusName: "Campus Bovisa" },
    { lat: 45.8081, lng: 9.0852, city: "Como", region: "Lombardia", campusName: "Polo di Como" },
    { lat: 45.8566, lng: 9.3977, city: "Lecco", region: "Lombardia", campusName: "Polo di Lecco" },
    { lat: 45.1332, lng: 10.0227, city: "Cremona", region: "Lombardia", campusName: "Polo di Cremona" },
    { lat: 45.0526, lng: 9.6929, city: "Piacenza", region: "Emilia-Romagna", campusName: "Polo di Piacenza" },
    { lat: 45.1564, lng: 10.7914, city: "Mantova", region: "Lombardia", campusName: "Polo di Mantova" },
  ],

  // Politecnico di Torino
  polito: [
    { lat: 45.0627, lng: 7.6627, city: "Torino", region: "Piemonte", campusName: "Sede Centrale", isMain: true },
    { lat: 44.3891, lng: 7.8208, city: "Mondovì", region: "Piemonte", campusName: "Sede di Mondovì" },
  ],

  // Università Cattolica
  unicatt: [
    { lat: 45.4638, lng: 9.1803, city: "Milano", region: "Lombardia", campusName: "Sede di Milano", isMain: true },
    { lat: 41.9028, lng: 12.4964, city: "Roma", region: "Lazio", campusName: "Sede di Roma" },
    { lat: 45.5399, lng: 10.2138, city: "Brescia", region: "Lombardia", campusName: "Sede di Brescia" },
    { lat: 45.0526, lng: 9.6929, city: "Piacenza", region: "Emilia-Romagna", campusName: "Sede di Piacenza" },
    { lat: 45.1332, lng: 10.0227, city: "Cremona", region: "Lombardia", campusName: "Sede di Cremona" },
  ],

  // Genova
  unige: [
    { lat: 44.4119, lng: 8.9333, city: "Genova", region: "Liguria", campusName: "Sede di Genova", isMain: true },
    { lat: 43.8872, lng: 8.0369, city: "Imperia", region: "Liguria", campusName: "Polo di Imperia" },
    { lat: 44.1024, lng: 9.8240, city: "La Spezia", region: "Liguria", campusName: "Polo di La Spezia" },
    { lat: 44.3091, lng: 8.4772, city: "Savona", region: "Liguria", campusName: "Polo di Savona" },
  ],

  // Padova
  unipd: [
    { lat: 45.4065, lng: 11.8779, city: "Padova", region: "Veneto", campusName: "Sede di Padova", isMain: true },
    { lat: 45.5455, lng: 11.5354, city: "Vicenza", region: "Veneto", campusName: "Polo di Vicenza" },
    { lat: 45.6669, lng: 12.2430, city: "Treviso", region: "Veneto", campusName: "Polo di Treviso" },
    { lat: 45.0704, lng: 11.7898, city: "Rovigo", region: "Veneto", campusName: "Polo di Rovigo" },
    { lat: 46.0145, lng: 11.9021, city: "Feltre", region: "Veneto", campusName: "Polo di Feltre" },
  ],

  // Siena
  unisi: [
    { lat: 43.3188, lng: 11.3308, city: "Siena", region: "Toscana", campusName: "Sede di Siena", isMain: true },
    { lat: 43.4623, lng: 11.8819, city: "Arezzo", region: "Toscana", campusName: "Polo di Arezzo" },
    { lat: 42.7635, lng: 11.1127, city: "Grosseto", region: "Toscana", campusName: "Polo di Grosseto" },
    { lat: 43.5581, lng: 11.5247, city: "San Giovanni Valdarno", region: "Toscana", campusName: "Polo di San Giovanni Valdarno" },
  ],

  // Palermo
  unipa: [
    { lat: 38.1153, lng: 13.3619, city: "Palermo", region: "Sicilia", campusName: "Sede di Palermo", isMain: true },
    { lat: 37.3111, lng: 13.5766, city: "Agrigento", region: "Sicilia", campusName: "Polo di Agrigento" },
    { lat: 37.4901, lng: 14.0629, city: "Caltanissetta", region: "Sicilia", campusName: "Polo di Caltanissetta" },
    { lat: 38.0176, lng: 12.5364, city: "Trapani", region: "Sicilia", campusName: "Polo di Trapani" },
  ],

  // Catania
  unict: [
    { lat: 37.5027, lng: 15.0897, city: "Catania", region: "Sicilia", campusName: "Sede di Catania", isMain: true },
    { lat: 36.9257, lng: 14.7306, city: "Ragusa", region: "Sicilia", campusName: "Polo di Ragusa" },
    { lat: 37.0755, lng: 15.2866, city: "Siracusa", region: "Sicilia", campusName: "Polo di Siracusa" },
  ],

  // Modena e Reggio Emilia
  unimore: [
    { lat: 44.6294, lng: 10.9476, city: "Modena", region: "Emilia-Romagna", campusName: "Sede di Modena", isMain: true },
    { lat: 44.6989, lng: 10.6312, city: "Reggio Emilia", region: "Emilia-Romagna", campusName: "Sede di Reggio Emilia" },
  ],

  // Insubria
  uninsubria: [
    { lat: 45.8183, lng: 8.8236, city: "Varese", region: "Lombardia", campusName: "Sede di Varese", isMain: true },
    { lat: 45.8081, lng: 9.0852, city: "Como", region: "Lombardia", campusName: "Sede di Como" },
  ],

  // Piemonte Orientale
  uniupo: [
    { lat: 45.3274, lng: 8.4176, city: "Vercelli", region: "Piemonte", campusName: "Sede di Vercelli", isMain: true },
    { lat: 45.4456, lng: 8.6221, city: "Novara", region: "Piemonte", campusName: "Sede di Novara" },
    { lat: 44.9126, lng: 8.6115, city: "Alessandria", region: "Piemonte", campusName: "Sede di Alessandria" },
  ],

  // Molise
  unimol: [
    { lat: 41.5608, lng: 14.6628, city: "Campobasso", region: "Molise", campusName: "Sede di Campobasso", isMain: true },
    { lat: 41.9917, lng: 14.9938, city: "Termoli", region: "Molise", campusName: "Polo di Termoli" },
    { lat: 41.5963, lng: 14.2331, city: "Isernia", region: "Molise", campusName: "Polo di Isernia" },
    { lat: 41.5437, lng: 14.2667, city: "Pesche", region: "Molise", campusName: "Polo di Pesche" },
  ],

  // Brescia
  unibs: [
    { lat: 45.5399, lng: 10.2138, city: "Brescia", region: "Lombardia", campusName: "Sede di Brescia", isMain: true },
    { lat: 45.1564, lng: 10.7914, city: "Mantova", region: "Lombardia", campusName: "Polo di Mantova" },
    { lat: 45.1332, lng: 10.0227, city: "Cremona", region: "Lombardia", campusName: "Polo di Cremona" },
    { lat: 45.5533, lng: 9.9939, city: "Chiari", region: "Lombardia", campusName: "Polo di Chiari" },
  ],

  // Bolzano
  unibz: [
    { lat: 46.4983, lng: 11.3548, city: "Bolzano", region: "Trentino-Alto Adige", campusName: "Sede di Bolzano", isMain: true },
    { lat: 46.7148, lng: 11.6568, city: "Bressanone", region: "Trentino-Alto Adige", campusName: "Sede di Bressanone" },
    { lat: 46.7956, lng: 11.9389, city: "Brunico", region: "Trentino-Alto Adige", campusName: "Polo di Brunico" },
  ],

  // Trento
  unitn: [
    { lat: 46.0668, lng: 11.1505, city: "Trento", region: "Trentino-Alto Adige", campusName: "Sede di Trento", isMain: true },
    { lat: 45.8916, lng: 11.0431, city: "Rovereto", region: "Trentino-Alto Adige", campusName: "Polo di Rovereto" },
  ],

  // Perugia
  unipg: [
    { lat: 43.1166, lng: 12.3882, city: "Perugia", region: "Umbria", campusName: "Sede di Perugia", isMain: true },
    { lat: 42.5614, lng: 12.6426, city: "Terni", region: "Umbria", campusName: "Polo di Terni" },
  ],

  // Venezia - Ca' Foscari
  unive: [
    { lat: 45.4371, lng: 12.3275, city: "Venezia", region: "Veneto", campusName: "Sede di Venezia", isMain: true },
    { lat: 45.6669, lng: 12.2430, city: "Treviso", region: "Veneto", campusName: "Polo di Treviso" },
  ],

  // IUAV Venezia
  iuav: [
    { lat: 45.4379, lng: 12.3216, city: "Venezia", region: "Veneto", campusName: "Sede di Venezia", isMain: true },
    { lat: 45.5455, lng: 11.5354, city: "Vicenza", region: "Veneto", campusName: "Polo di Vicenza" },
  ],

  // Basilicata
  unibas: [
    { lat: 40.6395, lng: 15.8056, city: "Potenza", region: "Basilicata", campusName: "Sede di Potenza", isMain: true },
    { lat: 40.6664, lng: 16.6044, city: "Matera", region: "Basilicata", campusName: "Sede di Matera" },
  ],

  // Campania - Luigi Vanvitelli
  unicampania: [
    { lat: 41.0738, lng: 14.3324, city: "Caserta", region: "Campania", campusName: "Sede di Caserta", isMain: true },
    { lat: 40.8452, lng: 14.2529, city: "Napoli", region: "Campania", campusName: "Sede di Napoli" },
  ],

  // Parthenope
  uniparthenope: [
    { lat: 40.8318, lng: 14.2522, city: "Napoli", region: "Campania", campusName: "Sede di Napoli", isMain: true },
    { lat: 40.9263, lng: 14.5275, city: "Nola", region: "Campania", campusName: "Polo di Nola" },
  ],

  // LUMSA
  lumsa: [
    { lat: 41.8978, lng: 12.4632, city: "Roma", region: "Lazio", campusName: "Sede di Roma", isMain: true },
    { lat: 38.1153, lng: 13.3619, city: "Palermo", region: "Sicilia", campusName: "Sede di Palermo" },
  ],

  // Link Campus
  linkcampus: [
    { lat: 41.9077, lng: 12.4291, city: "Roma", region: "Lazio", campusName: "Sede di Roma", isMain: true },
    { lat: 43.8396, lng: 13.0180, city: "Fano", region: "Marche", campusName: "Polo di Fano" },
  ],

  // UniCamillus
  unicamillus: [
    { lat: 41.8899, lng: 12.4921, city: "Roma", region: "Lazio", campusName: "Sede di Roma", isMain: true },
    { lat: 38.0389, lng: 14.0225, city: "Cefalù", region: "Sicilia", campusName: "Polo di Cefalù" },
  ],

  // San Raffaele (telematica)
  sanraffaele: [
    { lat: 41.9028, lng: 12.4964, city: "Roma", region: "Lazio", campusName: "Sede di Roma", isMain: true },
    { lat: 45.5054, lng: 9.2643, city: "Milano", region: "Lombardia", campusName: "Polo di Milano" },
  ],

  // Giustino Fortunato
  unifortunato: [
    { lat: 41.1298, lng: 14.7828, city: "Benevento", region: "Campania", campusName: "Sede di Benevento", isMain: true },
    { lat: 41.9028, lng: 12.4964, city: "Roma", region: "Lazio", campusName: "Polo di Roma" },
    { lat: 45.4627, lng: 9.1895, city: "Milano", region: "Lombardia", campusName: "Polo di Milano" },
    { lat: 37.5027, lng: 15.0897, city: "Catania", region: "Sicilia", campusName: "Polo di Catania" },
    { lat: 38.1153, lng: 13.3619, city: "Palermo", region: "Sicilia", campusName: "Polo di Palermo" },
  ],

  // === SINGLE CAMPUS UNIVERSITIES ===

  // Abruzzo
  univaq: { lat: 42.3505, lng: 13.3995, city: "L'Aquila", region: "Abruzzo", isMain: true },
  unite: { lat: 42.6589, lng: 13.9049, city: "Teramo", region: "Abruzzo", isMain: true },

  // Calabria
  unical: { lat: 39.3568, lng: 16.2286, city: "Rende", region: "Calabria", isMain: true },
  unicz: { lat: 38.9878, lng: 16.3128, city: "Catanzaro", region: "Calabria", isMain: true },
  unirc: { lat: 38.1103, lng: 15.6615, city: "Reggio Calabria", region: "Calabria", isMain: true },
  unidarc: { lat: 38.1103, lng: 15.6615, city: "Reggio Calabria", region: "Calabria", isMain: true },

  // Campania
  unina: { lat: 40.8452, lng: 14.2529, city: "Napoli", region: "Campania", isMain: true },
  unisa: { lat: 40.7713, lng: 14.7897, city: "Fisciano", region: "Campania", isMain: true },
  unisannio: { lat: 41.1298, lng: 14.7828, city: "Benevento", region: "Campania", isMain: true },
  unior: { lat: 40.8475, lng: 14.2526, city: "Napoli", region: "Campania", isMain: true },
  ssm: { lat: 40.8516, lng: 14.2693, city: "Napoli", region: "Campania", isMain: true },

  // Emilia-Romagna
  unife: { lat: 44.8414, lng: 11.6197, city: "Ferrara", region: "Emilia-Romagna", isMain: true },
  unipr: { lat: 44.8015, lng: 10.3279, city: "Parma", region: "Emilia-Romagna", isMain: true },

  // Friuli-Venezia Giulia
  units: { lat: 45.6572, lng: 13.7879, city: "Trieste", region: "Friuli-Venezia Giulia", isMain: true },
  uniud: { lat: 46.0693, lng: 13.2337, city: "Udine", region: "Friuli-Venezia Giulia", isMain: true },
  sissa: { lat: 45.7105, lng: 13.7228, city: "Trieste", region: "Friuli-Venezia Giulia", isMain: true },

  // Lazio
  uniroma1: { lat: 41.9033, lng: 12.5144, city: "Roma", region: "Lazio", isMain: true },
  uniroma2: { lat: 41.8541, lng: 12.6033, city: "Roma", region: "Lazio", isMain: true },
  uniroma3: { lat: 41.8678, lng: 12.4842, city: "Roma", region: "Lazio", isMain: true },
  uniroma4: { lat: 41.9301, lng: 12.4574, city: "Roma", region: "Lazio", isMain: true },
  unitus: { lat: 42.4147, lng: 12.1055, city: "Viterbo", region: "Lazio", isMain: true },
  unicas: { lat: 41.4903, lng: 13.8299, city: "Cassino", region: "Lazio", isMain: true },
  casd: { lat: 41.8967, lng: 12.4822, city: "Roma", region: "Lazio", isMain: true },

  // Liguria - Genova now in multi-campus section

  // Lombardia
  unimi: { lat: 45.4627, lng: 9.1895, city: "Milano", region: "Lombardia", isMain: true },
  unimib: { lat: 45.5173, lng: 9.2106, city: "Milano", region: "Lombardia", isMain: true },
  unibg: { lat: 45.6983, lng: 9.6773, city: "Bergamo", region: "Lombardia", isMain: true },
  unipv: { lat: 45.1865, lng: 9.1615, city: "Pavia", region: "Lombardia", isMain: true },
  iuss: { lat: 45.1853, lng: 9.1548, city: "Pavia", region: "Lombardia", isMain: true },

  // Marche
  univpm: { lat: 43.5856, lng: 13.5125, city: "Ancona", region: "Marche", isMain: true },
  unimc: { lat: 43.2988, lng: 13.4531, city: "Macerata", region: "Marche", isMain: true },
  uniurb: { lat: 43.7236, lng: 12.6387, city: "Urbino", region: "Marche", isMain: true },
  unicam: { lat: 43.1348, lng: 13.0648, city: "Camerino", region: "Marche", isMain: true },

  // Piemonte
  unito: { lat: 45.0679, lng: 7.6836, city: "Torino", region: "Piemonte", isMain: true },
  unisg: { lat: 44.6956, lng: 8.2151, city: "Pollenzo", region: "Piemonte", isMain: true },

  // Puglia
  uniba: { lat: 41.1087, lng: 16.8756, city: "Bari", region: "Puglia", isMain: true },
  poliba: { lat: 41.1082, lng: 16.8784, city: "Bari", region: "Puglia", isMain: true },
  unifg: { lat: 41.4572, lng: 15.5425, city: "Foggia", region: "Puglia", isMain: true },
  unisalento: { lat: 40.3336, lng: 18.1126, city: "Lecce", region: "Puglia", isMain: true },

  // Sardegna
  unica: { lat: 39.2297, lng: 9.1106, city: "Cagliari", region: "Sardegna", isMain: true },
  uniss: { lat: 40.7256, lng: 8.5566, city: "Sassari", region: "Sardegna", isMain: true },

  // Sicilia
  unime: { lat: 38.1806, lng: 15.5551, city: "Messina", region: "Sicilia", isMain: true },
  unikore: { lat: 37.5142, lng: 14.0835, city: "Enna", region: "Sicilia", isMain: true },

  // Toscana
  unifi: { lat: 43.7797, lng: 11.2504, city: "Firenze", region: "Toscana", isMain: true },
  unipi: { lat: 43.7196, lng: 10.4017, city: "Pisa", region: "Toscana", isMain: true },
  sns: { lat: 43.7206, lng: 10.4015, city: "Pisa", region: "Toscana", isMain: true },
  santanna: { lat: 43.7199, lng: 10.4018, city: "Pisa", region: "Toscana", isMain: true },
  imtlucca: { lat: 43.8438, lng: 10.5066, city: "Lucca", region: "Toscana", isMain: true },
  unistrasi: { lat: 43.3188, lng: 11.3308, city: "Siena", region: "Toscana", isMain: true },

  // Umbria
  unistrapg: { lat: 43.1107, lng: 12.3891, city: "Perugia", region: "Umbria", isMain: true },

  // Valle d'Aosta
  univda: { lat: 45.7384, lng: 7.3207, city: "Aosta", region: "Valle d'Aosta", isMain: true },

  // Veneto
  univr: { lat: 45.4092, lng: 11.0068, city: "Verona", region: "Veneto", isMain: true },

  // === PRIVATE UNIVERSITIES ===
  bocconi: { lat: 45.4499, lng: 9.1883, city: "Milano", region: "Lombardia", isMain: true },
  luiss: { lat: 41.9247, lng: 12.4951, city: "Roma", region: "Lazio", isMain: true },
  iulm: { lat: 45.4398, lng: 9.1682, city: "Milano", region: "Lombardia", isMain: true },
  unicampus: { lat: 41.8556, lng: 12.4718, city: "Roma", region: "Lazio", isMain: true },
  hunimed: { lat: 45.4134, lng: 9.2635, city: "Pieve Emanuele", region: "Lombardia", isMain: true },
  unisr: { lat: 45.5054, lng: 9.2643, city: "Milano", region: "Lombardia", isMain: true },
  lum: { lat: 41.0055, lng: 17.1146, city: "Casamassima", region: "Puglia", isMain: true },
  liuc: { lat: 45.5818, lng: 8.9298, city: "Castellanza", region: "Lombardia", isMain: true },
  uer: { lat: 41.9025, lng: 12.4682, city: "Roma", region: "Lazio", isMain: true },
  unint: { lat: 41.9189, lng: 12.4628, city: "Roma", region: "Lazio", isMain: true },
  unisob: { lat: 40.8471, lng: 14.2577, city: "Napoli", region: "Campania", isMain: true },

  // === TELEMATICA (headquarters only, excluding "Online") ===
  unipegaso: { lat: 40.8518, lng: 14.2681, city: "Napoli", region: "Campania", isMain: true },
  ecampus: { lat: 45.7053, lng: 9.1467, city: "Novedrate", region: "Lombardia", isMain: true },
  uninettuno: { lat: 41.9028, lng: 12.4964, city: "Roma", region: "Lazio", isMain: true },
  mercatorum: { lat: 41.9028, lng: 12.4964, city: "Roma", region: "Lazio", isMain: true },
  unicusano: { lat: 41.9028, lng: 12.4964, city: "Roma", region: "Lazio", isMain: true },
  iul: { lat: 43.7797, lng: 11.2504, city: "Firenze", region: "Toscana", isMain: true },
  unitelma: { lat: 41.9028, lng: 12.4964, city: "Roma", region: "Lazio", isMain: true },
  unimarconi: { lat: 41.9028, lng: 12.4964, city: "Roma", region: "Lazio", isMain: true },
  unidav: { lat: 42.3931, lng: 14.1478, city: "Torrevecchia Teatina", region: "Abruzzo", isMain: true },

  // === ORDINAMENTO SPECIALE ===
  gssi: { lat: 42.3505, lng: 13.3995, city: "L'Aquila", region: "Abruzzo", isMain: true },

  // === OTHER (International, Pontifical) ===
  johncabot: { lat: 41.8904, lng: 12.4710, city: "Roma", region: "Lazio", isMain: true },
  aur: { lat: 41.9028, lng: 12.4964, city: "Roma", region: "Lazio", isMain: true },
  gregoriana: { lat: 41.9000, lng: 12.4823, city: "Roma", region: "Lazio", isMain: true },
  salesiana: { lat: 41.8859, lng: 12.4923, city: "Roma", region: "Lazio", isMain: true },
};

/**
 * Helper to get all campuses for a university as an array
 */
export function getCampuses(universityId: string): CampusCoordinate[] {
  const coords = UNIVERSITY_COORDINATES[universityId];
  if (!coords) return [];
  return Array.isArray(coords) ? coords : [coords];
}

/**
 * Italian regions with their approximate center coordinates
 * Used as fallback when city coordinates are not found
 */
export const REGION_CENTERS: Record<string, { lat: number; lng: number }> = {
  Abruzzo: { lat: 42.3498, lng: 13.3995 },
  Basilicata: { lat: 40.6395, lng: 15.8055 },
  Calabria: { lat: 39.0576, lng: 16.5907 },
  Campania: { lat: 40.8333, lng: 14.25 },
  "Emilia-Romagna": { lat: 44.5398, lng: 11.3419 },
  "Friuli-Venezia Giulia": { lat: 45.9418, lng: 13.0768 },
  Lazio: { lat: 41.8933, lng: 12.4833 },
  Liguria: { lat: 44.4472, lng: 8.75 },
  Lombardia: { lat: 45.4667, lng: 9.2 },
  Marche: { lat: 43.5473, lng: 13.5264 },
  Molise: { lat: 41.6608, lng: 14.5833 },
  Piemonte: { lat: 45.05, lng: 7.6667 },
  Puglia: { lat: 41.1103, lng: 16.8667 },
  Sardegna: { lat: 39.2167, lng: 9.1167 },
  Sicilia: { lat: 37.5667, lng: 14.2667 },
  Toscana: { lat: 43.35, lng: 11.0167 },
  "Trentino-Alto Adige": { lat: 46.1348, lng: 11.1214 },
  Umbria: { lat: 42.95, lng: 12.55 },
  "Valle d'Aosta": { lat: 45.7333, lng: 7.3167 },
  Veneto: { lat: 45.5, lng: 11.55 },
};
