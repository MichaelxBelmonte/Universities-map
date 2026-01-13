#!/usr/bin/env node
/**
 * Fix all corrupted translations across all university files
 * The auto-translate script incorrectly replaced "e" with "and" inside words
 */

const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../data/universities');

// Corruption patterns to fix (corrupted → correct)
const CORRUPTION_FIXES = [
  // Engineering variants
  ['Enginandering', 'Engineering'],
  ['enginandering', 'engineering'],

  // Chemical variants
  ['Chandmical', 'Chemical'],
  ['chandmical', 'chemical'],
  ['Chandmistry', 'Chemistry'],
  ['chandmistry', 'chemistry'],
  ['Chandm', 'Chem'],
  ['chandm', 'chem'],

  // Electronic/Electrical variants
  ['Elandctronic', 'Electronic'],
  ['elandctronic', 'electronic'],
  ['Elandctrical', 'Electrical'],
  ['elandctrical', 'electrical'],
  ['Elandc', 'Elec'],
  ['elandc', 'elec'],

  // Aerospace variants
  ['Aandrospace', 'Aerospace'],
  ['aandrospace', 'aerospace'],

  // International variants
  ['Intandrnational', 'International'],
  ['intandrnational', 'international'],
  ['Intandr', 'Inter'],
  ['intandr', 'inter'],

  // Environmental variants
  ['Environmandntal', 'Environmental'],
  ['environmandntal', 'environmental'],

  // Interior variants
  ['Intandrior', 'Interior'],
  ['intandrior', 'interior'],

  // Material variants
  ['Matandrials', 'Materials'],
  ['matandrials', 'materials'],

  // Mathematical variants
  ['Mathandmatical', 'Mathematical'],
  ['mathandmatical', 'mathematical'],

  // Mechanical variants
  ['Mandchanical', 'Mechanical'],
  ['mandchanical', 'mechanical'],

  // Biomedical variants
  ['Biomanddical', 'Biomedical'],
  ['biomanddical', 'biomedical'],

  // Energy variants
  ['Enandrgy', 'Energy'],
  ['enandrgy', 'energy'],

  // Design variants
  ['Dandsign', 'Design'],
  ['dandsign', 'design'],

  // Architecture variants
  ['Architandctural', 'Architectural'],
  ['architandctural', 'architectural'],
  ['Architandcture', 'Architecture'],
  ['architandcture', 'architecture'],

  // Management variants
  ['Managandment', 'Management'],
  ['managandment', 'management'],

  // Service variants
  ['Sandrvizio', 'Servizio'],
  ['sandrvizio', 'servizio'],
  ['Sandrvice', 'Service'],
  ['sandrvice', 'service'],

  // Conservation variants
  ['Consandrvazione', 'Conservazione'],
  ['consandrvazione', 'conservazione'],
  ['Consandrvation', 'Conservation'],
  ['consandrvation', 'conservation'],

  // Research variants
  ['Ricandrca', 'Ricerca'],
  ['ricandrca', 'ricerca'],

  // Government variants
  ['Govandrnment', 'Government'],
  ['govandrnment', 'government'],
  ['Govandrnance', 'Governance'],
  ['govandrnance', 'governance'],

  // Communication variants
  ['Commandrcio', 'Commercio'],
  ['commandrcio', 'commercio'],
  ['Communication', 'Communication'],

  // Therapy variants
  ['Tandrapia', 'Terapia'],
  ['tandrapia', 'terapia'],

  // Planning variants
  ['Tandrritorial', 'Territorial'],
  ['tandrritorial', 'territorial'],

  // Philology variants
  ['Filologia Modandrna', 'Filologia Moderna'],
  ['modandrna', 'moderna'],

  // Integrated variants
  ['Intandgrated', 'Integrated'],
  ['intandgrated', 'integrated'],

  // Bioinformatics variants
  ['Bioinpermatics', 'Bioinformatics'],
  ['bioinpermatics', 'bioinformatics'],

  // Transformative variants
  ['Transpermative', 'Transformative'],
  ['transpermative', 'transformative'],

  // Quaternary variants
  ['Quatandrnario', 'Quaternario'],
  ['quatandrnario', 'quaternario'],

  // Biodiversity variants
  ['Biodivandrsità', 'Biodiversità'],
  ['biodivandrsità', 'biodiversità'],

  // Cities variants
  ['Citiands', 'Cities'],
  ['citiands', 'cities'],

  // Economics variants
  ['Ewithomics', 'Economics'],
  ['ewithomics', 'economics'],

  // Multimedia variants
  ['multimanddiale', 'multimediale'],
  ['multimanddial', 'multimedial'],

  // Generic patterns - be careful with these
  ['andd', 'ed'],
  ['andl', 'el'],
  ['andr', 'er'],
];

// Process all files
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('_data.json'));
let totalFixed = 0;
let filesModified = 0;

for (const file of files) {
  // Skip polimi - already fixed
  if (file === 'polimi_data.json') {
    continue;
  }

  const filePath = path.join(dataDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;

  // Apply all corruption fixes
  for (const [corrupted, correct] of CORRUPTION_FIXES) {
    if (content.includes(corrupted)) {
      const regex = new RegExp(corrupted, 'g');
      const matches = content.match(regex);
      if (matches) {
        totalFixed += matches.length;
      }
      content = content.replace(regex, correct);
    }
  }

  // Only write if content changed
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    filesModified++;
    console.log(`Fixed: ${file}`);
  }
}

console.log(`\nFixed ${totalFixed} corruptions across ${filesModified} files`);
