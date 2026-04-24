import React from 'react';

const CategoryCard = ({ icon, title, subtitle, filledIcon = false }) => {
  return (
    <div className="group cursor-pointer bg-white p-8 rounded-3xl text-center shadow-[0_4px_20px_-4px_hsla(210,20%,10%,0.05)] hover:shadow-lg transition-all border border-transparent hover:border-secondary-fixed-dim">
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-surface-container-low flex items-center justify-center text-primary-container group-hover:bg-secondary-container/10 group-hover:text-secondary transition-colors">
        <span className="material-symbols-outlined text-4xl" data-weight={filledIcon ? "fill" : undefined}>{icon}</span>
      </div>
      <h4 className="font-h3 text-h3 text-on-surface mb-1">{title}</h4>
      <p className="text-caption text-outline">{subtitle}</p>
    </div>
  );
};

export default CategoryCard;
