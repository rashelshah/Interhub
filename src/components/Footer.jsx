import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-teal-600 text-emerald-100 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          <div className="text-center sm:text-left">
            <p className="text-sm sm:text-base">&copy; {new Date().getFullYear()} Internship Portal. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6">
            <Link to="/" className="text-sm sm:text-base hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/internships" className="text-sm sm:text-base hover:text-white transition-colors">
              Internships
            </Link>
            <Link to="/bookmarks" className="text-sm sm:text-base hover:text-white transition-colors">
              Bookmarks
            </Link>
            <Link to="/profile" className="text-sm sm:text-base hover:text-white transition-colors">
              Profile
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;