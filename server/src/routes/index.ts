import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.use('/auth', authRoutes);
// authenticationToken makes sure tokens used make valid.
router.use('/api', authenticateToken, apiRoutes);

export default router;
