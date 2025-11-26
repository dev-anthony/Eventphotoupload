// import React from 'react';
// import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

// export default function AlertModal({ isOpen, onClose, type = 'success', title, message }) {
//   if (!isOpen) return null;

//   const icons = {
//     success: <CheckCircle className="w-16 h-16 text-green-400" />,
//     error: <XCircle className="w-16 h-16 text-red-400" />,
//     info: <AlertCircle className="w-16 h-16 text-blue-400" />,
//   };

//   const colors = {
//     success: 'from-green-400 to-emerald-400',
//     error: 'from-red-400 to-rose-400',
//     info: 'from-blue-400 to-cyan-400',
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className={`bg-gradient-to-br ${colors[type]} p-1 rounded-3xl max-w-md w-full animate-scale-in`}>
//         <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6">
//           {/* Close Button */}
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 text-white/70 hover:text-white transition"
//           >
//             <X className="w-6 h-6" />
//           </button>

//           {/* Icon */}
//           <div className="flex justify-center mb-4">
//             {icons[type]}
//           </div>

//           {/* Title */}
//           <h2 className="text-2xl font-bold text-white text-center mb-2">
//             {title}
//           </h2>

//           {/* Message */}
//           <p className="text-white/90 text-center mb-6">
//             {message}
//           </p>

//           {/* Close Button */}
//           <button
//             onClick={onClose}
//             className="w-full bg-white/20 hover:bg-white/30 text-white py-3 rounded-2xl font-bold transition"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
import React from 'react';
import { CheckCircle, XCircle, AlertCircle, X, AlertTriangle } from 'lucide-react';

// AlertModal - For success/error messages
export function AlertModal({ isOpen, onClose, type = 'success', title, message }) {
  if (!isOpen) return null;

  const icons = {
    success: <CheckCircle className="w-16 h-16 text-green-400" />,
    error: <XCircle className="w-16 h-16 text-red-400" />,
    info: <AlertCircle className="w-16 h-16 text-blue-400" />,
  };

  const colors = {
    success: 'from-green-400 to-emerald-400',
    error: 'from-red-400 to-rose-400',
    info: 'from-blue-400 to-cyan-400',
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`bg-gradient-to-br ${colors[type]} p-1 rounded-3xl max-w-md w-full`}>
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 relative">
          {/* Close Button (X) */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Icon */}
          <div className="flex justify-center mb-4">
            {icons[type]}
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-white text-center mb-2">
            {title}
          </h2>

          {/* Message */}
          <p className="text-white/90 text-center mb-6">
            {message}
          </p>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full bg-white/20 hover:bg-white/30 text-white py-3 rounded-2xl font-bold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}