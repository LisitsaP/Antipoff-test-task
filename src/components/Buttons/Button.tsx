import React, { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode; 
  onClick?: () => void; 
  className?: string; 
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <button
      className={`md:border z-50 flex w- md:items-start md:border-white shadow-lg md:px-2 md:py-1 md:rounded-lg md:hover:bg-white md:text-white md:hover:text-black md:duration-300 cursor-pointer md:active:scale-[0.98] ${className}`} // Добавлено использование className
      type="button"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
