import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLElement> {
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={`${props.className} rounded-full h-10 text-black flex items-center justify-center border-none outline-none font-semibold bg-white`}
    >
      {children}
    </button>
  );
};

export default Button;
