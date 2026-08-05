# React E-Commerce Application
A modern, responsive e-commerce web application built with React, Vite, and Tailwind CSS. The app features state management via Zustand, robust animations with Framer Motion, and backend integration using Firebase for authentication and database services.

## ✨ Features
- **Product Catalog & Filtering**: Browse products with dynamic filtering and sorting capabilities.
- **Shopping Cart & Checkout**: Seamlessly add items to the cart, adjust quantities, and proceed through a clean checkout process.
- **Wishlist Management**: Save favorite products to a wishlist for future purchases.
- **User Authentication**: Secure sign-up, log-in, and log-out flows powered by Firebase Authentication (Email/Password & Google Sign-In).
- **Real-time Synchronization**: Cart and wishlist data is synchronized in real-time to Firebase Firestore for authenticated users.
- **Responsive Design**: fully optimized for desktop, tablet, and mobile devices using Tailwind CSS.
- **UI & Animations**: Clean, modern interface with smooth page transitions and micro-interactions powered by Framer Motion and Lucide icons.

## 🚀 Tech Stack
- **Frontend**: React 19, Vite, Tailwind CSS 4
- **State Management**: Zustand
- **Routing**: React Router v7
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Backend/BaaS**: Firebase (Auth, Firestore)

## 📁 Project Structure
``
.
├── src/
│   ├── components/      # Reusable UI components
│   ├── lib/             # Third-party configurations (e.g., Firebase config)
│   ├── pages/           # Route-level components (Home, Shop, Cart, Checkout, etc.)
│   ├── store/           # Zustand stores (Auth, Cart/Wishlist, Sync logic)
│   ├── App.jsx          # Root application component
│   └── main.jsx         # Entry point
├── public/              # Static assets
├── .env.example         # Example environment variables required for Firebase
├── vite.config.js       # Vite configuration and build optimizations
└── package.json         # Project dependencies and scripts
```

## 🛠️ Setup & Installation
1. **Install dependencies:**
   Make sure you have Node.js installed. Then, run:
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Create a `.env` file in the root directory based on `.env.example`. Add your Firebase configuration keys:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

3. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:3000`.

## 📦 Building for Production
To create a production-ready build, run:
```bash
npm run build
```
This will generate optimized, minified files in the `dist` directory. The Vite configuration includes custom manual chunks to ensure optimal bundle sizing for dependencies like React, Firebase, and UI libraries.

## 🔒 Firebase Configuration Details
This app is configured to gracefully handle missing Firebase credentials during development. If the `.env` variables are missing, the application will initialize with placeholder credentials. However, functionality relying on Firebase (Authentication, Firestore syncing) will require a valid configuration.

Ensure you have enabled **Email/Password** and **Google Authentication** in your Firebase console, and have provisioned a **Firestore database**.
