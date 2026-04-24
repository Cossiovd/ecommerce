import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../components/templates/MainLayout";
import Input from "../components/atoms/Input";
import Button from "../components/atoms/Button";
import Checkbox from "../components/atoms/Checkbox";
import { auth } from "../services/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

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
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIrFVcBuZ1AE6i1BLPjnW1p38K-yaSF9QRANLkmi22PMz9Y9ag9nfw3jV1YZa0WFaTK4Fy6sJoREL0-Gmb3G5h2oef9lgwHU-Fl0m14PtuLWETLyNziFI-jQMjni4B1CNRBeQdSPZy2eb4QkOYj6RzRowjHOQ8_gpU5oBlYIFMZN1DcCOvXXnfinhco5mvyR6O9t0lUH9C47pKrJ5CY6S_tbuh-U3RVkBZhsqrmSpjeh-RagNEcV2QdsXaiCGIlU-BJEwufR5wrg"
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
                                    <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-outline-variant bg-white hover:bg-surface-container transition-colors active:scale-95">
                                        <img
                                            alt="Google"
                                            className="w-5 h-5"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmCVmn88jVvlT1PZeHD7sN8fojutn6eUMDvTCygRl2VK9HzVuTX2BoHqvBxt_xF_tyHETyawtEtChwm8BLfrcvZllOtHGa0W55o0CqgU_PDkurDD8o8td1F1xhw79lEiJjPrd79QjW6nNpIP_pSoeVn2XojNEsPYK1Ciff06zaxg_FQk3CskqRrYhdMK8maUiRRpr80A7uwvPYAO7Brym_zyGRzDlGYr_0N4gqcQV97MD7Q1lGlslAdhLD2dUXyeuFXBmkcYXsNQ"
                                        />
                                        <span className="font-label-sm text-label-sm text-primary-container">
                                            Google
                                        </span>
                                    </button>
                                    <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-outline-variant bg-white hover:bg-surface-container transition-colors active:scale-95">
                                        <span
                                            className="material-symbols-outlined text-2xl"
                                            style={{ fontVariationSettings: "'FILL' 1" }}
                                        >
                                            ios
                                        </span>
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