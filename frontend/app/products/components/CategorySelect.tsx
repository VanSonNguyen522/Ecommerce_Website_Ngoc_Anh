import React from 'react';
import { Button } from '@/components/ui/button';

const categories = [
  'Sắt hộp',
  'Ván gỗ',
  'Lưới B40',
  'Tôn lạnh',
  'Xốp',
  'Ván Symbo',
];

interface CategorySelectorProps {
  onCategorySelect: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ onCategorySelect }) => {
  return (
    <div className="flex flex-wrap justify-center mt-4">
      {categories.map((category) => (
        <Button
          key={category}
          onClick={() => onCategorySelect(category)} // Calls the onCategorySelect function
          className="m-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

export default CategorySelector;
