
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Download, Trash2, Copy, Archive, Image as ImageIcon, Loader } from 'lucide-react';
import Navbar from '../components/Navbar';
import { eventApi } from '../utils/api';
import { photoApi } from '../utils/photoApi';

export default function EventDetails() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingPhoto, setDeletingPhoto] = useState(null);

  useEffect(() => {
    fetchEventDetails();
  }, [eventId]);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch both event details and photos
      const [eventResponse, photosResponse] = await Promise.all([
        eventApi.getEventById(eventId),
        photoApi.getEventPhotos(eventId)
      ]);
      
      if (eventResponse.success) {
        setEvent(eventResponse.data);
      }

      if (photosResponse.success) {
        setPhotos(photosResponse.data.photos);
        console.log('Fetched photos:', photosResponse.data.photos.length);
      }
    } catch (err) {
      setError(err.message || 'Failed to load event');
      console.error('Error fetching event:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyShareLink = () => {
    const shareLink = `${window.location.origin}/upload/${event.shareLink}`;
    navigator.clipboard.writeText(shareLink);
    alert('Link copied to clipboard!');
  };

  const handleDownloadAll = async () => {
    try {
      await photoApi.downloadAllPhotos(eventId);
    } catch (err) {
      alert(err.message || 'Failed to download photos');
    }
  };

  const handleDeletePhoto = async (photoId) => {
    if (window.confirm('Delete this photo?')) {
      try {
        setDeletingPhoto(photoId);
        const response = await photoApi.deletePhoto(photoId);
        
        if (response.success) {
          // Remove photo from state
          setPhotos(photos.filter(p => p.id !== photoId));
          
          // Refresh event details to update counts
          const eventResponse = await eventApi.getEventById(eventId);
          if (eventResponse.success) {
            setEvent(eventResponse.data);
          }
        }
      } catch (err) {
        alert(err.message || 'Failed to delete photo');
      } finally {
        setDeletingPhoto(null);
      }
    }
  };

  const handleArchiveEvent = async () => {
    if (window.confirm('Archive this event?')) {
      try {
        await eventApi.updateEventStatus(eventId, 'archived');
        alert('Event archived successfully');
        navigate('/dashboard');
      } catch (err) {
        alert(err.message || 'Failed to archive event');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center">
        <Loader className="w-12 h-12 text-white animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-500/20 backdrop-blur-md rounded-3xl p-8 border border-red-400/30 text-center">
            <p className="text-white text-xl mb-4">{error}</p>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl transition"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!event) return null;

  const shareLink = `${window.location.origin}/upload/${event.shareLink}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Event Header */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/20 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {event.name}
              </h1>
              <p className="text-white/70">
                {new Date(event.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleDownloadAll}
                disabled={photos.length === 0}
                className="bg-gradient-to-r from-green-400 to-emerald-400 text-white px-4 py-3 rounded-2xl font-bold hover:from-green-500 hover:to-emerald-500 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-5 h-5" />
                <span className="hidden sm:inline">Download All</span>
              </button>
              <button
                onClick={handleArchiveEvent}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-3 rounded-2xl transition"
              >
                <Archive className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Share Link */}
          <div className="bg-white/10 rounded-2xl p-4">
            <p className="text-white/70 text-sm mb-2">Share this link with attendees:</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={shareLink}
                readOnly
                className="flex-1 bg-white/20 border border-white/30 rounded-xl px-4 py-2 text-white text-sm"
              />
              <button
                onClick={copyShareLink}
                className="bg-gradient-to-r from-yellow-300 to-orange-300 text-purple-900 px-4 py-2 rounded-xl font-bold hover:from-yellow-400 hover:to-orange-400 transition flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                <span className="hidden sm:inline">Copy</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
            <p className="text-white/70 text-sm mb-1">Total Photos</p>
            <p className="text-white text-3xl font-bold">{photos.length}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
            <p className="text-white/70 text-sm mb-1">Contributors</p>
            <p className="text-white text-3xl font-bold">
              {new Set(photos.map(p => p.contributor)).size}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
            <p className="text-white/70 text-sm mb-1">Status</p>
            <p className="text-green-300 text-2xl font-bold capitalize">{event.status}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
            <p className="text-white/70 text-sm mb-1">Created</p>
            <p className="text-white text-2xl font-bold">
              {new Date(event.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Photos Grid */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6">
            Photo Gallery ({photos.length})
          </h2>
          
          {photos.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((photo) => (
                <div 
                  key={photo.id} 
                  className="group relative aspect-square rounded-2xl overflow-hidden bg-white/10"
                >
                  <img
                    src={photoApi.getPhotoUrl(photo.id)}
                    alt={`Photo by ${photo.contributor}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleDeletePhoto(photo.id)}
                      disabled={deletingPhoto === photo.id}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-xl transition disabled:opacity-50"
                    >
                      {deletingPhoto === photo.id ? (
                        <Loader className="w-5 h-5 animate-spin" />
                      ) : (
                        <Trash2 className="w-5 h-5" />
                      )}
                    </button>
                    <button 
                      onClick={() => window.open(photoApi.getPhotoUrl(photo.id), '_blank')}
                      className="bg-white hover:bg-gray-100 text-gray-900 p-2 rounded-xl transition"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <p className="text-white text-sm font-medium">{photo.contributor}</p>
                    <p className="text-white/60 text-xs">
                      {new Date(photo.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <ImageIcon className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <p className="text-white/70 text-lg">No photos uploaded yet</p>
              <p className="text-white/50 text-sm mt-2">Share the link above to start collecting photos!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}