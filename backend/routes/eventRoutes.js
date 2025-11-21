const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { authenticate } = require('../middleware/auth');

// Organizer routes (require authentication)
router.post('/create', authenticate, eventController.createEvent);
router.get('/my-events', authenticate, eventController.getMyEvents);
router.get('/:eventId', authenticate, eventController.getEventById);
router.put('/:eventId', authenticate, eventController.updateEvent);
router.patch('/:eventId/status', authenticate, eventController.updateEventStatus);
router.delete('/:eventId', authenticate, eventController.deleteEvent);

// Attendee routes (no authentication required)
router.get('/share/:shareLink', eventController.getEventByShareLink);
router.post('/:eventId/verify-access', eventController.verifyAccessCode);

module.exports = router;
