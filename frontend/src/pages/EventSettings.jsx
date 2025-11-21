import React, { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, Lock, HardDrive, Download as DownloadIcon,
  Clock, Save, ArrowLeft, CheckCircle, Loader
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { eventApi } from '../utils/api';

export default function EventSettings() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  
  const [settings, setSettings] = useState({
    requireAccessCode: false,
    accessCode: '',
    maxFileSize: 5,
    allowAttendeeDownloads: true,
    autoCloseEnabled: false,
    endDate: '',
    endTime: '',
  });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchEventSettings();
  }, [eventId]);

  const fetchEventSettings = async () => {
    try {
      setLoading(true);
      const response = await eventApi.getEventById(eventId);
      
      if (response.success) {
        const event = response.data;
        setSettings({
          requireAccessCode: event.requireAccessCode,
          accessCode: event.accessCode || '',
          maxFileSize: event.maxFileSize,
          allowAttendeeDownloads: event.allowAttendeeDownloads,
          autoCloseEnabled: event.autoCloseEnabled,
          endDate: event.endDate || '',
          endTime: event.endTime || '',
        });
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
      alert(err.message || 'Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await eventApi.updateEvent(eventId, settings);
      
      if (response.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (err) {
      alert(err.message || 'Failed to save settings');
      console.error('Error saving settings:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center">
        <Loader className="w-12 h-12 text-white animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      <Navbar />
      
      {/* Breadcrumb Header */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(`/event/${eventId}`)}
              className="text-white hover:bg-white/10 p-2 rounded-xl transition"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-xl">
                <SettingsIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Event Settings</h1>
                <p className="text-white/70 text-sm">Configure your event preferences</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Settings Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/20 space-y-6">
          
          {/* Access Code */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="bg-blue-400/30 p-2 rounded-xl mt-1">
                  <Lock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">Access Code</h3>
                  <p className="text-white/70 text-sm">Require attendees to enter a code before uploading</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.requireAccessCode}
                  onChange={(e) => setSettings({...settings, requireAccessCode: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/20 peer-focus:ring-2 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-400"></div>
              </label>
            </div>
            
            {settings.requireAccessCode && (
              <div className="ml-14">
                <input
                  type="text"
                  placeholder="Enter access code"
                  value={settings.accessCode}
                  onChange={(e) => setSettings({...settings, accessCode: e.target.value})}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                />
              </div>
            )}
          </div>

          <div className="border-t border-white/20"></div>

          {/* Max File Size */}
          <div className="flex items-start gap-3">
            <div className="bg-purple-400/30 p-2 rounded-xl mt-1">
              <HardDrive className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg mb-1">Maximum File Size</h3>
              <p className="text-white/70 text-sm mb-4">Set the maximum photo size limit</p>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={settings.maxFileSize}
                  onChange={(e) => setSettings({...settings, maxFileSize: parseInt(e.target.value)})}
                  className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-white font-bold text-xl min-w-[60px]">{settings.maxFileSize} MB</span>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20"></div>

          {/* Allow Downloads */}
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="bg-green-400/30 p-2 rounded-xl mt-1">
                <DownloadIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">Attendee Downloads</h3>
                <p className="text-white/70 text-sm">Allow attendees to download photos</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.allowAttendeeDownloads}
                onChange={(e) => setSettings({...settings, allowAttendeeDownloads: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-white/20 peer-focus:ring-2 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-400"></div>
            </label>
          </div>

          <div className="border-t border-white/20"></div>

          {/* Auto-close Event */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="bg-orange-400/30 p-2 rounded-xl mt-1">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">Auto-close Event</h3>
                  <p className="text-white/70 text-sm">Automatically end the event at a specific date and time</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoCloseEnabled}
                  onChange={(e) => setSettings({...settings, autoCloseEnabled: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/20 peer-focus:ring-2 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-400"></div>
              </label>
            </div>
            
            {settings.autoCloseEnabled && (
              <div className="ml-14 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 text-sm mb-2">End Date</label>
                  <input
                    type="date"
                    value={settings.endDate}
                    onChange={(e) => setSettings({...settings, endDate: e.target.value})}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">End Time</label>
                  <input
                    type="time"
                    value={settings.endTime}
                    onChange={(e) => setSettings({...settings, endTime: e.target.value})}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <button
              onClick={handleSave}
              className="w-full bg-gradient-to-r from-yellow-300 to-orange-300 text-purple-900 py-4 rounded-2xl font-bold hover:from-yellow-400 hover:to-orange-400 transition flex items-center justify-center gap-2"
            >
              {saved ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Settings Saved!
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Settings
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}