import { cn } from '../utils';

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      <div className="aspect-[4/5] bg-zinc-200 rounded-2xl w-full"></div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-start gap-2">
          <div className="h-5 bg-zinc-200 rounded w-2/3"></div>
          <div className="h-5 bg-zinc-200 rounded w-1/4"></div>
        </div>
        <div className="h-4 bg-zinc-200 rounded w-1/2"></div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="bg-white min-h-screen pb-24 animate-pulse">
      <div className="border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="h-4 bg-zinc-200 rounded w-48"></div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          <div className="lg:w-1/2 flex flex-col-reverse md:flex-row gap-4">
            <div className="flex md:flex-col gap-4">
               {[1, 2, 3].map(i => (
                 <div key={i} className="w-20 h-24 bg-zinc-200 rounded-xl shrink-0"></div>
               ))}
            </div>
            <div className="flex-1 bg-zinc-200 rounded-3xl aspect-[4/5] md:aspect-auto md:h-[600px]"></div>
          </div>
          <div className="lg:w-1/2 flex flex-col pt-4">
            <div className="h-4 bg-zinc-200 rounded w-24 mb-4"></div>
            <div className="h-10 bg-zinc-200 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-zinc-200 rounded w-32 mb-6"></div>
            <div className="h-8 bg-zinc-200 rounded w-24 mb-8"></div>
            <div className="space-y-3 mb-8">
               <div className="h-4 bg-zinc-200 rounded w-full"></div>
               <div className="h-4 bg-zinc-200 rounded w-full"></div>
               <div className="h-4 bg-zinc-200 rounded w-5/6"></div>
            </div>
            <div className="h-14 bg-zinc-200 rounded-full w-full mb-10"></div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-y border-zinc-100 mb-8">
               <div className="h-10 bg-zinc-200 rounded-full w-full"></div>
               <div className="h-10 bg-zinc-200 rounded-full w-full"></div>
               <div className="h-10 bg-zinc-200 rounded-full w-full"></div>
            </div>
            
            <div className="h-6 bg-zinc-200 rounded w-32 mb-4"></div>
            <div className="space-y-3">
               <div className="h-4 bg-zinc-200 rounded w-full"></div>
               <div className="h-4 bg-zinc-200 rounded w-5/6"></div>
               <div className="h-4 bg-zinc-200 rounded w-4/5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
