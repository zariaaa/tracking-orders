import 'reflect-metadata';
import express, { Express } from 'express';
import cors from 'cors';
import path from 'node:path';
import { container } from 'tsyringe';
import CsvController from './controller/CsvController';

const app: Express = express();

const csvController = container.resolve(CsvController);
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// API routes
app.use('/api', csvController.routes());

// Serve static frontend files in production
const clientBuildPath = path.join(__dirname, '../../client/build');
app.use(express.static(clientBuildPath));

// Fallback to index.html for client-side routing
app.get('*', (_req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
});

app.listen(port, () => console.log(`⚡️[server]: Server is running at PORT ${port}`))
