const marketplaceRouter = (Router, Marketplaces) => {
    const router = Router();

    router.get('/', async (req, res, next) => {
        try {
            const marketplaces = await Marketplaces.find({});
            console.log(marketplaces);
            return res.json(marketplaces);
        } catch (error) {
            next(error);
        }
    })

    router.post('/', async (req, res, next) => {
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
            next(error);
        }
    });

    router.put('/:id', async (req, res, next) => {
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
            if (error.kind == 'ObjectId' && error.path == '_id') {
                return res.status(400).json({ error: 'Invalid ID parameter' });
            }

            next(error);
        }
    });

    router.delete('/:id', async (req, res, next) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ error: 'Marketplace id is required' });
            }

            const marketplace = await Marketplaces.findByIdAndDelete(id);

            return res.status(200).json({
                success: true,
                data: marketplace
            });
        } catch (error) {
            if (error.kind == 'ObjectId' && error.path == '_id') {
                return res.status(400).json({ error: 'Invalid ID parameter' });
            }

            next(error);
        }
    })

    return router;
}

export default marketplaceRouter;