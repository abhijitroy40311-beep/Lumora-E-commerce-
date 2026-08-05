import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Footer() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-zinc-950 text-zinc-400 py-16 md:py-24 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="text-2xl font-bold tracking-tighter text-white">
              LUMORA.
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Designed for the way you live. Premium tech accessories crafted for aesthetics and performance.
            </p>
            <div className="flex gap-4">
              <a href="#" aria-label="Instagram" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" aria-label="Twitter" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" aria-label="Facebook" className="hover:text-white transition-colors">Facebook</a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Shop</h3>
            <ul className="flex flex-col gap-4 text-sm">
              <li><Link to="/shop" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/shop?category=Audio" className="hover:text-white transition-colors">Audio</Link></li>
              <li><Link to="/shop?category=Power" className="hover:text-white transition-colors">Power & Cables</Link></li>
              <li><Link to="/shop?category=Accessories" className="hover:text-white transition-colors">Desk Accessories</Link></li>
              <li><Link to="/shop?filter=new" className="hover:text-white transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Support</h3>
            <ul className="flex flex-col gap-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Warranty</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-6">Stay in the loop</h3>
            {isSubscribed ? (
              <p className="text-sm text-green-400">Thank you for subscribing to our newsletter!</p>
            ) : (
              <>
                <p className="text-sm mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
                <form className="flex border-b border-zinc-700 focus-within:border-white transition-colors" onSubmit={handleSubscribe}>
                  <label htmlFor="newsletterEmail" className="sr-only">Email address for newsletter</label>
                  <input 
                    id="newsletterEmail"
                    type="email" 
                    placeholder="Enter your email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-transparent border-none py-2 px-0 w-full text-sm text-white focus:outline-none focus:ring-0 placeholder-zinc-600"
                  />
                  <button type="submit" aria-label="Subscribe" className="text-white p-2 hover:opacity-70 transition-opacity">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} Lumora Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
