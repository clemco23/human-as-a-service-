import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

type ButtonProps = {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'transparent' | 'danger'| 'default' | 'black';
  href?: string;
  children: ReactNode;
  onClick?: () => void;
};

const sizeClasses = {
  small: 'px-3 py-1 text-sm',
  medium: 'px-4 py-2 text-base',
  large: 'px-6 py-3 text-lg',
};

const colorClasses = {
  primary: 'bg-[#ff6b6b] text-white hover:bg-[#ff5252]',
  transparent: 'bg-transparent border-2 border-[#ff6b6b] text-[#ff6b6b] hover:bg-[#ff5252] hover:text-white text-md',
  secondary: 'bg-gray-500 text-white hover:bg-gray-600',
  danger: 'bg-red-700 text-white hover:bg-red-600 text-md',
  default: 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-black text-md',
  black: 'bg-white text-black hover:scale-90 hover:shadow-md hover:bg-[#ff6b6b] hover:text-white text-md',
};

const activeClass = "bg-[#ff6b6b] text-white shadow-md";

export default function Button({
  size = 'medium',
  color = 'black',
  href,
  children,
  onClick,
}: ButtonProps) {
  const baseClasses = `rounded-md font-medium transition ${sizeClasses[size]}`;

  if (href) {
    return (
      <NavLink
        to={href}
        className={({ isActive }) =>
          isActive ? `${baseClasses} ${activeClass}` : `${baseClasses} ${colorClasses[color]}`
        }
      >
        {children}
      </NavLink>
    );
  }

  return (
    <button onClick={onClick} className={`${baseClasses} ${colorClasses[color]}`} type="button">
      {children}
    </button>
  );
}
