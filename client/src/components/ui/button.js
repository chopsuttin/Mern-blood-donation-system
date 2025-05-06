import React from 'react';

export const Button = ({ children, onClick, className = '', type = 'button' }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-xl transition duration-200 ${className}`}
    >
      {children}
    </button>
  );
};
