import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import MainLayout from "../components/templates/MainLayout"
import Button from "../components/atoms/Button"
import Input from "../components/atoms/Input"
import Checkbox from "../components/atoms/Checkbox"
import { useCartStore } from "../store/useCartStore"
import { formatPrice } from "../utils/currency"

const Checkout = () => {
  const navigate = useNavigate()
  const { cart } = useCartStore()
  
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    saveInfo: false
  })

  const subtotal = cart.reduce((acc, item) => acc + (parseFloat(item.price || 0) * (item.quantity || 1)), 0)
  const shipping = subtotal > 200000 ? 0 : 15000
  const tax = subtotal * 0.19
  const total = subtotal > 0 ? subtotal + shipping + tax : 0

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock processing order
    console.log("Order placed:", { formData, cart, total })
    alert("Order placed successfully! In a real app, you would be redirected to a success page.")
    navigate('/') // Redirect to home for now
  }

  if (cart.length === 0) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center py-20 px-6 min-h-[60vh]">
          <h2 className="font-h2 text-h2 text-primary-container mb-4">Your cart is empty</h2>
          <p className="text-on-surface-variant font-body-md mb-8 text-center max-w-md">
            You need to add products to your cart before proceeding to checkout.
          </p>
          <Link to="/catalog">
            <Button>Return to Shop</Button>
          </Link>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <main className="max-w-[1280px] mx-auto px-6 py-12">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-container-high pb-6">
          <h1 className="font-h1 text-h1 text-primary-container">Secure Checkout</h1>
          <div className="flex items-center gap-2 text-on-surface-variant text-sm font-label-sm">
            <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
            256-bit SSL Encrypted
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Checkout Form */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <form id="checkout-form" onSubmit={handleSubmit} className="flex flex-col gap-8">
              
              {/* Contact Information */}
              <section className="bg-white rounded-[2rem] p-6 md:p-8 shadow-[0_4px_20px_-4px_hsla(210,20%,10%,0.04)]">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-h2 text-[20px] text-primary-container flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-secondary-container/20 text-secondary flex items-center justify-center text-sm font-bold">1</span>
                    Contact Information
                  </h2>
                  <p className="text-caption text-on-surface-variant">
                    Already have an account? <Link to="/login" className="text-secondary hover:underline font-bold">Log in</Link>
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <Input 
                    id="email"
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <Checkbox id="emailOffers" className="mt-2">
                    Email me with news and offers regarding my pet's health
                  </Checkbox>
                </div>
              </section>

              {/* Shipping Address */}
              <section className="bg-white rounded-[2rem] p-6 md:p-8 shadow-[0_4px_20px_-4px_hsla(210,20%,10%,0.04)]">
                <h2 className="font-h2 text-[20px] text-primary-container flex items-center gap-2 mb-6">
                  <span className="w-8 h-8 rounded-full bg-secondary-container/20 text-secondary flex items-center justify-center text-sm font-bold">2</span>
                  Shipping Address
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input 
                    id="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                  <Input 
                    id="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                  <div className="md:col-span-2">
                    <Input 
                      id="address"
                      placeholder="Address (e.g. 123 Main St, Apt 4B)"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="md:col-span-2 grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <Input 
                        id="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-span-1">
                      <Input 
                        id="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-span-1">
                      <Input 
                        id="zipCode"
                        placeholder="ZIP code"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2 mt-2">
                    <Checkbox id="saveInfo" checked={formData.saveInfo} onChange={handleChange}>
                      Save this information for next time
                    </Checkbox>
                  </div>
                </div>
              </section>

              {/* Payment Method */}
              <section className="bg-white rounded-[2rem] p-6 md:p-8 shadow-[0_4px_20px_-4px_hsla(210,20%,10%,0.04)]">
                <h2 className="font-h2 text-[20px] text-primary-container flex items-center gap-2 mb-2">
                  <span className="w-8 h-8 rounded-full bg-secondary-container/20 text-secondary flex items-center justify-center text-sm font-bold">3</span>
                  Payment
                </h2>
                <p className="text-on-surface-variant font-caption mb-6 ml-10">All transactions are secure and encrypted.</p>
                
                <div className="border border-outline-variant/50 rounded-2xl overflow-hidden bg-surface-container-lowest">
                  {/* Credit Card Option */}
                  <div className="p-4 border-b border-outline-variant/50 bg-secondary-container/5 flex items-center gap-3">
                    <input type="radio" id="creditCard" name="paymentMethod" defaultChecked className="w-4 h-4 text-secondary focus:ring-secondary cursor-pointer" />
                    <label htmlFor="creditCard" className="font-label-sm text-primary-container flex-grow cursor-pointer">Credit card</label>
                    <div className="flex gap-1">
                      <div className="w-8 h-5 bg-white border border-outline-variant/30 rounded flex items-center justify-center text-[10px] font-bold text-slate-500">VISA</div>
                      <div className="w-8 h-5 bg-white border border-outline-variant/30 rounded flex items-center justify-center text-[10px] font-bold text-slate-500">MC</div>
                    </div>
                  </div>
                  
                  {/* Credit Card Form */}
                  <div className="p-4 bg-surface-container-low/30 flex flex-col gap-4">
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline" style={{ fontVariationSettings: "'FILL' 0" }}>credit_card</span>
                      <input 
                        id="cardNumber"
                        className="w-full pl-4 pr-12 py-3.5 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all outline-none text-body-md"
                        placeholder="Card number"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Input 
                        id="expiryDate"
                        placeholder="Expiration date (MM / YY)"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        required
                      />
                      <div className="relative group">
                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline cursor-help" title="3 digit security code on the back of your card">info</span>
                        <input 
                          id="cvv"
                          className="w-full pl-4 pr-12 py-3.5 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all outline-none text-body-md"
                          placeholder="Security code"
                          value={formData.cvv}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* PayPal Option */}
                  <div className="p-4 flex items-center gap-3 hover:bg-surface-container-lowest transition-colors cursor-pointer">
                    <input type="radio" id="paypal" name="paymentMethod" className="w-4 h-4 text-secondary focus:ring-secondary cursor-pointer" />
                    <label htmlFor="paypal" className="font-label-sm text-primary-container flex-grow cursor-pointer">PayPal</label>
                  </div>
                </div>
              </section>

            </form>
          </div>

          {/* Right: Order Summary Sidebar */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-[2rem] p-6 shadow-sm sticky top-24">
              <h3 className="font-h2 text-[20px] text-primary-container mb-6 pb-4 border-b border-surface-container-high">Order Summary</h3>
              
              {/* Compact Cart Items List */}
              <div className="flex flex-col gap-4 mb-6 max-h-[300px] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin' }}>
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="relative w-16 h-16 bg-surface-container-low rounded-xl flex items-center justify-center p-2 shrink-0 border border-outline-variant/20">
                      <img src={item.imageSrc || item.image} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-secondary text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                        {item.quantity || 1}
                      </span>
                    </div>
                    <div className="flex flex-col flex-grow">
                      <span className="font-h3 text-[14px] text-primary-container line-clamp-2 leading-tight">{item.title}</span>
                      <span className="font-caption text-on-surface-variant">{item.category}</span>
                    </div>
                    <span className="font-label-sm text-primary-container whitespace-nowrap">
                      {formatPrice(parseFloat(item.price || 0) * (item.quantity || 1))}
                    </span>
                  </div>
                ))}
              </div>

              {/* Discount Code */}
              <div className="flex gap-2 mb-6 pb-6 border-b border-surface-container-high">
                <input 
                  type="text" 
                  placeholder="Discount code" 
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all outline-none text-body-md"
                />
                <Button variant="secondaryContainer" className="!px-6">Apply</Button>
              </div>

              {/* Totals */}
              <div className="flex flex-col gap-3 mb-6">
                <div className="flex justify-between items-center text-on-surface-variant">
                  <span className="font-body-md">Subtotal</span>
                  <span className="font-label-sm text-primary-container">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center text-on-surface-variant">
                  <span className="font-body-md flex items-center gap-1">Shipping</span>
                  <span className="font-label-sm text-primary-container">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between items-center text-on-surface-variant">
                  <span className="font-body-md">Estimated Tax</span>
                  <span className="font-label-sm text-primary-container">{formatPrice(tax)}</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-8 pt-4 border-t border-surface-container-high">
                <span className="font-h3 text-primary-container">Total</span>
                <div className="flex items-end gap-2">
                  <span className="font-caption text-on-surface-variant mb-1">COP</span>
                  <span className="font-display text-[28px] font-bold text-primary-container leading-none">{formatPrice(total)}</span>
                </div>
              </div>

              <Button 
                form="checkout-form"
                type="submit" 
                className="w-full !py-4 text-[18px] bg-secondary text-white hover:bg-secondary/90 shadow-lg shadow-secondary/20 flex items-center justify-center gap-2 group"
              >
                Pay {formatPrice(total)}
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_forward</span>
              </Button>
            </div>
          </div>

        </div>
      </main>
    </MainLayout>
  )
}

export default Checkout
