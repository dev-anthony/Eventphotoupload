const db = require('../db'); // Using your existing db connection

class Event {
  // Create events table
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        organizer_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        date DATE NOT NULL,
        status ENUM('active', 'ended', 'archived') DEFAULT 'active',
        access_code VARCHAR(50),
        require_access_code BOOLEAN DEFAULT FALSE,
        max_file_size INT DEFAULT 5,
        allow_attendee_downloads BOOLEAN DEFAULT TRUE,
        auto_close_enabled BOOLEAN DEFAULT FALSE,
        end_date DATE,
        end_time TIME,
        share_link VARCHAR(255) UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (organizer_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_organizer (organizer_id),
        INDEX idx_share_link (share_link)
      )
    `;
    return db.query(query);
  }

  // Create a new event
  static async create(eventData) {
    const { 
      organizerId, 
      name, 
      date, 
      requireAccessCode = false, 
      accessCode = null,
      maxFileSize = 5,
      allowAttendeeDownloads = true,
      autoCloseEnabled = false,
      endDate = null,
      endTime = null
    } = eventData;

    // Generate unique share link
    const shareLink = Event.generateShareLink();

    const query = `
      INSERT INTO events (
        organizer_id, name, date, require_access_code, access_code,
        max_file_size, allow_attendee_downloads, auto_close_enabled,
        end_date, end_time, share_link
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(query, [
      organizerId,
      name,
      date,
      requireAccessCode,
      accessCode,
      maxFileSize,
      allowAttendeeDownloads,
      autoCloseEnabled,
      endDate,
      endTime,
      shareLink
    ]);

    return {
      id: result.insertId,
      shareLink
    };
  }

  // Get all events for an organizer with photo stats
  static async getByOrganizerId(organizerId) {
    const query = `
      SELECT 
        e.*,
        COUNT(DISTINCT p.id) as photo_count,
        COUNT(DISTINCT p.contributor_name) as contributor_count
      FROM events e
      LEFT JOIN photos p ON e.id = p.event_id
      WHERE e.organizer_id = ?
      GROUP BY e.id
      ORDER BY e.created_at DESC
    `;

    const [events] = await db.query(query, [organizerId]);
    return events;
  }

  // Get single event by ID
  static async getById(eventId) {
    const query = `
      SELECT 
        e.*,
        COUNT(DISTINCT p.id) as photo_count,
        COUNT(DISTINCT p.contributor_name) as contributor_count,
        u.username as organizer_name
      FROM events e
      LEFT JOIN photos p ON e.id = p.event_id
      LEFT JOIN users u ON e.organizer_id = u.id
      WHERE e.id = ?
      GROUP BY e.id
    `;

    const [events] = await db.query(query, [eventId]);
    return events[0];
  }

  // Get event by share link
  static async getByShareLink(shareLink) {
    const query = `SELECT * FROM events WHERE share_link = ?`;
    const [events] = await db.query(query, [shareLink]);
    return events[0];
  }

  // Update event
  static async update(eventId, updateData) {
    const fields = [];
    const values = [];

    Object.keys(updateData).forEach(key => {
      // Convert camelCase to snake_case
      const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
      fields.push(`${snakeKey} = ?`);
      values.push(updateData[key]);
    });

    values.push(eventId);

    const query = `UPDATE events SET ${fields.join(', ')} WHERE id = ?`;
    const [result] = await db.query(query, values);
    return result.affectedRows > 0;
  }

  // Update event status
  static async updateStatus(eventId, status) {
    const query = `UPDATE events SET status = ? WHERE id = ?`;
    const [result] = await db.query(query, [status, eventId]);
    return result.affectedRows > 0;
  }

  // Delete event
  static async delete(eventId) {
    const query = `DELETE FROM events WHERE id = ?`;
    const [result] = await db.query(query, [eventId]);
    return result.affectedRows > 0;
  }

  // Generate unique share link (8 characters)
  static generateShareLink() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  // Check if user is organizer
  static async isOrganizer(eventId, userId) {
    const query = `SELECT organizer_id FROM events WHERE id = ?`;
    const [events] = await db.query(query, [eventId]);
    return events.length > 0 && events[0].organizer_id === userId;
  }
}

module.exports = Event;
