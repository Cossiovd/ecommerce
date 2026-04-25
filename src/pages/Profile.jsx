import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import MainLayout from '../components/templates/MainLayout';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                navigate('/login');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="flex-grow flex items-center justify-center py-24">
                    <span className="material-symbols-outlined animate-spin text-4xl text-secondary">progress_activity</span>
                </div>
            </MainLayout>
        );
    }

    if (!user) return null;

    return (
        <MainLayout>
            <main className="max-w-[800px] mx-auto px-6 py-12">
                <div className="flex flex-col gap-8">
                    <div className="bg-white p-8 rounded-[2rem] shadow-[0_4px_20px_-4px_hsla(210,20%,10%,0.04)] flex flex-col items-center text-center">
                        <div className="w-24 h-24 bg-primary-container text-white rounded-full flex items-center justify-center text-3xl font-bold mb-4">
                            {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <h1 className="font-h1 text-h2 text-primary-container">{user.displayName || 'Cliente'}</h1>
                        <p className="text-on-surface-variant mb-6">{user.email}</p>
                    </div>

                    <div className="bg-white p-8 rounded-[2rem] shadow-[0_4px_20px_-4px_hsla(210,20%,10%,0.04)]">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="font-h2 text-h3 text-primary-container flex items-center gap-2">
                                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>pets</span>
                                Mis Mascotas
                            </h2>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4 p-4 rounded-2xl border border-surface-container-high hover:border-secondary/30 transition-colors">
                                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-xl font-bold">
                                    B
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-h3 text-[16px] text-primary-container">Buddy</span>
                                    <span className="font-caption text-on-surface-variant">Golden Retriever • 3 años</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 rounded-2xl border border-surface-container-high hover:border-secondary/30 transition-colors">
                                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 text-xl font-bold">
                                    L
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-h3 text-[16px] text-primary-container">Luna</span>
                                    <span className="font-caption text-on-surface-variant">Siamés • 1 año</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="mt-4 flex items-center justify-center gap-2 py-4 rounded-2xl text-error hover:bg-error-container/30 transition-colors font-h3 bg-white shadow-[0_4px_20px_-4px_hsla(210,20%,10%,0.04)]"
                    >
                        <span className="material-symbols-outlined">logout</span>
                        Cerrar Sesión
                    </button>

                </div>
            </main>
        </MainLayout>
    );
};

export default Profile;
