import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import Catalog from "./pages/Catalog"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Product from "./pages/Product"
import Checkout from "./pages/Checkout"
import Prueba from "./pages/prueba"
import Profile from "./pages/Profile"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/prueba" element={<Prueba />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  )
}

export default App