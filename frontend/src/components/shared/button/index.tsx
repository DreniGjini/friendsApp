import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLElement> {
  children: ReactNode;
  dark?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, dark, ...props }) => {
  return (
    <button
      {...props}
      className={`${props.className} ${
        dark ? 'text-white bg-gray-600' : ' text-black bg-white'
      } rounded-lg p-2 flex items-center justify-center border-none outline-none font-semibold hover:bg-opacity-90 cursor-pointer transition-all duraiton-300`}
    >
      {children}
    </button>
  );
};

export default Button;
