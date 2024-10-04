// Button.tsx
import React from 'react';

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string; // Optional for additional classes
}

const Button: React.FC<ButtonProps> = ({ onClick, disabled, children, className = '' }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
  >
    {children}
  </button>
);

export default Button;
