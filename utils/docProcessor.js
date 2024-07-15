const { readFileSync } = require('fs');
const { Document } = require('docx');

async function extractTextFromDoc(filePath) {
  const arrayBuffer = readFileSync(filePath);
  const doc = new Document(arrayBuffer);
  let text = '';
  doc.getParagraphs().forEach(paragraph => {
    text += paragraph.getText() + '\n';
  });
  return text;
}

module.exports = { extractTextFromDoc };
