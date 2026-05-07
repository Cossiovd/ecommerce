import { lazy, Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import PublicRoute from "./components/routes/PublicRoute"

// Lazy load pages
const Home = lazy(() => import("./pages/Home"))
const Cart = lazy(() => import("./pages/Cart"))
const Catalog = lazy(() => import("./pages/Catalog"))
const Login = lazy(() => import("./pages/Login"))
const Register = lazy(() => import("./pages/Register"))
const Product = lazy(() => import("./pages/Product"))
const Checkout = lazy(() => import("./pages/Checkout"))
const Profile = lazy(() => import("./pages/Profile"))

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
)

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Suspense>
  )
}

export default App