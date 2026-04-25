import Badge from '../atoms/Badge';
import Button from '../atoms/Button';
import heroImage from '../../assets/imagen_home.png';

const HeroSection = () => {
  return (
    <section className="px-6 py-8 max-w-7xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl bg-primary-container p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 shadow-xl">
        <div className="z-10 text-center md:text-left md:max-w-xl">
          <div className="mb-6">
            <Badge variant="soft">Atención veterinaria de confianza</Badge>
          </div>
          <h2 className="font-display text-white text-[40px] md:text-display mb-6 leading-tight">Cuidado especializado para tus seres queridos</h2>
          <p className="text-on-primary-container font-body-lg mb-8 max-w-md">Productos farmacéuticos profesionales, alimentación ecológica y artículos de primera necesidad seleccionados por veterinarios de primer nivel.</p>
        </div>
        <div className="relative w-full md:w-1/2 flex justify-center items-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-secondary-container/20 to-transparent rounded-full blur-3xl"></div>
          <img alt="Hero Pet" className="relative z-10 w-full max-w-md drop-shadow-2xl object-contain" data-alt="Studio portrait of a cute small dog and a cat sitting together peacefully on a soft blue background with clean lighting" src={heroImage} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
