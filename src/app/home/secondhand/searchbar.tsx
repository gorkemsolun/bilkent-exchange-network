"use client";

import React, { useState } from 'react';
import "../../../styles/globals.css";

const SearchBar = () => {
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('');

  const toggleFilterDropdown = () => {
    setFilterDropdownOpen(!filterDropdownOpen);
  };

  const handleSearch = () => {
    // Perform search based on `searchTerm`
    
  };

  const handleFilter = () => {
    // Perform filtering based on filter options

  };

  const handleCategoryChange = () => {

  };

  return (
    <div className="inline-flex items-center bg-purple-300 rounded-full m-2 p-0.5">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
        placeholder="Search..."
        className="border p-2 search-bar rounded-full m-2"
      />

      {/* Filter Dropdown */}
      <div className="relative">
        <button
          onClick={toggleFilterDropdown}
          className="p-2 border bg-white m-2 center rounded-full"
        >
          Filter
        </button>
        {filterDropdownOpen && (
          <div
            className="filter-dropdown absolute mt-2 p-4 border bg-white rounded-lg shadow-lg"
            style={{ zIndex: 1000 }}
          >
            <div className="mb-4 flex flex-row">
              <div className='mr-2'>
                <label className="font-semibold text-gray-800">Min Price</label>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="border p-2 rounded-md w-full"
                />
              </div>

              <div className='ml-2'>
                <label className="font-semibold text-gray-800">Max Price</label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="border p-2 rounded-md w-full"
                />
              </div>
            </div>

            <div className="mb-4 flex flex-row">
              <div className="mr-2" style={{ width: "48%" }}>
                <label className="font-semibold text-gray-800">Earliest Date</label>
                <input
                  type="date"
                  value={minDate}
                  onChange={(e) => setMinDate(e.target.value)}
                  className="border p-2 rounded-md w-full"
                />
              </div>
              <div className="ml-2" style={{ width: "48%" }}>
                <label className="font-semibold text-gray-800">Latest Date</label>
                <input
                  type="date"
                  value={maxDate}
                  onChange={(e) => setMaxDate(e.target.value)}
                  className="border p-2 rounded-md w-full"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="font-semibold text-gray-800">Categories</label>
              <div className="ml-4">
                <label>Category 1</label>
                <div className="ml-4">
                  <input
                    type="checkbox"
                    value="Subcategory1"
                    checked={categories.includes('Subcategory1')}
                    onChange={(e) => handleCategoryChange()}
                  />
                  <label>Subcategory 1</label>
                </div>
                <div className="ml-4">
                  <input
                    type="checkbox"
                    value="Subcategory2"
                    checked={categories.includes('Subcategory2')}
                    onChange={(e) => handleCategoryChange()}
                  />
                  <label>Subcategory 2</label>
                </div>
                {/* Add more subcategories as needed */}
              </div>
              <div className="ml-4">
                <label>Category 2</label>
                <div className="ml-4">
                  <input
                    type="checkbox"
                    value="Subcategory3"
                    checked={categories.includes('Subcategory3')}
                    onChange={(e) => handleCategoryChange()}
                  />
                  <label>Subcategory 3</label>
                </div>
                {/* Add more subcategories as needed */}
              </div>
              {/* Add more categories as needed */}
            </div>

            <button
              onClick={handleFilter}
              className="bg-red-500 text-white px-3 py-2 rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleFilter}
              className="bg-blue-500 text-white px-4 py-2 rounded-md right-0 absolute mr-5"
            >
              Filter
            </button>
          </div>
        )}
      </div>

      {/* Sort Dropdown */}
      <div className="relative">
        <div className=" right-0 mt-2 p-2 border bg-white center m-2 rounded-full">
          <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
            <option value="" disabled hidden>
              Sort By
            </option>
            <option value="price">Price ↓</option>
            <option value="date">Price ↑</option>
            <option value="date">Date ↓</option>
            <option value="date">Date ↑</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;