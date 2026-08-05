import { motion } from 'framer-motion';

export default function TermsOfService() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white min-h-screen py-20"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight mb-8">Terms of Service</h1>
        <div className="prose prose-zinc max-w-none text-zinc-600 space-y-6">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-semibold text-zinc-900 mt-12 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using this website, you accept and agree to be bound by the terms and provision 
            of this agreement. In addition, when using this website's particular services, you shall be subject 
            to any posted guidelines or rules applicable to such services.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-900 mt-12 mb-4">2. Products and Pricing</h2>
          <p>
            We strive to display our products and their colors as accurately as possible. However, the actual colors 
            you see will depend on your monitor, and we cannot guarantee that your monitor's display of any color 
            will be accurate. All prices are subject to change without notice.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-900 mt-12 mb-4">3. Orders and Payment</h2>
          <p>
            We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or 
            cancel quantities purchased per person, per household, or per order. In the event that we make a change 
            to or cancel an order, we may attempt to notify you by contacting the e-mail and/or billing address/phone 
            number provided at the time the order was made.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-900 mt-12 mb-4">4. Shipping and Returns</h2>
          <p>
            Risk of loss and title for items purchased from this website pass to you upon delivery of the items 
            to the carrier. For more information on our return policy, please visit our Returns page.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-900 mt-12 mb-4">5. Intellectual Property</h2>
          <p>
            All content included on this site, such as text, graphics, logos, images, as well as the compilation 
            thereof, and any software used on the site, is the property of Lumora or its suppliers and protected 
            by copyright and other laws that protect intellectual property and proprietary rights.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-900 mt-12 mb-4">6. Limitation of Liability</h2>
          <p>
            Lumora shall not be liable for any direct, indirect, incidental, special, or consequential damages 
            resulting from the use or the inability to use the website or for the cost of procurement of substitute 
            goods and services.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
