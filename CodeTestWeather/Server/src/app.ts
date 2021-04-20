import config from './config';
import express from 'express';
import Logger from './loaders/logger';
import fs from 'fs';
import path from "path";


/**
 * Application entry
 *
 * @author: Eric
 */
async function startServer() {
    const app = express();

    await require('./loaders').default({ expressApp: app });

    app.listen(config.port, () => {
        const bannerPath = path.join(__dirname, './banner.txt');
        Logger.info(fs.readFileSync(bannerPath,'utf8'));

        Logger.info(`✌ API Application Running at: http://localhost:${config.port}`);
    }).on('error', err => {
        Logger.error(err);
        process.exit(1);
    });
}

startServer();