import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-teal-600 text-white shadow-md m-0 p-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl sm:text-2xl font-bold text-emerald-100">
              Interhub
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className="text-emerald-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/internships"
              className="text-emerald-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Internships
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/bookmarks"
                  className="text-emerald-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Bookmarks
                </Link>
                <Link
                  to="/profile"
                  className="text-emerald-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-white text-teal-600 px-4 py-2 rounded-md hover:bg-emerald-100 font-medium text-sm min-w-[100px]"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-emerald-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-teal-600 px-4 py-2 rounded-md hover:bg-emerald-100 font-medium text-sm min-w-[100px]"
                >
                  Register
                </Link>
              </>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-emerald-100 hover:text-white p-2 rounded-md focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-teal-600">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="block text-emerald-100 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              to="/internships"
              onClick={() => setIsMenuOpen(false)}
              className="block text-emerald-100 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            >
              Internships
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/bookmarks"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-emerald-100 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                >
                  Bookmarks
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-emerald-100 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-emerald-100 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-emerald-100 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-emerald-100 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;