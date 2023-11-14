"use client";

import React, { useState } from 'react';
import "../styles/globals.css";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('');

  const handleSearch = () => {
    // Perform search based on `searchTerm`
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