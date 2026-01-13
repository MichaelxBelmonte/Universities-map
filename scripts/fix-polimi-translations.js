#!/usr/bin/env node
/**
 * Fix PoliMi translations - the auto-translate script broke English names
 * and put wrong Italian translations
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/universities/polimi_data.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Correct translations for PoliMi programs
const POLIMI_TRANSLATIONS = {
  // Bachelor programs
  "Aerospace Engineering": { en: "Aerospace Engineering", it: "Ingegneria Aerospaziale" },
  "Architectural Design": { en: "Architectural Design", it: "Progettazione Architettonica" },
  "Automation Engineering": { en: "Automation Engineering", it: "Ingegneria dell'Automazione" },
  "Biomedical Engineering": { en: "Biomedical Engineering", it: "Ingegneria Biomedica" },
  "Building and Construction Engineering": { en: "Building and Construction Engineering", it: "Ingegneria Edile e delle Costruzioni" },
  "Building Engineering/Architecture": { en: "Building Engineering/Architecture", it: "Ingegneria Edile/Architettura" },
  "Chemical Engineering": { en: "Chemical Engineering", it: "Ingegneria Chimica" },
  "Civil Engineering": { en: "Civil Engineering", it: "Ingegneria Civile" },
  "Communication Design": { en: "Communication Design", it: "Design della Comunicazione" },
  "Electrical Engineering": { en: "Electrical Engineering", it: "Ingegneria Elettrica" },
  "Electronic Engineering": { en: "Electronic Engineering", it: "Ingegneria Elettronica" },
  "Energy Engineering": { en: "Energy Engineering", it: "Ingegneria Energetica" },
  "Engineering of Computing Systems": { en: "Engineering of Computing Systems", it: "Ingegneria Informatica" },
  "Engineering Science": { en: "Engineering Science", it: "Scienze dell'Ingegneria" },
  "Environmental and Land Planning Engineering": { en: "Environmental and Land Planning Engineering", it: "Ingegneria per l'Ambiente e il Territorio" },
  "Fashion Design": { en: "Fashion Design", it: "Design della Moda" },
  "Industrial Engineering": { en: "Industrial Engineering", it: "Ingegneria Industriale" },
  "Industrial Production Engineering": { en: "Industrial Production Engineering", it: "Ingegneria della Produzione Industriale" },
  "Interaction Design": { en: "Interaction Design", it: "Design dell'Interazione" },
  "Interior Design": { en: "Interior Design", it: "Design degli Interni" },
  "Management and Production Engineering": { en: "Management and Production Engineering", it: "Ingegneria Gestionale della Produzione" },
  "Materials and Nanotechnology Engineering": { en: "Materials and Nanotechnology Engineering", it: "Ingegneria dei Materiali e delle Nanotecnologie" },
  "Mathematical Engineering": { en: "Mathematical Engineering", it: "Ingegneria Matematica" },
  "Mechanical Engineering": { en: "Mechanical Engineering", it: "Ingegneria Meccanica" },
  "MEDTEC - Medicine and Biomedical Engineering": { en: "MEDTEC - Medicine and Biomedical Engineering", it: "MEDTEC - Medicina e Ingegneria Biomedica" },
  "Physics Engineering": { en: "Physics Engineering", it: "Ingegneria Fisica" },
  "Process Engineering": { en: "Process Engineering", it: "Ingegneria di Processo" },
  "Product Design": { en: "Product Design", it: "Design del Prodotto" },
  "Urban Planning: Cities, Environment & Landscapes": { en: "Urban Planning: Cities, Environment & Landscapes", it: "Urbanistica: Città, Ambiente e Paesaggio" },

  // Master programs
  "Aeronautical Engineering": { en: "Aeronautical Engineering", it: "Ingegneria Aeronautica" },
  "Agricultural Engineering": { en: "Agricultural Engineering", it: "Ingegneria Agraria" },
  "Architectural Design and History": { en: "Architectural Design and History", it: "Progettazione Architettonica e Storia" },
  "Architectural Engineering": { en: "Architectural Engineering", it: "Ingegneria Edile-Architettura" },
  "Architecture": { en: "Architecture", it: "Architettura" },
  "Automation and Control Engineering": { en: "Automation and Control Engineering", it: "Ingegneria dell'Automazione e del Controllo" },
  "Bioinformatics for Computational Genomics": { en: "Bioinformatics for Computational Genomics", it: "Bioinformatica per la Genomica Computazionale" },
  "Building Engineering for Sustainability": { en: "Building Engineering for Sustainability", it: "Ingegneria Edile per la Sostenibilità" },
  "Civil Engineering for Risk Mitigation": { en: "Civil Engineering for Risk Mitigation", it: "Ingegneria Civile per la Mitigazione del Rischio" },
  "Computer Science and Engineering": { en: "Computer Science and Engineering", it: "Informatica e Ingegneria Informatica" },
  "Cyber Risk Strategy and Governance": { en: "Cyber Risk Strategy and Governance", it: "Strategia e Governance del Rischio Cyber" },
  "Design & Engineering": { en: "Design & Engineering", it: "Design e Ingegneria" },
  "Design for the Fashion System": { en: "Design for the Fashion System", it: "Design per il Sistema Moda" },
  "Digital and Interaction Design": { en: "Digital and Interaction Design", it: "Design Digitale e dell'Interazione" },
  "Electronics Engineering": { en: "Electronics Engineering", it: "Ingegneria Elettronica" },
  "Engineering Physics": { en: "Engineering Physics", it: "Ingegneria Fisica" },
  "Food Engineering": { en: "Food Engineering", it: "Ingegneria Alimentare" },
  "Geoinformatics Engineering": { en: "Geoinformatics Engineering", it: "Ingegneria Geoinformatica" },
  "Health Informatics": { en: "Health Informatics", it: "Informatica Sanitaria" },
  "High Performance Computing Engineering": { en: "High Performance Computing Engineering", it: "Ingegneria del Calcolo ad Alte Prestazioni" },
  "Industrial Safety and Risk Engineering": { en: "Industrial Safety and Risk Engineering", it: "Ingegneria della Sicurezza Industriale e del Rischio" },
  "Integrated Product Design": { en: "Integrated Product Design", it: "Design Integrato del Prodotto" },
  "Interior and Spatial Design": { en: "Interior and Spatial Design", it: "Design degli Interni e degli Spazi" },
  "Landscape Architecture - Land Landscape Heritage": { en: "Landscape Architecture - Land Landscape Heritage", it: "Architettura del Paesaggio - Patrimonio Paesaggistico" },
  "Management Engineering": { en: "Management Engineering", it: "Ingegneria Gestionale" },
  "Management of Built Environment": { en: "Management of Built Environment", it: "Gestione dell'Ambiente Costruito" },
  "Materials Engineering and Nanotechnology": { en: "Materials Engineering and Nanotechnology", it: "Ingegneria dei Materiali e Nanotecnologie" },
  "Mobility Engineering": { en: "Mobility Engineering", it: "Ingegneria della Mobilità" },
  "Music and Acoustic Engineering": { en: "Music and Acoustic Engineering", it: "Ingegneria del Suono e della Musica" },
  "Nuclear Engineering": { en: "Nuclear Engineering", it: "Ingegneria Nucleare" },
  "Product Service System Design": { en: "Product Service System Design", it: "Design dei Sistemi Prodotto-Servizio" },
  "Space Engineering": { en: "Space Engineering", it: "Ingegneria Spaziale" },
  "Sustainable Architecture and Landscape Design": { en: "Sustainable Architecture and Landscape Design", it: "Architettura Sostenibile e Design del Paesaggio" },
  "Telecommunication Engineering": { en: "Telecommunication Engineering", it: "Ingegneria delle Telecomunicazioni" },
  "Transformative Sustainability": { en: "Transformative Sustainability", it: "Sostenibilità Trasformativa" },
  "Urban Planning and Policy Design": { en: "Urban Planning and Policy Design", it: "Urbanistica e Design delle Politiche" }
};

let updated = 0;

for (const program of data.programs) {
  const originalName = program.program_name;
  const translation = POLIMI_TRANSLATIONS[originalName];

  if (translation) {
    program.program_name_en = translation.en;
    program.program_name_it = translation.it;
    updated++;
    console.log(`Fixed: ${originalName}`);
  } else {
    console.log(`WARNING: No translation for: ${originalName}`);
  }
}

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`\nFixed ${updated} programs in polimi_data.json`);
