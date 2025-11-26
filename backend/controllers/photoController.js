// ============================================
// FILE: controllers/photoController.js - FIXED
// ============================================
const Photo = require('../models/Photo');
const Event = require('../models/Event');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads/photos');
    
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (error) {
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `photo-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 20 * 1024 * 1024 // 20MB max
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Upload photo(s) - FIXED TO HANDLE SHARE LINK
exports.uploadPhotos = async (req, res) => {
  try {
    const { eventId } = req.params; // This could be either ID or shareLink
    const { contributorName } = req.body;

    console.log('Upload attempt for eventId/shareLink:', eventId);

    // Try to get event - check if it's a share link or numeric ID
    let event;
    
    // Check if eventId is numeric (actual ID) or alphanumeric (share link)
    if (isNaN(eventId)) {
      // It's a share link
      event = await Event.getByShareLink(eventId);
      console.log('Looked up by share link:', eventId);
    } else {
      // It's a numeric ID
      event = await Event.getById(eventId);
      console.log('Looked up by ID:', eventId);
    }

    if (!event) {
      console.log('Event not found for:', eventId);
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    if (event.status !== 'active') {
      return res.status(403).json({
        success: false,
        message: 'This event is no longer accepting uploads'
      });
    }

    // Get or create session ID for attendee
    let sessionId = req.session.attendeeId;
    if (!sessionId) {
      sessionId = `attendee-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      req.session.attendeeId = sessionId;
    }

    console.log('Session ID:', sessionId);

    // Check if files were uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      });
    }

    console.log('Files received:', req.files.length);

    // Process each uploaded file
    const uploadedPhotos = [];
    for (const file of req.files) {
      const photoData = {
        eventId: event.id, // Use the actual event ID from database
        contributorName: contributorName || 'Anonymous',
        contributorSessionId: sessionId,
        fileName: file.originalname,
        filePath: file.path,
        fileSize: file.size,
        mimeType: file.mimetype
      };

      const result = await Photo.create(photoData);
      uploadedPhotos.push({
        id: result.id,
        fileName: file.originalname
      });
    }

    console.log('Photos uploaded successfully:', uploadedPhotos.length);

    res.status(201).json({
      success: true,
      message: `${uploadedPhotos.length} photo(s) uploaded successfully`,
      data: {
        photos: uploadedPhotos,
        sessionId
      }
    });

  } catch (error) {
    console.error('Upload photos error:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading photos',
      error: error.message
    });
  }
};

// Get all photos for an event - FIXED TO HANDLE SHARE LINK
exports.getEventPhotos = async (req, res) => {
  try {
    const { eventId } = req.params;

    // Try to get event - check if it's a share link or numeric ID
    let event;
    if (isNaN(eventId)) {
      event = await Event.getByShareLink(eventId);
    } else {
      event = await Event.getById(eventId);
    }

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Get all photos using actual event ID
    const photos = await Photo.getByEventId(event.id);

    // Get current session ID
    const currentSessionId = req.session.attendeeId || req.session.userId;

    // Format response
    const formattedPhotos = photos.map(photo => ({
      id: photo.id,
      contributor: photo.contributor_name,
      fileName: photo.file_name,
      url: `/api/photos/image/${photo.id}`,
      uploadedAt: photo.uploaded_at,
      isMine: currentSessionId && photo.contributor_session_id === currentSessionId
    }));

    res.json({
      success: true,
      data: {
        photos: formattedPhotos,
        totalPhotos: photos.length
      }
    });

  } catch (error) {
    console.error('Get event photos error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching photos',
      error: error.message
    });
  }
};

// Get user's own photos - FIXED TO HANDLE SHARE LINK
exports.getMyPhotos = async (req, res) => {
  try {
    const { eventId } = req.params;
    const sessionId = req.session.attendeeId || req.session.userId;

    if (!sessionId) {
      return res.status(401).json({
        success: false,
        message: 'Session not found'
      });
    }

    // Try to get event - check if it's a share link or numeric ID
    let event;
    if (isNaN(eventId)) {
      event = await Event.getByShareLink(eventId);
    } else {
      event = await Event.getById(eventId);
    }

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    const photos = await Photo.getBySessionId(event.id, sessionId);

    const formattedPhotos = photos.map(photo => ({
      id: photo.id,
      contributor: photo.contributor_name,
      fileName: photo.file_name,
      url: `/api/photos/image/${photo.id}`,
      uploadedAt: photo.uploaded_at,
      isMine: true
    }));

    res.json({
      success: true,
      data: {
        photos: formattedPhotos,
        totalPhotos: photos.length
      }
    });

  } catch (error) {
    console.error('Get my photos error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching photos',
      error: error.message
    });
  }
};

// Serve photo image
// exports.getPhotoImage = async (req, res) => {
//   try {
//     const { photoId } = req.params;

//     const photo = await Photo.getById(photoId);
//     if (!photo) {
//       return res.status(404).json({
//         success: false,
//         message: 'Photo not found'
//       });
//     }

//     try {
//       await fs.access(photo.file_path);
//       res.sendFile(path.resolve(photo.file_path));
//     } catch (error) {
//       return res.status(404).json({
//         success: false,
//         message: 'Photo file not found'
//       });
//     }

//   } catch (error) {
//     console.error('Get photo image error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error retrieving photo',
//       error: error.message
//     });
//   }
// };
// Serve photo image - UPDATED WITH BETTER LOGGING
exports.getPhotoImage = async (req, res) => {
  try {
    const { photoId } = req.params;
    
    console.log('=== PHOTO IMAGE REQUEST ===');
    console.log('Photo ID:', photoId);

    const photo = await Photo.getById(photoId);
    if (!photo) {
      console.log('❌ Photo not found in database');
      return res.status(404).json({
        success: false,
        message: 'Photo not found'
      });
    }

    console.log('✓ Photo found:', {
      id: photo.id,
      fileName: photo.file_name,
      filePath: photo.file_path,
      uploadedAt: photo.uploaded_at
    });

    // Check if file exists
    try {
      await fs.access(photo.file_path);
      console.log('✓ File exists on disk');
      
      // Set proper headers
      res.setHeader('Content-Type', photo.mime_type || 'image/jpeg');
      res.setHeader('Content-Disposition', `inline; filename="${photo.file_name}"`);
      
      // Send the file
      res.sendFile(path.resolve(photo.file_path));
    } catch (fileError) {
      console.error('❌ File not found on disk:', photo.file_path);
      console.error('File error:', fileError.message);
      
      return res.status(404).json({
        success: false,
        message: 'Photo file not found on server',
        debug: process.env.NODE_ENV === 'development' ? {
          photoId,
          fileName: photo.file_name,
          expectedPath: photo.file_path,
          error: fileError.message
        } : undefined
      });
    }

  } catch (error) {
    console.error('❌ Get photo image error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving photo',
      error: error.message
    });
  }
};

// Delete photo (organizer only)
exports.deletePhoto = async (req, res) => {
  try {
    const { photoId } = req.params;
    const userId = req.user?.id;

    const photo = await Photo.getById(photoId);
    if (!photo) {
      return res.status(404).json({
        success: false,
        message: 'Photo not found'
      });
    }

    if (userId) {
      const isOrganizer = await Event.isOrganizer(photo.event_id, userId);
      if (!isOrganizer) {
        return res.status(403).json({
          success: false,
          message: 'Only the event organizer can delete photos'
        });
      }
    } else {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    try {
      await fs.unlink(photo.file_path);
    } catch (error) {
      console.error('Error deleting file:', error);
    }

    await Photo.delete(photoId);

    res.json({
      success: true,
      message: 'Photo deleted successfully'
    });

  } catch (error) {
    console.error('Delete photo error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting photo',
      error: error.message
    });
  }
};

// Download photo
exports.downloadPhoto = async (req, res) => {
  try {
    const { photoId } = req.params;
    const sessionId = req.session.attendeeId || req.session.userId;

    const photo = await Photo.getById(photoId);
    if (!photo) {
      return res.status(404).json({
        success: false,
        message: 'Photo not found'
      });
    }

    const event = await Event.getById(photo.event_id);
    if (!event.allow_attendee_downloads) {
      return res.status(403).json({
        success: false,
        message: 'Downloads are not allowed for this event'
      });
    }

    const isOwner = photo.contributor_session_id === sessionId;
    const isOrganizer = req.user && await Event.isOrganizer(photo.event_id, req.user.id);

    if (!isOwner && !isOrganizer) {
      return res.status(403).json({
        success: false,
        message: 'You can only download your own photos'
      });
    }

    res.download(photo.file_path, photo.file_name);

  } catch (error) {
    console.error('Download photo error:', error);
    res.status(500).json({
      success: false,
      message: 'Error downloading photo',
      error: error.message
    });
  }
};

// Download all photos as ZIP
exports.downloadAllPhotos = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const isOrganizer = await Event.isOrganizer(eventId, userId);
    if (!isOrganizer) {
      return res.status(403).json({
        success: false,
        message: 'Only the event organizer can download all photos'
      });
    }

    const event = await Event.getById(eventId);
    const photos = await Photo.getByEventId(eventId);

    if (photos.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No photos to download'
      });
    }

    const archiver = require('archiver');
    const archive = archiver('zip', {
      zlib: { level: 9 }
    });

    res.attachment(`${event.name}-photos.zip`);
    archive.pipe(res);

    for (const photo of photos) {
      try {
        await fs.access(photo.file_path);
        archive.file(photo.file_path, { name: photo.file_name });
      } catch (error) {
        console.error(`File not found: ${photo.file_path}`);
      }
    }

    archive.finalize();

  } catch (error) {
    console.error('Download all photos error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating download',
      error: error.message
    });
  }
};

exports.upload = upload;