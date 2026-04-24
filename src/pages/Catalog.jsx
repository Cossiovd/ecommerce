import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import MainLayout from '../components/templates/MainLayout';
import Button from '../components/atoms/Button';
import ProductCard from '../components/molecules/ProductCard';

const Catalog = () => {
  // Pagination, Search & Data state
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products from Firebase:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter logic
  const filteredProducts = products.filter(product => {
    const titleMatch = product.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = product.category?.toLowerCase().includes(searchTerm.toLowerCase());
    return titleMatch || categoryMatch;
  });

  // Pagination logic based on filtered products
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to page 1 on new search
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Optional: scroll to top of product grid
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 mb-10 pt-8">

        {/* Hero Search & Filter Bento */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="md:col-span-2 bg-white rounded-xl p-8 shadow-[0_4px_20px_-4px_hsla(210,20%,10%,0.05)] relative overflow-hidden flex flex-col justify-center min-h-[240px]">
            <div className="relative z-10">
              <h1 className="font-h1 text-h1 text-[#0A2540] mb-4">Premium Care for Your Best Friend</h1>
              <p className="text-on-surface-variant max-w-md mb-6 font-body-md">Discover vet-approved food, specialized vaccines, and premium accessories tailored for your pet's needs.</p>
              <div className="flex gap-2 flex-wrap">
                <Button variant="secondaryContainer" className="!px-6 !py-2.5 shadow-sm hover:shadow-md">Explore All</Button>
                <button className="border border-outline-variant text-[#0A2540] px-6 py-2.5 rounded-full font-label-sm hover:bg-surface-container transition-all active:scale-95">New Arrivals</button>
              </div>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/2 opacity-10 pointer-events-none">
              <span className="material-symbols-outlined text-[200px] text-secondary absolute -right-10 -bottom-10" style={{ fontVariationSettings: "'FILL' 1" }}>pets</span>
            </div>
          </div>

          <div className="bg-primary-container rounded-xl p-8 text-white flex flex-col justify-between shadow-[0_4px_20px_-4px_hsla(210,20%,10%,0.08)]">
            <div>
              <h3 className="font-h3 text-h3 text-secondary-fixed mb-2">Pet Health Sync</h3>
              <p className="text-on-primary-container font-caption">Switch between your pet profiles to see personalized recommendations.</p>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <div className="flex -space-x-3">
                <div className="w-12 h-12 rounded-full border-4 border-primary-container bg-surface overflow-hidden shadow-lg">
                  <img className="w-full h-full object-cover" alt="dog profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6mrTYecIuSZZy3KlXLbblHygm8YAWQRpIJfCQRdH-YWJegu-eY0g4T8xO33dw-A8ZZeZEq5qb3a_6sFZ2v9Dd3DU2tfCQs6hcSr0eDfI4GAutyBFs4gs2VZyB0Zr5R3vN4uQL54QNorSW27_S2fqPZ9MQ6_j5YtgJ8cc2MgbW2X3xPnTh-PEwN22o3qyjhKPKStrWSnzIxDcpe0xKLkAF2CluzFxwD1vCQVyEeFn0adMliB6adG6GRdACq7FXUZKHdKb34a8H7Q" />
                </div>
                <div className="w-12 h-12 rounded-full border-4 border-primary-container bg-surface overflow-hidden shadow-lg opacity-50">
                  <img className="w-full h-full object-cover" alt="cat profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCB1C0KtwXSY5BSNXn_vuD9kHhUwKBRHRthXxHuwyBWp6bYyN9QNRY4K0Y6hrZAWKSALBd7cwXrl5BgV5ymdgOtVLoopGs3UJdphzwJGElf3ij16kEerN2hYexFlO-xhI3ku3B0N5knrCBgrkrunPBHSsUlhnp_XA5MwXyNg_CJ3wFmvixwo_3BcR_huoJ87Pls09t9PGnB_NSF1SCJ_kMmW2-U9ChZFa4kquwatDRmrGXLQyriZiTOCYwg_uIy8aBP3oLd8gDEMQ" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters & Sort */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0" style={{ scrollbarWidth: 'none' }}>
            <button className="flex items-center gap-2 px-4 py-2 bg-secondary-container text-on-secondary-container rounded-full font-label-sm whitespace-nowrap">
              <span className="material-symbols-outlined text-[18px]">grid_view</span>
              All Products
            </button>
          </div>
          <div className="relative w-full md:max-w-xs">
            <input
              type="text"
              placeholder="Search products"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 pl-10 rounded-full border border-outline-variant focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          </div>
        </div>

        {/* Product Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 mb-12 min-h-[400px]">
          {loading ? (
            <div className="col-span-full flex flex-col justify-center items-center py-20 text-on-surface-variant">
              <span className="material-symbols-outlined text-4xl animate-spin mb-4 text-secondary">progress_activity</span>
              <p className="font-body-md">Loading products from Firebase...</p>
            </div>
          ) : currentProducts.length === 0 ? (
            <div className="col-span-full flex flex-col justify-center items-center py-20 text-on-surface-variant">
              <span className="material-symbols-outlined text-6xl mb-4 opacity-50">inventory_2</span>
              <p className="font-body-md">No products found.</p>
            </div>
          ) : (
            currentProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))
          )}
        </section>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mb-16">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-outline-variant/50 text-slate-500 hover:bg-surface-container-low disabled:opacity-30 disabled:hover:bg-transparent transition-all"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-label-sm transition-all ${currentPage === page
                  ? 'bg-secondary text-white shadow-md shadow-secondary/20 font-bold'
                  : 'text-slate-600 hover:bg-surface-container-low'
                  }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-outline-variant/50 text-slate-500 hover:bg-surface-container-low disabled:opacity-30 disabled:hover:bg-transparent transition-all"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        )}

        {/* Featured Banner */}
        <section className="mt-10 bg-tertiary-container rounded-[2.5rem] p-12 relative overflow-hidden flex items-center">
          <div className="relative z-10 max-w-xl">
            <span className="text-secondary-fixed font-label-sm tracking-widest uppercase mb-4 block">Seasonal Offer</span>
            <h2 className="font-display text-display text-white mb-6 leading-tight">Keep them safe during the winter</h2>
            <p className="text-on-primary-container text-body-lg mb-8">Save 20% on all immune-boosting supplements and winter gear for your pets.</p>
            <button className="bg-secondary-container text-on-secondary-container px-8 py-4 rounded-full font-label-sm shadow-lg hover:shadow-xl transition-all">Shop Winter Sale</button>
          </div>
          <div className="absolute right-0 bottom-0 top-0 w-1/2 hidden lg:block">
            <img className="w-full h-full object-cover" alt="dogs in snow" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1vFvEHg8c8FtebM53DhAQFMSO5ck38lxWbl5rMnxZ0INQCbx69VZmv_Sj8ccfWdKydOwCZlx2rc46P3DSJ07UtqNewA9rxBKz_s9AY-eKOZh2SoHgGlwLp6cyIyIhPlkKk4bHtJge9d35VXlIjSFwNc-Pm07-KpIt1iI3WfMhMUuKFIXPXHmI6UE58lSw53XFugnfiJtc-HouEu72iZkGUI3RTb9620-sXhRJ1-VlOEiSc-SDhi6iY0-bV1quHQddn5TqMcOuIw" />
            <div className="absolute inset-0 bg-gradient-to-r from-tertiary-container via-transparent to-transparent"></div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Catalog;
