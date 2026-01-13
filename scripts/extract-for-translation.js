#!/usr/bin/env node
/**
 * Extract all programs that need translation from university JSON files
 * Outputs a JSON file with programs grouped for batch translation
 */

const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../data/universities');
const outputFile = path.join(__dirname, '../data/programs-to-translate.json');

// Read all university JSON files
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('_data.json'));

const programsToTranslate = {
  // Programs in Italian that need English translation
  needsEnglish: [],
  // Programs in English that need Italian translation
  needsItalian: [],
  // Stats
  stats: {
    totalFiles: 0,
    totalPrograms: 0,
    alreadyTranslated: 0,
    needsEnglish: 0,
    needsItalian: 0
  }
};

for (const file of files) {
  const filePath = path.join(dataDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const programs = data.programs || [];

  programsToTranslate.stats.totalFiles++;
  programsToTranslate.stats.totalPrograms += programs.length;

  for (const program of programs) {
    // Skip if already has both translations
    if (program.program_name_en && program.program_name_it) {
      programsToTranslate.stats.alreadyTranslated++;
      continue;
    }

    const langs = program.language || [];
    const isItalianProgram = langs.includes('Italian') && !langs.includes('English');
    const isEnglishProgram = langs.includes('English') && !langs.includes('Italian');
    const isBilingual = langs.includes('Italian') && langs.includes('English');

    const entry = {
      file: file,
      university_id: program.university_id,
      program_name: program.program_name,
      language: langs,
      degree_level: program.degree_level
    };

    // Determine what translation is needed
    if (isItalianProgram && !program.program_name_en) {
      // Italian program needs English translation
      programsToTranslate.needsEnglish.push(entry);
      programsToTranslate.stats.needsEnglish++;
    } else if (isEnglishProgram && !program.program_name_it) {
      // English program needs Italian translation
      programsToTranslate.needsItalian.push(entry);
      programsToTranslate.stats.needsItalian++;
    } else if (isBilingual) {
      // Bilingual - might need both, check what's missing
      if (!program.program_name_en) {
        programsToTranslate.needsEnglish.push(entry);
        programsToTranslate.stats.needsEnglish++;
      }
      if (!program.program_name_it) {
        programsToTranslate.needsItalian.push(entry);
        programsToTranslate.stats.needsItalian++;
      }
    }
  }
}

// Write output
fs.writeFileSync(outputFile, JSON.stringify(programsToTranslate, null, 2));

console.log('Extraction complete!');
console.log(`Total files: ${programsToTranslate.stats.totalFiles}`);
console.log(`Total programs: ${programsToTranslate.stats.totalPrograms}`);
console.log(`Already translated: ${programsToTranslate.stats.alreadyTranslated}`);
console.log(`Needs English translation: ${programsToTranslate.stats.needsEnglish}`);
console.log(`Needs Italian translation: ${programsToTranslate.stats.needsItalian}`);
console.log(`\nOutput written to: ${outputFile}`);
