#!/usr/bin/env node
/**
 * Apply translations from the translated JSON file back to university data files
 */

const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../data/universities');
const translationsFile = path.join(__dirname, '../data/translations-completed.json');

if (!fs.existsSync(translationsFile)) {
  console.error('Error: translations-completed.json not found!');
  console.error('Please create this file with the translated program names.');
  process.exit(1);
}

const translations = JSON.parse(fs.readFileSync(translationsFile, 'utf8'));

// Build a lookup map: file -> program_name -> translations
const translationMap = new Map();

// Process needsEnglish translations
for (const item of translations.needsEnglish || []) {
  if (!item.program_name_en) continue;

  const key = `${item.file}|${item.program_name}`;
  if (!translationMap.has(key)) {
    translationMap.set(key, {});
  }
  translationMap.get(key).program_name_en = item.program_name_en;
  // For Italian programs, the original name IS the Italian name
  translationMap.get(key).program_name_it = item.program_name;
}

// Process needsItalian translations
for (const item of translations.needsItalian || []) {
  if (!item.program_name_it) continue;

  const key = `${item.file}|${item.program_name}`;
  if (!translationMap.has(key)) {
    translationMap.set(key, {});
  }
  translationMap.get(key).program_name_it = item.program_name_it;
  // For English programs, the original name IS the English name
  translationMap.get(key).program_name_en = item.program_name;
}

// Now update each university file
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('_data.json'));
let updatedFiles = 0;
let updatedPrograms = 0;

for (const file of files) {
  const filePath = path.join(dataDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let fileUpdated = false;

  if (data.programs) {
    for (const program of data.programs) {
      const key = `${file}|${program.program_name}`;
      const trans = translationMap.get(key);

      if (trans) {
        if (trans.program_name_en && !program.program_name_en) {
          program.program_name_en = trans.program_name_en;
          fileUpdated = true;
          updatedPrograms++;
        }
        if (trans.program_name_it && !program.program_name_it) {
          program.program_name_it = trans.program_name_it;
          fileUpdated = true;
          if (!trans.program_name_en) updatedPrograms++; // Don't double count
        }
      }
    }
  }

  if (fileUpdated) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    updatedFiles++;
    console.log(`Updated: ${file}`);
  }
}

console.log(`\nDone!`);
console.log(`Files updated: ${updatedFiles}`);
console.log(`Programs translated: ${updatedPrograms}`);
