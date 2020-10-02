import { Router } from 'express';
const router = Router();

router.get('/example', (req, res) => {
    return res.send('example');
});

export default router;