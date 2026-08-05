import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, Search, Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { useAuthStore } from '../store/useAuthStore';
import { cn } from '../utils';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const { toggleCart, getCartCount, wishlist } = useStore();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Best Sellers', path: '/shop?filter=best-seller' },
    { name: 'New Arrivals', path: '/shop?filter=new' },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b border-transparent',
          isScrolled ? 'bg-white/80 backdrop-blur-md border-zinc-200 py-3 shadow-sm' : 'bg-transparent py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <div className="flex-1 md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 -ml-2 text-zinc-900 hover:text-zinc-600 transition-colors"
                aria-label="Open menu"
                aria-expanded={isMobileMenuOpen}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

            {/* Logo */}
            <div className="flex-1 md:flex-none flex justify-center md:justify-start">
              <Link to="/" className="text-2xl font-bold tracking-tighter text-zinc-950">
                LUMORA.
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex flex-1 justify-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-sm font-medium text-zinc-600 hover:text-zinc-950 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex-1 flex justify-end items-center space-x-2 sm:space-x-4">
              <Link to="/shop" aria-label="Search Shop" className="p-2 text-zinc-900 hover:text-zinc-600 transition-colors hidden sm:block">
                <Search className="w-5 h-5" />
              </Link>
              
              <Link to="/shop?wishlist=true" aria-label={`Wishlist with ${wishlist.length} items`} className="p-2 text-zinc-900 hover:text-zinc-600 transition-colors relative hidden sm:block">
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-zinc-900 rounded-full" />
                )}
              </Link>
              
              <div className="relative">
                {user ? (
                  <div className="relative">
                    <button 
                      onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                      className="p-2 text-zinc-900 hover:text-zinc-600 transition-colors flex items-center"
                      aria-label="Profile"
                    >
                      <div className="w-6 h-6 bg-zinc-100 rounded-full flex items-center justify-center border border-zinc-200">
                        <User className="w-4 h-4 text-zinc-700" />
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {isProfileDropdownOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute right-0 mt-2 w-48 bg-white border border-zinc-200 rounded-xl shadow-lg py-2 z-50"
                        >
                          <div className="px-4 py-2 border-b border-zinc-100 mb-1">
                            <p className="text-xs text-zinc-500 truncate">{user.email}</p>
                          </div>
                          <button 
                            onClick={() => {
                              logout();
                              setIsProfileDropdownOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-zinc-50 transition-colors"
                          >
                            Sign out
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link to="/login" className="text-sm font-medium text-zinc-900 hover:text-zinc-600 transition-colors px-2 sm:px-3 hidden sm:block">
                    Sign in
                  </Link>
                )}
              </div>

              <button
                onClick={toggleCart}
                className="p-2 text-zinc-900 hover:text-zinc-600 transition-colors relative flex items-center"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-zinc-900 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 left-0 w-full max-w-xs bg-white shadow-xl z-[70] md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-zinc-100">
                <Link to="/" className="text-xl font-bold tracking-tighter" onClick={() => setIsMobileMenuOpen(false)}>
                  LUMORA.
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-zinc-500 hover:text-zinc-900 bg-zinc-50 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-6">
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="text-lg font-medium text-zinc-900 hover:text-zinc-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
                <div className="h-px bg-zinc-100 w-full my-4" />
                <div className="flex flex-col gap-4">
                   <Link to="/shop?wishlist=true" className="flex items-center text-zinc-600 hover:text-zinc-900" onClick={() => setIsMobileMenuOpen(false)}>
                     <Heart className="w-5 h-5 mr-3" />
                     Wishlist ({wishlist.length})
                   </Link>
                   
                   {user ? (
                     <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="flex items-center text-red-600 hover:text-red-700 w-full text-left">
                       <User className="w-5 h-5 mr-3" />
                       Sign out
                     </button>
                   ) : (
                     <Link to="/login" className="flex items-center text-zinc-600 hover:text-zinc-900" onClick={() => setIsMobileMenuOpen(false)}>
                       <User className="w-5 h-5 mr-3" />
                       Sign in
                     </Link>
                   )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
