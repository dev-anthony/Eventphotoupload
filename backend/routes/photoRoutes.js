const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photoController');
const { authenticate } = require('../middleware/auth');

// Public routes (no auth required for attendees)
router.post(
  '/:eventId/upload',
  photoController.upload.array('photos', 10), // Max 10 photos at once
  photoController.uploadPhotos
);

router.get('/:eventId/gallery', photoController.getEventPhotos);
router.get('/:eventId/my-photos', photoController.getMyPhotos);
router.get('/image/:photoId', photoController.getPhotoImage);
router.get('/download/:photoId', photoController.downloadPhoto);

// Organizer routes (require authentication)
router.delete('/:photoId', authenticate, photoController.deletePhoto);
router.get('/:eventId/download-all', authenticate, photoController.downloadAllPhotos);

module.exports = router;
