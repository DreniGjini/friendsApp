import React, { useState, ReactNode } from 'react';

interface DropdownProps {
  children: ReactNode;
  iniciator: ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ children, iniciator }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const isOpenClass = isOpen
    ? 'translate-y-0 opacity-100 pointer-events-all'
    : '-translate-y-1 opacity-0 pointer-events-none';

  return (
    <div className="relative">
      <div
        className="inline-block hover:opacity-75 transition-opacity cursor-pointer"
        onClick={handleToggle}
      >
        {iniciator}
      </div>
      <div
        className={`absolute right-0 top-0 w-48 transition-all duration-300 bg-white rounded-md p-4 text-black mt-10 z-50 ${isOpenClass}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
