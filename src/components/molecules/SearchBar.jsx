const SearchBar = ({ value, onChange, placeholder = "Buscar productos", className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      <span 
        className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant" 
        style={{ fontVariationSettings: "'FILL' 0" }}
      >
        search
      </span>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 pl-10 rounded-full border border-outline-variant focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
      />
    </div>
  );
};

export default SearchBar;