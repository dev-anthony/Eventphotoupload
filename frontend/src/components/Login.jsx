
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Camera, LogIn, Mail, Lock, Loader } from 'lucide-react';
export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
       const res = await axios.post('https://event-photo-api.onrender.com/api/auth/login', form, {
      withCredentials: true, 
    });

    setMessage('Login successful!');
    navigate('/dashboard');   
      
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
    
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
            <Camera className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-white/80 text-lg">Login to continue capturing moments</p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-white font-medium mb-2 text-sm">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-white font-medium mb-2 text-sm">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition"
                  required
                />
              </div>
            </div>
              {loading && (
                      <div className="flex justify-center items-center py-20">
                        <Loader className="w-12 h-12 text-white animate-spin" />
                      </div>
                    )}

            {/* Message Display */}
            {message && (
              <div className={`p-4 rounded-2xl text-center font-medium ${
                message.includes('successful') 
                  ? 'bg-green-400/30 text-white' 
                  : 'bg-red-400/30 text-white'
              }`}>
                {message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-300 to-orange-300 text-purple-900 py-4 rounded-2xl font-bold text-lg hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              Login
            </button>
          </form>

          {/* Register Link */}
          <p className="text-center text-white/90 mt-6">
            Don't have an account?{' '}
            <span 
              onClick={() => navigate('/register')} 
              className="text-yellow-300 font-bold hover:text-yellow-200 cursor-pointer underline"
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
