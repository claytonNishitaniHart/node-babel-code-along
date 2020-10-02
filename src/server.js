import express from 'express';
import { connect, disconnect } from './database';
import exampleRouter from './routers/exampleRouter';
import marketplacesRouter from "./routers/marketplacesRouter";

connect();

const PORT = 5000;
const server = express();

server.use(express.json());
server.use('/api', exampleRouter);
server.use('/api/marketplaces', marketplacesRouter);

server.use('*', (req, res) => {
    return res.status(404).json({ error: 'Route not found' });
})

server.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
})