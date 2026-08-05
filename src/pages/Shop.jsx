import { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, ChevronDown, X, Search } from 'lucide-react';
import ProductGrid from '../components/ProductGrid/ProductGrid';
import { products } from '../data/products';
import { useStore } from '../store/useStore';
import { cn } from '../utils';

const CATEGORIES = ['All', 'Audio', 'Power', 'Peripherals', 'Accessories', 'Lighting', 'Bags', 'Storage', 'Home'];
const SORTS = [
  { id: 'featured', name: 'Featured' },
  { id: 'price-asc', name: 'Price: Low to High' },
  { id: 'price-desc', name: 'Price: High to Low' },
  { id: 'rating', name: 'Highest Rated' },
  { id: 'newest', name: 'Newest' }
];

export default function Shop() {
  const location = useLocation();
  const navigate = useNavigate();
  const { wishlist } = useStore();
  
  // Parse query params
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || 'All';
  const initialFilter = queryParams.get('filter');
  const showWishlist = queryParams.get('wishlist') === 'true';

  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Sync state when URL changes and simulate loading
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCategory(queryParams.get('category') || 'All');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [location.search, showWishlist, initialFilter]);

  // Handle searching and sorting with loading
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [searchQuery, sort]);

  // Derived state for products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Wishlist mode
    if (showWishlist) {
      result = result.filter(p => wishlist.some(w => w.id === p.id));
    } else {
      // Category filter
      if (category !== 'All') {
        result = result.filter(p => p.category === category);
      }

      // Tag filter (Best Seller, New)
      if (initialFilter === 'best-seller') {
        result = result.filter(p => p.tags.includes('Best Seller'));
      } else if (initialFilter === 'new') {
        result = result.filter(p => p.tags.includes('New'));
      }
    }

    // Search query
    if (searchQuery.trim() !== '') {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(lowerQuery) || 
        p.description.toLowerCase().includes(lowerQuery) ||
        p.brand.toLowerCase().includes(lowerQuery)
      );
    }

    // Sorting
    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => {
          const aNew = a.tags.includes('New') ? 1 : 0;
          const bNew = b.tags.includes('New') ? 1 : 0;
          return bNew - aNew;
        });
        break;
      default:
        // Featured (default order)
        break;
    }

    return result;
  }, [category, sort, searchQuery, showWishlist, wishlist, initialFilter]);

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    if (showWishlist || initialFilter) {
      navigate('/shop'); // reset other filters if changing category
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setCategory('All');
    setSearchQuery('');
    setSort('featured');
    navigate('/shop');
  };

  return (
    <div className="min-h-screen bg-zinc-50 pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 pt-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-zinc-950 mb-4">
            {showWishlist ? 'Your Wishlist' : initialFilter === 'best-seller' ? 'Best Sellers' : initialFilter === 'new' ? 'New Arrivals' : 'All Products'}
          </h1>
          <p className="text-zinc-500 max-w-2xl">
            {showWishlist 
              ? 'Products you\'ve saved for later.' 
              : 'Discover our complete collection of premium workspace essentials, crafted for performance and aesthetics.'}
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-4 border-b border-zinc-200">
          {/* Search */}
          <div className="w-full md:w-auto flex-1 max-w-md relative">
            <label htmlFor="searchShop" className="sr-only">Search products</label>
            <input 
              id="searchShop"
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 bg-white border border-zinc-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-zinc-950 transition-shadow"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-900"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <button 
              className="md:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-zinc-200 rounded-full text-sm font-medium"
              onClick={() => setIsMobileFiltersOpen(true)}
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
            
            {/* Sort Dropdown - Native for accessibility */}
            <div className="relative">
              <label htmlFor="sortSelect" className="sr-only">Sort products</label>
              <select
                id="sortSelect"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none flex items-center gap-2 pl-4 pr-10 py-2.5 bg-white border border-zinc-200 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-zinc-950 cursor-pointer"
              >
                {SORTS.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500" />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Sidebar Filters */}
          <div className="hidden md:block w-64 shrink-0">
            <div className="sticky top-28">
              <h3 className="font-semibold mb-4 text-zinc-950">Categories</h3>
              <ul className="space-y-1 mb-8">
                {CATEGORIES.map(cat => (
                  <li key={cat}>
                    <button
                      onClick={() => handleCategoryChange(cat)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                        category === cat && !showWishlist && !initialFilter
                          ? "bg-zinc-900 text-white font-medium" 
                          : "text-zinc-600 hover:bg-zinc-100"
                      )}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
              
              {(category !== 'All' || searchQuery || sort !== 'featured' || initialFilter) && !showWishlist && (
                <button 
                  onClick={clearFilters}
                  className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors flex items-center gap-2"
                >
                  <X className="w-4 h-4" /> Clear all filters
                </button>
              )}
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center text-sm text-zinc-500">
              <p>Showing {isLoading ? '...' : filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''}</p>
            </div>

            <ProductGrid 
              products={filteredProducts} 
              isLoading={isLoading} 
              emptyState={
                <div className="py-20 text-center flex flex-col items-center">
                  <div className="w-24 h-24 bg-zinc-100 rounded-full flex items-center justify-center mb-6">
                    <Search className="w-10 h-10 text-zinc-300" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No products found</h3>
                  <p className="text-zinc-500 max-w-sm mb-6">We couldn't find anything matching your current filters. Try adjusting them.</p>
                  <button 
                    onClick={clearFilters}
                    className="px-6 py-3 bg-zinc-950 text-white rounded-full font-medium text-sm hover:bg-zinc-800 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              }
            />
          </div>
        </div>

        {/* Mobile Filters Drawer */}
        <AnimatePresence>
          {isMobileFiltersOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] md:hidden"
                onClick={() => setIsMobileFiltersOpen(false)}
              />
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                className="fixed inset-x-0 bottom-0 h-[80vh] bg-white rounded-t-3xl shadow-2xl z-[110] md:hidden flex flex-col overflow-hidden"
              >
                <div className="flex justify-between items-center p-6 border-b border-zinc-100">
                  <h3 className="font-bold text-lg">Filters</h3>
                  <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 bg-zinc-100 rounded-full">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-6">
                  <h4 className="font-semibold mb-4">Categories</h4>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={cn(
                          "px-4 py-2 rounded-full text-sm font-medium transition-colors border",
                          category === cat 
                            ? "bg-zinc-950 text-white border-zinc-950" 
                            : "bg-white text-zinc-600 border-zinc-200"
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="p-6 border-t border-zinc-100 flex gap-4">
                  <button 
                    onClick={() => { clearFilters(); setIsMobileFiltersOpen(false); }}
                    className="flex-1 py-3 border border-zinc-200 rounded-full font-medium"
                  >
                    Clear
                  </button>
                  <button 
                    onClick={() => setIsMobileFiltersOpen(false)}
                    className="flex-1 py-3 bg-zinc-950 text-white rounded-full font-medium"
                  >
                    Apply
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
