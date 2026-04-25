const variants = {
  primary: "bg-primary text-white hover:bg-primary/90",
  secondary: "bg-secondary text-on-secondary hover:bg-secondary/90 shadow-lg shadow-secondary/20",
  secondaryContainer: "bg-secondary-container text-on-secondary-container shadow-lg hover:shadow-secondary-container/30",
  glass: "bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20",
  text: "text-secondary hover:text-secondary/80",
  white: "bg-white text-primary hover:bg-slate-100",
};

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = "rounded-full font-label-sm font-bold transition-all active:scale-95";
  const variantClasses = variants[variant] || variants.primary;

  // Some variants have specific padding by default if not overridden
  const padding = variant === 'text' ? '' : 'px-8 py-3';

  return (
    <button className={`${baseClasses} ${variantClasses} ${padding} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
