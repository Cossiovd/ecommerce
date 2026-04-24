import React, { useState } from 'react';

const Input = ({ label, type = 'text', id, placeholder, icon, actionRight, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className="space-y-2">
      {(label || actionRight) && (
        <div className="flex justify-between items-center px-1">
          {label && <label className="font-label-sm text-label-sm text-on-surface" htmlFor={id}>{label}</label>}
          {actionRight}
        </div>
      )}
      <div className="relative group">
        {icon && (
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-secondary transition-colors" style={{ fontVariationSettings: "'FILL' 0" }}>{icon}</span>
        )}
        <input 
          className={`w-full ${icon ? 'pl-12' : 'pl-4'} ${isPassword ? 'pr-12' : 'pr-4'} py-3.5 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all outline-none text-body-md`} 
          id={id} 
          placeholder={placeholder} 
          type={inputType} 
          {...props}
        />
        {isPassword && (
          <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-xl">{showPassword ? 'visibility_off' : 'visibility'}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
