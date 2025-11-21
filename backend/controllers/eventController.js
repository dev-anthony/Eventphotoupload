const Event = require('../models/Event');

// Create new event
exports.createEvent = async (req, res) => {
  try {
    const organizerId = req.user.id; // From auth middleware
    const { 
      name, 
      date, 
      requireAccessCode, 
      accessCode,
      maxFileSize,
      allowAttendeeDownloads,
      autoCloseEnabled,
      endDate,
      endTime
    } = req.body;

    // Validation
    if (!name || !date) {
      return res.status(400).json({ 
        success: false, 
        message: 'Event name and date are required' 
      });
    }

    if (requireAccessCode && !accessCode) {
      return res.status(400).json({ 
        success: false, 
        message: 'Access code is required when access code is enabled' 
      });
    }

    // Create event
    const result = await Event.create({
      organizerId,
      name,
      date,
      requireAccessCode,
      accessCode,
      maxFileSize,
      allowAttendeeDownloads,
      autoCloseEnabled,
      endDate,
      endTime
    });

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: {
        eventId: result.id,
        shareLink: result.shareLink,
        fullLink: `${req.protocol}://${req.get('host')}/upload/${result.shareLink}`
      }
    });

  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating event',
      error: error.message 
    });
  }
};

// Get all events for logged-in organizer
exports.getMyEvents = async (req, res) => {
  try {
    const organizerId = req.user.id;
    const events = await Event.getByOrganizerId(organizerId);

    // Format response
    const formattedEvents = events.map(event => ({
      id: event.id,
      name: event.name,
      date: event.date,
      status: event.status,
      photoCount: parseInt(event.photo_count) || 0,
      contributorCount: parseInt(event.contributor_count) || 0,
      shareLink: event.share_link,
      requireAccessCode: Boolean(event.require_access_code),
      createdAt: event.created_at
    }));

    res.json({
      success: true,
      data: formattedEvents
    });

  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching events',
      error: error.message 
    });
  }
};

// Get single event details
exports.getEventById = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.getById(eventId);

    if (!event) {
      return res.status(404).json({ 
        success: false, 
        message: 'Event not found' 
      });
    }

    // Check if user is organizer
    if (req.user && event.organizer_id !== req.user.id) {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied' 
      });
    }

    res.json({
      success: true,
      data: {
        id: event.id,
        name: event.name,
        date: event.date,
        status: event.status,
        photoCount: parseInt(event.photo_count) || 0,
        contributorCount: parseInt(event.contributor_count) || 0,
        shareLink: event.share_link,
        requireAccessCode: Boolean(event.require_access_code),
        accessCode: event.access_code,
        maxFileSize: event.max_file_size,
        allowAttendeeDownloads: Boolean(event.allow_attendee_downloads),
        autoCloseEnabled: Boolean(event.auto_close_enabled),
        endDate: event.end_date,
        endTime: event.end_time,
        organizerName: event.organizer_name,
        createdAt: event.created_at
      }
    });

  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching event',
      error: error.message 
    });
  }
};

// Update event settings
exports.updateEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user.id;

    // Check if user is organizer
    const isOrganizer = await Event.isOrganizer(eventId, userId);
    if (!isOrganizer) {
      return res.status(403).json({ 
        success: false, 
        message: 'Only the organizer can update this event' 
      });
    }

    // Update event
    const updated = await Event.update(eventId, req.body);

    if (!updated) {
      return res.status(404).json({ 
        success: false, 
        message: 'Event not found' 
      });
    }

    res.json({
      success: true,
      message: 'Event updated successfully'
    });

  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating event',
      error: error.message 
    });
  }
};

// End/Archive event
exports.updateEventStatus = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { status } = req.body;
    const userId = req.user.id;

    if (!['active', 'ended', 'archived'].includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid status. Must be: active, ended, or archived' 
      });
    }

    // Check if user is organizer
    const isOrganizer = await Event.isOrganizer(eventId, userId);
    if (!isOrganizer) {
      return res.status(403).json({ 
        success: false, 
        message: 'Only the organizer can update event status' 
      });
    }

    const updated = await Event.updateStatus(eventId, status);

    if (!updated) {
      return res.status(404).json({ 
        success: false, 
        message: 'Event not found' 
      });
    }

    res.json({
      success: true,
      message: `Event ${status} successfully`
    });

  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating event status',
      error: error.message 
    });
  }
};

// Delete event
exports.deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user.id;

    // Check if user is organizer
    const isOrganizer = await Event.isOrganizer(eventId, userId);
    if (!isOrganizer) {
      return res.status(403).json({ 
        success: false, 
        message: 'Only the organizer can delete this event' 
      });
    }

    const deleted = await Event.delete(eventId);

    if (!deleted) {
      return res.status(404).json({ 
        success: false, 
        message: 'Event not found' 
      });
    }

    res.json({
      success: true,
      message: 'Event deleted successfully'
    });

  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting event',
      error: error.message 
    });
  }
};

// Get event by share link (for attendees - no auth required)
exports.getEventByShareLink = async (req, res) => {
  try {
    const { shareLink } = req.params;
    const event = await Event.getByShareLink(shareLink);

    if (!event) {
      return res.status(404).json({ 
        success: false, 
        message: 'Event not found or link is invalid' 
      });
    }

    if (event.status !== 'active') {
      return res.status(403).json({ 
        success: false, 
        message: 'This event has ended' 
      });
    }

    // Return limited info for attendees
    res.json({
      success: true,
      data: {
        id: event.id,
        name: event.name,
        date: event.date,
        status: event.status,
        requireAccessCode: Boolean(event.require_access_code),
        allowAttendeeDownloads: Boolean(event.allow_attendee_downloads),
        maxFileSize: event.max_file_size
      }
    });

  } catch (error) {
    console.error('Get event by link error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching event',
      error: error.message 
    });
  }
};

// Verify event access code (for attendees - no auth required)
exports.verifyAccessCode = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { accessCode } = req.body;

    const event = await Event.getById(eventId);

    if (!event) {
      return res.status(404).json({ 
        success: false, 
        message: 'Event not found' 
      });
    }

    if (!event.require_access_code) {
      return res.json({
        success: true,
        message: 'No access code required'
      });
    }

    if (event.access_code === accessCode) {
      return res.json({
        success: true,
        message: 'Access code verified',
        data: {
          eventId: event.id,
          eventName: event.name
        }
      });
    }

    res.status(401).json({
      success: false,
      message: 'Invalid access code'
    });

  } catch (error) {
    console.error('Verify access code error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error verifying access code',
      error: error.message 
    });
  }
};
