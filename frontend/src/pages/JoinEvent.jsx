import React, { useState } from 'react';
import { Camera, Search, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function JoinEvent() {
  const [eventCode, setEventCode] = useState('');
  const navigate = useNavigate();

  const handleJoinEvent = (e) => {
    // e.preventDefault();
    // // In real app, verify event code with backend
    // // For now, redirect to upload page
    // if (eventCode.trim()) {
    //   navigate(`/upload/${eventCode}`);
    // }
      e.preventDefault();

  if (!eventCode.trim()) return;

  let code = eventCode.trim();

  // If user pasted a full URL, extract the last segment
  if (code.includes('http')) {
    try {
      const url = new URL(code);
      code = url.pathname.split('/').pop(); // get the event ID
    } catch {
      console.error("Invalid URL");
    }
  }

  navigate(`/upload/${code}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block p-4 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
              <Camera className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Join an Event
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              Enter the event code to start sharing your photos
            </p>
          </div>

          {/* Join Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
            <form onSubmit={handleJoinEvent} className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-3 text-lg">
                  Event Code or Link
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white/60" />
                  <input
                    type="text"
                    placeholder="Enter event code (e.g., ABC123)"
                    value={eventCode}
                    onChange={(e) => setEventCode(e.target.value)}
                    className="w-full pl-14 pr-4 py-5 bg-white/20 border border-white/30 rounded-2xl text-white text-lg placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    required
                  />
                </div>
                <p className="text-white/60 text-sm mt-3">
                  Get the event code from the organizer or use the shared link
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-300 to-orange-300 text-purple-900 py-5 rounded-2xl font-bold text-lg hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center gap-3"
              >
                <span>Join Event</span>
                <ArrowRight className="w-6 h-6" />
              </button>
            </form>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {/* <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-white font-bold text-lg mb-2">Quick Access</h3>
              <p className="text-white/70 text-sm">
                No account needed! Just enter the code and start uploading photos instantly.
              </p>
            </div> */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-white font-bold text-lg mb-2">Safe & Secure</h3>
              <p className="text-white/70 text-sm">
                Your photos are only shared with event attendees and the organizer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}