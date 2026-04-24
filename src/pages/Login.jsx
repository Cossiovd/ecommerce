import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';
import MainLayout from '../components/templates/MainLayout';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';

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

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/profile');
        } catch (error) {
            console.error('Login error:', error.code, error.message);
            if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                setError('Invalid email or password.');
            } else {
                setError('Failed to log in. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout>
            <main className="flex-grow flex items-center justify-center pt-24 pb-12 px-6">
                <div className="max-w-[1100px] w-full grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
                    {/* Visual Section (Hidden on Mobile) */}
                    <div className="hidden lg:flex flex-col items-center text-center space-y-8">
                        <div className="relative w-full aspect-square max-w-[500px]">
                            <div className="absolute inset-0 bg-secondary-container/5 rounded-full blur-3xl"></div>
                            <img
                                alt="Professional veterinarian smiling"
                                className="relative z-10 w-full h-full object-cover rounded-3xl"
                                style={{ filter: 'drop-shadow(0 20px 30px hsla(210, 20%, 10%, 0.08))' }}
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0aZ6NC_GPf-7xTLbuZDJV7IosoA9iYEUpc97ReVwOYfD1IHDKagoPCvIEek2IcB8QsKvZ5WrUIoQ1Vd5aJGd79yKzcS5geO2grTDiV2PgFLdvw0ZxMM2yjuD7_QGIYZwKKWfci0MZIG1j7nSoL3B3zp-BeXKzDjKcY1DzqcaOnyOXfVoRCeS827tJiGRtoKqb6U_ldp21EF9L8ISFP4hfckiHEQF7AmAp2NZYJr1LebgRBEdAbXN7vl6UgoRw_Niz3CsauYjoeQ"
                            />
                        </div>
                        <div className="space-y-4 max-w-md">
                            <h2 className="font-h1 text-h1 text-primary-container">Clinical expertise meets compassionate care.</h2>
                            <p className="font-body-lg text-body-lg text-on-surface-variant">Access your pet's health records, shop pharmacy essentials, and chat with experts.</p>
                        </div>
                    </div>

                    {/* Login Form Section */}
                    <div className="flex justify-center">
                        <div className="w-full max-w-[440px] bg-surface-container-lowest p-8 md:p-10 rounded-[2rem] shadow-[0_4px_20px_-4px_rgba(10,37,64,0.08)] border border-surface-variant/30">
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center p-3 bg-secondary-container/10 rounded-2xl mb-4">
                                    <span className="material-symbols-outlined text-secondary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>lock_open</span>
                                </div>
                                <h3 className="font-h2 text-h2 text-primary-container">Welcome back</h3>
                                <p className="text-on-surface-variant mt-2">Enter your credentials to manage your pet's care.</p>
                            </div>

                            {error && (
                                <div className="mb-6 p-4 bg-error-container/20 border border-error-container text-error rounded-xl font-body-sm flex items-center gap-2">
                                    <span className="material-symbols-outlined">error</span>
                                    {error}
                                </div>
                            )}

                            <form className="space-y-6" onSubmit={handleLogin}>
                                <Input
                                    label="Email Address"
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    icon="mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />

                                <Input
                                    label="Password"
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    icon="key"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    actionRight={<a className="text-caption font-caption text-secondary hover:underline" href="#">Forgot Password?</a>}
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
                                            Logging in...
                                        </>
                                    ) : (
                                        'Login'
                                    )}
                                </Button>
                            </form>

                            <div className="relative my-8">
                                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-outline-variant"></div></div>
                                <div className="relative flex justify-center text-xs uppercase font-bold tracking-widest text-outline bg-surface-container-lowest px-4">Or continue with</div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-outline-variant hover:bg-surface-container-low transition-colors active:scale-95">
                                    <img alt="Google" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmCVmn88jVvlT1PZeHD7sN8fojutn6eUMDvTCygRl2VK9HzVuTX2BoHqvBxt_xF_tyHETyawtEtChwm8BLfrcvZllOtHGa0W55o0CqgU_PDkurDD8o8td1F1xhw79lEiJjPrd79QjW6nNpIP_pSoeVn2XojNEsPYK1Ciff06zaxg_FQk3CskqRrYhdMK8maUiRRpr80A7uwvPYAO7Brym_zyGRzDlGYr_0N4gqcQV97MD7Q1lGlslAdhLD2dUXyeuFXBmkcYXsNQ" />
                                    <span className="font-label-sm text-on-surface">Google</span>
                                </button>
                                <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-outline-variant hover:bg-surface-container-low transition-colors active:scale-95">
                                    <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>ios</span>
                                    <span className="font-label-sm text-on-surface">Apple</span>
                                </button>
                            </div>

                            <div className="mt-8 text-center">
                                <p className="text-on-surface-variant">Don't have an account?
                                    <Link to="/register" className="text-secondary font-bold hover:underline ml-1">Create an account</Link>
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
