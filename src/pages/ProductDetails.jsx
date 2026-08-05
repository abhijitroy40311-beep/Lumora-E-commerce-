import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star, Check, ArrowLeft, Truck, Shield, RotateCcw } from 'lucide-react';
import { products } from '../data/products';
import { useStore } from '../store/useStore';
import { useAuthStore } from '../store/useAuthStore';
import { formatPrice, cn } from '../utils';
import { toast } from 'sonner';
import ProductCard from '../components/ProductCard';
import { ProductDetailSkeleton } from '../components/LoadingSkeleton';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist, setCartOpen } = useStore();
  const { user } = useAuthStore();
  
  const product = products.find(p => p.id === id);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Reset state when product changes and simulate loading
  useEffect(() => {
    if (product) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedImage(0);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedColor(product.colors[0] || '');
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuantity(1);
      window.scrollTo(0, 0);
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 800);
      return () => clearTimeout(timer);
    }
  }, [product]);

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <button onClick={() => navigate('/shop')} className="text-zinc-500 hover:text-zinc-900 flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </button>
      </div>
    );
  }

  const isWishlisted = wishlist.some(item => item.id === product.id);

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Please sign in to add items to your cart');
      navigate('/login');
      return;
    }
    
    addToCart(product, quantity, selectedColor);
    toast.success(`${quantity}x ${product.name} added to cart`);
    setCartOpen(true);
  };
  
  const handleWishlist = () => {
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

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Breadcrumb */}
      <div className="border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm text-zinc-500 flex items-center gap-2">
          <Link to="/" className="hover:text-zinc-900">Home</Link>
          <span>/</span>
          <Link to={`/shop?category=${product.category}`} className="hover:text-zinc-900">{product.category}</Link>
          <span>/</span>
          <span className="text-zinc-900 truncate">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Image Gallery */}
          <div className="lg:w-1/2 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible pb-2 md:pb-0 hide-scrollbar" role="tablist" aria-label="Product image gallery">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  role="tab"
                  aria-selected={selectedImage === idx}
                  aria-label={`View image ${idx + 1}`}
                  onClick={() => setSelectedImage(idx)}
                  className={cn(
                    "w-20 h-24 shrink-0 rounded-xl overflow-hidden border-2 transition-all",
                    selectedImage === idx ? "border-zinc-900 opacity-100" : "border-transparent opacity-50 hover:opacity-100"
                  )}
                >
                  <img src={img} alt={`${product.name} ${idx + 1}`} loading="lazy" className="w-full h-full object-cover mix-blend-multiply bg-zinc-50" />
                </button>
              ))}
            </div>
            
            {/* Main Image */}
            <div className="flex-1 bg-zinc-50 rounded-3xl overflow-hidden relative aspect-[4/5] md:aspect-auto md:h-[600px]">
              <motion.img 
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover mix-blend-multiply"
              />
              {/* Badges */}
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                {product.discountPercentage > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-sm">
                    -{product.discountPercentage}%
                  </span>
                )}
                {product.badges?.map(badge => (
                  <span key={badge} className="bg-zinc-950 text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-sm">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2 flex flex-col">
            <div className="mb-2 flex items-center gap-2 text-sm text-zinc-500 font-medium">
              <span>{product.brand}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-zinc-950 mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-zinc-900">{product.rating}</span>
                <span className="text-zinc-500">({product.reviewCount} reviews)</span>
              </div>
            </div>

            <div className="flex items-end gap-3 mb-8">
              <span className="text-3xl font-bold text-zinc-950">{formatPrice(product.price)}</span>
              {product.discountPercentage > 0 && (
                <span className="text-xl text-zinc-400 line-through mb-1">{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            <p className="text-zinc-600 leading-relaxed mb-8 text-lg">
              {product.description}
            </p>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold text-zinc-900">Color</span>
                  <span className="text-sm text-zinc-500">{selectedColor}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "px-5 py-2.5 rounded-full border text-sm font-medium transition-all",
                        selectedColor === color 
                          ? "border-zinc-950 bg-zinc-950 text-white shadow-md" 
                          : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400"
                      )}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart Area */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10 pt-8 border-t border-zinc-100">
              {/* Quantity */}
              <div className="flex items-center border border-zinc-200 rounded-full bg-white h-14 w-full sm:w-32 justify-between px-2 shrink-0">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                  className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 rounded-full transition-colors disabled:opacity-50"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="font-semibold w-8 text-center" aria-live="polite">{quantity}</span>
                <button 
                  onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                  aria-label="Increase quantity"
                  className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 rounded-full transition-colors disabled:opacity-50"
                  disabled={quantity >= product.quantity}
                >
                  +
                </button>
              </div>

              {/* Action Buttons */}
              <button 
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 h-14 bg-zinc-950 text-white rounded-full font-medium flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors disabled:opacity-50 shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
              >
                {product.inStock ? (
                  <>Add to Cart <span className="w-1 h-1 bg-white/30 rounded-full mx-1 my-6" /> {formatPrice(product.price * quantity)}</>
                ) : 'Out of Stock'}
              </button>
              
              <button 
                onClick={handleWishlist}
                className="w-14 h-14 border border-zinc-200 rounded-full flex items-center justify-center text-zinc-600 hover:border-zinc-900 hover:text-zinc-900 transition-colors shrink-0"
                aria-label="Wishlist"
              >
                <Heart className={cn("w-5 h-5", isWishlisted && "fill-zinc-900 text-zinc-900")} />
              </button>
            </div>

            {/* Value Props */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-y border-zinc-100">
              <div className="flex items-center gap-3 text-sm text-zinc-600">
                <div className="w-10 h-10 bg-zinc-50 rounded-full flex items-center justify-center text-zinc-900">
                  <Truck className="w-4 h-4" />
                </div>
                <span>Free shipping over $50</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-600">
                <div className="w-10 h-10 bg-zinc-50 rounded-full flex items-center justify-center text-zinc-900">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <span>30-day free returns</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-600">
                <div className="w-10 h-10 bg-zinc-50 rounded-full flex items-center justify-center text-zinc-900">
                  <Shield className="w-4 h-4" />
                </div>
                <span>2-year warranty</span>
              </div>
            </div>

            {/* Features list */}
            {product.features && product.features.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-bold mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-zinc-600">
                      <div className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-900">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-zinc-100">
          <h2 className="text-2xl font-bold tracking-tighter mb-8 text-center">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p, idx) => (
              <ProductCard key={p.id} product={p} index={idx} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
