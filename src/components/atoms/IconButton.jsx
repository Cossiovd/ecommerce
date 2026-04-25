const IconButton = ({ icon, className = '', iconProps = {}, ...props }) => {
  return (
    <button className={`active:scale-95 duration-200 flex items-center justify-center ${className}`} {...props}>
      <span className="material-symbols-outlined" {...iconProps}>
        {icon}
      </span>
    </button>
  );
};

export default IconButton;
