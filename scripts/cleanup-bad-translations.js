#!/usr/bin/env node
/**
 * Clean up bad translations - remove mixed language and corrupted translations
 * The auto-translate made many errors, better to fall back to original names
 */

const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../data/universities');

// Patterns that indicate a bad English translation (contains Italian)
const BAD_ENGLISH_PATTERNS = [
  /\s+e\s+/i,           // Italian "and" between words
  /\s+di\s+/i,          // Italian "of"
  /\s+del\s+/i,         // Italian "of the" (masc)
  /\s+della\s+/i,       // Italian "of the" (fem)
  /\s+dei\s+/i,         // Italian "of the" (plural)
  /\s+delle\s+/i,       // Italian "of the" (fem plural)
  /\s+per\s+/i,         // Italian "for"
  /\s+il\s+/i,          // Italian "the" (masc)
  /\s+la\s+/i,          // Italian "the" (fem)
  /\s+lo\s+/i,          // Italian "the" (before s+consonant)
  /\s+le\s+/i,          // Italian "the" (fem plural)
  /\s+gli\s+/i,         // Italian "the" (masc plural before vowel)
  /of thel/i,           // Corrupted translation
  /of thelo/i,          // Corrupted translation
  /Sciandnces/i,        // Corrupted "Scienze" → "Sciences"
  /Disciplinand/i,      // Corrupted pattern
  /Artsficiale/i,       // Corrupted pattern
  /Landtter/i,          // Corrupted "Letter"
  /Gandstione/i,        // Corrupted "Gestione"
  /Cooforaz/i,          // Corrupted pattern
  /for la\s/i,          // Mixed "for" + Italian article
  /for il\s/i,          // Mixed "for" + Italian article
  /for le\s/i,          // Mixed "for" + Italian article
  /for l'/i,            // Mixed "for" + Italian article
  /for i\s/i,           // Mixed "for" + Italian article
];

// Patterns that indicate a bad Italian translation (is just English)
const BAD_ITALIAN_PATTERNS = [
  /^Engineering$/i,
  /^Computer Science$/i,
  /^Business/i,
  /\sScience\s/i,
  /\sEngineering\s/i,
  /\sManagement\s/i,
  /\sBusiness\s/i,
  /^Economics$/i,
  /^Law$/i,
  /^Medicine$/i,
  /^Psychology$/i,
  /^Philosophy$/i,
  /^History$/i,
];

// Common Italian words that indicate valid Italian translation
const ITALIAN_INDICATORS = [
  'Ingegneria', 'Scienze', 'Economia', 'Giurisprudenza', 'Medicina',
  'Psicologia', 'Filosofia', 'Storia', 'Lettere', 'Informatica',
  'Architettura', 'Design', 'Gestione', 'Laurea', 'Magistrale',
  'Triennale', 'Ambiente', 'Territorio', 'Comunicazione'
];

function isBadEnglishTranslation(name, original) {
  if (!name) return false;

  // If it's identical to original and original looks Italian, it's bad
  if (name === original && ITALIAN_INDICATORS.some(w => original.includes(w))) {
    return true;
  }

  // Check for bad patterns
  for (const pattern of BAD_ENGLISH_PATTERNS) {
    if (pattern.test(name)) {
      return true;
    }
  }

  return false;
}

function isBadItalianTranslation(name, original) {
  if (!name) return false;

  // If it's identical to original and original looks English, it's bad
  if (name === original) {
    const hasItalian = ITALIAN_INDICATORS.some(w => original.includes(w));
    if (!hasItalian) {
      return true; // Original is English, Italian translation shouldn't be identical
    }
  }

  // Check for bad patterns (pure English names)
  for (const pattern of BAD_ITALIAN_PATTERNS) {
    if (pattern.test(name) && !ITALIAN_INDICATORS.some(w => name.includes(w))) {
      return true;
    }
  }

  return false;
}

// Process all files
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('_data.json'));
let totalCleaned = 0;
let filesModified = 0;

// Skip polimi - already manually fixed
const skipFiles = ['polimi_data.json'];

for (const file of files) {
  if (skipFiles.includes(file)) continue;

  const filePath = path.join(dataDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let fileModified = false;

  if (data.programs) {
    for (const program of data.programs) {
      const original = program.program_name;

      // Check English translation
      if (program.program_name_en && isBadEnglishTranslation(program.program_name_en, original)) {
        delete program.program_name_en;
        fileModified = true;
        totalCleaned++;
      }

      // Check Italian translation
      if (program.program_name_it && isBadItalianTranslation(program.program_name_it, original)) {
        delete program.program_name_it;
        fileModified = true;
        totalCleaned++;
      }
    }
  }

  if (fileModified) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    filesModified++;
    console.log(`Cleaned: ${file}`);
  }
}

console.log(`\nRemoved ${totalCleaned} bad translations from ${filesModified} files`);
