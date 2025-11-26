import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function ConfirmModal({ 
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
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-red-400 to-rose-400 p-1 rounded-3xl max-w-md w-full">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex justify-center mb-4">
            <AlertTriangle className="w-16 h-16 text-yellow-300" />
          </div>

          <h2 className="text-2xl font-bold text-white text-center mb-2">
            {title}
          </h2>

          <p className="text-white/90 text-center mb-6">
            {message}
          </p>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-white/20 hover:bg-white/30 text-white py-3 rounded-2xl font-bold transition"
            >
              {cancelText}
            </button>

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