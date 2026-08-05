import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, ChevronLeft, Lock } from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatPrice } from '../utils';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useStore();
  
  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call for payment processing
    setTimeout(() => {
      clearCart();
      setIsSubmitting(false);
      navigate('/success');
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/shop" className="text-zinc-500 hover:text-zinc-900 underline flex items-center gap-2">
          <ChevronLeft className="w-4 h-4" /> Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Checkout Header */}
      <header className="border-b border-zinc-100 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/cart" className="flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to Cart
          </Link>
          <Link to="/" className="text-2xl font-bold tracking-tighter text-zinc-950">
            LUMORA.
          </Link>
          <div className="flex items-center text-sm font-medium text-zinc-500">
            <Lock className="w-4 h-4 mr-2" /> <span className="hidden sm:inline">Secure Checkout</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-24">
          
          {/* Left Column: Forms */}
          <div className="lg:w-3/5">
            <form onSubmit={handleSubmit} className="space-y-12">
              
              {/* Contact Info */}
              <section>
                <h2 className="text-xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-1">Email address</label>
                    <input type="email" id="email" required className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:border-transparent transition-all" placeholder="Enter your email" />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="offers" className="rounded text-zinc-900 focus:ring-zinc-950 accent-zinc-900 w-4 h-4 cursor-pointer" />
                    <label htmlFor="offers" className="text-sm text-zinc-600 cursor-pointer">Email me with news and offers</label>
                  </div>
                </div>
              </section>

              {/* Shipping Address */}
              <section>
                <h2 className="text-xl font-bold mb-6">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label htmlFor="country" className="block text-sm font-medium text-zinc-700 mb-1">Country/Region</label>
                    <select id="country" className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:border-transparent transition-all appearance-none">
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                      <option>Australia</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-zinc-700 mb-1">First name</label>
                    <input type="text" id="firstName" required className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:border-transparent transition-all" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-zinc-700 mb-1">Last name</label>
                    <input type="text" id="lastName" required className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:border-transparent transition-all" />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-zinc-700 mb-1">Address</label>
                    <input type="text" id="address" required className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:border-transparent transition-all" placeholder="Street address or P.O. Box" />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-zinc-700 mb-1">City</label>
                    <input type="text" id="city" required className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:border-transparent transition-all" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-zinc-700 mb-1">State</label>
                      <input type="text" id="state" required className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:border-transparent transition-all" />
                    </div>
                    <div>
                      <label htmlFor="zip" className="block text-sm font-medium text-zinc-700 mb-1">ZIP code</label>
                      <input type="text" id="zip" required className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:border-transparent transition-all" />
                    </div>
                  </div>
                </div>
              </section>

              {/* Payment UI Dummy */}
              <section>
                <h2 className="text-xl font-bold mb-6">Payment</h2>
                <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl mb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <input type="radio" id="credit" name="payment" defaultChecked className="accent-zinc-900 w-4 h-4 cursor-pointer" />
                    <label htmlFor="credit" className="font-medium cursor-pointer">Credit Card</label>
                  </div>
                  <div className="space-y-4 pl-7">
                    <div>
                      <label htmlFor="cardNumber" className="sr-only">Card number</label>
                      <input type="text" id="cardNumber" placeholder="Card number" required className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:border-transparent transition-all" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="cardExpiry" className="sr-only">Expiration date (MM/YY)</label>
                        <input type="text" id="cardExpiry" placeholder="Expiration date (MM/YY)" required className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:border-transparent transition-all" />
                      </div>
                      <div>
                        <label htmlFor="cardCvc" className="sr-only">Security code</label>
                        <input type="text" id="cardCvc" placeholder="Security code" required className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:border-transparent transition-all" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="cardName" className="sr-only">Name on card</label>
                      <input type="text" id="cardName" placeholder="Name on card" required className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:border-transparent transition-all" />
                    </div>
                  </div>
                </div>
              </section>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 bg-zinc-950 text-white rounded-xl font-bold text-lg hover:bg-zinc-800 transition-all shadow-lg disabled:opacity-70 flex justify-center items-center gap-2"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  `Pay ${formatPrice(total)}`
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:w-2/5">
            <div className="bg-zinc-50 rounded-3xl p-6 md:p-8 sticky top-24 border border-zinc-100">
              <h2 className="text-lg font-bold mb-6">Order Summary</h2>
              
              <div className="flex flex-col gap-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.color}`} className="flex gap-4">
                    <div className="relative w-16 h-16 bg-white rounded-xl border border-zinc-200 overflow-hidden shrink-0">
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover mix-blend-multiply p-1" />
                      <span className="absolute -top-2 -right-2 bg-zinc-900 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="font-medium text-sm text-zinc-900 line-clamp-1">{item.name}</h3>
                      <p className="text-xs text-zinc-500 mt-0.5">{item.color}</p>
                    </div>
                    <div className="flex items-center font-medium text-sm">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6 text-sm border-t border-zinc-200 pt-6">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Subtotal</span>
                  <span className="font-medium text-zinc-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Shipping</span>
                  <span className="font-medium text-zinc-900">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Estimated Tax</span>
                  <span className="font-medium text-zinc-900">{formatPrice(tax)}</span>
                </div>
              </div>
              
              <div className="border-t border-zinc-200 pt-6">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-2xl text-zinc-950">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
