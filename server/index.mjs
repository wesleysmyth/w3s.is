import 'dotenv/config';
import express from 'express';
import OpenAI from 'openai';
import cors from 'cors'
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: 'You are a helpful assistant.' }],
    model: 'gpt-4o-mini',
  });

  console.log(completion.choices);
}

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});

app.post('/ai', async (req, res) => {
  const text = req.body.text;
  const trimmedText = text.trim();
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: trimmedText }],
    model: 'gpt-4o-mini',
  });
  const response = completion.choices[ 0 ].message.content;

  res.status(201).send(response);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
