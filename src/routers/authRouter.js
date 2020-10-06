import { Router } from 'express';
import User from '../models/userModel';

const router = Router();

router.post('/register', async (req, res, next) => {
    try {
        const { body } = req;
        console.log(body);

        return res.end();
    } catch (error) {
        next(error);
    }
})

export default router;