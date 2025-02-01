import express from 'express';
import {
 getAllEvents,
 saveEvent,
 deleteEvent
} from '../../controllers/event-controller.js';

const router = express.Router();

// GET /event - Get a list of events
router.get('/', getAllEvents);

// POST /event - Create a new saved event
router.post('/', saveEvent);

// DELETE /event/:id - Delete a event by id
router.delete('/:id', deleteEvent);

export { router as eventRouter };