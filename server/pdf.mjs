import fs from 'fs';
import pdf from 'pdf-parse/lib/pdf-parse.js';

async function extractTextFromPDF(filePath) {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
}

export async function formatResumeText() {
    const text = await extractTextFromPDF('./assets/Wesley Tate Smith resume.pdf');
    const sections = text.split('\n\n').map(section => section.trim()).filter(section => section.length > 0);
    return sections;
}