import type { ReactNode } from 'react';

type ButtonProps = {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'danger'| 'default';
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
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-500 text-white hover:bg-gray-600',
  danger: 'bg-red-700 text-white hover:bg-red-600 text-md',
  default: 'bg-transparent border-2 border-white  text-white hover:bg-white hover:text-black text-md',

};

export default function Button({
  size = 'medium',
  color = 'primary',
  href,
  children,
  onClick,
}: ButtonProps) {
  const classes = `rounded-md font-medium transition ${sizeClasses[size]} ${colorClasses[color]}`;

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target={color === 'primary' ? "_blank" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes} type="button">
      {children}
    </button>
  );
}