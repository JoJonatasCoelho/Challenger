import AuthService from '../services/authService.js';
import { registerSchema, loginSchema } from '../schemas/authSchema.js';
import { z } from 'zod';

const authService = new AuthService();

const register = async (req, res) => {
    try {
        const validatedData = registerSchema.parse(req.body);
        const user = await authService.register(validatedData);
        res.status(201).json(user);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.errors });
        }
        res.status(error.statusCode || 500).json({ message: error.message });
    }
}

const login = async (req, res) => {
    try {
        const validatedData = loginSchema.parse(req.body);
        const result = await authService.login(validatedData);
        res.status(200).json(result);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.message });
        }
        res.status(error.statusCode || 500).json({ message: error.message });
    }
}

const me = (req, res) => {
    res.json({ user: req.user });
};

export { register, login, me };