import { prisma } from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const db = prisma;

const SALT_ROUNDS = 10;

export default class AuthService {
    async register(userData) {
        const existingUser = await db.user.findUnique({
            where: { email: userData.email },
        });
        if (existingUser) {
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }
        const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);
        const { hashed_password, ...newUser } = await db.user.create({
            data: {
                email: userData.email,
                hashed_password: hashedPassword,
                name: userData.name,
            },
        });
        if (!newUser) {
            const error = new Error('User registration failed');
            error.statusCode = 400;
            throw error;
        }
        return newUser;
    }

    async login(credentials) {
        const { email, password } = credentials;
        const user = await db.user.findUnique({
            where: { email },
        });
        if (!user) {
            const error = new Error('Invalid Credentials');
            error.statusCode = 401;
            throw error;
        }
        const isPasswordValid = await bcrypt.compare(password, user.hashed_password);
        if (!isPasswordValid) {
            const error = new Error('Invalid Credentials');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        const { hashed_password, refresh_token, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token };
    }
}