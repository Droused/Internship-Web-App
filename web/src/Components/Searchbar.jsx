import React from 'react';

const SearchBar = ({value, onChange}) => {
  return (
    <div className="fixed z-50 flex items-center justify-center w-full bottom-10 right-3">
  <div className="relative">
    <input
      className="w-64 px-4 py-2 pl-10 text-gray-700 placeholder-gray-500 transition-all duration-300 ease-in-out bg-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 focus:w-80"
      placeholder="Search Company, Location, Date..."
      aria-label="Search"
      value={value}
      onChange={onChange}
    />
    <span className="absolute top-0 left-0 flex items-center justify-center w-10 h-full text-indigo-500 transition-transform duration-300 ease-in-out transform hover:translate-x-1">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-6a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>
    </span>
  </div>
</div>

  );
};

export default SearchBar;
