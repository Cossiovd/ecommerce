import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary-container text-white pt-16 pb-28 md:pb-8 px-6 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

        {/* Brand Column */}
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white overflow-hidden flex items-center justify-center">
              <span className="material-symbols-outlined text-primary-container">pets</span>
            </div>
            <h2 className="font-h2 text-h2 text-white">VetCare</h2>
          </Link>
          <p className="text-on-primary-container font-body-md mt-2 max-w-sm">
            Premium care for your best friend. Discover vet-approved food, specialized vaccines, and premium accessories tailored for your pet's needs.
          </p>
          <div className="flex items-center gap-4 mt-2">
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-secondary-container hover:text-on-secondary-container transition-colors">
              <span className="material-symbols-outlined text-[20px]">share</span>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-secondary-container hover:text-on-secondary-container transition-colors">
              <span className="material-symbols-outlined text-[20px]">mail</span>
            </a>
          </div>
        </div>

        {/* Links Column 1 */}
        <div className="flex flex-col gap-4">
          <h3 className="font-h3 text-white mb-2">Shop</h3>
          <Link to="/catalog" className="text-on-primary-container hover:text-white transition-colors font-body-md">All Products</Link>
          <Link to="/catalog" className="text-on-primary-container hover:text-white transition-colors font-body-md">Nutrition & Food</Link>
          <Link to="/catalog" className="text-on-primary-container hover:text-white transition-colors font-body-md">Clinical Care</Link>
          <Link to="/catalog" className="text-on-primary-container hover:text-white transition-colors font-body-md">Toys & Accessories</Link>
        </div>

        {/* Links Column 2 */}
        <div className="flex flex-col gap-4">
          <h3 className="font-h3 text-white mb-2">Support</h3>
          <Link to="#" className="text-on-primary-container hover:text-white transition-colors font-body-md">Contact Us</Link>
          <Link to="#" className="text-on-primary-container hover:text-white transition-colors font-body-md">FAQs</Link>
          <Link to="#" className="text-on-primary-container hover:text-white transition-colors font-body-md">Shipping & Returns</Link>
          <Link to="#" className="text-on-primary-container hover:text-white transition-colors font-body-md">Track Order</Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-center gap-4">
        <p className="text-on-primary-container font-caption text-center">
          &copy; {new Date().getFullYear()} VetCare eCommerce. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
