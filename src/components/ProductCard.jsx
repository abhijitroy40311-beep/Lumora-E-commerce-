import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { useAuthStore } from '../store/useAuthStore';
import { formatPrice, cn } from '../utils';
import { toast } from 'sonner';

export default function ProductCard({ product, index = 0 }) {
  const [isHovered, setIsHovered] = useState(false);
  const { toggleWishlist, wishlist, addToCart, setCartOpen } = useStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  
  const isWishlisted = wishlist.some(item => item.id === product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast.error('Please sign in to add items to your cart');
      navigate('/login');
      return;
    }
    
    addToCart(product);
    toast.success(`${product.name} added to cart`);
    setCartOpen(true);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast.error('Please sign in to save items to your wishlist');
      navigate('/login');
      return;
    }
    
    toggleWishlist(product);
    if (!isWishlisted) {
      toast.success('Added to wishlist');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      {/* Image Container with 3D feel */}
      <Link to={`/product/${product.id}`} className="relative aspect-[4/5] bg-zinc-100 rounded-2xl overflow-hidden mb-4 isolate block">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
          {product.discountPercentage > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
              -{product.discountPercentage}%
            </span>
          )}
          {product.badges?.map(badge => (
             <span key={badge} className="bg-zinc-950 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
               {badge}
             </span>
          ))}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={cn(
            "absolute top-3 right-3 z-20 p-2.5 rounded-full backdrop-blur-md transition-all duration-300",
            isWishlisted 
              ? "bg-white text-red-500 shadow-sm" 
              : "bg-white/50 text-zinc-700 hover:bg-white hover:text-zinc-950 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
          )}
        >
          <Heart className={cn("w-4 h-4", isWishlisted && "fill-current")} />
        </button>

        {/* Main Image */}
        <div className={cn(
          "absolute inset-0 transition-all duration-700 ease-out group-hover:scale-105",
          isHovered && product.images[1] ? "opacity-0" : "opacity-100"
        )}>
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Hover Image (if exists) */}
        {product.images[1] && (
          <div 
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-out",
              isHovered ? "opacity-100" : "opacity-0"
            )}
          >
            <img 
              src={product.images[1]} 
              alt={`${product.name} alternate view`} 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}

        {/* Quick Add Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
          <button 
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full py-3 bg-white/90 backdrop-blur-md text-zinc-950 rounded-xl font-medium shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {product.inStock ? (
              <>
                <ShoppingBag className="w-4 h-4" /> Quick Add
              </>
            ) : "Out of Stock"}
          </button>
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-start gap-2">
          <Link to={`/product/${product.id}`} className="font-semibold text-zinc-900 line-clamp-1 hover:underline">
            {product.name}
          </Link>
          <div className="flex items-center gap-1 text-zinc-950 font-bold shrink-0">
             {formatPrice(product.price)}
          </div>
        </div>
        <div className="flex justify-between items-center text-sm">
          <p className="text-zinc-500 line-clamp-1">{product.shortDescription}</p>
          {product.discountPercentage > 0 && (
            <p className="text-zinc-400 line-through text-xs ml-2">{formatPrice(product.originalPrice)}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
