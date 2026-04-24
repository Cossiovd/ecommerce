import React from 'react';
import Badge from '../atoms/Badge';
import Button from '../atoms/Button';

const HeroSection = () => {
  return (
    <section className="px-6 py-8 max-w-7xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl bg-primary-container p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 shadow-xl">
        <div className="z-10 text-center md:text-left md:max-w-xl">
          <div className="mb-6">
            <Badge variant="soft">Trusted Veterinary Care</Badge>
          </div>
          <h2 className="font-display text-white text-[40px] md:text-display mb-6 leading-tight">Expert care for your favorite family members</h2>
          <p className="text-on-primary-container font-body-lg mb-8 max-w-md">Professional pharmacy, organic nutrition, and essential supplies curated by top-tier vets.</p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Button variant="secondaryContainer">Shop Now</Button>
            <Button variant="glass">Pet Profile</Button>
          </div>
        </div>
        <div className="relative w-full md:w-1/2 flex justify-center items-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-secondary-container/20 to-transparent rounded-full blur-3xl"></div>
          <img alt="Hero Pet" className="relative z-10 w-full max-w-md drop-shadow-2xl object-contain" data-alt="Studio portrait of a cute small dog and a cat sitting together peacefully on a soft blue background with clean lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHJrVy_HOpWSZT-Vz_xenjvDcUKDqJDC6hDHH5HQ993O0nWMNYps-kYrFgkknafdEP5SYMgljFwwu2OBHc7J-9o5yBCYq710zi-dhKaDlFtGOgENhZB8AC0QsdLC5donNWYIrYpfeU_tq4S6_4zxZoKi4qe7HqDYMAodiGbAT8i-QA2qL4I7T5JoPIHHICGcwgVBEdckTtktz4RbPTUV_5mIqSCSiV3FVzKxMqOqK6pc4YoLvdkW-P2xs0mDJkvUaOerHtjc6ccg" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
