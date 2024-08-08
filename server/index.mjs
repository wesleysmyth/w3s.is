import 'dotenv/config';
import fs from 'fs';
import express from 'express';
import cors from 'cors';
import initAPI from './api.mjs';

const app = express();
const port = 3000;
const origin = process.env.ENVIRONMENT === 'development' ? 'http://localhost:8080' : 'https://w3s.is';

// middleware
app.use(express.json());
app.use(cors({
    origin,
    credentials: true,
    optionSuccessStatus: 200,
 }));

initAPI(app);

app.listen(port, () => console.log(`Server is running on port ${port}`));
