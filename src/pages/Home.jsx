import React from 'react';
import MainLayout from '../components/templates/MainLayout';
import HeroSection from '../components/molecules/HeroSection';
import SubscriptionBento from '../components/molecules/SubscriptionBento';
import CategoryCard from '../components/molecules/CategoryCard';
import ProductCard from '../components/molecules/ProductCard';

const categories = [
  { icon: 'potted_plant', title: 'Dogs', subtitle: '240 Products', filledIcon: false },
  { icon: 'pets', title: 'Cats', subtitle: '185 Products', filledIcon: true },
  { icon: 'medical_services', title: 'Pharmacy', subtitle: 'Professional Grade', filledIcon: false },
  { icon: 'nutrition', title: 'Food', subtitle: 'Organic Mixes', filledIcon: false },
];

const newArrivals = [
  {
    imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWfV0bTs4JqmEW-tY75YkY4EdpxeorMfh3nPjkkUgPacuNQ41jwIzEbkzhZxhUtcyH5QHP5I0O-n7YCGa79uKEMOC6m8M2G6Qm3oLXig2yHkim63V3RTAZqNQ2fX0FQEasbwwtMVWIv7jykf-8jfSUXTEdRyo498uTeKujEu6iAo4XQS3tFGNuPbzrlRqlNjCNx0OOl6qtaRgp0QKcD649tAcwUSfVR-FC1Lsd2ej9MzvpcZdV0ZXKgDLJeOAlv62k6hL-m3xUjw',
    imageAlt: 'High-quality organic dog food bag',
    badgeText: 'New',
    badgeVariant: 'primary',
    category: 'Nutrition',
    title: 'Organic Salmon Bites',
    price: '$24.99',
    rating: '4.9',
  },
  {
    imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYOLPvPOawFeC18ON7XvCC5SdI9wQkeXw5ugW9qpQtfFF4OPrH17GxxYaPKkvb2XSg18956qpwSh_zGn5gAnGYZq7ONZVA4keMh7IKITbSN8BdJrpDdhrfLc6rmQ3LguysUcexqpwBNZ0EYeorNGPlFs7CRRd1Gmq1k_R7jVu9woNcKLC9f_D3-eDy4Zapd50n-41QxBF1FD37jHgj6zsBfEJQT1DhCc3Z1HDuYv8egLmhlX3l1pq83H1c71lxwE5Rvjqye4WYYw',
    imageAlt: 'Professional dog grooming brush',
    badgeText: 'Vet Recommended',
    badgeVariant: 'secondary',
    category: 'Grooming',
    title: 'Ergo-Grip Slicker Brush',
    price: '$18.50',
    rating: '5.0',
  },
  {
    imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3LUem3uZPNQfu2U-RxG1jHf0vtBK-2el3o8qGCxXYSGuM6Hio3IQM8n-4te_rM3Z3SxIQvjHxn3E5Kx7BDW4Dr0vUZBJczHS4e5eUB_geaJ6KNVlnnetex-vJxF6t-UwWJQsGWiJ2CJjPCBzHNJbRhNeqE8_ykTxZWnDZzecTJ3KYj60WocQxPeRf_aHyLkUdMiwT9N0nZZwihGb7wgZ0vUi33kbUy04eyLB6twxVYIX7M9PnOTgE-f2nC6TgqgfYNUSmZQ3Chg',
    imageAlt: 'Sleek modern cat collar',
    badgeText: null,
    badgeVariant: null,
    category: 'Accessories',
    title: 'Velvet Comfort Collar',
    price: '$32.00',
    rating: '4.8',
  },
  {
    imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9r-qdGIOfgG78ZRz_0K40xvAYO3bD2QVv-VyZ0RQ8H6LNnlleLqmXidGToqibSqdlmvN8viQl97LSI70waQ8AUiCQyTELRBKUZdpcGxV8yFNbXzzTLFUQHGQMyY0dW8JGh3fZ7B8Dd-yIAuDBJRKduDRJH-xAR0k04C-Bl89xBzu8H3PjYCvzC0ig22WCu78hojm4OApmRg5e-KEX8mZVGGw9zh-OFGi39vKYpMqOTwrRXRvJbaaQj_cRI1qgnacteNEwCcQ-KA',
    imageAlt: 'Professional pet medicine bottles',
    badgeText: 'Rx Required',
    badgeVariant: 'error',
    category: 'Health',
    title: 'Joint Support Complex',
    price: '$45.00',
    rating: '4.7',
  },
];

const Home = () => {
  return (
    <MainLayout>
      <HeroSection />

      {/* Quick Categories */}
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="font-h1 text-h1 text-primary">Shop by category</h3>
              <p className="text-on-surface-variant font-body-md">Everything your pet needs, organized for you.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <CategoryCard key={idx} {...cat} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Product Cards */}
      <section className="px-6 py-12 max-w-7xl mx-auto bg-surface-container-low/50 rounded-[48px] my-12">
        <div className="flex flex-col gap-10">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-h1 text-h1 text-primary">New Arrivals</h3>
              <p className="text-on-surface-variant font-body-md">Fresh items just added to our collection.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map((product, idx) => (
              <ProductCard key={idx} {...product} />
            ))}
          </div>
        </div>
      </section>

      <SubscriptionBento />
    </MainLayout>
  );
};

export default Home;