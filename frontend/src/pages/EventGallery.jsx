export function EventGallery() {
  const [photos, setPhotos] = useState([]);
  const [filter, setFilter] = useState('all'); // all, mine
  const attendeeName = 'John'; // From session

  useEffect(() => {
    // Mock photos
    setPhotos([
      { id: '1', url: 'https://via.placeholder.com/300', contributor: 'John', isMine: true },
      { id: '2', url: 'https://via.placeholder.com/300', contributor: 'Alice', isMine: false },
      { id: '3', url: 'https://via.placeholder.com/300', contributor: 'Bob', isMine: false },
      { id: '4', url: 'https://via.placeholder.com/300', contributor: 'John', isMine: true },
      { id: '5', url: 'https://via.placeholder.com/300', contributor: 'Charlie', isMine: false },
      { id: '6', url: 'https://via.placeholder.com/300', contributor: 'John', isMine: true },
    ]);
  }, []);

  const filteredPhotos = filter === 'mine' 
    ? photos.filter(p => p.isMine) 
    : photos;

  const myPhotosCount = photos.filter(p => p.isMine).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
            <ImageIcon className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Event Gallery
          </h1>
          <p className="text-white/80">Summer Wedding 2024</p>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 flex gap-2 mb-8 max-w-md mx-auto">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 py-3 rounded-xl font-bold transition ${
              filter === 'all'
                ? 'bg-gradient-to-r from-yellow-300 to-orange-300 text-purple-900'
                : 'text-white hover:bg-white/10'
            }`}
          >
            All Photos ({photos.length})
          </button>
          <button
            onClick={() => setFilter('mine')}
            className={`flex-1 py-3 rounded-xl font-bold transition ${
              filter === 'mine'
                ? 'bg-gradient-to-r from-yellow-300 to-orange-300 text-purple-900'
                : 'text-white hover:bg-white/10'
            }`}
          >
            My Photos ({myPhotosCount})
          </button>
        </div>

        {/* Photos Grid */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/20">
          {filteredPhotos.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredPhotos.map((photo) => (
                <div 
                  key={photo.id} 
                  className={`group relative aspect-square rounded-2xl overflow-hidden ${
                    photo.isMine ? 'ring-4 ring-yellow-300' : ''
                  }`}
                >
                  <img
                    src={photo.url}
                    alt="Event photo"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                    {photo.isMine && (
                      <button className="bg-white hover:bg-gray-100 text-gray-900 p-3 rounded-xl transition">
                        <DownloadIcon className="w-5 h-5" />
                      </button>
                    )}
                    <button className="bg-white hover:bg-gray-100 text-gray-900 p-3 rounded-xl transition">
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <p className="text-white text-sm font-medium">
                      {photo.contributor}
                      {photo.isMine && ' (You)'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <ImageIcon className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <p className="text-white/70 text-lg">No photos yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default EventGallery;