// import React, { useState, useEffect } from 'react';
// import { Plus } from 'lucide-react';
// import Navbar from '../components/Navbar';
// import EventCard from '../components/EventCard';
// import CreateEventModal from '../components/CreateEventModal';

// export default function Dashboard() {
//   const [events, setEvents] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   useEffect(() => {
//     setEvents([
//       {
//         id: '1',
//         name: 'Summer Wedding 2024',
//         date: '2024-07-15',
//         status: 'active',
//         photoCount: 127,
//         contributorCount: 23,
//       },
//       {
//         id: '2',
//         name: 'Birthday Bash',
//         date: '2024-06-20',
//         status: 'active',
//         photoCount: 45,
//         contributorCount: 12,
//       },
//     ]);
//   }, []);

//   const handleCreateEvent = (eventData) => {
//     const newEvent = {
//       id: Date.now().toString(),
//       ...eventData,
//       status: 'active',
//       photoCount: 0,
//       contributorCount: 0,
//     };
//     setEvents([newEvent, ...events]);
//   };
 

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
//       <Navbar />
//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
//             My Events
//           </h1>
//           <p className="text-white/80 text-lg">
//             Manage your photo collection events
//           </p>
//         </div>
//         {/* Create Event Button */}
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="mb-8 bg-gradient-to-r from-yellow-300 to-orange-300 text-purple-900 px-6 py-4 rounded-2xl font-bold hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center gap-2"
//         >
//           <Plus className="w-5 h-5" />
//           Create New Event
//         </button>
//         {/* Events Grid */}
//         {events.length > 0 ? (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {events.map((event) => (
//               <EventCard key={event.id} event={event} />
//             ))}
//           </div>
//         ) : (
//           <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 text-center">
//             <p className="text-white text-xl mb-4">No events yet</p>
//             <p className="text-white/70">Create your first event to get started!</p>
//           </div>
//         )}
//       </div>

//       {/* Create Event Modal */}
//       <CreateEventModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onCreate={handleCreateEvent}
//       />
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import { Plus, Loader } from 'lucide-react';
import Navbar from '../components/Navbar';
import EventCard from '../components/EventCard';
import CreateEventModal from '../components/CreateEventModal';
import { eventApi } from '../utils/api';

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await eventApi.getMyEvents();
      
      if (response.success) {
        setEvents(response.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to load events');
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async (eventData) => {
    try {
      const response = await eventApi.createEvent(eventData);
      
      if (response.success) {
        // Refresh events list
        await fetchEvents();
        
        // Show success message
        alert(`Event created! Share link: ${response.data.fullLink}`);
      }
    } catch (err) {
      alert(err.message || 'Failed to create event');
      console.error('Error creating event:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My Events
          </h1>
          <p className="text-white/80 text-lg">
            Manage your photo collection events
          </p>
        </div>

        {/* Create Event Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="mb-8 bg-gradient-to-r from-yellow-300 to-orange-300 text-purple-900 px-6 py-4 rounded-2xl font-bold hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create New Event
        </button>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader className="w-12 h-12 text-white animate-spin" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/20 backdrop-blur-md rounded-3xl p-6 border border-red-400/30 mb-8">
            <p className="text-white text-center">{error}</p>
            <button
              onClick={fetchEvents}
              className="mt-4 mx-auto block bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-xl transition"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Events Grid */}
        {!loading && !error && (
          events.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 text-center">
              <p className="text-white text-xl mb-4">No events yet</p>
              <p className="text-white/70">Create your first event to get started!</p>
            </div>
          )
        )}
      </div>

      {/* Create Event Modal */}
      <CreateEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateEvent}
      />
    </div>
  );
}