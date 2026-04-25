export const formatPrice = (price) => {
  if (price === null || price === undefined) return '';
  const numPrice = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.-]+/g,"")) : parseFloat(price);
  
  if (isNaN(numPrice)) return price;
  
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(numPrice);
};
