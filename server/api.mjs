import OpenAI from 'openai';
import { v4 as uuidv4 } from 'uuid';
import { formatResumeText } from './pdf.mjs';
import getBaseMessages from './baseMessages.mjs';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const resumeSections = await formatResumeText();
const baseMessages = getBaseMessages(resumeSections);
const userMessages = {};

export default function initAPI(app) {
    
}

