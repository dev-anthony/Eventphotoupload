const db = require('../db');

class Photo {
  // Create photos table
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS photos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        event_id INT NOT NULL,
        contributor_name VARCHAR(255),
        contributor_session_id VARCHAR(255),
        file_name VARCHAR(255) NOT NULL,
        file_path VARCHAR(500) NOT NULL,
        file_size INT,
        mime_type VARCHAR(100),
        uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
        INDEX idx_event (event_id),
        INDEX idx_session (contributor_session_id)
      )
    `;
    return db.query(query);
  }

  // Upload photo
  static async create(photoData) {
    const {
      eventId,
      contributorName = 'Anonymous',
      contributorSessionId,
      fileName,
      filePath,
      fileSize,
      mimeType
    } = photoData;

    const query = `
      INSERT INTO photos (
        event_id, contributor_name, contributor_session_id,
        file_name, file_path, file_size, mime_type
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(query, [
      eventId,
      contributorName,
      contributorSessionId,
      fileName,
      filePath,
      fileSize,
      mimeType
    ]);

    return {
      id: result.insertId
    };
  }

  // Get all photos for an event
  static async getByEventId(eventId) {
    const query = `
      SELECT 
        id, event_id, contributor_name, file_name,
        file_path, file_size, uploaded_at
      FROM photos
      WHERE event_id = ?
      ORDER BY uploaded_at DESC
    `;

    const [photos] = await db.query(query, [eventId]);
    return photos;
  }

  // Get photos by session (for attendees to see their own)
  static async getBySessionId(eventId, sessionId) {
    const query = `
      SELECT 
        id, event_id, contributor_name, file_name,
        file_path, file_size, uploaded_at
      FROM photos
      WHERE event_id = ? AND contributor_session_id = ?
      ORDER BY uploaded_at DESC
    `;

    const [photos] = await db.query(query, [eventId, sessionId]);
    return photos;
  }

  // Delete photo
  static async delete(photoId) {
    const query = `DELETE FROM photos WHERE id = ?`;
    const [result] = await db.query(query, [photoId]);
    return result.affectedRows > 0;
  }

  // Get photo by ID
  static async getById(photoId) {
    const query = `SELECT * FROM photos WHERE id = ?`;
    const [photos] = await db.query(query, [photoId]);
    return photos[0];
  }

  // Check if photo belongs to session
  static async belongsToSession(photoId, sessionId) {
    const query = `
      SELECT contributor_session_id 
      FROM photos 
      WHERE id = ?
    `;
    const [photos] = await db.query(query, [photoId]);
    return photos.length > 0 && photos[0].contributor_session_id === sessionId;
  }

  // Get event stats
  static async getEventStats(eventId) {
    const query = `
      SELECT 
        COUNT(id) as total_photos,
        COUNT(DISTINCT contributor_session_id) as total_contributors
      FROM photos
      WHERE event_id = ?
    `;

    const [stats] = await db.query(query, [eventId]);
    return stats[0];
  }
}

module.exports = Photo;
