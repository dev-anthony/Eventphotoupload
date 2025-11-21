import React from 'react';
import { Calendar, Image, Users, ExternalLink, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function EventCard({ event }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
      {/* Event Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">{event.name}</h3>
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <Calendar className="w-4 h-4" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          event.status === 'active' 
            ? 'bg-green-400/30 text-green-100' 
            : 'bg-gray-400/30 text-gray-100'
        }`}>
          {event.status}
        </div>
      </div>

      {/* Event Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/10 rounded-2xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <Image className="w-4 h-4 text-white/70" />
            <span className="text-white/70 text-xs">Photos</span>
          </div>
          <p className="text-white text-2xl font-bold">{event.photoCount || 0}</p>
        </div>
        <div className="bg-white/10 rounded-2xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-white/70" />
            <span className="text-white/70 text-xs">Contributors</span>
          </div>
          <p className="text-white text-2xl font-bold">{event.contributorCount || 0}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => navigate(`/event/${event.id}`)}
          className="flex-1 bg-gradient-to-r from-yellow-300 to-orange-300 text-purple-900 py-3 rounded-2xl font-bold hover:from-yellow-400 hover:to-orange-400 transition flex items-center justify-center gap-2"
        >
          <ExternalLink className="w-4 h-4" />
          <span>View</span>
        </button>
        <button
          onClick={() => navigate(`/event/${event.id}/settings`)}
          className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-2xl transition"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}