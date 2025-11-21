import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './pages/Dashboard';
import EventDetails from './pages/EventDetails';
import Upload from './pages/Upload';
import EventGallery from './pages/EventGallery';
import EventSettings from './pages/EventSettings';
import JoinEvent from './pages/JoinEvent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Organizer Routes */}
        <Route path="/event/:eventId" element={<EventDetails />} />
        <Route path="/event/:eventId/settings" element={<EventSettings />} />
        
        {/* Attendee Routes */}
        <Route path="/join" element={<JoinEvent />} />
        <Route path="/upload/:eventId" element={<Upload />} />
        <Route path="/gallery/:eventId" element={<EventGallery />} />
      </Routes>
    </Router>
  );
}

export default App;
