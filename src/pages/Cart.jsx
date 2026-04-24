import React from "react"
import { Link } from "react-router-dom"
import MainLayout from "../components/templates/MainLayout"
import Button from "../components/atoms/Button"
import IconButton from "../components/atoms/IconButton"
import { useCartStore } from "../store/useCartStore"

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCartStore()

  const subtotal = cart.reduce((acc, item) => acc + (parseFloat(item.price || 0) * (item.quantity || 1)), 0)
  const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping over $50 as per product page
  const tax = subtotal * 0.08; // 8% mock tax
  const total = subtotal > 0 ? subtotal + shipping + tax : 0;

  return (
    <MainLayout>
      <main className="max-w-[1280px] mx-auto px-6 py-12">
        <h1 className="font-h1 text-h1 text-primary-container mb-8">My Cart</h1>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-[2rem] shadow-[0_4px_20px_-4px_hsla(210,20%,10%,0.04)]">
            <div className="w-24 h-24 bg-surface-container-low rounded-full flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-[48px] text-outline-variant" style={{ fontVariationSettings: "'FILL' 0" }}>shopping_cart</span>
            </div>
            <h2 className="font-h2 text-h2 text-primary-container mb-2">Your cart is empty</h2>
            <p className="text-on-surface-variant font-body-md mb-8 max-w-md">
              Looks like you haven't added any premium care products for your best friend yet.
            </p>
            <Link to="/catalog">
              <Button className="shadow-lg shadow-primary/20">Explore Products</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Cart Items List */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-[0_4px_20px_-4px_hsla(210,20%,10%,0.04)] flex flex-col gap-8">
                <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-surface-container-high font-label-sm text-on-surface-variant uppercase tracking-wider">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-3 text-center">Quantity</div>
                  <div className="col-span-3 text-right">Total</div>
                </div>

                {cart.map(item => (
                  <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center py-4 border-b border-surface-container-high last:border-0 last:pb-0 relative group">
                    
                    {/* Product Info */}
                    <div className="md:col-span-6 flex items-center gap-6">
                      <div className="w-24 h-24 shrink-0 bg-surface-container-lowest rounded-2xl p-2 border border-outline-variant/30 flex items-center justify-center">
                        <img src={item.imageSrc || item.image || item.imageUrl || 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=600&auto=format&fit=crop'} alt={item.title || 'Product'} className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-caption text-secondary uppercase tracking-wider mb-1">{item.category || 'General'}</span>
                        <Link to={`/product/${item.id}`} className="font-h3 text-[18px] text-primary-container hover:text-secondary transition-colors line-clamp-2 leading-tight mb-2">
                          {item.title}
                        </Link>
                        <span className="font-label-sm text-on-surface-variant">${parseFloat(item.price || 0).toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Quantity Control */}
                    <div className="md:col-span-3 flex items-center justify-center">
                      <div className="flex items-center bg-surface-container-lowest rounded-xl border border-outline-variant/50 p-1 shadow-sm">
                        <IconButton 
                          icon="remove" 
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                          disabled={(item.quantity || 1) <= 1}
                          className="w-8 h-8 rounded-lg text-on-surface-variant hover:bg-surface-container-low disabled:opacity-30 transition-all"
                        />
                        <span className="w-8 text-center font-label-sm text-primary-container">{item.quantity || 1}</span>
                        <IconButton 
                          icon="add" 
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                          className="w-8 h-8 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-all"
                        />
                      </div>
                    </div>

                    {/* Price & Remove */}
                    <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-4">
                      <span className="font-h3 text-primary-container block md:hidden">Total:</span>
                      <span className="font-h3 text-[18px] text-primary-container">${(parseFloat(item.price || 0) * (item.quantity || 1)).toFixed(2)}</span>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="md:absolute right-0 top-1/2 md:-translate-y-1/2 w-10 h-10 rounded-full bg-white flex items-center justify-center text-outline hover:text-error hover:bg-error-container/30 transition-all shadow-sm border border-outline-variant/30 md:opacity-0 group-hover:opacity-100"
                        title="Remove item"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-primary-container rounded-[2rem] p-8 text-white shadow-[0_8px_30px_rgba(10,37,64,0.15)] sticky top-24">
                <h3 className="font-h2 text-h2 text-secondary-fixed mb-6 pb-6 border-b border-white/10">Order Summary</h3>
                
                <div className="flex flex-col gap-4 mb-8">
                  <div className="flex justify-between items-center text-on-primary-container">
                    <span className="font-body-md">Subtotal</span>
                    <span className="font-label-sm text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-on-primary-container">
                    <span className="font-body-md flex items-center gap-1">
                      Shipping
                      <span className="material-symbols-outlined text-[16px] cursor-help" title="Free shipping over $50">info</span>
                    </span>
                    <span className="font-label-sm text-white">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between items-center text-on-primary-container">
                    <span className="font-body-md">Estimated Tax</span>
                    <span className="font-label-sm text-white">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-end mb-8 pt-6 border-t border-white/10">
                  <span className="font-h3 text-white">Total</span>
                  <span className="font-display text-[32px] font-bold text-white leading-none">${total.toFixed(2)}</span>
                </div>

                <Link to="/checkout" className="w-full">
                  <Button className="w-full !py-4 text-[18px] bg-secondary-fixed text-on-secondary-fixed hover:bg-secondary-fixed-dim shadow-lg shadow-secondary/20 flex items-center justify-center gap-2 group">
                    Proceed to Checkout
                    <span className="material-symbols-outlined transition-transform group-hover:translate-x-1" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                  </Button>
                </Link>

                <div className="mt-6 flex items-center justify-center gap-2 text-on-primary-container text-caption">
                  <span className="material-symbols-outlined text-[16px]">verified_user</span>
                  Secure checkout guaranteed
                </div>
              </div>
            </div>

          </div>
        )}
      </main>
    </MainLayout>
  )
}

export default Cart