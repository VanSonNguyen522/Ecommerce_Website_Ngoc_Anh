import React from 'react';
import { Input } from "@/components/ui/input"; // Ensure you use your input component
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  searchParams: {
    name: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void; // Prop for the search function
}

const SearchBar: React.FC<SearchBarProps> = ({ searchParams, onChange, onSearch }) => {
  return (
    <div className="flex items-center justify-center mb-8">
      <Input
        type="text"
        name="name"
        placeholder="Search by name"
        value={searchParams.name}
        onChange={onChange} // Update state without fetching
        className="border border-gray-300 p-2 rounded-md shadow-sm w-full md:w-96" // Adjust width here
        />
      <Button
        onClick={onSearch} // Calls the search function when the button is clicked
        className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
