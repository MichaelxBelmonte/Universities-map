#!/usr/bin/env node
/**
 * Auto-translate program names using a dictionary of academic terms
 * Handles Italian -> English and English -> Italian translations
 */

const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../data/universities');

// Italian to English dictionary for academic terms
const IT_TO_EN = {
  // Degree types
  'Laurea Triennale in': 'Bachelor\'s Degree in',
  'Laurea Magistrale in': 'Master\'s Degree in',
  'Laurea in': 'Degree in',
  'Baccalaureato in': 'Bachelor\'s in',
  'Licenza in': 'Licentiate in',
  'Dottorato in': 'PhD in',
  'Dottorato di Ricerca in': 'PhD in',
  'Master in': 'Master in',
  'Corso di Laurea in': 'Degree Program in',
  'Corso di Alta Formazione in': 'Advanced Course in',

  // Fields - Engineering
  'Ingegneria': 'Engineering',
  'Ingegneria Aerospaziale': 'Aerospace Engineering',
  'Ingegneria Biomedica': 'Biomedical Engineering',
  'Ingegneria Chimica': 'Chemical Engineering',
  'Ingegneria Chimica e Alimentare': 'Chemical and Food Engineering',
  'Ingegneria Civile': 'Civil Engineering',
  'Ingegneria Civile e Ambientale': 'Civil and Environmental Engineering',
  'Ingegneria Edile': 'Building Engineering',
  'Ingegneria Edile-Architettura': 'Building Engineering-Architecture',
  'Ingegneria Elettrica': 'Electrical Engineering',
  'Ingegneria Elettronica': 'Electronic Engineering',
  'Ingegneria Energetica': 'Energy Engineering',
  'Ingegneria Fisica': 'Engineering Physics',
  'Ingegneria Gestionale': 'Management Engineering',
  'Ingegneria Industriale': 'Industrial Engineering',
  'Ingegneria Informatica': 'Computer Engineering',
  'Ingegneria Informatica e dell\'Automazione': 'Computer and Automation Engineering',
  'Ingegneria Matematica': 'Mathematical Engineering',
  'Ingegneria Meccanica': 'Mechanical Engineering',
  'Ingegneria dei Materiali': 'Materials Engineering',
  'Ingegneria del Cinema e dei Mezzi di Comunicazione': 'Cinema and Media Engineering',
  'Ingegneria dell\'Autoveicolo': 'Automotive Engineering',
  'Ingegneria dell\'Intelligenza Artificiale': 'Artificial Intelligence Engineering',
  'Ingegneria per l\'Ambiente e il Territorio': 'Environmental and Land Engineering',

  // Fields - Sciences
  'Scienze': 'Sciences',
  'Scienze Biologiche': 'Biological Sciences',
  'Scienze Chimiche': 'Chemical Sciences',
  'Scienze della Comunicazione': 'Communication Sciences',
  'Scienze della Formazione Primaria': 'Primary Education Sciences',
  'Scienze dell\'Educazione': 'Educational Sciences',
  'Scienze e Tecniche Psicologiche': 'Psychological Sciences and Techniques',
  'Scienze e Tecnologie Agrarie': 'Agricultural Sciences and Technologies',
  'Scienze e Tecnologie Alimentari': 'Food Science and Technology',
  'Scienze Economiche': 'Economic Sciences',
  'Scienze Geologiche': 'Geological Sciences',
  'Scienze Infermieristiche': 'Nursing Sciences',
  'Scienze Internazionali': 'International Sciences',
  'Scienze Matematiche': 'Mathematical Sciences',
  'Scienze Motorie': 'Sport Sciences',
  'Scienze Motorie e Sportive': 'Sport and Exercise Sciences',
  'Scienze Motorie, Sport e Salute': 'Sport Sciences, Sport and Health',
  'Scienze Naturali': 'Natural Sciences',
  'Scienze Pedagogiche': 'Pedagogical Sciences',
  'Scienze Politiche': 'Political Science',
  'Scienze Religiose': 'Religious Studies',
  'Scienze Sociali': 'Social Sciences',
  'Scienze Statistiche': 'Statistical Sciences',
  'Scienze dei Servizi Giuridici': 'Legal Services Sciences',
  'Scienze della Difesa e della Sicurezza': 'Defence and Security Sciences',
  'Scienze delle Attività Motorie e Sportive': 'Sport and Exercise Sciences',

  // Fields - Medicine/Health
  'Medicina': 'Medicine',
  'Medicina e Chirurgia': 'Medicine and Surgery',
  'Medicina Veterinaria': 'Veterinary Medicine',
  'Odontoiatria e Protesi Dentaria': 'Dentistry and Dental Prosthetics',
  'Farmacia': 'Pharmacy',
  'Chimica e Tecnologia Farmaceutiche': 'Pharmaceutical Chemistry and Technology',
  'Infermieristica': 'Nursing',
  'Fisioterapia': 'Physiotherapy',
  'Ostetricia': 'Midwifery',
  'Logopedia': 'Speech Therapy',
  'Dietistica': 'Dietetics',
  'Podologia': 'Podiatry',
  'Osteopatia': 'Osteopathy',
  'Igiene Dentale': 'Dental Hygiene',
  'Tecniche di Laboratorio Biomedico': 'Biomedical Laboratory Techniques',
  'Tecniche di Radiologia Medica': 'Medical Radiology Techniques',
  'Tecniche Audioprotesiche': 'Hearing Aid Techniques',
  'Assistenza Sanitaria': 'Healthcare Assistance',
  'Educazione Professionale': 'Professional Education',
  'Biotecnologie': 'Biotechnology',
  'Biotecnologie Mediche': 'Medical Biotechnology',

  // Fields - Humanities/Arts
  'Lettere': 'Humanities',
  'Filosofia': 'Philosophy',
  'Storia': 'History',
  'Storia dell\'Arte': 'Art History',
  'Archeologia': 'Archaeology',
  'Lingue': 'Languages',
  'Lingue e Letterature Straniere': 'Foreign Languages and Literatures',
  'Lingue e Culture Europee e del Resto del Mondo': 'European and World Languages and Cultures',
  'Mediazione Linguistica e Culturale': 'Linguistic and Cultural Mediation',
  'Traduzione': 'Translation',
  'Interpretariato': 'Interpreting',
  'Comunicazione': 'Communication',
  'Comunicazione Digitale': 'Digital Communication',
  'Giornalismo': 'Journalism',
  'Arti': 'Arts',
  'Arti Visive': 'Visual Arts',
  'Belle Arti': 'Fine Arts',
  'Teatro': 'Theatre',
  'Cinema': 'Cinema',
  'Musica': 'Music',
  'Musicologia': 'Musicology',
  'Design': 'Design',
  'Design e Comunicazione': 'Design and Communication',
  'Design della moda': 'Fashion Design',
  'Moda': 'Fashion',

  // Fields - Law/Economics
  'Giurisprudenza': 'Law',
  'Diritto': 'Law',
  'Diritto Canonico': 'Canon Law',
  'Economia': 'Economics',
  'Economia e Management': 'Economics and Management',
  'Economia Aziendale': 'Business Administration',
  'Economia e Gestione Aziendale': 'Business Economics and Management',
  'Finanza': 'Finance',
  'Marketing': 'Marketing',
  'Management': 'Management',

  // Fields - Architecture/Planning
  'Architettura': 'Architecture',
  'Architettura del Paesaggio': 'Landscape Architecture',
  'Urbanistica': 'Urban Planning',
  'Pianificazione': 'Planning',
  'Pianificazione Territoriale': 'Territorial Planning',
  'Pianificazione Territoriale, Urbanistica e Paesaggistico-Ambientale': 'Territorial, Urban and Landscape-Environmental Planning',

  // Fields - Other
  'Teologia': 'Theology',
  'Psicologia': 'Psychology',
  'Psicologia Clinica': 'Clinical Psychology',
  'Sociologia': 'Sociology',
  'Antropologia': 'Anthropology',
  'Geografia': 'Geography',
  'Matematica': 'Mathematics',
  'Fisica': 'Physics',
  'Chimica': 'Chemistry',
  'Chimica Industriale': 'Industrial Chemistry',
  'Informatica': 'Computer Science',
  'Informatica Musicale': 'Musical Informatics',
  'Statistica': 'Statistics',
  'Turismo': 'Tourism',
  'Agricoltura': 'Agriculture',
  'Agricoltura Sostenibile': 'Sustainable Agriculture',
  'Veterinaria': 'Veterinary',
  'Relazioni Internazionali': 'International Relations',
  'Missiologia': 'Missiology',

  // Common modifiers
  'e': 'and',
  'del': 'of the',
  'della': 'of the',
  'delle': 'of the',
  'dei': 'of the',
  'per': 'for',
  'con': 'with',

  // Adjectives
  'Internazionale': 'International',
  'Internazionali': 'International',
  'Europeo': 'European',
  'Europee': 'European',
  'Digitale': 'Digital',
  'Sostenibile': 'Sustainable',
  'Industriale': 'Industrial',
  'Alimentare': 'Food',
  'Ambientale': 'Environmental',
  'Territoriale': 'Territorial',
  'Sanitario': 'Healthcare',
  'Medico': 'Medical',
};

// English to Italian dictionary
const EN_TO_IT = {};
// Build reverse dictionary
for (const [it, en] of Object.entries(IT_TO_EN)) {
  EN_TO_IT[en] = it;
}

// Additional EN->IT mappings for programs originally in English
Object.assign(EN_TO_IT, {
  'Aerospace Engineering': 'Ingegneria Aerospaziale',
  'Architectural Design': 'Progettazione Architettonica',
  'Automation Engineering': 'Ingegneria dell\'Automazione',
  'Biomedical Engineering': 'Ingegneria Biomedica',
  'Building and Construction Engineering': 'Ingegneria Edile e delle Costruzioni',
  'Building Engineering/Architecture': 'Ingegneria Edile/Architettura',
  'Chemical Engineering': 'Ingegneria Chimica',
  'Civil Engineering': 'Ingegneria Civile',
  'Communication Design': 'Design della Comunicazione',
  'Computer Science and Engineering': 'Informatica e Ingegneria Informatica',
  'Data Science': 'Scienza dei Dati',
  'Data Science and Business Analytics': 'Data Science e Business Analytics',
  'Electrical Engineering': 'Ingegneria Elettrica',
  'Electronic Engineering': 'Ingegneria Elettronica',
  'Electronics Engineering': 'Ingegneria Elettronica',
  'Energy Engineering': 'Ingegneria Energetica',
  'Engineering of Computing Systems': 'Ingegneria dei Sistemi Informatici',
  'Engineering Science': 'Scienze dell\'Ingegneria',
  'Environmental and Land Planning Engineering': 'Ingegneria per l\'Ambiente e il Territorio',
  'Fashion Design': 'Design della Moda',
  'Industrial Engineering': 'Ingegneria Industriale',
  'Industrial Production Engineering': 'Ingegneria della Produzione Industriale',
  'Interaction Design': 'Design dell\'Interazione',
  'Interior Design': 'Design degli Interni',
  'Management and Production Engineering': 'Ingegneria Gestionale e della Produzione',
  'Materials and Nanotechnology Engineering': 'Ingegneria dei Materiali e delle Nanotecnologie',
  'Mathematical Engineering': 'Ingegneria Matematica',
  'Mechanical Engineering': 'Ingegneria Meccanica',
  'Physics Engineering': 'Ingegneria Fisica',
  'Process Engineering': 'Ingegneria di Processo',
  'Product Design': 'Design del Prodotto',
  'Urban Planning': 'Pianificazione Urbanistica',
  'Architecture': 'Architettura',
  'Management': 'Management',
  'Finance': 'Finanza',
  'Economics': 'Economia',
  'Law': 'Giurisprudenza',
  'Psychology': 'Psicologia',
  'Philosophy': 'Filosofia',
  'History': 'Storia',
  'Mathematics': 'Matematica',
  'Physics': 'Fisica',
  'Chemistry': 'Chimica',
  'Biology': 'Biologia',
  'Computer Science': 'Informatica',
  'Artificial Intelligence': 'Intelligenza Artificiale',
  'Cybersecurity': 'Sicurezza Informatica',
  'Nuclear Engineering': 'Ingegneria Nucleare',
  'Space Engineering': 'Ingegneria Spaziale',
  'Telecommunication Engineering': 'Ingegneria delle Telecomunicazioni',
  'Food Engineering': 'Ingegneria Alimentare',
  'Agricultural Engineering': 'Ingegneria Agraria',
  'International Business': 'Commercio Internazionale',
  'International Relations': 'Relazioni Internazionali',
  'Political Science': 'Scienze Politiche',
  'Communication': 'Comunicazione',
  'Fine Arts': 'Belle Arti',
  'Film and Digital Media': 'Cinema e Media Digitali',
  'Art History': 'Storia dell\'Arte',
  'Archaeology': 'Archeologia',
  'Religious Studies': 'Scienze Religiose',
  'Peace Studies': 'Studi sulla Pace',
  'Food Studies': 'Scienze dell\'Alimentazione',
  'Cultural Heritage': 'Beni Culturali',
  'Sustainable Cultural Heritage': 'Patrimonio Culturale Sostenibile',
  // Master-level specific
  'Aeronautical Engineering': 'Ingegneria Aeronautica',
  'Automotive Engineering': 'Ingegneria dell\'Autoveicolo',
  'Geoinformatics Engineering': 'Ingegneria Geoinformatica',
  'Health Informatics': 'Informatica Sanitaria',
  'High Performance Computing Engineering': 'Ingegneria del Calcolo ad Alte Prestazioni',
  'Landscape Architecture': 'Architettura del Paesaggio',
  'Materials Engineering': 'Ingegneria dei Materiali',
  'Mobility Engineering': 'Ingegneria della Mobilità',
  'Music and Acoustic Engineering': 'Ingegneria del Suono e della Musica',
  'Product Service System Design': 'Design dei Sistemi Prodotto-Servizio',
  'Communications and Computer Networks Engineering': 'Ingegneria delle Reti e delle Comunicazioni',
  'Electronic and Communications Engineering': 'Ingegneria Elettronica e delle Comunicazioni',
  'Environmental and Land Engineering': 'Ingegneria per l\'Ambiente e il Territorio',
  'Energy and Nuclear Engineering': 'Ingegneria Energetica e Nucleare',
  'Engineering and Management': 'Ingegneria Gestionale',
  'Mechatronic Engineering': 'Ingegneria Meccatronica',
  'Nanotechnologies for ICTs': 'Nanotecnologie per le ICT',
  'Physics of Complex Systems': 'Fisica dei Sistemi Complessi',
  'Quantum Engineering': 'Ingegneria Quantistica',
  'ICT for Smart Societies': 'ICT per le Società Intelligenti',
  'Architecture Construction City': 'Architettura Costruzione Città',
  'Architecture for Heritage': 'Architettura per il Patrimonio',
  'Architecture for Sustainability': 'Architettura per la Sostenibilità',
});

function translateItToEn(name) {
  // Try exact match first
  if (IT_TO_EN[name]) return IT_TO_EN[name];

  // Try to match partial terms and build translation
  let result = name;

  // Sort keys by length (longest first) to match more specific terms first
  const sortedKeys = Object.keys(IT_TO_EN).sort((a, b) => b.length - a.length);

  for (const key of sortedKeys) {
    if (result.includes(key)) {
      result = result.replace(key, IT_TO_EN[key]);
    }
  }

  // If no changes were made, return null to indicate manual translation needed
  if (result === name) return null;

  return result;
}

function translateEnToIt(name) {
  // Try exact match first
  if (EN_TO_IT[name]) return EN_TO_IT[name];

  // Try to match partial terms
  let result = name;
  const sortedKeys = Object.keys(EN_TO_IT).sort((a, b) => b.length - a.length);

  for (const key of sortedKeys) {
    if (result.includes(key)) {
      result = result.replace(key, EN_TO_IT[key]);
    }
  }

  if (result === name) return null;
  return result;
}

// Process all files
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('_data.json'));
let totalUpdated = 0;
let needsManual = [];

for (const file of files) {
  const filePath = path.join(dataDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let fileUpdated = false;

  if (data.programs) {
    for (const program of data.programs) {
      const langs = program.language || [];
      const isItalian = langs.includes('Italian');
      const isEnglish = langs.includes('English');

      // If Italian program without English translation
      if (isItalian && !program.program_name_en) {
        const translation = translateItToEn(program.program_name);
        if (translation) {
          program.program_name_en = translation;
          program.program_name_it = program.program_name;
          fileUpdated = true;
          totalUpdated++;
        } else {
          needsManual.push({
            file,
            name: program.program_name,
            type: 'needs_english'
          });
        }
      }

      // If English program without Italian translation
      if (isEnglish && !isItalian && !program.program_name_it) {
        const translation = translateEnToIt(program.program_name);
        if (translation) {
          program.program_name_it = translation;
          program.program_name_en = program.program_name;
          fileUpdated = true;
          totalUpdated++;
        } else {
          needsManual.push({
            file,
            name: program.program_name,
            type: 'needs_italian'
          });
        }
      }

      // If bilingual without translations
      if (isItalian && isEnglish) {
        if (!program.program_name_en) {
          const translation = translateItToEn(program.program_name);
          if (translation) {
            program.program_name_en = translation;
            fileUpdated = true;
            totalUpdated++;
          }
        }
        if (!program.program_name_it) {
          // For bilingual, if name looks Italian, use it
          if (/[àèéìòù]/.test(program.program_name) ||
              program.program_name.includes('dell') ||
              program.program_name.includes('degli')) {
            program.program_name_it = program.program_name;
          } else {
            const translation = translateEnToIt(program.program_name);
            if (translation) {
              program.program_name_it = translation;
              fileUpdated = true;
              totalUpdated++;
            }
          }
        }
      }
    }
  }

  if (fileUpdated) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated: ${file}`);
  }
}

console.log(`\nAuto-translation complete!`);
console.log(`Programs translated: ${totalUpdated}`);
console.log(`Programs needing manual translation: ${needsManual.length}`);

if (needsManual.length > 0) {
  const manualFile = path.join(__dirname, '../data/needs-manual-translation.json');
  fs.writeFileSync(manualFile, JSON.stringify(needsManual, null, 2));
  console.log(`\nManual translations needed saved to: ${manualFile}`);
}
