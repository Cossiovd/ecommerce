import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import MainLayout from '../components/templates/MainLayout';
import Button from '../components/atoms/Button';
import Badge from '../components/atoms/Badge';
import { useCartStore } from '../store/useCartStore';
import { formatPrice } from '../utils/currency';

const Product = () => {
    const { id } = useParams();
    const [productDetails, setProductDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const addToCart = useCartStore((state) => state.addToCart);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const docRef = doc(db, "products", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setProductDetails({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.log("¡No existe el producto!");
                    setProductDetails(null);
                }
            } catch (error) {
                console.error("Error al obtener el producto:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const handleQuantityChange = (change) => {
        const newQuantity = quantity + change;
        if (newQuantity >= 1 && newQuantity <= 10) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = () => {
        if (!productDetails) return;
        addToCart({
            ...productDetails,
            quantity
        });
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="max-w-[1280px] mx-auto px-6 py-24 flex flex-col items-center justify-center">
                    <span className="material-symbols-outlined animate-spin text-6xl text-secondary mb-4">progress_activity</span>
                    <p className="text-on-surface-variant font-body-lg">Obteniendo detalles del producto...</p>
                </div>
            </MainLayout>
        );
    }

    if (!productDetails) {
        return (
            <MainLayout>
                <div className="max-w-[1280px] mx-auto px-6 py-24 flex flex-col items-center justify-center text-center">
                    <span className="material-symbols-outlined text-8xl text-outline-variant mb-6" style={{ fontVariationSettings: "'FILL' 0" }}>production_quantity_limits</span>
                    <h1 className="font-h1 text-h2 text-primary-container mb-4">¡Producto no encontrado!</h1>
                    <p className="text-on-surface-variant max-w-md mb-8">No pudimos encontrar el producto que estás buscando. Es posible que haya sido eliminado o que el enlace sea incorrecto.</p>
                    <Link to="/catalog">
                        <Button>Volver a la tienda</Button>
                    </Link>
                </div>
            </MainLayout>
        );
    }

    const finalImage = productDetails.imageSrc || productDetails.image || productDetails.imageUrl;
    const inStock = productDetails.inStock !== undefined ? productDetails.inStock : true;

    return (
        <MainLayout>
            <main className="max-w-[1280px] mx-auto px-6 py-12">
                {/* Breadcrumbs */}
                <nav className="flex flex-wrap items-center gap-2 font-caption text-caption text-on-surface-variant mb-8">
                    <Link to="/" className="hover:text-secondary transition-colors">Home</Link>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    <Link to="/catalog" className="hover:text-secondary transition-colors">Tienda</Link>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    <Link to="/catalog" className="hover:text-secondary transition-colors">{productDetails.category || 'Product'}</Link>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    <span className="text-primary-container font-semibold truncate max-w-[200px] sm:max-w-none">{productDetails.title}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-24">
                    <div className="flex flex-col gap-4">
                        <div className="bg-white rounded-3xl p-8 shadow-[0_4px_20px_-4px_hsla(210,20%,10%,0.05)] relative aspect-square flex items-center justify-center group overflow-hidden">
                            {productDetails.badgeText && (
                                <div className="absolute top-6 left-6 z-10">
                                    <Badge variant={productDetails.badgeVariant || 'secondary'} size="large">
                                        {productDetails.badgeText}
                                    </Badge>
                                </div>
                            )}
                            <img
                                src={finalImage}
                                alt={productDetails.title || 'Product'}
                                className="max-w-[80%] max-h-[80%] object-contain group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <p className="font-label-sm text-secondary tracking-wider uppercase mb-3">
                            {productDetails.category || 'General'}
                        </p>
                        <h1 className="font-h1 text-h1 text-primary-container mb-4 leading-tight">
                            {productDetails.title}
                        </h1>

                        <div className="flex items-end gap-3 mb-8">
                            <span className="font-display text-[40px] font-bold text-primary-container leading-none">
                                {formatPrice(productDetails.price)}
                            </span>
                            {productDetails.originalPrice && (
                                <span className="text-on-surface-variant line-through text-lg mb-1">
                                    {formatPrice(productDetails.originalPrice)}
                                </span>
                            )}
                        </div>

                        <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 leading-relaxed">
                            {productDetails.descripcion || productDetails.description}
                        </p>

                        <div className="bg-surface-container-lowest border border-outline-variant/50 rounded-3xl p-6 shadow-sm mb-8">
                            <div className="flex items-center justify-between mb-4">
                                <span className="font-label-sm text-on-surface">Cantidad</span>
                                {inStock ? (
                                    <span className="font-label-sm text-green-600 flex items-center gap-1 bg-green-50 px-3 py-1 rounded-full">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                        En Stock
                                    </span>
                                ) : (
                                    <span className="font-label-sm text-error">Sin Stock</span>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                                <div className="flex items-center justify-between sm:justify-start bg-surface-container-low rounded-2xl border border-outline-variant/50 p-1">
                                    <button
                                        onClick={() => handleQuantityChange(-1)}
                                        disabled={quantity <= 1}
                                        className="w-12 h-12 flex items-center justify-center rounded-xl text-on-surface-variant hover:bg-white hover:text-primary-container hover:shadow-sm disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:shadow-none transition-all"
                                    >
                                        <span className="material-symbols-outlined">remove</span>
                                    </button>
                                    <span className="w-10 sm:w-12 text-center font-h3 text-primary-container">{quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(1)}
                                        disabled={quantity >= 10}
                                        className="w-12 h-12 flex items-center justify-center rounded-xl text-on-surface-variant hover:bg-white hover:text-primary-container hover:shadow-sm disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:shadow-none transition-all"
                                    >
                                        <span className="material-symbols-outlined">add</span>
                                    </button>
                                </div>
                                <Button
                                    className="flex-grow !py-4 text-lg flex items-center justify-center gap-2 group shadow-xl shadow-primary/20"
                                    onClick={handleAddToCart}
                                    disabled={!inStock}
                                >
                                    <span className="material-symbols-outlined">shopping_cart</span>
                                    Agregar al carrito - {formatPrice(parseFloat(productDetails.price) * quantity)}
                                </Button>
                            </div>
                        </div>

                        {/* Value Props */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 bg-surface-container-low/50 p-4 rounded-2xl">
                                <div className="w-10 h-10 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary">
                                    <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-label-sm text-on-surface">Envío gratis</span>
                                    <span className="font-caption text-on-surface-variant">En pedidos superiores a $50.000</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-surface-container-low/50 p-4 rounded-2xl">
                                <div className="w-10 h-10 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary">
                                    <span className="material-symbols-outlined text-[20px]">assignment_return</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-label-sm text-on-surface">Devoluciones fáciles</span>
                                    <span className="font-caption text-on-surface-variant">30 días para devolver</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </MainLayout>
    );
};

export default Product;
