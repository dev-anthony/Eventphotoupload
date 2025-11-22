//  import React from 'react'
//  import { useState, useRef } from 'react';
// import { Camera, Image as ImageIcon, X, Upload as UploadIcon, CheckCircle, Loader } from 'lucide-react';
// import Navbar from '../components/Navbar';
//  function Upload() {
//     const [selectedFiles, setSelectedFiles] = useState([]);
//     const [uploadProgress, setUploadProgress] = useState({});
//     const [capturedPhoto, setCapturedPhoto] = useState(null);
//     const fileInputRef = useRef(null);
//     const cameraInputRef = useRef(null);
//     const handleFileSelect = (e) => {
//     const files = Array.from(e.target.files);
//     setSelectedFiles([...selectedFiles, ...files]);
//   };

//   const handleCameraCapture = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setCapturedPhoto(event.target.result);
//         setSelectedFiles([...selectedFiles, file]);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleUpload = () => {
//     selectedFiles.forEach((file, index) => {
//       // Simulate upload progress
//       let progress = 0;
//       const interval = setInterval(() => {
//         progress += 10;
//         setUploadProgress(prev => ({...prev, [index]: progress}));
//         if (progress >= 100) {
//           clearInterval(interval);
//         }
//       }, 200);
//     });
//   };

//   const removeFile = (index) => {
//     setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
//   };
//    return (
//    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
//         <Navbar/>
//       <div className="container mx-auto px-4 py-8 max-w-4xl">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="inline-block p-4 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
//             <Camera className="w-12 h-12 text-white" />
//           </div>
//           <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
//             Upload Your Photos
//           </h1>
//         </div>

//         {/* Upload Actions */}
//         <div className="grid md:grid-cols-2 gap-4 mb-8">
//           {/* Take Photo */}
//           <div
//             onClick={() => cameraInputRef.current?.click()}
//             className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 cursor-pointer hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
//           >
//             <div className="text-center">
//               <div className="bg-gradient-to-br from-blue-400 to-cyan-300 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                 <Camera className="w-8 h-8 text-white" />
//               </div>
//               <h3 className="text-xl font-bold text-white mb-2">Take Photo</h3>
//               <p className="text-white/70 text-sm">Use your camera to capture a moment</p>
//             </div>
//             <input
//               ref={cameraInputRef}
//               type="file"
//               accept="image/*"
//               capture="environment"
//               onChange={handleCameraCapture}
//               className="hidden"
//             />
//           </div>

//           {/* Upload from Gallery */}
//           <div
//             onClick={() => fileInputRef.current?.click()}
//             className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 cursor-pointer hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
//           >
//             <div className="text-center">
//               <div className="bg-gradient-to-br from-green-400 to-emerald-300 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                 <ImageIcon className="w-8 h-8 text-white" />
//               </div>
//               <h3 className="text-xl font-bold text-white mb-2">Choose Photos</h3>
//               <p className="text-white/70 text-sm">Select photos from your gallery</p>
//             </div>
//             <input
//               ref={fileInputRef}
//               type="file"
//               accept="image/*"
//               multiple
//               onChange={handleFileSelect}
//               className="hidden"
//             />
//           </div>
//         </div>

//         {/* Selected Photos */}
//         {selectedFiles.length > 0 && (
//           <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/20 mb-8">
//             <h3 className="text-xl font-bold text-white mb-4">
//               Selected Photos ({selectedFiles.length})
//             </h3>
            
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
//               {selectedFiles.map((file, index) => (
//                 <div key={index} className="relative group">
//                   <div className="aspect-square rounded-2xl overflow-hidden bg-white/10">
//                     <img
//                       src={URL.createObjectURL(file)}
//                       alt={`Selected ${index + 1}`}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   <button
//                     onClick={() => removeFile(index)}
//                     className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-xl opacity-0 group-hover:opacity-100 transition"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                   {uploadProgress[index] !== undefined && (
//                     <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl">
//                       {uploadProgress[index] === 100 ? (
//                         <CheckCircle className="w-12 h-12 text-green-400" />
//                       ) : (
//                         <div className="text-center">
//                           <Loader className="w-8 h-8 text-white animate-spin mx-auto mb-2" />
//                           <p className="text-white font-bold">{uploadProgress[index]}%</p>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>

//             <button
//               onClick={handleUpload}
//               disabled={Object.keys(uploadProgress).length > 0}
//               className="w-full bg-gradient-to-r from-yellow-300 to-orange-300 text-purple-900 py-4 rounded-2xl font-bold hover:from-yellow-400 hover:to-orange-400 transition flex items-center justify-center gap-2 disabled:opacity-50"
//             >
//               <UploadIcon className="w-5 h-5" />
//               Upload {selectedFiles.length} Photo{selectedFiles.length > 1 ? 's' : ''}
//             </button>
//           </div>
//         )}

//         {/* Success Message */}
//         {Object.values(uploadProgress).every(p => p === 100) && Object.keys(uploadProgress).length > 0 && (
//           <div className="bg-green-400/20 backdrop-blur-md rounded-2xl p-6 border border-green-400/30 text-center">
//             <CheckCircle className="w-12 h-12 text-green-300 mx-auto mb-3" />
//             <h3 className="text-xl font-bold text-white mb-2">Photos Uploaded Successfully!</h3>
//             <p className="text-white/80 mb-4">Your memories have been added to the event</p>
//             <button
//               onClick={() => {
//                 setSelectedFiles([]);
//                 setUploadProgress({});
//               }}
//               className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-2xl font-bold transition"
//             >
//               Upload More Photos
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
   
//  }
 
//  export default Upload
 import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Camera, Image as ImageIcon, X, Upload as UploadIcon, CheckCircle, Loader, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import { photoApi } from '../utils/photoApi';
import { eventApi } from '../utils/api';

export default function Upload() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  
  const [event, setEvent] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploading, setUploading] = useState(false);
  const [contributorName, setContributorName] = useState('');
  const [showNameInput, setShowNameInput] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  // Fetch event details on mount
  useEffect(() => {
    fetchEventDetails();
  }, [eventId]);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      const response = await eventApi.getEventByShareLink(eventId);
      
      if (response.success) {
        setEvent(response.data);
      }
    } catch (err) {
      setError(err.message || 'Event not found');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleCameraCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFiles([...selectedFiles, file]);
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    try {
      setUploading(true);
      setUploadProgress({});

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          selectedFiles.forEach((_, index) => {
            if (!newProgress[index] || newProgress[index] < 90) {
              newProgress[index] = (newProgress[index] || 0) + 10;
            }
          });
          return newProgress;
        });
      }, 300);

      // Upload photos
      const response = await photoApi.uploadPhotos(
        eventId,
        selectedFiles,
        contributorName || 'Anonymous'
      );

      clearInterval(progressInterval);

      // Set all to 100%
      const finalProgress = {};
      selectedFiles.forEach((_, index) => {
        finalProgress[index] = 100;
      });
      setUploadProgress(finalProgress);

      // Show success message
      setTimeout(() => {
        setShowNameInput(false);
      }, 2000);

    } catch (err) {
      alert(err.message || 'Failed to upload photos');
      setUploadProgress({});
    } finally {
      setUploading(false);
    }
  };

  const removeFile = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
    const newProgress = { ...uploadProgress };
    delete newProgress[index];
    setUploadProgress(newProgress);
  };

  const resetUpload = () => {
    setSelectedFiles([]);
    setUploadProgress({});
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center">
        <Loader className="w-12 h-12 text-white animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-500/20 backdrop-blur-md rounded-3xl p-8 border border-red-400/30 text-center max-w-md mx-auto">
            <AlertCircle className="w-16 h-16 text-red-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Event Not Found</h2>
            <p className="text-white/80 mb-6">{error}</p>
            <button
              onClick={() => navigate('/join')}
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl transition"
            >
              Try Another Code
            </button>
          </div>
        </div>
      </div>
    );
  }

  const allUploaded = Object.values(uploadProgress).every(p => p === 100) && 
                      Object.keys(uploadProgress).length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
            <Camera className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {event?.name}
          </h1>
          <p className="text-white/80">Share your photos from this event</p>
        </div>

        {/* Name Input */}
        {showNameInput && selectedFiles.length === 0 && (
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 mb-8">
            <label className="block text-white font-medium mb-3">
              Your Name (Optional)
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={contributorName}
              onChange={(e) => setContributorName(e.target.value)}
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <p className="text-white/60 text-sm mt-2">
              This will be shown with your photos
            </p>
          </div>
        )}

        {/* Upload Actions */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {/* Take Photo */}
          <div
            onClick={() => cameraInputRef.current?.click()}
            className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 cursor-pointer hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
          >
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-400 to-cyan-300 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Take Photo</h3>
              <p className="text-white/70 text-sm">Use your camera to capture a moment</p>
            </div>
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleCameraCapture}
              className="hidden"
              disabled={uploading}
            />
          </div>

          {/* Upload from Gallery */}
          <div
            onClick={() => !uploading && fileInputRef.current?.click()}
            className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 cursor-pointer hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
          >
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-400 to-emerald-300 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ImageIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Choose Photos</h3>
              <p className="text-white/70 text-sm">Select photos from your gallery</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              disabled={uploading}
            />
          </div>
        </div>

        {/* Selected Photos */}
        {selectedFiles.length > 0 && (
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/20 mb-8">
            <h3 className="text-xl font-bold text-white mb-4">
              Selected Photos ({selectedFiles.length})
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {selectedFiles.map((file, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square rounded-2xl overflow-hidden bg-white/10">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Selected ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {!uploading && (
                    <button
                      onClick={() => removeFile(index)}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-xl opacity-0 group-hover:opacity-100 transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  {uploadProgress[index] !== undefined && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl">
                      {uploadProgress[index] === 100 ? (
                        <CheckCircle className="w-12 h-12 text-green-400" />
                      ) : (
                        <div className="text-center">
                          <Loader className="w-8 h-8 text-white animate-spin mx-auto mb-2" />
                          <p className="text-white font-bold">{uploadProgress[index]}%</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={handleUpload}
              disabled={uploading || allUploaded}
              className="w-full bg-gradient-to-r from-yellow-300 to-orange-300 text-purple-900 py-4 rounded-2xl font-bold hover:from-yellow-400 hover:to-orange-400 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <UploadIcon className="w-5 h-5" />
                  Upload {selectedFiles.length} Photo{selectedFiles.length > 1 ? 's' : ''}
                </>
              )}
            </button>
          </div>
        )}

        {/* Success Message */}
        {allUploaded && (
          <div className="bg-green-400/20 backdrop-blur-md rounded-2xl p-6 border border-green-400/30 text-center">
            <CheckCircle className="w-12 h-12 text-green-300 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">Photos Uploaded Successfully!</h3>
            <p className="text-white/80 mb-4">Your memories have been added to the event</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={resetUpload}
                className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-2xl font-bold transition"
              >
                Upload More Photos
              </button>
              <button
                onClick={() => navigate(`/gallery/${eventId}`)}
                className="bg-gradient-to-r from-yellow-300 to-orange-300 text-purple-900 px-6 py-3 rounded-2xl font-bold hover:from-yellow-400 hover:to-orange-400 transition"
              >
                View Gallery
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
