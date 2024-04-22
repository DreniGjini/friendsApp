import React, { useState, useEffect, useRef, ReactNode } from 'react';

interface DropdownProps {
  children: ReactNode;
  initiator: ReactNode;
  padding?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  children,
  initiator,
  padding,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const isOpenClass = isOpen
    ? 'translate-y-0 opacity-100 pointer-events-all'
    : '-translate-y-1 opacity-0 pointer-events-none';

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="inline-block hover:opacity-75 transition-opacity cursor-pointer"
        onClick={handleToggle}
        data-testid="toggler"
      >
        {initiator}
      </div>
      <div
        data-testid="content"
        className={`absolute right-0 w-max top-0 transition-all duration-300 bg-white rounded-md text-black mt-10 z-50 ${
          padding ? 'p-4' : ''
        } ${isOpenClass}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
