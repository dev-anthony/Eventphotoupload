
// import React, { useState, useEffect } from 'react';
// import { Camera, LogOut, Home, User, UserPlus } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// axios.defaults.withCredentials = true;

// export default function Navbar() {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get('https://event-photo-api.onrender.com/api/auth/me')
//       .then(res => {
//         if (res.data.loggedIn) setUser(res.data.username);
//       });
//   }, []);

//   const handleLogout = () => {
//     axios.post('https://event-photo-api.onrender.com/api/auth/logout')
//       .then(() => {
//         setUser(null);
//         navigate('/login');
//       });
//   };

//   return (
//     <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
//       <div className="container mx-auto px-4 py-4">
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <div 
//             onClick={() => navigate('/dashboard')}
//             className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition"
//           >
//             <div className="bg-white/20 p-2 rounded-xl">
//               <Camera className="w-6 h-6 text-white" />
//             </div>
//             <span className="text-white font-bold text-xl hidden sm:block">PhotoShare</span>
//           </div>

//           {/* Navigation Links */}
//           <div className="flex items-center gap-4">
//             {/* Join Event Button */}
//             <button
//               onClick={() => navigate('/join')}
//               className="bg-gradient-to-r from-yellow-300 to-orange-300 text-purple-900 px-4 py-2 rounded-xl font-bold hover:from-yellow-400 hover:to-orange-400 transition flex items-center gap-2"
//             >
//               <UserPlus className="w-4 h-4" />
//               <span className="hidden md:inline">Join Event</span>
//             </button>

//             {/* User Info */}
//             <div className="hidden sm:flex items-center gap-2 text-white/90">
//               <User className="w-4 h-4" />
//               <span className="text-sm">{user || 'User'}</span>
//             </div>

//             {/* Home Button */}
//             <button
//               onClick={() => navigate('/dashboard')}
//               className="text-white/80 hover:text-white transition p-2"
//             >
//               <Home className="w-5 h-5" />
//             </button>

//             {/* Logout Button */}
//             <button
//               onClick={handleLogout}
//               className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl transition flex items-center gap-2"
//             >
//               <LogOut className="w-4 h-4" />
//               <span className="hidden sm:inline">Logout</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }
import React, { useState, useEffect } from 'react';
import { Album, LogOut, Home, User, UserPlus, GalleryHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials = true;

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://event-photo-api.onrender.com/api/auth/me')
      .then(res => {
        if (res.data.loggedIn) setUser(res.data.username);
      });
  }, []);

  const handleLogout = () => {
    axios.post('https://event-photo-api.onrender.com/api/auth/logout')
      .then(() => {
        setUser(null);
        navigate('/login');
      });
  };

  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">

          {/* LOGO — now perfectly matches your warm yellow/orange theme */}
          <div 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Icon bubble — same glass style */}
            <div className="bg-white/25 p-2.5 rounded-xl backdrop-blur-sm border border-white/30 
                          group-hover:bg-white/35 transition-all duration-300">
              {/* <Album className="w-7 h-7 text-white" strokeWidth={2.4} /> */}
              <GalleryHorizontal className="w-7 h-7 text-white" strokeWidth={2.4} />
            </div>

            {/* Gradient text — warm yellow → orange → soft coral, with subtle shine */}
            <span className="flex flex-col hidden sm:block font-black text-2xl tracking-tighter
                           bg-gradient-to-r from-yellow-300 via-orange-300 to-amber-400
                           bg-clip-text text-transparent
                           relative
                           before:absolute before:inset-0 
                           before:bg-gradient-to-r before:from-white/0 before:via-white/50 before:to-white/0
                           before:bg-clip-text before:text-transparent before:content-['The_Event_Album']
                           before:blur-xl before:opacity-60">
              <span>EventAlbums</span>
           
            </span>
          </div>

          {/* Rest of nav — completely unchanged */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/join')}
              className="bg-gradient-to-r from-yellow-300 via-orange-300 to-amber-400 text-purple-900 px-4 py-2 rounded-xl font-bold hover:from-yellow-400 hover:to-orange-400 transition flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span className="hidden md:inline">Join Event</span>
            </button>

            <div className="hidden sm:flex items-center gap-2 text-white/90">
              <User className="w-6 h-6"/>
              <span className="text-[16px] font-sans font-medium">{user || 'User'}</span>
            </div>

            <button onClick={() => navigate('/dashboard')} className="text-white/80 hover:text-white transition p-2">
              <Home className="w-6 h-6" />
            </button>

            <button onClick={handleLogout} className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl transition flex items-center gap-2">
              <LogOut className="w-6 h-6" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
