import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import IconButton from '../atoms/IconButton';
import { useCartStore } from '../../store/useCartStore';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const { cart } = useCartStore();

  const getNavLinkClass = ({ isActive }) =>
    isActive
      ? "text-[#0A2540] font-bold border-b-2 border-secondary-container px-3 py-1 font-label-sm"
      : "text-slate-500 hover:bg-slate-50 transition-colors px-3 py-1 rounded-lg font-label-sm";

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-[0_4px_20px_-4px_hsla(210,20%,10%,0.05)] fixed top-0 w-full z-50 h-16">
      <div className="flex items-center justify-between px-6 w-full max-w-7xl mx-auto h-full">

        {/* Brand */}
        <Link to="/" className="flex items-center gap-4 group">
          <div className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden border-2 border-white shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform">
            <img alt="VetCare Logo" className="w-full h-full object-cover" src={logo} onError={(e)=> e.target.src = "../../assets/logo.png"} />
          </div>
          <h1 className="text-xl font-bold text-[#0A2540] tracking-tight font-['Plus_Jakarta_Sans'] group-hover:text-secondary transition-colors">VetCare</h1>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={getNavLinkClass}>Home</NavLink>
          <NavLink to="/catalog" className={getNavLinkClass}>Tienda</NavLink>
          <NavLink to="/login" className={getNavLinkClass}>Iniciar sesión</NavLink>
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          <NavLink to="/cart" className="relative p-2 text-slate-500 hover:bg-slate-50 transition-colors rounded-full active:scale-95 duration-200 flex items-center justify-center">
            <span className="material-symbols-outlined">shopping_cart</span>
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-secondary-container text-on-secondary-container text-[10px] flex items-center justify-center rounded-full font-bold shadow-sm">
                {cart.length}
              </span>
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;