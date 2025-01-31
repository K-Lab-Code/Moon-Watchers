import express from 'express';
import {
    search
} from '../../controllers/search-controller.js';

const router = express.Router();

// POST /search - searchs results for moon and weather data
router.post('/', search);


export { router as searchRouter };