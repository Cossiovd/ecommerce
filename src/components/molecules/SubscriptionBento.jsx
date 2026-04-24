import React from 'react';
import Button from '../atoms/Button';

const SubscriptionBento = () => {
  return (
    <section className="px-6 py-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-primary-container rounded-[32px] p-10 flex flex-col justify-between text-white relative overflow-hidden h-[360px]">
          <div className="relative z-10 max-w-md">
            <h3 className="font-display text-[32px] mb-4">Never run out of their favorites</h3>
            <p className="font-body-lg text-on-primary-container mb-8">Subscribe and save 15% on every delivery. Manage your schedule easily from your profile.</p>
            <Button variant="white">Start Subscription</Button>
          </div>
          <div className="absolute bottom-0 right-0 w-1/2 h-full">
            <img alt="Subscribe" className="w-full h-full object-cover opacity-60" data-alt="Warm photograph of a happy puppy playing with a squeaky toy on a cozy rug, representing household happiness" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrZaf1_jVbsbhJhSn2tLm3mZuBOVu0RShsFPf3qSChNEA2MwNNTInoGq4vp648a77IqnreUjaLfogGKS2mEqDDr5m_Jcved4zcstBPvVYJ22Nr0JBsbAu93aDRovynsFg4usWHejpgu0pcf2ORX8SVi5GwFeQFzMr4qzobxP7Z8IYFxD-fB_-mvMJar23MOP2vGt82KWk0yao1H-3FHdbXz--PU8P6-UunS29kHySnr4ZivwuxLlzB-Srq6wBLkvuaW_PXWZ9U4Q" />
          </div>
        </div>
        <div className="bg-secondary-container rounded-[32px] p-10 flex flex-col items-center text-center justify-center text-on-secondary-container h-[360px]">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-5xl">health_and_safety</span>
          </div>
          <h3 className="font-h2 text-h2 mb-4">TeleVet Support</h3>
          <p className="font-body-md mb-6">Chat with a licensed veterinarian 24/7 for any urgent concerns.</p>
          <Button variant="primary" className="w-full">Connect Now</Button>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionBento;
