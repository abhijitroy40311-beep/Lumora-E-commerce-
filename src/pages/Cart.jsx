import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, ArrowRight, ShieldCheck, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatPrice } from '../utils';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useStore();
  const navigate = useNavigate();

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 15;
  const tax = subtotal * 0.08; // 8% dummy tax
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-zinc-50 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm border border-zinc-100">
            <ShoppingBag className="w-12 h-12 text-zinc-300" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-4">Your cart is empty</h1>
          <p className="text-zinc-500 mb-8">Before proceed to checkout you must add some products to your shopping cart. You will find a lot of interesting products on our "Shop" page.</p>
          <Link to="/shop" className="inline-flex px-8 py-4 bg-zinc-950 text-white rounded-full font-medium hover:bg-zinc-800 transition-colors">
            Return to Shop
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-10">
          <Link to="/shop" className="p-2 -ml-2 rounded-full hover:bg-zinc-100 transition-colors text-zinc-500 hover:text-zinc-900" aria-label="Back to shop">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">Shopping Cart</h1>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="hidden sm:grid grid-cols-12 gap-4 pb-4 border-b border-zinc-200 text-sm font-medium text-zinc-500">
              <div className="col-span-6">Product</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-3 text-right">Total</div>
            </div>
            
            <div className="divide-y divide-zinc-100">
              {cart.map((item) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key={`${item.id}-${item.color}`} 
                  className="py-6 sm:py-8 flex flex-col sm:grid sm:grid-cols-12 gap-6 items-center"
                >
                  <div className="col-span-6 flex gap-6 w-full">
                    <Link to={`/product/${item.id}`} className="w-24 h-24 sm:w-32 sm:h-32 bg-zinc-50 rounded-2xl overflow-hidden shrink-0">
                      <img src={item.images[0]} alt={item.name} loading="lazy" className="w-full h-full object-cover mix-blend-multiply" />
                    </Link>
                    <div className="flex flex-col justify-center">
                      <Link to={`/product/${item.id}`} className="font-semibold text-lg hover:underline text-zinc-900 line-clamp-2">
                        {item.name}
                      </Link>
                      <p className="text-zinc-500 mt-1">{item.color}</p>
                      <p className="text-zinc-900 font-medium mt-2 sm:hidden">{formatPrice(item.price)}</p>
                      <button 
                        onClick={() => removeFromCart(item.id, item.color)}
                        aria-label={`Remove ${item.name} from cart`}
                        className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1 mt-3 w-fit transition-colors"
                      >
                        <Trash2 className="w-4 h-4" /> Remove
                      </button>
                    </div>
                  </div>
                  
                  <div className="col-span-3 flex justify-center w-full sm:w-auto mt-4 sm:mt-0">
                    <div className="flex items-center border border-zinc-200 rounded-full bg-white h-12 px-2">
                      <button 
                        onClick={() => updateQuantity(item.id, item.color, item.quantity - 1)}
                        aria-label="Decrease quantity"
                        className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-zinc-900 transition-colors disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-10 text-center font-medium" aria-live="polite">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.color, item.quantity + 1)}
                        aria-label="Increase quantity"
                        className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-zinc-900 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="col-span-3 text-right font-semibold text-lg hidden sm:block">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-zinc-50 rounded-3xl p-8 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Shipping</span>
                  <span className="font-medium">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Estimated Tax</span>
                  <span className="font-medium">{formatPrice(tax)}</span>
                </div>
              </div>
              
              <div className="border-t border-zinc-200 pt-6 mb-8">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-2xl">{formatPrice(total)}</span>
                </div>
              </div>
              
              <button 
                onClick={() => navigate('/checkout')}
                className="w-full py-4 bg-zinc-950 text-white rounded-full font-medium flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)] group mb-4"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-zinc-500">
                <ShieldCheck className="w-4 h-4" /> Secure SSL Encrypted Checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


