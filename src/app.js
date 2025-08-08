import express from 'express';
import userRoutes from './routes/userRoutes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swaggerGenerator.js';

const app = express();

const API_PREFIX = '/api/v1';

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use("/api", (req, res, next) => {
    next();
});
app.use(API_PREFIX + "/auth", userRoutes);
export default app;