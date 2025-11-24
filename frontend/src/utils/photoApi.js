
import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000/api';
const API_BASE_URL = 'https://event-photo-api.onrender.com/api';


// Configure axios defaults
axios.defaults.withCredentials = true;

// Photo API calls
export const photoApi = {
  // Upload photos to event
  uploadPhotos: async (eventId, files, contributorName = 'Anonymous') => {
    try {
      const formData = new FormData();
      
      files.forEach(file => {
        formData.append('photos', file);
      });
      
      formData.append('contributorName', contributorName);

      const response = await axios.post(
        `${API_BASE_URL}/photos/${eventId}/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log('Upload progress:', percentCompleted);
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error uploading photos' };
    }
  },

  getEventPhotos: async (eventId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/photos/${eventId}/gallery`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error fetching photos' };
    }
  },

  getMyPhotos: async (eventId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/photos/${eventId}/my-photos`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error fetching your photos' };
    }
  },

  getPhotoUrl: (photoId) => {
    return `${API_BASE_URL}/photos/image/${photoId}`;
  },

  downloadPhoto: async (photoId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/photos/download/${photoId}`,
        { responseType: 'blob' }
      );
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `photo-${photoId}.jpg`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      return { success: true };
    } catch (error) {
      throw error.response?.data || { message: 'Error downloading photo' };
    }
  },

  deletePhoto: async (photoId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/photos/${photoId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error deleting photo' };
    }
  },

  downloadAllPhotos: async (eventId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/photos/${eventId}/download-all`,
        { responseType: 'blob' }
      );
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `event-photos.zip`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      return { success: true };
    } catch (error) {
      throw error.response?.data || { message: 'Error downloading photos' };
    }
  }
}