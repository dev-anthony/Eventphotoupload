import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000/api';
const API_BASE_URL = 'https://event-photo-api.onrender.com/api';


// Configure axios defaults
axios.defaults.withCredentials = true;

// Event API calls
export const eventApi = {
  // Create new event
  createEvent: async (eventData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/events/create`, eventData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error creating event' };
    }
  },

  // Get all my events
  getMyEvents: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/events/my-events`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error fetching events' };
    }
  },

  // Get single event by ID
  getEventById: async (eventId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/events/${eventId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error fetching event' };
    }
  },

  // Update event settings
  updateEvent: async (eventId, updateData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/events/${eventId}`, updateData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error updating event' };
    }
  },

  // Update event status
  updateEventStatus: async (eventId, status) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/events/${eventId}/status`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error updating event status' };
    }
  },

  // Delete event
  deleteEvent: async (eventId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/events/${eventId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error deleting event' };
    }
  },

  // Get event by share link (for attendees)
  getEventByShareLink: async (shareLink) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/events/share/${shareLink}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error fetching event' };
    }
  },

  // Verify access code
  verifyAccessCode: async (eventId, accessCode) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/events/${eventId}/verify-access`, { accessCode });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error verifying access code' };
    }
  }
};