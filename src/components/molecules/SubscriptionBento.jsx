import React from 'react';
import Button from '../atoms/Button';
import suscribe from "../../assets/suscribe.png"

const SubscriptionBento = () => {
  return (
    <section className="px-6 py-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-primary-container rounded-[32px] p-10 flex flex-col justify-between text-white relative overflow-hidden h-[360px]">
          <div className="relative z-10 max-w-md">
            <h3 className="font-display text-[32px] mb-4">Que nunca se queden sin sus productos favoritos</h3>
            <p className="font-body-lg text-on-primary-container mb-8">Suscríbete y ahorra un 15 % en cada entrega. Gestiona tu calendario fácilmente desde tu perfil.</p>
            <Button variant="white">Iniciar suscripción</Button>
          </div>
          <div className="absolute bottom-0 right-0 w-1/2 h-full">
            <img alt="Subscribe" className="w-full h-full object-cover opacity-60" data-alt="Warm photograph of a happy puppy playing with a squeaky toy on a cozy rug, representing household happiness" src={suscribe} />
          </div>
        </div>
        <div className="bg-secondary-container rounded-[32px] p-10 flex flex-col items-center text-center justify-center text-on-secondary-container h-[360px]">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-5xl">health_and_safety</span>
          </div>
          <h3 className="font-h2 text-h2 mb-4">Asistencia de TeleVet</h3>
          <p className="font-body-md mb-6">Habla con un veterinario titulado las 24 horas del día, los 7 días de la semana, para cualquier asunto urgente.</p>
          <Button variant="primary" className="w-full">Conéctate ahora</Button>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionBento;
