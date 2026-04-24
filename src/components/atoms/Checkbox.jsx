import React from 'react';

const Checkbox = ({ id, label, children, ...props }) => {
  return (
    <div className="flex items-start gap-3">
      <input
        className="mt-1 w-5 h-5 rounded border-outline-variant text-secondary focus:ring-secondary cursor-pointer accent-secondary"
        id={id}
        type="checkbox"
        {...props}
      />
      <label
        className="font-caption text-caption text-on-surface-variant leading-relaxed cursor-pointer"
        htmlFor={id}
      >
        {children || label}
      </label>
    </div>
  );
};

export default Checkbox;
