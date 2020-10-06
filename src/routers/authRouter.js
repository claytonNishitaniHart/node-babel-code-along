import { Router } from 'express';
import User from '../models/userModel';

const router = Router();

router.post('/register', async (req, res, next) => {
    try {
        const { body } = req;
        console.log(body);

        if (!body.hasOwnProperty('username') || !body.hasOwnProperty('password') || !body.hasOwnProperty('email')) {
            return res.status(400).json({ error: 'username, password, and email required' });
        }

        const { username, password, email } = body;

        const usernameCheck = await User.findOne({ username });
        const emailCheck = await User.findOne({ email });

        if (usernameCheck || emailCheck) {
            return res.status(400).json({ error: 'username or email already exists' });
        }

        const newUser = new User(body);
        await newUser.save();

        return res.status(201).json({ success: true });
    } catch (error) {
        next(error);
    }
})

export default router;