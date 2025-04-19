
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { internships } from '../data/internships';
import { useAuth } from '../context/AuthContext';
import { useBookmarks } from '../context/BookmarkContext';
import InternshipCard from '../components/InternshipCard';

const BookmarksPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { bookmarks, favorites } = useBookmarks();
  
  const [activeTab, setActiveTab] = useState('bookmarks');
  const [bookmarkedInternships, setBookmarkedInternships] = useState([]);
  const [favoriteInternships, setFavoriteInternships] = useState([]);
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/bookmarks' } });
      return;
    }
    
    // Filter bookmarked internships
    const bookmarkedItems = internships.filter(internship => 
      bookmarks.includes(internship.id)
    );
    setBookmarkedInternships(bookmarkedItems);
    
    // Filter favorite internships
    const favoriteItems = internships.filter(internship => 
      favorites.includes(internship.id)
    );
    setFavoriteInternships(favoriteItems);
  }, [isAuthenticated, navigate, bookmarks, favorites]);
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Saved Items</h1>
        
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'bookmarks'
                  ? 'border-brand text-brand'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Saved Internships ({bookmarkedInternships.length})
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'favorites'
                  ? 'border-brand text-brand'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Favorites ({favoriteInternships.length})
            </button>
          </nav>
        </div>
        
        {/* Bookmarks Tab */}
        {activeTab === 'bookmarks' && (
          <>
            {bookmarkedInternships.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookmarkedInternships.map((internship) => (
                  <InternshipCard key={internship.id} internship={internship} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No saved internships</h3>
                <p className="mt-1 text-gray-500">
                  Bookmark internships you're interested in to keep track of them here.
                </p>
                <button
                  onClick={() => navigate('/internships')}
                  className="mt-6 btn-primary"
                >
                  Browse Internships
                </button>
              </div>
            )}
          </>
        )}
        
        {/* Favorites Tab */}
        {activeTab === 'favorites' && (
          <>
            {favoriteInternships.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteInternships.map((internship) => (
                  <InternshipCard key={internship.id} internship={internship} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No favorite internships</h3>
                <p className="mt-1 text-gray-500">
                  Add internships to your favorites to keep track of your top choices.
                </p>
                <button
                  onClick={() => navigate('/internships')}
                  className="mt-6 btn-primary"
                >
                  Browse Internships
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BookmarksPage;
