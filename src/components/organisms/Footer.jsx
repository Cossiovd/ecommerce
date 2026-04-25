import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary-container text-white pt-16 pb-28 md:pb-8 px-6 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white overflow-hidden flex items-center justify-center">
              <span className="material-symbols-outlined text-primary-container">pets</span>
            </div>
            <h2 className="font-h2 text-h2 text-white">VetCare</h2>
          </Link>
          <p className="text-on-primary-container font-body-md mt-2 max-w-sm">
            Cuidados de primera calidad para tu mejor amigo. Descubre alimentos recomendados por veterinarios, vacunas especializadas y accesorios de primera calidad adaptados a las necesidades de tu mascota.
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

        <div className="flex flex-col gap-4">
          <h3 className="font-h3 text-white mb-2">Tienda</h3>
          <Link to="/catalog" className="text-on-primary-container hover:text-white transition-colors font-body-md">Todos los productos</Link>
          <Link to="/catalog" className="text-on-primary-container hover:text-white transition-colors font-body-md">Nutrición y alimentación</Link>
          <Link to="/catalog" className="text-on-primary-container hover:text-white transition-colors font-body-md">Atención clínica</Link>
          <Link to="/catalog" className="text-on-primary-container hover:text-white transition-colors font-body-md">Juguetes y accesorios</Link>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-h3 text-white mb-2">Soporte</h3>
          <Link to="#" className="text-on-primary-container hover:text-white transition-colors font-body-md">Contáctanos</Link>
          <Link to="#" className="text-on-primary-container hover:text-white transition-colors font-body-md">Preguntas frecuentes</Link>
          <Link to="#" className="text-on-primary-container hover:text-white transition-colors font-body-md">Envíos y devoluciones</Link>
          <Link to="#" className="text-on-primary-container hover:text-white transition-colors font-body-md">Seguimiento de pedido</Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-center gap-4">
        <p className="text-on-primary-container font-caption text-center">
          &copy; {new Date().getFullYear()} VetCare eCommerce. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
