import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCartStore } from '../../store/useCartStore';

const BottomNavBar = () => {
  const { cart } = useCartStore();

  const getNavLinkClass = ({ isActive }) => {
    const baseClass = "flex flex-col items-center justify-center active:scale-90 transition-transform duration-150 relative";
    const activeClass = "text-[#0A2540] dark:text-blue-400 font-bold";
    const inactiveClass = "text-slate-400 dark:text-slate-500 hover:text-[#0A2540] dark:hover:text-blue-300 font-medium";
    
    return `${baseClass} ${isActive ? activeClass : inactiveClass}`;
  };

  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-3 pb-safe bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shadow-[0_-4px_16px_rgba(10,37,64,0.04)] z-50 md:hidden">
      <NavLink to="/" className={getNavLinkClass}>
        {({ isActive }) => (
          <>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>home</span>
            <span className="font-['Plus_Jakarta_Sans'] text-[11px] mt-1">Home</span>
          </>
        )}
      </NavLink>
      
      <NavLink to="/catalog" className={getNavLinkClass}>
        {({ isActive }) => (
          <>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>pets</span>
            <span className="font-['Plus_Jakarta_Sans'] text-[11px] mt-1">Tienda</span>
          </>
        )}
      </NavLink>
      
      <NavLink to="/cart" className={getNavLinkClass}>
        {({ isActive }) => (
          <>
            <div className="relative">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>shopping_cart</span>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-secondary-container rounded-full border border-white flex items-center justify-center text-[8px] text-on-secondary-container font-bold"></span>
              )}
            </div>
            <span className="font-['Plus_Jakarta_Sans'] text-[11px] mt-1">Carro</span>
          </>
        )}
      </NavLink>
      

      <NavLink to="/profile" className={getNavLinkClass}>
        {({ isActive }) => (
          <>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>person</span>
            <span className="font-['Plus_Jakarta_Sans'] text-[11px] mt-1">Perfil</span>
          </>
        )}
      </NavLink>
    </div>
  );
};

export default BottomNavBar;
