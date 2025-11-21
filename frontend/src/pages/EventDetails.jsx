import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Download, Trash2, Copy, Share2, Archive, Image as ImageIcon } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function EventDetails() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [user] = useState({ username: 'John Doe' });

  useEffect(() => {
    // Mock data - replace with API call
    setEvent({
      id: eventId,
      name: 'Summer Wedding 2024',
      date: '2024-07-15',
      status: 'active',
      shareLink: `${window.location.origin}/upload/${eventId}`,
    });

    setPhotos([
      { id: '1', url: 'https://via.placeholder.com/300', contributor: 'Alice', uploadedAt: '2024-07-15T10:30:00' },
      { id: '2', url: 'https://via.placeholder.com/300', contributor: 'Bob', uploadedAt: '2024-07-15T11:45:00' },
      { id: '3', url: 'https://via.placeholder.com/300', contributor: 'Charlie', uploadedAt: '2024-07-15T12:15:00' },
    ]);
  }, [eventId]);

  const copyShareLink = () => {
    navigator.clipboard.writeText(event.shareLink);
    alert('Link copied to clipboard!');
  };

  const handleDownloadAll = () => {
    alert('Downloading all photos as ZIP...');
  };

  const handleDeletePhoto = (photoId) => {
    if (confirm('Delete this photo?')) {
      setPhotos(photos.filter(p => p.id !== photoId));
    }
  };

  if (!event) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      <Navbar user={user} />
      
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
                className="bg-gradient-to-r from-green-400 to-emerald-400 text-white px-4 py-3 rounded-2xl font-bold hover:from-green-500 hover:to-emerald-500 transition flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                <span className="hidden sm:inline">Download All</span>
              </button>
              <button
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
                value={event.shareLink}
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
            <p className="text-white text-2xl font-bold">Today</p>
          </div>
        </div>

        {/* Photos Grid */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6">Photo Gallery</h2>
          
          {photos.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((photo) => (
                <div key={photo.id} className="group relative aspect-square rounded-2xl overflow-hidden bg-white/10">
                  <img
                    src={photo.url}
                    alt="Event photo"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleDeletePhoto(photo.id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-xl transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <button className="bg-white hover:bg-gray-100 text-gray-900 p-2 rounded-xl transition">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <p className="text-white text-sm font-medium">{photo.contributor}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <ImageIcon className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <p className="text-white/70 text-lg">No photos uploaded yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}