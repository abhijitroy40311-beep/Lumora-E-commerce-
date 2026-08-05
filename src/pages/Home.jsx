import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, Truck } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Home() {
  const bestSellers = products.filter(p => p.tags.includes('Best Seller')).slice(0, 4);
  const newArrivals = products.filter(p => p.tags.includes('New')).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-zinc-100">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=2000&q=80&fm=webp" 
            alt="Workspace" 
            fetchPriority="high"
            loading="eager"
            className="w-full h-full object-cover object-center opacity-40 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-100 via-transparent to-zinc-100/30" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 inline-block"
          >
            <span className="px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md text-sm font-semibold tracking-wide text-zinc-900 border border-zinc-200 shadow-sm">
              INTRODUCING THE STUDIO COLLECTION
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-zinc-950 mb-6"
          >
            Technology, <br className="hidden md:block"/> Refined.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-zinc-600 max-w-2xl mb-10 font-medium"
          >
            Premium tools and accessories designed to elevate your everyday workspace. Crafted for the way you live.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link 
              to="/shop" 
              className="px-8 py-4 bg-zinc-950 text-white rounded-full font-medium text-lg hover:bg-zinc-800 transition-colors shadow-xl shadow-zinc-900/20"
            >
              Shop Collection
            </Link>
            <Link 
              to="/shop?filter=best-seller" 
              className="px-8 py-4 bg-white text-zinc-950 rounded-full font-medium text-lg hover:bg-zinc-50 transition-colors border border-zinc-200"
            >
              Explore Best Sellers
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories (Bento Grid Style) */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <motion.div variants={itemVariants} className="md:col-span-2 relative h-[400px] rounded-3xl overflow-hidden group">
              <img src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=1000&q=80&fm=webp" loading="lazy" alt="High-Fidelity Audio Equipment" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-3xl font-bold text-white mb-2">High-Fidelity Audio</h3>
                <Link to="/shop?category=Audio" className="inline-flex items-center text-white/90 font-medium hover:text-white group/link">
                  Shop Audio <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="relative h-[400px] rounded-3xl overflow-hidden group">
              <img src="https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80&fm=webp" loading="lazy" alt="Power and Charge Accessories" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-2">Power & Charge</h3>
                <Link to="/shop?category=Power" className="inline-flex items-center text-white/90 font-medium hover:text-white group/link">
                  Shop Power <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-zinc-950 mb-4">Best Sellers</h2>
              <p className="text-zinc-500">Our most popular premium accessories.</p>
            </div>
            <Link to="/shop?filter=best-seller" className="hidden sm:inline-flex items-center font-medium hover:text-zinc-600 transition-colors">
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlight / 3D feel */}
      <section className="py-32 bg-zinc-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">Designed for Focus.</h2>
              <p className="text-zinc-400 text-lg mb-8 leading-relaxed max-w-lg">
                Every Lumora product is engineered with minimalist principles, removing distractions so you can perform at your best. Premium materials meet intuitive functionality.
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 text-zinc-300">
                  <ShieldCheck className="w-5 h-5 text-zinc-500" /> Aerospace-grade aluminum
                </li>
                <li className="flex items-center gap-3 text-zinc-300">
                  <Zap className="w-5 h-5 text-zinc-500" /> Next-gen performance
                </li>
                <li className="flex items-center gap-3 text-zinc-300">
                  <Truck className="w-5 h-5 text-zinc-500" /> Free global shipping
                </li>
              </ul>
              <Link to="/shop" className="inline-flex px-8 py-4 bg-white text-zinc-950 rounded-full font-medium hover:bg-zinc-200 transition-colors">
                Explore Collection
              </Link>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, type: "spring" }}
              className="relative [perspective:1000px]"
            >
              {/* Pseudo 3D floating effect using framer motion */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }} 
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="relative z-20 rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-zinc-800"
              >
                <img src="https://images.unsplash.com/photo-1595225476474-87563907a212?w=1000&q=80&fm=webp" loading="lazy" alt="Mechanical Keyboard" className="w-full h-auto object-cover" />
              </motion.div>
              {/* Abstract background shapes */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-zinc-800 to-zinc-900 rounded-full blur-3xl opacity-30 -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-zinc-950 mb-4">New Arrivals</h2>
            <p className="text-zinc-500">The latest additions to the studio.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link to="/shop?filter=new" className="inline-flex px-8 py-4 bg-zinc-950 text-white rounded-full font-medium hover:bg-zinc-800 transition-colors">
              View All New Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
