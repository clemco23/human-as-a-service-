import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';

import { CartProvider } from "./contexts/CartContext"; // ajout contexte
import { AuthProvider } from "./contexts/AuthContext";

import HomePage from './pages/home';
import Contact from './pages/contact';
import SearchPage from './pages/searchPage';
import Header from './components/molecules/header';
import Footer from './components/molecules/footer';
import AboutPage from './pages/about';
import ConnectPage from './pages/connect';
import RegisterPage from './pages/register';
import AddHuman from './pages/addHuman';
import Cart from './pages/cart';
import Paiement from "./pages/paiement";

function AppRouter() {
  return (
    <AuthProvider>
      <Router>
        <CartProvider>
          <div className="min-h-screen flex flex-col">  
            <Header />
            <main className="flex-1">    
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/connect" element={<ConnectPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/add-human" element={<AddHuman />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/payment" element={<Paiement />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </Router>
    </AuthProvider>
  );
}

export default AppRouter;
