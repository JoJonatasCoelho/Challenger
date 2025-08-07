import express from 'express';
import userRoutes from './routes/userRoutes.js';
import authMiddleware from './middlewares/authMiddleware.js';

const app = express();

const API_PREFIX = '/api/v1'

app.use(express.json());
app.use("/api", (req, res, next) => {
    next();
});
app.use(API_PREFIX + "/auth", userRoutes);
export default app;