import 'dotenv/config';
import fs from 'fs';
import express from 'express';
import cors from 'cors';
import initAPI from './api.mjs';

const app = express();
const port = 3000;

// middleware
app.use(express.json());
app.use(cors());

initAPI(app);

app.listen(port, () => console.log(`Server is running on port ${port}`));
