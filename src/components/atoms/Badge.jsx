import React from 'react';

const variants = {
  primary: "bg-primary text-white",
  secondary: "bg-secondary text-white",
  error: "bg-error text-white",
  soft: "bg-secondary-container/20 text-on-tertiary-container",
  success: "bg-green-100 text-green-700",
};

const Badge = ({ children, variant = 'primary', className = '', size = 'small' }) => {
  const baseClasses = "rounded-full uppercase font-bold inline-block";
  const variantClasses = variants[variant] || variants.primary;
  const sizeClasses = size === 'small' ? "text-[10px] px-2 py-1 tracking-tighter" : "px-4 py-1.5 font-label-sm tracking-wider";

  return (
    <span className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
