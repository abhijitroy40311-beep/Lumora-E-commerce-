import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { formatPrice } from '../utils';

export default function CartDrawer() {
  const { isCartOpen, setCartOpen, cart, updateQuantity, removeFromCart, getCartTotal } = useStore();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setCartOpen(false);
    navigate('/checkout');
  };

  const handleViewCart = () => {
    setCartOpen(false);
    navigate('/cart');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            onClick={() => setCartOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="fixed inset-y-0 right-0 w-full sm:w-[400px] bg-white shadow-2xl z-[110] flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping Cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-100">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" /> Your Cart
              </h2>
              <button
                onClick={() => setCartOpen(false)}
                aria-label="Close cart"
                className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-zinc-500 gap-4">
                  <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="w-8 h-8 text-zinc-300" />
                  </div>
                  <p className="text-lg font-medium text-zinc-900">Your cart is empty</p>
                  <p className="text-sm text-center max-w-xs">Looks like you haven't added anything yet. Discover our premium collection.</p>
                  <button 
                    onClick={() => { setCartOpen(false); navigate('/shop'); }}
                    className="mt-4 px-6 py-3 bg-zinc-950 text-white rounded-full font-medium text-sm hover:bg-zinc-800 transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.color}`} className="flex gap-4 group">
                      <div className="w-24 h-24 bg-zinc-100 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover mix-blend-multiply transition-transform group-hover:scale-105" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-sm leading-tight text-zinc-900 line-clamp-2">{item.name}</h3>
                            <button 
                              onClick={() => removeFromCart(item.id, item.color)}
                              aria-label={`Remove ${item.name} from cart`}
                              className="text-zinc-400 hover:text-red-500 transition-colors p-1 -mt-1 -mr-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-xs text-zinc-500 mt-1">{item.color}</p>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-zinc-200 rounded-full bg-white">
                            <button 
                              onClick={() => updateQuantity(item.id, item.color, item.quantity - 1)}
                              aria-label="Decrease quantity"
                              className="p-1.5 text-zinc-500 hover:text-zinc-900 disabled:opacity-50 transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-sm font-medium" aria-live="polite">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.color, item.quantity + 1)}
                              aria-label="Increase quantity"
                              className="p-1.5 text-zinc-500 hover:text-zinc-900 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <p className="font-semibold text-zinc-900">{formatPrice(item.price)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 bg-zinc-50 border-t border-zinc-100">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-zinc-500">Subtotal</span>
                  <span className="text-xl font-bold text-zinc-900">{formatPrice(getCartTotal())}</span>
                </div>
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={handleCheckout}
                    className="w-full py-4 px-6 bg-zinc-950 text-white rounded-full font-medium flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all hover:gap-3 group"
                  >
                    Checkout <ArrowRight className="w-4 h-4 transition-all" />
                  </button>
                  <button 
                    onClick={handleViewCart}
                    className="w-full py-3 px-6 bg-white text-zinc-950 rounded-full font-medium border border-zinc-200 hover:border-zinc-900 transition-colors"
                  >
                    View Cart
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
