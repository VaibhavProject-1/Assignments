// src/components/SearchBar.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface SearchBarProps {
  searchQuery: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onChange, placeholder = "Search..." }) => {
  const isDarkMode = useSelector((state: RootState) => state.theme.darkMode); // Updated to access the correct property

  return (
    <div className={`mb-8 flex justify-center ${isDarkMode ? 'text-white' : 'text-black'}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={onChange}
        className={`w-full bg-gray-300 max-w-lg p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 ${isDarkMode ? 'bg-gray-800 border-gray-600 text-white focus:ring-gray-400' : 'bg-white border-gray-300 text-black focus:ring-blue-400'}`}
      />
    </div>
  );
};

export default SearchBar;