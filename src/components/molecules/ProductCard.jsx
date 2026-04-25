import React from 'react';
import { Link } from 'react-router-dom';
import Badge from '../atoms/Badge';
import { formatPrice } from '../../utils/currency';

const ProductCard = ({
  id,
  imageSrc,
  image,
  imageUrl,
  imageAlt,
  badgeText,
  badgeVariant,
  category,
  title,
  price,
  originalPrice,
  buttonType = 'round', // 'round' | 'full'
  showFavorite = false
}) => {
  const finalImage = imageSrc || image || imageUrl;

  return (
    <div className="group relative bg-white rounded-3xl p-4 md:p-6 mb-4 shadow-[0_4px_20px_-4px_hsla(210,20%,10%,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
      {badgeText && (
        <div className="absolute top-4 left-4 z-10">
          <Badge variant={badgeVariant}>{badgeText}</Badge>
        </div>
      )}

      {showFavorite && (
        <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm shadow-sm flex items-center justify-center text-slate-400 hover:text-error transition-colors z-10">
          <span className="material-symbols-outlined text-[20px]">favorite</span>
        </button>
      )}

      <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 flex items-center justify-center">
        <Link to={`/product/${id}`} className="w-full h-full flex items-center justify-center">
          <img
            alt={imageAlt || title || 'Product'}
            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
            src={finalImage}
          />
        </Link>

        {buttonType === 'round' ? (
          <button className="absolute bottom-4 right-4 w-12 h-12 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
            <span className="material-symbols-outlined">add_shopping_cart</span>
          </button>
        ) : (
          <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <button className="w-full bg-[#0A2540] text-white py-3 rounded-2xl font-label-sm shadow-xl flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
              Quick Add
            </button>
          </div>
        )}
      </div>
      <div className="px-2 pb-2">
        <p className="text-slate-400 font-caption mb-1">{category}</p>
        <Link to={`/product/${id}`}>
          <h5 className="font-h3 text-[#0A2540] group-hover:text-secondary transition-colors mb-2 text-[18px]">{title}</h5>
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-h1 text-h2 text-secondary">{formatPrice(price)}</span>
            {originalPrice && <span className="text-slate-400 line-through text-caption">{formatPrice(originalPrice)}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;