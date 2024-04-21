import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLElement> {
  children: ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={
        'w-14 h-14 rounded-full transition-colors duration-300 bg-gray-400 text-white flex items-center justify-center hover:bg-gray-300 cursor-pointer'
      }
    >
      {children}
    </button>
  );
};

export default IconButton;
