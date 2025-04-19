
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  
  // Check if authenticated
  if (!isAuthenticated) {
    navigate('/login', { state: { from: '/profile' } });
  }
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    location: user?.location || '',
    bio: user?.bio || '',
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSave = (e) => {
    e.preventDefault();
    
    // Save user data
    const updatedUser = {
      ...user,
      ...formData,
    };
    
    // Update in auth context and localStorage
    localStorage.setItem('user', JSON.stringify(updatedUser));
    window.location.reload(); // Refresh to update auth context
    
    setNotification('Profile updated successfully!');
    setIsEditing(false);
    
    // Clear notification after 3 seconds
    setTimeout(() => {
      setNotification('');
    }, 3000);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
        
        {notification && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 animate-fade-in">
            {notification}
          </div>
        )}
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 animate-fade-in">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 h-32 w-full"></div>
          
          <div className="p-6 sm:p-8 relative">
            <div className="absolute -top-16 left-8">
              <div className="bg-white p-2 rounded-full shadow-lg">
                <div className="bg-brand h-24 w-24 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {user?.name?.charAt(0) || 'U'}
                </div>
              </div>
            </div>
            
            <div className="mt-10 sm:mt-0 sm:ml-32">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <h2 className="text-2xl font-bold">{user?.name || 'User'}</h2>
                
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="mt-4 sm:mt-0 py-2 px-4 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
              
              {isEditing ? (
                <form onSubmit={handleSave}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input-field w-full"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input-field w-full"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g. San Francisco, CA"
                        className="input-field w-full"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us about yourself..."
                      className="input-field w-full"
                    ></textarea>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <button
                      type="submit"
                      className="btn-primary"
                    >
                      Save Changes
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Email</h3>
                      <p className="mt-1">{user?.email || 'No email provided'}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Location</h3>
                      <p className="mt-1">{user?.location || 'No location provided'}</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-500">Bio</h3>
                    <p className="mt-1 whitespace-pre-wrap">
                      {user?.bio || 'No bio provided'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-6">Account Management</h2>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleLogout}
              className="py-2 px-4 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors"
            >
              Log Out
            </button>
            
            <button
              onClick={() => navigate('/bookmarks')}
              className="py-2 px-4 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              View Saved Internships
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
