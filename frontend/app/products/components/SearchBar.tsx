// import React from 'react';
// import { Input } from "@/components/ui/input"; // Ensure you use your input component
// import { Button } from '@/components/ui/button';

// interface SearchBarProps {
//   searchParams: {
//     name: string;
//   };
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   onSearch: () => void; // Prop for the search function
// }

// const SearchBar: React.FC<SearchBarProps> = ({ searchParams, onChange, onSearch }) => {
//   return (
//     <div className="flex items-center justify-center mb-8">
//       <Input
//         type="text"
//         name="name"
//         placeholder="Search by name"
//         value={searchParams.name}
//         onChange={onChange} // Update state without fetching
//         className="border border-gray-300 p-2 rounded-md shadow-sm w-full md:w-96" // Adjust width here
//         />
//       <Button
//         onClick={onSearch} // Calls the search function when the button is clicked
//         className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
//       >
//         Search
//       </Button>
//     </div>
//   );
// };

// export default SearchBar;


import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange, onSearch }) => {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="relative w-full max-w-xl">
        <Input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>
      <Button
        onClick={onSearch}
        className="ml-4 bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBar;