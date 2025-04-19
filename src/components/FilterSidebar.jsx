import { useState, useEffect } from 'react';

const FilterSidebar = ({ filters, setFilters }) => {
  const [localSalary, setLocalSalary] = useState(filters.salary);

  // Define Indian cities for location filter
  const indianCities = ['Mumbai', 'Bengaluru', 'Delhi', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata'];

  // Define categories (unchanged, assuming same as original)
  const categories = [
    'Software Development',
    'Data Science',
    'Design',
    'Marketing',
  ];

  // Handle salary filter change
  const handleSalaryChange = (e) => {
    const value = parseInt(e.target.value);
    setLocalSalary(value);
    setFilters(prev => ({ ...prev, salary: value }));
  };

  // Handle location filter change
  const handleLocationChange = (location) => {
    setFilters(prev => ({
      ...prev,
      locations: prev.locations.includes(location)
        ? prev.locations.filter(loc => loc !== location)
        : [...prev.locations, location]
    }));
  };

  // Handle category filter change
  const handleCategoryChange = (category) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(cat => cat !== category)
        : [...prev.categories, category]
    }));
  };

  // Handle remote only filter change
  const handleRemoteChange = () => {
    setFilters(prev => ({ ...prev, remoteOnly: !prev.remoteOnly }));
  };

  // Sync local salary with filters.salary on mount or update
  useEffect(() => {
    setLocalSalary(filters.salary);
  }, [filters.salary]);

  return (
    <div className="w-full md:w-64 md:mr-8 mb-8 md:mb-0">
      <h2 className="text-xl font-bold mb-6">Filters</h2>

      {/* Salary Filter */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Salary (₹/hr)</h3>
        <input
          type="range"
          min="0"
          max="4150" // Equivalent to $50 * 83
          step="83" // Equivalent to $1 increments
          value={localSalary}
          onChange={handleSalaryChange}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>₹0</span>
          <span>₹{localSalary}</span>
          <span>₹4150</span>
        </div>
      </div>

      {/* Location Filter */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Location</h3>
        {indianCities.map((location) => (
          <div key={location} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={location}
              checked={filters.locations.includes(location)}
              onChange={() => handleLocationChange(location)}
              className="mr-2"
            />
            <label htmlFor={location} className="text-sm text-gray-700">{location}</label>
          </div>
        ))}
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Category</h3>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={category}
              checked={filters.categories.includes(category)}
              onChange={() => handleCategoryChange(category)}
              className="mr-2"
            />
            <label htmlFor={category} className="text-sm text-gray-700">{category}</label>
          </div>
        ))}
      </div>

      {/* Remote Only Filter */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Work Type</h3>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="remote"
            checked={filters.remoteOnly}
            onChange={handleRemoteChange}
            className="mr-2"
          />
          <label htmlFor="remote" className="text-sm text-gray-700">Remote Only</label>
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={() => setFilters({
          search: '',
          salary: 0,
          locations: [],
          categories: [],
          remoteOnly: false
        })}
        className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default FilterSidebar;