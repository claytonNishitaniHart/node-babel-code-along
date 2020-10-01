import express from 'express';
import { connect, disconnect } from './database';
import Marketplaces from './models/marketplaceModel';

connect();

const PORT = 5000;
const server = express();

server.use(express.json());

server.get('/api/marketplaces', async (req, res) => {
    try {
        const marketplaces = await Marketplaces.find({});
        console.log(marketplaces);
        return res.json(marketplaces);
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
})

server.post('/api/marketplaces', async (req, res) => {
    try {
        const { body } = req;
        if (!body.hasOwnProperty('name') || !body.hasOwnProperty('description') || !body.hasOwnProperty('owner')) {
            return res.status(400).json({ error: 'Marketplace name, description, owner required' });
        }

        const marketplaceExists = await Marketplaces.findOne({ name: body.name });

        if (marketplaceExists) {
            return res.status(400).json({ error: 'Marketplace name already in use' });
        }

        const marketplace = new Marketplaces(body);

        await marketplace.save();

        return res.status(200).json({
            success: true,
            data: marketplace
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
});

server.put('/api/marketplaces/:id', async (req, res) => {
    try {
        const { body } = req;
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'Marketplace id is required' });
        }

        if (!body.hasOwnProperty('name') || !body.hasOwnProperty('description') || !body.hasOwnProperty('owner')) {
            return res.status(400).json({ error: 'Marketplace name, description, owner required' });
        }

        const marketplace = await Marketplaces.findByIdAndUpdate(id, body, { new: true }).lean();
        delete marketplace.__v;

        return res.status(200).json({
            success: true,
            data: marketplace
        });
    } catch (error) {
        console.error(error);

        if (error.kind == 'ObjectId' && error.path == '_id') {
            return res.status(400).json({ error: 'Invalid ID parameter' });
        }

        return res.status(500).send(error);
    }
})

server.use('*', (req, res) => {
    return res.status(404).json({ error: 'Route not found' });
})

server.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
})