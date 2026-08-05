import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white min-h-screen py-20"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight mb-8">Privacy Policy</h1>
        <div className="prose prose-zinc max-w-none text-zinc-600 space-y-6">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-semibold text-zinc-900 mt-12 mb-4">1. Introduction</h2>
          <p>
            At Lumora, we take your privacy seriously. This Privacy Policy explains how we collect, 
            use, disclose, and safeguard your information when you visit our website or make a purchase.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-900 mt-12 mb-4">2. Information We Collect</h2>
          <p>We collect information that you provide directly to us, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Name and contact information (email address, shipping address, phone number)</li>
            <li>Payment information (processed securely through our payment providers)</li>
            <li>Account credentials if you create an account</li>
            <li>Communications with us</li>
          </ul>

          <h2 className="text-2xl font-semibold text-zinc-900 mt-12 mb-4">3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Process and fulfill your orders</li>
            <li>Communicate with you about your orders and support requests</li>
            <li>Send you marketing communications (if you've opted in)</li>
            <li>Improve our website and customer experience</li>
            <li>Protect against fraudulent transactions</li>
          </ul>

          <h2 className="text-2xl font-semibold text-zinc-900 mt-12 mb-4">4. Sharing Your Information</h2>
          <p>
            We do not sell your personal information. We may share your information with third-party service 
            providers who help us operate our business (such as shipping partners and payment processors).
          </p>

          <h2 className="text-2xl font-semibold text-zinc-900 mt-12 mb-4">5. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal information. If you would like to 
            exercise these rights, please contact us at privacy@lumora.example.com.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
