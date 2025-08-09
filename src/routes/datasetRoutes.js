import { Router } from 'express';
import { upload } from '../middlewares/uploadMiddleware.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { datasetController } from '../controllers/datasetController.js';

const router = Router();

// POST /api/v1/datasets/upload
router.post('/upload', authMiddleware, upload.single('file'), datasetController);

export default router;
