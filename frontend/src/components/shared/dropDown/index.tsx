import React, { useState, ReactNode } from "react";
import Styles from "./dropdown.module.scss";

interface DropdownProps {
  children: ReactNode;
  iniciator: ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ children, iniciator }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const isOpenClass = isOpen ? Styles.open : "";

  return (
    <div className={`${Styles.dropdown} ${isOpenClass}`}>
      <div className={Styles.toggleButton} onClick={handleToggle}>
        {iniciator}
      </div>
      <div className={Styles.dropdownContent}>{children}</div>
    </div>
  );
};

export default Dropdown;
