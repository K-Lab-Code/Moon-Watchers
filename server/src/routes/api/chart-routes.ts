import express from 'express';
import {
 getMoonChart
} from '../../controllers/chart-controller.js';

const router = express.Router();

// GET /chart - Get Moon Chart
router.get('/', getMoonChart);

export { router as chartRouter };