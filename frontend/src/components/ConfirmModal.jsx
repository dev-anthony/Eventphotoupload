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
export function ConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = 'Delete', 
  cancelText = 'Cancel'
}) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(); // Execute the delete function
    onClose(); // Close the modal
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-red-400 to-rose-400 p-1 rounded-3xl max-w-md w-full">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 relative">
          {/* Close Button (X) - Acts as Cancel */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Warning Icon */}
          <div className="flex justify-center mb-4">
            <AlertTriangle className="w-16 h-16 text-yellow-300" />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-white text-center mb-2">
            {title}
          </h2>

          {/* Message */}
          <p className="text-white/90 text-center mb-6">
            {message}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {/* Cancel Button */}
            <button
              onClick={onClose}
              className="flex-1 bg-white/20 hover:bg-white/30 text-white py-3 rounded-2xl font-bold transition"
            >
              {cancelText}
            </button>

            {/* Delete/Confirm Button */}
            <button
              onClick={handleConfirm}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-2xl font-bold transition transform hover:scale-105"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
