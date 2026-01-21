import { Router } from "express";
import CsvDataService from "../service/csvData.service";
import { autoInjectable } from 'tsyringe';
import csv from 'csv-parser'
import fs from 'node:fs';
import path from 'node:path';
import { TrackingFromCsv , CheckpointFromCsv } from "../interfaces/TrackingFromCsv.interface";

const dataDir = path.join(__dirname, '../../data');

@autoInjectable()
export default class CsvController{
    csvService: CsvDataService;
    router: Router;
    constructor(csvService: CsvDataService){
        this.csvService = csvService;
        this.router = Router();
    }

    routes(){

        this.router.get('/trackings', async (_req, res) =>  {
            const results: TrackingFromCsv[] = [];
            try {
                fs.createReadStream(path.join(dataDir, 'trackings.csv'))
                .pipe(csv({ separator: ';' }))
                .on('data', (data) => results.push(data))
                .on('end', () => {
                    res.json(results)
                });
            } catch (error) {
                console.log(error)
            }
        })

        this.router.get('/checkpoints', async (_req, res) =>  {
            const results: CheckpointFromCsv[] = [];
            try {
                fs.createReadStream(path.join(dataDir, 'checkpoints.csv'))
                .pipe(csv({ separator: ';' }))
                .on('data', (data) => results.push(data))
                .on('end', () => {
                    res.json(results)
                });
            } catch (error) {
                console.log(error)
            }

        })

        this.router.get('/orders', async (_req, res) => {
            const trackings: TrackingFromCsv[] = [];
            const checkpoints: CheckpointFromCsv[] = [];

            try {
                await Promise.all([
                    new Promise<void>((resolve) => {
                        fs.createReadStream(path.join(dataDir, 'trackings.csv'))
                            .pipe(csv({ separator: ';' }))
                            .on('data', (data) => trackings.push(data))
                            .on('end', resolve);
                    }),
                    new Promise<void>((resolve) => {
                        fs.createReadStream(path.join(dataDir, 'checkpoints.csv'))
                            .pipe(csv({ separator: ';' }))
                            .on('data', (data) => checkpoints.push(data))
                            .on('end', resolve);
                    }),
                ]);

                const orders = await this.csvService.getOrders(trackings, checkpoints);
                res.json(orders);
            } catch (error) {
                console.log(error);
                res.status(500).json({ error: 'Failed to fetch orders' });
            }
        })

        return this.router;
    }
}