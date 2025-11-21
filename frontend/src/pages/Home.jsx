import React from 'react';
import { Camera, Users, Link, Zap, Share2, Image } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-block p-4 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
            <Camera className="w-12 h-12 md:w-16 md:h-16 text-white" />
          </div>
          <h1 className=" text-2xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 drop-shadow-lg">
            Capture Every Moment
            <br />
            <span className="bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
              Together
            </span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto mb-8 md:mb-12 px-4">
            The collaborative photo platform where everyone becomes the photographer. 
            Create events, share links, and watch memories come alive in real-time.
          </p>
          <button 
            onClick={handleGetStarted}
            className="group relative inline-flex items-center gap-3 bg-white text-purple-600 px-8 md:px-12 py-4 md:py-5 rounded-full text-lg md:text-xl font-bold hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            <span>Get Started</span>
            <Zap className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform" />
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto mb-12 md:mb-20">
          {/* Feature 1 */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-gradient-to-br from-blue-400 to-cyan-300 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-4 md:mb-6">
              <Users className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">Create Events</h3>
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              Set up your event in seconds. Weddings, parties, conferences - any occasion where memories matter.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-gradient-to-br from-green-400 to-emerald-300 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-4 md:mb-6">
              <Share2 className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">Share Links</h3>
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              Generate unique shareable links instantly. Send to guests and let them join the fun with one tap.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-gradient-to-br from-rose-400 to-pink-300 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-4 md:mb-6">
              <Image className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">Collect Photos</h3>
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              Everyone contributes from their phones. Watch your photo gallery grow in real-time as moments unfold.
            </p>
          </div>
        </div>

        {/* Bottom CTA Section */}
        {/* <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 max-w-4xl mx-auto text-center">
          <div className="flex justify-center gap-4 mb-6">
            <div className="bg-yellow-300/30 p-3 rounded-full">
              <Camera className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <div className="bg-pink-300/30 p-3 rounded-full">
              <Link className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <div className="bg-blue-300/30 p-3 rounded-full">
              <Zap className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            Ready to Capture Magic?
          </h2>
          <p className="text-white/90 text-base md:text-lg mb-6 md:mb-8">
            No apps to download. No accounts for guests. Just pure, simple photo sharing.
          </p>
          <button 
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-yellow-300 to-orange-300 text-purple-900 px-8 md:px-12 py-4 md:py-5 rounded-full text-base md:text-xl font-bold hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            Get Started
          </button>
        </div> */}
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-white/60 text-sm">
        <p>© 2024 Photo Collection Platform. Capture moments, share memories.</p>
      </div>
    </div>
  );
}