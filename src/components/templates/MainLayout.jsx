import React from 'react';
import Navbar from '../organisms/Navbar';
import BottomNavBar from '../molecules/BottomNavBar';
import Footer from '../organisms/Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="bg-background text-on-background font-body-md selection:bg-secondary-fixed-dim min-h-screen flex flex-col relative pb-safe">
      <Navbar />
      <main className="pt-16 flex-grow flex flex-col">
        {children}
      </main>
      <Footer />
      {/* Keeping BottomNavBar for mobile as per original structure, though usually hidden on desktop */}
      <BottomNavBar />
    </div>
  );
};

export default MainLayout;