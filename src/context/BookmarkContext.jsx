
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const BookmarkContext = createContext();

export const useBookmarks = () => useContext(BookmarkContext);

export const BookmarkProvider = ({ children }) => {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  
  // Load bookmarks from localStorage on initial load or when user changes
  useEffect(() => {
    if (user) {
      const storedBookmarks = localStorage.getItem(`bookmarks-${user.id}`);
      const storedFavorites = localStorage.getItem(`favorites-${user.id}`);
      
      if (storedBookmarks) {
        setBookmarks(JSON.parse(storedBookmarks));
      }
      
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } else {
      setBookmarks([]);
      setFavorites([]);
    }
  }, [user]);
  
  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`bookmarks-${user.id}`, JSON.stringify(bookmarks));
    }
  }, [bookmarks, user]);
  
  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`favorites-${user.id}`, JSON.stringify(favorites));
    }
  }, [favorites, user]);
  
  // Toggle bookmark status for an internship
  const toggleBookmark = (internshipId) => {
    if (!user) return;
    
    setBookmarks((prevBookmarks) => {
      if (prevBookmarks.includes(internshipId)) {
        return prevBookmarks.filter((id) => id !== internshipId);
      } else {
        return [...prevBookmarks, internshipId];
      }
    });
  };
  
  // Toggle favorite status for an internship
  const toggleFavorite = (internshipId) => {
    if (!user) return;
    
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(internshipId)) {
        return prevFavorites.filter((id) => id !== internshipId);
      } else {
        return [...prevFavorites, internshipId];
      }
    });
  };
  
  // Check if an internship is bookmarked
  const isBookmarked = (internshipId) => {
    return bookmarks.includes(internshipId);
  };
  
  // Check if an internship is favorited
  const isFavorite = (internshipId) => {
    return favorites.includes(internshipId);
  };
  
  const value = {
    bookmarks,
    favorites,
    toggleBookmark,
    toggleFavorite,
    isBookmarked,
    isFavorite,
  };
  
  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  );
};
