import React from 'react';
import { Button } from '@/components/ui/button';

const categories = [
  'sắt hộp',
  'ván gỗ',
  'lưới b40',
  'tôn lạnh',
  'xốp',
  'ván symbo',
];

interface CategorySelectorProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ selectedCategory, onCategorySelect }) => {
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="flex flex-wrap justify-center mt-4 mb-8">
      {categories.map((category) => (
        <Button
          key={category}
          onClick={() => onCategorySelect(category)}
          className={`m-2 font-semibold py-2 px-4 rounded-full shadow transition duration-300 ease-in-out transform hover:scale-105 ${
            selectedCategory.toLowerCase() === category
              ? 'bg-blue-500 text-white'
              : 'bg-white text-blue-500 hover:bg-blue-100'
          }`}
        >
          {capitalize(category)}
        </Button>
      ))}
    </div>
  );
};

export default CategorySelector;