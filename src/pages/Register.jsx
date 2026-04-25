import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../components/templates/MainLayout";
import Input from "../components/atoms/Input";
import Button from "../components/atoms/Button";
import Checkbox from "../components/atoms/Checkbox";
import { auth } from "../services/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import vetregister from "../assets/imagen_registro.png"

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/profile');
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: type === "checkbox" ? checked : value,
        }));
    };

    const register = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("User registered:", userCredential.user);
            return true;
        } catch (error) {
            console.error("Registration error:", error.code, error.message);
            if (error.code === 'auth/email-already-in-use') setError("This email is already registered.");
            else if (error.code === 'auth/weak-password') setError("Password should be at least 6 characters.");
            else setError("Failed to create account. Please try again.");
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (!formData.agreeTerms) {
            setError("You must agree to the Terms and Conditions");
            return;
        }

        setLoading(true);
        const isSuccess = await register(formData.email, formData.password);
        setLoading(false);

        if (isSuccess) {
            navigate('/profile');
        }
    };

    return (
        <MainLayout>
            <main className="flex-grow flex items-center justify-center pt-24 pb-12 px-6">
                <div className="max-w-[1100px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* ── Left: Visual Anchor (hidden on mobile) ── */}
                    <div className="hidden lg:flex lg:col-span-6 flex-col gap-8">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[600px]">
                            <img
                                alt="Happy dogs and cats in a veterinary clinic"
                                className="absolute inset-0 w-full h-full object-cover"
                                src={vetregister}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary-container/80 via-transparent to-transparent" />
                            <div className="absolute bottom-12 left-12 right-12 text-white">
                                <h2 className="font-display text-display mb-4">
                                    Trusted care for your best friends.
                                </h2>
                                <p className="font-body-lg text-body-lg opacity-90 max-w-md">
                                    Join over 10,000 pet owners who trust VetCare for their medical needs.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ── Right: Registration Form ── */}
                    <div className="lg:col-span-6 w-full max-w-[480px] mx-auto">
                        <div className="bg-surface-container-lowest p-8 md:p-12 rounded-[2rem] shadow-[0_4px_20px_-4px_rgba(10,37,64,0.08)] border border-white">

                            {/* Header */}
                            <div className="mb-10">
                                <h1 className="font-h1 text-h1 text-primary-container mb-2">
                                    Create an account
                                </h1>
                                <p className="font-body-md text-body-md text-on-surface-variant">
                                    Start your journey to better pet health today.
                                </p>
                            </div>

                            {/* Form */}
                            {error && (
                                <div className="mb-6 p-4 bg-error-container/20 border border-error-container text-error rounded-xl font-body-sm flex items-center gap-2">
                                    <span className="material-symbols-outlined">error</span>
                                    {error}
                                </div>
                            )}
                            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                                <Input
                                    label="Nombre completo"
                                    id="fullname"
                                    type="text"
                                    placeholder="Ingrese su nombre completo"
                                    icon="person"
                                    value={formData.fullname}
                                    onChange={handleChange}
                                    required
                                />

                                <Input
                                    label="Dirección de correo electrónico"
                                    id="email"
                                    type="email"
                                    placeholder="Ingrese su correo electrónico"
                                    icon="mail"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="Contraseña"
                                        id="password"
                                        type="password"
                                        icon="key"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        label="Confirmar contraseña"
                                        id="confirmPassword"
                                        type="password"
                                        icon="key"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mt-2">
                                    <Checkbox
                                        id="agreeTerms"
                                        checked={formData.agreeTerms}
                                        onChange={handleChange}
                                    >
                                        I agree to the{" "}
                                        <a className="text-secondary font-semibold hover:underline" href="#">
                                            Terms and Conditions
                                        </a>{" "}
                                        and{" "}
                                        <a className="text-secondary font-semibold hover:underline" href="#">
                                            Privacy Policy
                                        </a>
                                        .
                                    </Checkbox>
                                </div>

                                <Button
                                    type="submit"
                                    variant="secondary"
                                    disabled={loading}
                                    className="mt-4 w-full !py-4 text-h3 block text-center flex items-center justify-center gap-2 group"
                                >
                                    {loading ? (
                                        <>
                                            <span className="material-symbols-outlined animate-spin">progress_activity</span>
                                            Creating...
                                        </>
                                    ) : (
                                        <>
                                            Create Account
                                            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                                                arrow_forward
                                            </span>
                                        </>
                                    )}
                                </Button>
                            </form>

                            {/* ── Divider + Social sign-up ── */}
                            <div className="mt-10 pt-8 border-t border-surface-container-high flex flex-col gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="h-px flex-grow bg-surface-container-high" />
                                    <span className="font-caption text-caption text-on-surface-variant">
                                        Or sign up with
                                    </span>
                                    <div className="h-px flex-grow bg-surface-container-high" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <button type="button" className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-outline-variant bg-white hover:bg-surface-container transition-colors active:scale-95">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                        </svg>
                                        <span className="font-label-sm text-label-sm text-primary-container">
                                            Google
                                        </span>
                                    </button>
                                    <button type="button" className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-outline-variant bg-white hover:bg-surface-container transition-colors active:scale-95">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-on-surface">
                                            <path d="M16.365 1.43c0 0-2.083.15-3.86 1.933-1.767 1.77-1.583 3.65-1.583 3.65s1.794-.034 3.475-1.742c1.733-1.765 1.968-3.84 1.968-3.84zm-3.076 6.126c-1.905-.052-3.418 1.144-4.267 1.144-1.045 0-2.454-1.076-3.957-1.05C2.628 7.697.106 9.998.026 13.56c-.05 2.155.882 4.606 2.03 6.273 1.056 1.532 2.373 3.327 4.09 3.3.935-.015 1.636-.596 2.883-.596 1.258 0 1.967.61 2.91.595 1.666-.026 2.768-1.55 3.864-3.14 1.25-1.804 1.764-3.568 1.785-3.666-.032-.014-3.41-1.31-3.444-5.234-.027-3.29 2.684-4.88 2.723-4.904-1.52-2.223-3.882-2.52-4.577-2.63z" />
                                        </svg>
                                        <span className="font-label-sm text-label-sm text-primary-container">
                                            Apple
                                        </span>
                                    </button>
                                </div>

                                {/* Link to login */}
                                <p className="text-center font-body-md text-body-md text-on-surface-variant">
                                    Already have an account?{" "}
                                    <Link to="/login" className="text-secondary font-bold hover:underline">
                                        Log in
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </MainLayout>
    );
};

export default Register;