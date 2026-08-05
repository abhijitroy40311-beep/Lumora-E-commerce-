import { AnimatePresence } from 'framer-motion';
import ProductCard from '../ProductCard';
import { ProductGridSkeleton } from '../LoadingSkeleton';
import { Search } from 'lucide-react';

export default function ProductGrid({ products, isLoading, emptyState }) {
  if (isLoading) {
    return <ProductGridSkeleton count={6} />;
  }

  if (products.length === 0) {
    return emptyState || (
      <div className="py-20 text-center flex flex-col items-center">
        <div className="w-24 h-24 bg-zinc-100 rounded-full flex items-center justify-center mb-6">
          <Search className="w-10 h-10 text-zinc-300" />
        </div>
        <h3 className="text-xl font-medium text-zinc-900 mb-2">No products found.</h3>
        <p className="text-zinc-500">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
      <AnimatePresence>
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index % 6} />
        ))}
      </AnimatePresence>
    </div>
  );
}
