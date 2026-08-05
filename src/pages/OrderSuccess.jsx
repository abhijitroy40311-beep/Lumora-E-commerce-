import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function OrderSuccess() {
  // eslint-disable-next-line react-hooks/purity
  const orderNumber = useMemo(() => `ORD-${Math.floor(100000 + Math.random() * 900000)}`, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-zinc-50 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-lg w-full text-center border border-zinc-100"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
          className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </motion.div>
        
        <h1 className="text-3xl font-bold tracking-tight text-zinc-950 mb-2">Order Confirmed</h1>
        <p className="text-zinc-500 mb-8">
          Thank you for your purchase. We've received your order and will begin processing it shortly.
        </p>

        <div className="bg-zinc-50 rounded-2xl p-6 mb-8 text-left border border-zinc-100">
          <div className="flex justify-between mb-2">
            <span className="text-zinc-500 text-sm">Order Number</span>
            <span className="font-semibold text-zinc-900">{orderNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500 text-sm">Date</span>
            <span className="font-semibold text-zinc-900">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>

        <p className="text-sm text-zinc-500 mb-8">
          You will receive an email confirmation containing your receipt and tracking information.
        </p>

        <Link 
          to="/shop" 
          className="w-full py-4 bg-zinc-950 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors group"
        >
          Continue Shopping <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </div>
  );
}
