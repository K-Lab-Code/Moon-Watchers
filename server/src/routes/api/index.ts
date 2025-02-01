import { Router } from 'express';
import { chartRouter } from './chart-routes.js';
import { eventRouter } from './event-routes.js';
import { searchRouter } from './search-routes.js';
import { userRouter } from './user-routes.js';
import { authenticateToken } from '../../middleware/auth.js';

const router = Router();

router.use('/chart', chartRouter);
// authenticationToken makes sure tokens used make valid.
router.use('/event', authenticateToken, eventRouter);
router.use('/search', searchRouter);
router.use('/users', userRouter);

export default router;
