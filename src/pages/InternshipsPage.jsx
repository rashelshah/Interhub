
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { internships } from '../data/internships';
import InternshipCard from '../components/InternshipCard';
import FilterSidebar from '../components/FilterSidebar';

const InternshipsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearchQuery = queryParams.get('search') || '';
  const initialCategory = queryParams.get('category') || '';
  
  const [filters, setFilters] = useState({
    search: initialSearchQuery,
    salary: 0,
    locations: [],
    categories: initialCategory ? [initialCategory] : [],
    remoteOnly: false
  });
  
  const [filteredInternships, setFilteredInternships] = useState(internships);
  const [searchInput, setSearchInput] = useState(initialSearchQuery);
  
  // Apply filters whenever they change
  useEffect(() => {
    let results = [...internships];
    
    // Filter by search query
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      results = results.filter(
        internship => 
          internship.title.toLowerCase().includes(searchLower) ||
          internship.company.toLowerCase().includes(searchLower) ||
          internship.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by salary
    if (filters.salary > 0) {
      results = results.filter(
        internship => internship.salaryValue >= filters.salary
      );
    }
    
    // Filter by locations
    if (filters.locations.length > 0) {
      results = results.filter(
        internship => filters.locations.includes(internship.location)
      );
    }
    
    // Filter by categories
    if (filters.categories.length > 0) {
      results = results.filter(
        internship => filters.categories.includes(internship.category)
      );
    }
    
    // Filter by remote only
    if (filters.remoteOnly) {
      results = results.filter(internship => internship.isRemote);
    }
    
    setFilteredInternships(results);
  }, [filters]);
  
  const handleSearch = (e) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, search: searchInput }));
    
    // Update URL to reflect search
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('search', searchInput);
    window.history.replaceState({}, '', `${location.pathname}?${searchParams.toString()}`);
  };
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Browse Internships</h1>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-2xl mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for internships..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full py-3 pl-4 pr-12 rounded-lg shadow-sm border-gray-300 focus:border-brand focus:ring focus:ring-brand/20 focus:ring-opacity-50"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-brand text-white p-2 rounded-md hover:bg-brand-dark transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>
        
        <div className="flex flex-col md:flex-row">
          {/* Filters */}
          <FilterSidebar filters={filters} setFilters={setFilters} />
          
          {/* Internship Results */}
          <div className="flex-1">
            {/* Results Count & Applied Filters */}
            <div className="mb-6">
              <p className="text-gray-600">
                Found <span className="font-medium">{filteredInternships.length}</span> internships
              </p>
              
              {/* Applied Filters */}
              {(filters.locations.length > 0 || filters.categories.length > 0 || filters.remoteOnly || filters.salary > 0) && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {filters.salary > 0 && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                      Min: ${filters.salary}/hr
                      <button 
                        onClick={() => setFilters(prev => ({ ...prev, salary: 0 }))}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  )}
                  
                  {filters.remoteOnly && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                      Remote Only
                      <button 
                        onClick={() => setFilters(prev => ({ ...prev, remoteOnly: false }))}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  )}
                  
                  {filters.locations.map((location) => (
                    <span key={location} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                      {location}
                      <button 
                        onClick={() => setFilters(prev => ({ 
                          ...prev, 
                          locations: prev.locations.filter(loc => loc !== location) 
                        }))}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  ))}
                  
                  {filters.categories.map((category) => (
                    <span key={category} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                      {category}
                      <button 
                        onClick={() => setFilters(prev => ({ 
                          ...prev, 
                          categories: prev.categories.filter(cat => cat !== category) 
                        }))}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            {/* Internships Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInternships.length > 0 ? (
                filteredInternships.map((internship) => (
                  <InternshipCard key={internship.id} internship={internship} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No internships found</h3>
                  <p className="mt-1 text-gray-500">Try adjusting your filters or search query.</p>
                  <button
                    onClick={() => setFilters({
                      search: '',
                      salary: 0,
                      locations: [],
                      categories: [],
                      remoteOnly: false
                    })}
                    className="mt-4 text-brand hover:text-brand-dark"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipsPage;
