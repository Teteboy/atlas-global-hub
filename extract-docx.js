const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

const docxPath = path.join(__dirname, 'Contenu site internet.docx');
const outputPath = path.join(__dirname, 'Contenu site internet.txt');

mammoth.extractRawText({ path: docxPath })
  .then(result => {
    fs.writeFileSync(outputPath, result.value, 'utf8');
    console.log('Text extracted successfully to:', outputPath);
    console.log('\n--- CONTENT ---\n');
    console.log(result.value);
  })
  .catch(err => {
    console.error('Error extracting text:', err);
  });
