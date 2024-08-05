import 'dotenv/config';
import fs from 'fs';
import express from 'express';
import OpenAI from 'openai';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const baseMessages = [
  {
    role: 'system',
    content: 'You are a helpful assistant.'
  },
  // {
  //   role: '',
  //   content: 'Tell me about Wesley Tate Smith'
  // },
  // {
  //   role: 'user',
  //   content: 'Tell me about Wesley Tate Smith'
  // }
];
const userMessages = {};
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

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
    userMessages[ token ] = baseMessages.concat([ currentMessage ]);
  } else {
    userMessages[ token ].push(currentMessage);
  }

  const allMessages = userMessages[ token ];
  const completion = await openai.chat.completions.create({
    messages: allMessages,
    model: 'gpt-4o-mini',
  });
  const response = completion.choices[ 0 ].message.content;

  userMessages[ token ].push({ role: 'assistant', content: response });

  res.status(201).send(response);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
