import express from 'express';
import userRoutes from './routes/userRoutes.js';
import datasetRoutes from './routes/datasetRoutes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swaggerGenerator.js';
import morgan from 'morgan'

const app = express();

app.use(morgan('dev'))

const API_PREFIX = '/api/v1';

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

app.use("/api", (req, res, next) => {
    next();
});

app.use(API_PREFIX + "/auth", userRoutes);
app.use(API_PREFIX + "/datasets", datasetRoutes);

export default app;