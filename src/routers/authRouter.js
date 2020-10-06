import { Router } from 'express';
import argon2 from 'argon2';
import User from '../models/userModel';
import registerSchema from '../validation/authRegisterUser';
import schema from '../validation/authRegisterUser';

const router = Router();

router.post('/register', async (req, res, next) => {
    try {
        const { body } = req;
        const validValues = await registerSchema.validateAsync(body);
        const { username, password, email } = validValues;

        const usernameCheck = await User.findOne({ username });
        const emailCheck = await User.findOne({ email });
        if (usernameCheck || emailCheck) {
            return res.status(400).json({ error: 'username or email already exists' });
        }

        const hash = await argon2.hash(password);
        const newUser = new User({ ...validValues, password: hash });
        await newUser.save();

        return res.status(201).json({ success: true });
    } catch (error) {
        if (error.message.startsWith('Invalid')) {
            return res.status(400).json({ error: error.message });
        }

        next(error);
    }
})

export default router;