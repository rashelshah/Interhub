import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { internships } from '../data/internships';
import InternshipCard from '../components/InternshipCard';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredInternships, setFeaturedInternships] = useState([]);
  
  useEffect(() => {
    const shuffled = [...internships].sort(() => 0.5 - Math.random());
    setFeaturedInternships(shuffled.slice(0, 4));
  }, []);
  
  const handleSearch = (e) => {
    e.preventDefault();
    window.location.href = `/internships?search=${searchQuery}`;
  };

  // Map non-Indian locations to Indian cities
  const indianCities = ['Mumbai', 'Bengaluru', 'Delhi', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata'];
  const getIndianLocation = (location) => {
    const randomCity = indianCities[Math.floor(Math.random() * indianCities.length)];
    return /San Francisco|Miami|New York|Chicago|Seattle|US states/i.test(location) ? randomCity : location;
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-600 via-emerald-600 to-green-500 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-200">
              Launch Your Career in India
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-emerald-100 animate-fade-in" style={{ animationDelay: '100ms' }}>
              Discover internships across India's top companies and startups
            </p>
            
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by role, company, or city (e.g. Mumbai, Bengaluru)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-4 pl-6 pr-14 rounded-full shadow-xl border-2 border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-300 bg-white/10 text-white placeholder-emerald-200 backdrop-blur-sm"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white text-teal-600 p-2.5 rounded-full hover:bg-emerald-100 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>
            
            <div className="mt-10 animate-fade-in flex flex-wrap justify-center gap-4" style={{ animationDelay: '300ms' }}>
              <Link
                to="/internships"
                className="px-8 py-3 rounded-full bg-white text-teal-600 font-semibold hover:bg-emerald-100 transition-colors shadow-lg hover:shadow-xl"
              >
                Explore All Internships
              </Link>
              <Link
                to="/register"
                className="px-8 py-3 rounded-full bg-transparent border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors hover:border-emerald-200"
              >
                Start Your Journey
              </Link>
            </div>
          </div>
        </div>
        
        {/* Animated Floating Elements */}
        <div className="absolute top-20 left-20 w-24 h-24 bg-white/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-1/3 right-40 w-16 h-16 bg-emerald-300/20 rounded-full blur-lg animate-float-delayed"></div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-white/5"></div>
      </section>

      {/* Featured Internships Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Opportunities</h2>
            <p className="text-xl text-gray-600">Curated internships from India's leading organizations</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredInternships.map((internship) => (
              <InternshipCard 
                key={internship.id} 
                internship={{
                  ...internship,
                  salary: `₹${parseInt(internship.salary.replace('$', '')) * 83}`,
                  location: getIndianLocation(internship.location)
                }} 
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/internships" 
              className="inline-flex items-center text-teal-600 hover:text-emerald-700 font-medium text-lg"
            >
              <span>View all opportunities</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Categories</h2>
            <p className="text-xl text-gray-600">Explore internships by field</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                title: "Software Development",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                ),
              },
              {
                title: "Data Science",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
              },
              {
                title: "Design",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
              },
              {
                title: "Marketing",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                ),
              },
            ].map((category, index) => (
              <Link
                key={index}
                to={`/internships?category=${category.title}`}
                className="group p-8 rounded-2xl bg-gray-50 hover:bg-teal-50 transition-colors duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-4 rounded-full bg-teal-100 group-hover:bg-emerald-200 transition-colors">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                    {category.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-teal-50 via-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden bg-gradient-to-br from-teal-600 to-emerald-700 rounded-3xl shadow-xl p-12">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="relative text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Start Your Career Journey?
              </h2>
              <p className="text-lg md:text-xl text-emerald-100 mb-10 max-w-2xl mx-auto">
                Create an account to bookmark internships, track applications, and get personalized recommendations.
              </p>
              <Link 
                to="/register" 
                className="inline-block px-8 py-4 bg-white text-teal-600 font-semibold rounded-full hover:bg-emerald-100 transition-colors shadow-lg"
              >
                Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;