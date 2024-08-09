import OpenAI from 'openai';
import { v4 as uuidv4 } from 'uuid';
import { formatResumeText } from './pdf.mjs';
import getBaseMessages from './baseMessages.mjs';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const resumeSections = await formatResumeText();
const baseMessages = getBaseMessages(resumeSections);
const userMessages = {};

export default function initAPI(app) {
    app.get('/', (req, res) => {
        res.send('Welcome to my server!');
    });

    app.get('/token', (req, res) => {
        const uuid = uuidv4();
        res.json(uuid);
    });

    app.get('/resume', (req, res) => {
        res.download('./assets/Wesley Smith resumé.pdf', `Wesley Smith resumé.pdf`, (err) => {
            if (err) {
                console.log('err', err);
            }
        });
    });

    app.post('/ai', async (req, res) => {
        const token = req.headers.authorization;
        const text = req.body.text;
        const trimmedText = text.trim();
        const currentMessage = { role: 'user', content: trimmedText };

        if (!userMessages[ token ]) {
            userMessages[ token ] = baseMessages.concat([currentMessage]);
        } else {
            userMessages[ token ].push(currentMessage);
        }

        const allMessages = userMessages[ token ];
        const completion = await openai.chat.completions.create({
            messages: allMessages,
            model: 'gpt-4o',
        });
        const response = completion.choices[0].message.content;

        userMessages[ token ].push({ role: 'assistant', content: response });

        res.status(201).send(response);
    });
}
