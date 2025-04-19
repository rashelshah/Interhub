
import { useState } from 'react';
import { locations, categories } from '../data/internships';

const FilterSidebar = ({ filters, setFilters }) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const handleSalaryChange = (e) => {
    const { value } = e.target;
    setFilters(prev => ({
      ...prev,
      salary: parseInt(value, 10)
    }));
  };
  
  const handleLocationChange = (location) => {
    if (filters.locations.includes(location)) {
      setFilters(prev => ({
        ...prev,
        locations: prev.locations.filter(loc => loc !== location)
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        locations: [...prev.locations, location]
      }));
    }
  };
  
  const handleCategoryChange = (category) => {
    if (filters.categories.includes(category)) {
      setFilters(prev => ({
        ...prev,
        categories: prev.categories.filter(cat => cat !== category)
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        categories: [...prev.categories, category]
      }));
    }
  };
  
  const handleRemoteChange = () => {
    setFilters(prev => ({
      ...prev,
      remoteOnly: !prev.remoteOnly
    }));
  };
  
  const clearAllFilters = () => {
    setFilters({
      search: '',
      salary: 0,
      locations: [],
      categories: [],
      remoteOnly: false
    });
  };

  const FilterContent = () => (
    <div>
      {/* Salary Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Salary Range</h3>
        <div className="flex flex-col">
          <span className="text-sm text-gray-600 mb-2">Min: ${filters.salary}/hr</span>
          <input 
            type="range" 
            min="0" 
            max="50" 
            value={filters.salary} 
            onChange={handleSalaryChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>$0</span>
            <span>$50/hr</span>
          </div>
        </div>
      </div>
      
      {/* Remote Only Filter */}
      <div className="mb-6">
        <label className="flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            checked={filters.remoteOnly} 
            onChange={handleRemoteChange}
            className="rounded border-gray-300 text-brand focus:ring-brand"
          />
          <span className="ml-2 text-gray-700">Remote Only</span>
        </label>
      </div>
      
      {/* Locations Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Location</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {locations.map((location) => (
            <label key={location} className="flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={filters.locations.includes(location)} 
                onChange={() => handleLocationChange(location)}
                className="rounded border-gray-300 text-brand focus:ring-brand"
              />
              <span className="ml-2 text-gray-700">{location}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Categories Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Category</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {categories.map((category) => (
            <label key={category} className="flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={filters.categories.includes(category)} 
                onChange={() => handleCategoryChange(category)}
                className="rounded border-gray-300 text-brand focus:ring-brand"
              />
              <span className="ml-2 text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Clear Filters Button */}
      <button
        onClick={clearAllFilters}
        className="w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );
  
  return (
    <>
      {/* Desktop Filter Sidebar */}
      <div className="hidden md:block w-64 mr-8">
        <div className="sticky top-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            <FilterContent />
          </div>
        </div>
      </div>
      
      {/* Mobile Filter Button */}
      <div className="md:hidden fixed bottom-6 right-6 z-30">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="bg-brand text-white p-3 rounded-full shadow-lg hover:bg-brand-dark transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </button>
      </div>
      
      {/* Mobile Filter Overlay */}
      {showMobileFilters && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end animate-fade-in">
          <div className="bg-white w-4/5 h-full overflow-y-auto animate-slide-in p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Filters</h2>
              <button 
                onClick={() => setShowMobileFilters(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <FilterContent />
            
            <div className="mt-6">
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full py-2 px-4 bg-brand text-white rounded-md hover:bg-brand-dark transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSidebar;
