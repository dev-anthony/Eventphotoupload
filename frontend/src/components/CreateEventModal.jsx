import React, { useState } from 'react';
import { X, Calendar, Lock, Link as LinkIcon } from 'lucide-react';

export default function CreateEventModal({ isOpen, onClose, onCreate }) {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    accessCode: '',
    requireAccessCode: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData);
    setFormData({ name: '', date: '', accessCode: '', requireAccessCode: false });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-1 rounded-3xl max-w-md w-full">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Create New Event</h2>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Event Name */}
            <div>
              <label className="block text-white font-medium mb-2 text-sm">Event Name</label>
              <input
                type="text"
                placeholder="My Awesome Event"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                required
              />
            </div>

            {/* Event Date */}
            <div>
              <label className="block text-white font-medium mb-2 text-sm">Event Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/30 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  required
                />
              </div>
            </div>

            {/* Access Code Toggle */}
            <div className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl">
              <input
                type="checkbox"
                id="requireCode"
                checked={formData.requireAccessCode}
                onChange={(e) => setFormData({ ...formData, requireAccessCode: e.target.checked })}
                className="w-5 h-5 rounded"
              />
              <label htmlFor="requireCode" className="text-white text-sm flex-1">
                Require access code
              </label>
            </div>

            {/* Access Code Input */}
            {formData.requireAccessCode && (
              <div>
                <label className="block text-white font-medium mb-2 text-sm">Access Code</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                  <input
                    type="text"
                    placeholder="Enter access code"
                    value={formData.accessCode}
                    onChange={(e) => setFormData({ ...formData, accessCode: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-300 to-orange-300 text-purple-900 py-4 rounded-2xl font-bold hover:from-yellow-400 hover:to-orange-400 transition"
            >
              Create Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}