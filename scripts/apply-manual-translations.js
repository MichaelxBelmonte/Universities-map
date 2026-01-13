#!/usr/bin/env node
/**
 * Apply manual translations for remaining programs
 */

const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../data/universities');

// Manual translations for remaining programs
const MANUAL_TRANSLATIONS = {
  // Format: "file|program_name": { en: "English name", it: "Italian name" }

  // needs_italian
  "hunimed_data.json|MEDTEC School": { en: "MEDTEC School", it: "Scuola MEDTEC" },
  "imtlucca_data.json|Cultural Systems": { en: "Cultural Systems", it: "Sistemi Culturali" },
  "imtlucca_data.json|Systems Science": { en: "Systems Science", it: "Scienza dei Sistemi" },
  "johncabot_data.json|Psychological Science": { en: "Psychological Science", it: "Scienze Psicologiche" },
  "johncabot_data.json|English Literature": { en: "English Literature", it: "Letteratura Inglese" },
  "liuc_data.json|Manufacturing Strategy": { en: "Manufacturing Strategy", it: "Strategia Manifatturiera" },
  "polimi_data.json|Management of Built Environment": { en: "Management of Built Environment", it: "Gestione dell'Ambiente Costruito" },
  "unibz_data.json|Critical Creative Practices": { en: "Critical Creative Practices", it: "Pratiche Creative Critiche" },
  "unibz_data.json|Data Analytics": { en: "Data Analytics", it: "Analisi dei Dati" },
  "unicatt_data.json|Linguistic Computing": { en: "Linguistic Computing", it: "Informatica Linguistica" },
  "unict_data.json|Fisica": { en: "Physics", it: "Fisica" },
  "unict_data.json|Scienze e Tecnologie Agrarie": { en: "Agricultural Sciences and Technologies", it: "Scienze e Tecnologie Agrarie" },
  "unifi_data.json|Geoengineering": { en: "Geoengineering", it: "Geoingegneria" },
  "unige_data.json|Yacht Design": { en: "Yacht Design", it: "Design Nautico" },
  "unipd_data.json|Bioengineering": { en: "Bioengineering", it: "Bioingegneria" },
  "unipd_data.json|Astronomy": { en: "Astronomy", it: "Astronomia" },
  "unipd_data.json|Biotechnologies": { en: "Biotechnologies", it: "Biotecnologie" },
  "unipr_data.json|New Bachelor in English": { en: "New Bachelor in English", it: "Nuova Laurea Triennale in Inglese" },
  "uniroma1_data.json|Classics": { en: "Classics", it: "Studi Classici" },
  "uniroma1_data.json|Biochemistry": { en: "Biochemistry", it: "Biochimica" },
  "unitn_data.json|Agrifood Innovation Management": { en: "Agrifood Innovation Management", it: "Management dell'Innovazione Agroalimentare" },
  "unitn_data.json|Innovation Management (MAIN)": { en: "Innovation Management (MAIN)", it: "Management dell'Innovazione (MAIN)" },
  "unitn_data.json|Cognitive Science": { en: "Cognitive Science", it: "Scienze Cognitive" },
  "unitn_data.json|Human-Computer Interaction": { en: "Human-Computer Interaction", it: "Interazione Uomo-Macchina" },
  "uniud_data.json|Management & Business Analytics": { en: "Management & Business Analytics", it: "Management e Business Analytics" },
  "univaq_data.json|Mathematical Modelling": { en: "Mathematical Modelling", it: "Modellizzazione Matematica" },
  "univaq_data.json|Neurosciences": { en: "Neurosciences", it: "Neuroscienze" },

  // needs_english
  "santanna_data.json|PhD in Law": { en: "PhD in Law", it: "Dottorato in Giurisprudenza" },
  "unibo_data.json|Astronomia": { en: "Astronomy", it: "Astronomia" },
  "unibz_data.json|Social Education": { en: "Social Education", it: "Educazione Sociale" },
  "unibz_data.json|Social Work": { en: "Social Work", it: "Servizio Sociale" },
  "unict_data.json|Ortottica": { en: "Orthoptics", it: "Ortottica" },
  "unict_data.json|Biologia": { en: "Biology", it: "Biologia" },
  "unict_data.json|Filologia Classica": { en: "Classical Philology", it: "Filologia Classica" },
  "unifi_data.json|Biologia": { en: "Biology", it: "Biologia" },
  "unimore_data.json|Digital Education": { en: "Digital Education", it: "Educazione Digitale" },
  "unina_data.json|Biologia": { en: "Biology", it: "Biologia" },
  "unipd_data.json|Astronomia": { en: "Astronomy", it: "Astronomia" },
  "unipd_data.json|DAMS": { en: "DAMS - Drama, Art and Music Studies", it: "DAMS - Discipline delle Arti, della Musica e dello Spettacolo" },
  "unipg_data.json|Biologia": { en: "Biology", it: "Biologia" },
  "unipg_data.json|Italianistica": { en: "Italian Studies", it: "Italianistica" },
  "unipi_data.json|Italianistica": { en: "Italian Studies", it: "Italianistica" },
  "unisi_data.json|Biologia": { en: "Biology", it: "Biologia" },
  "unitn_data.json|Psychology": { en: "Psychology", it: "Psicologia" },
  "uniud_data.json|Italianistica": { en: "Italian Studies", it: "Italianistica" },
};

// Process files
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('_data.json'));
let totalUpdated = 0;

for (const file of files) {
  const filePath = path.join(dataDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let fileUpdated = false;

  if (data.programs) {
    for (const program of data.programs) {
      const key = `${file}|${program.program_name}`;
      const translation = MANUAL_TRANSLATIONS[key];

      if (translation) {
        if (!program.program_name_en && translation.en) {
          program.program_name_en = translation.en;
          fileUpdated = true;
          totalUpdated++;
        }
        if (!program.program_name_it && translation.it) {
          program.program_name_it = translation.it;
          fileUpdated = true;
        }
      }
    }
  }

  if (fileUpdated) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated: ${file}`);
  }
}

console.log(`\nManual translations applied!`);
console.log(`Programs updated: ${totalUpdated}`);
