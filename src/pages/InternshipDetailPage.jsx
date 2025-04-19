
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { internships } from '../data/internships';
import { useAuth } from '../context/AuthContext';
import { useBookmarks } from '../context/BookmarkContext';
import InternshipCard from '../components/InternshipCard';

const InternshipDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { isBookmarked, isFavorite, toggleBookmark, toggleFavorite } = useBookmarks();
  
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similarInternships, setSimilarInternships] = useState([]);
  
  useEffect(() => {
    // Find the internship by ID
    const currentInternship = internships.find(int => int.id === parseInt(id));
    
    if (currentInternship) {
      setInternship(currentInternship);
      
      // Find similar internships (same category, excluding current)
      const similar = internships
        .filter(int => int.id !== currentInternship.id && int.category === currentInternship.category)
        .sort(() => 0.5 - Math.random()) // Randomize
        .slice(0, 3); // Take first 3
      
      setSimilarInternships(similar);
    } else {
      // If internship not found, redirect to 404 or internships page
      navigate('/internships');
    }
    
    setLoading(false);
  }, [id, navigate]);
  
  const handleBookmark = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    toggleBookmark(parseInt(id));
  };
  
  const handleFavorite = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    toggleFavorite(parseInt(id));
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center items-center h-60">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-2/3 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!internship) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Internship Not Found</h1>
          <p className="mt-2 text-gray-600">The internship you're looking for doesn't exist or has been removed.</p>
          <Link to="/internships" className="mt-6 inline-block btn-primary">
            Browse All Internships
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <Link 
          to="/internships" 
          className="inline-flex items-center text-gray-600 hover:text-brand mb-6"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Internships
        </Link>
        
        {/* Internship Header */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 animate-fade-in">
          <div className="relative h-56 sm:h-64 bg-gradient-to-br from-brand to-indigo-700">
            <img 
              src={internship.image} 
              alt={internship.title} 
              className="w-full h-full object-cover mix-blend-overlay"
            />
            
            <div className="absolute top-4 right-4 flex space-x-3">
              <button 
                onClick={handleBookmark}
                className={`p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all ${
                  isBookmarked(internship.id) ? 'text-brand' : 'text-gray-500'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill={isBookmarked(internship.id) ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                </svg>
              </button>
              <button 
                onClick={handleFavorite}
                className={`p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all ${
                  isFavorite(internship.id) ? 'text-red-500' : 'text-gray-500'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill={isFavorite(internship.id) ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center mb-4">
              <img 
                src={internship.companyLogo} 
                alt={internship.company} 
                className="w-12 h-12 rounded-full border border-gray-200 bg-white p-1 mr-4"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{internship.title}</h1>
                <div className="flex items-center text-gray-600">
                  <span>{internship.company}</span>
                  <span className="mx-2">•</span>
                  <span>{internship.location}</span>
                  {internship.isRemote && (
                    <>
                      <span className="mx-2">•</span>
                      <span className="text-blue-600">Remote</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Salary</div>
                <div className="text-lg font-medium text-brand">{internship.salary}</div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Category</div>
                <div className="text-lg font-medium">{internship.category}</div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Posted On</div>
                <div className="text-lg font-medium">{formatDate(internship.postedDate)}</div>
              </div>
            </div>
            
            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">{internship.description}</p>
            </div>
            
            {/* Requirements */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Requirements</h2>
              <p className="text-gray-700 leading-relaxed">{internship.requirements}</p>
            </div>
            
            {/* Apply Button */}
            <div className="mt-8">
              <a
                href={`mailto:apply@${internship.company.toLowerCase().replace(/\s/g, '')}.com?subject=Application for ${internship.title} Position`}
                className="block w-full md:w-auto md:inline-block text-center py-3 px-6 bg-brand text-white font-medium rounded-lg hover:bg-brand-dark transition-colors"
              >
                Apply for this Position
              </a>
              
              <button 
                onClick={handleBookmark}
                className={`mt-4 md:mt-0 md:ml-4 py-3 px-6 border rounded-lg font-medium transition-colors ${
                  isBookmarked(internship.id) 
                    ? 'border-brand bg-brand/10 text-brand' 
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                {isBookmarked(internship.id) ? 'Saved' : 'Save for Later'}
              </button>
            </div>
          </div>
        </div>
        
        {/* Similar Internships */}
        {similarInternships.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Similar Opportunities</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarInternships.map((internship) => (
                <InternshipCard key={internship.id} internship={internship} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InternshipDetailPage;
