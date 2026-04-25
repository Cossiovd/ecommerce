import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';
import { loginUser } from '../services/auth';
import MainLayout from '../components/templates/MainLayout';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import vetlogin from "../assets/imagen_login.png"

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/profile');
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const { user, error: authError } = await loginUser(email, password);
        
        if (authError) {
            console.error('Login error:', authError.code, authError.message);
            if (authError.code === 'auth/invalid-credential' || authError.code === 'auth/user-not-found' || authError.code === 'auth/wrong-password') {
                setError('Correo electrónico o contraseña incorrectos.');
            } else {
                setError('No se ha podido iniciar sesión. Inténtalo de nuevo más tarde.');
            }
        } else if (user) {
            navigate('/profile');
        }
        
        setLoading(false);
    };

    return (
        <MainLayout>
            <main className="flex-grow flex items-center justify-center pt-24 pb-12 px-6">
                <div className="max-w-[1100px] w-full grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
                    <div className="hidden lg:flex flex-col items-center text-center space-y-8">
                        <div className="relative w-full aspect-square max-w-[500px]">
                            <div className="absolute inset-0 bg-secondary-container/5 rounded-full blur-3xl"></div>
                            <img
                                alt="Professional veterinarian smiling"
                                className="relative z-10 w-full h-full object-cover rounded-3xl"
                                style={{ filter: 'drop-shadow(0 20px 30px hsla(210, 20%, 10%, 0.08))' }}
                                src={vetlogin}
                            />
                        </div>
                        <div className="space-y-4 max-w-md">
                            <h2 className="font-h1 text-h1 text-primary-container">La experiencia clínica se une a una atención llena de empatía.</h2>
                            <p className="font-body-lg text-body-lg text-on-surface-variant">Accede al historial médico de tu mascota, compra productos básicos de farmacia y chatea con expertos.</p>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <div className="w-full max-w-[440px] bg-surface-container-lowest p-8 md:p-10 rounded-[2rem] shadow-[0_4px_20px_-4px_rgba(10,37,64,0.08)] border border-surface-variant/30">
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center p-3 bg-secondary-container/10 rounded-2xl mb-4">
                                    <span className="material-symbols-outlined text-secondary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>lock_open</span>
                                </div>
                                <h3 className="font-h2 text-h2 text-primary-container">Bienvenido de nuevo</h3>
                                <p className="text-on-surface-variant mt-2">Introduce tus datos de acceso para gestionar la atención de tu mascota.</p>
                            </div>

                            {error && (
                                <div className="mb-6 p-4 bg-error-container/20 border border-error-container text-error rounded-xl font-body-sm flex items-center gap-2">
                                    <span className="material-symbols-outlined">error</span>
                                    {error}
                                </div>
                            )}

                            <form className="space-y-6" onSubmit={handleLogin}>
                                <Input
                                    label="Dirección de correo electrónico"
                                    id="email"
                                    type="email"
                                    placeholder="Ingresaa el correo electrónico"
                                    icon="mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />

                                <Input
                                    label="Contraseña"
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    icon="key"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    actionRight={<a className="text-caption font-caption text-secondary hover:underline" href="#">¿Has olvidado tu contraseña?</a>}
                                />

                                <Button 
                                    type="submit" 
                                    variant="secondary" 
                                    disabled={loading}
                                    className="w-full !py-4 text-h3 shadow-lg shadow-secondary/20 flex items-center justify-center gap-2 mt-2"
                                >
                                    {loading ? (
                                        <>
                                            <span className="material-symbols-outlined animate-spin">progress_activity</span>
                                            Iniciando sesión...
                                        </>
                                    ) : (
                                        'Iniciar sesión'
                                    )}
                                </Button>
                            </form>

                            <div className="relative my-8">
                                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-outline-variant"></div></div>
                                <div className="relative flex justify-center text-xs uppercase font-bold tracking-widest text-outline bg-surface-container-lowest px-4">O continuar con</div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button type="button" className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-outline-variant hover:bg-surface-container-low transition-colors active:scale-95">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                    <span className="font-label-sm text-on-surface">Google</span>
                                </button>
                                <button type="button" className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-outline-variant hover:bg-surface-container-low transition-colors active:scale-95">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-on-surface">
                                        <path d="M16.365 1.43c0 0-2.083.15-3.86 1.933-1.767 1.77-1.583 3.65-1.583 3.65s1.794-.034 3.475-1.742c1.733-1.765 1.968-3.84 1.968-3.84zm-3.076 6.126c-1.905-.052-3.418 1.144-4.267 1.144-1.045 0-2.454-1.076-3.957-1.05C2.628 7.697.106 9.998.026 13.56c-.05 2.155.882 4.606 2.03 6.273 1.056 1.532 2.373 3.327 4.09 3.3.935-.015 1.636-.596 2.883-.596 1.258 0 1.967.61 2.91.595 1.666-.026 2.768-1.55 3.864-3.14 1.25-1.804 1.764-3.568 1.785-3.666-.032-.014-3.41-1.31-3.444-5.234-.027-3.29 2.684-4.88 2.723-4.904-1.52-2.223-3.882-2.52-4.577-2.63z" />
                                    </svg>
                                    <span className="font-label-sm text-on-surface">Apple</span>
                                </button>
                            </div>

                            <div className="mt-8 text-center">
                                <p className="text-on-surface-variant">¿No tienes una cuenta?
                                    <Link to="/register" className="text-secondary font-bold hover:underline ml-1">Crear una cuenta</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </MainLayout >
    );
};

export default Login;
