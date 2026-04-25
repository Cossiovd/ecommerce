import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
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

const Home = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // Reverse array to get the latest ones assuming they were added in order, and limit to 4
        const latestProducts = productsData.reverse().slice(0, 4);
        setNewArrivals(latestProducts);
      } catch (error) {
        console.error("Error fetching new arrivals from Firebase:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 min-h-[300px]">
            {loading ? (
              <div className="col-span-full flex flex-col justify-center items-center py-10 text-on-surface-variant">
                <span className="material-symbols-outlined text-4xl animate-spin mb-4 text-secondary">progress_activity</span>
                <p className="font-body-md">Cargando últimos productos...</p>
              </div>
            ) : newArrivals.length === 0 ? (
              <div className="col-span-full text-center py-10 text-on-surface-variant">
                <p className="font-body-md">Aún no hay productos disponibles.</p>
              </div>
            ) : (
              newArrivals.map((product) => (
                <ProductCard key={product.id || product.title} {...product} />
              ))
            )}
          </div>
        </div>
      </section>

      <SubscriptionBento />
    </MainLayout>
  );
};

export default Home;