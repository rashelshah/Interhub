
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBookmarks } from '../context/BookmarkContext';

const InternshipCard = ({ internship }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { isBookmarked, isFavorite, toggleBookmark, toggleFavorite } = useBookmarks();
  
  const handleBookmark = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    toggleBookmark(internship.id);
  };
  
  const handleFavorite = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    toggleFavorite(internship.id);
  };
  
  const handleCardClick = () => {
    navigate(`/internships/${internship.id}`);
  };
  
  // Calculate days ago
  const daysAgo = () => {
    const postedDate = new Date(internship.postedDate);
    const today = new Date();
    const diffTime = Math.abs(today - postedDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden card-hover cursor-pointer animate-entry"
      onClick={handleCardClick}
      style={{ '--delay': internship.id % 10 }}
    >
      <div className="relative">
        <img 
          src={internship.image} 
          alt={internship.title} 
          className="w-full h-40 object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <button 
            onClick={handleBookmark}
            className={`p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all ${
              isBookmarked(internship.id) ? 'text-brand' : 'text-gray-500'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill={isBookmarked(internship.id) ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            </svg>
          </button>
          <button 
            onClick={handleFavorite}
            className={`p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all ${
              isFavorite(internship.id) ? 'text-red-500' : 'text-gray-500'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill={isFavorite(internship.id) ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-2">
          <img 
            src={internship.companyLogo} 
            alt={internship.company} 
            className="w-8 h-8 rounded-full mr-2 object-cover"
          />
          <h3 className="text-sm text-gray-600">{internship.company}</h3>
        </div>
        <h2 className="text-lg font-semibold mb-2">{internship.title}</h2>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-gray-500 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{internship.location}</span>
          </div>
          {internship.isRemote && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Remote</span>
          )}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-brand">{internship.salary}</span>
          <span className="text-xs text-gray-500">{daysAgo()} days ago</span>
        </div>
      </div>
    </div>
  );
};

export default InternshipCard;
