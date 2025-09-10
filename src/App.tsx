import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'

import HomePage from './pages/home'
import ContactPage from './pages/contact'
import SearchPage from './pages/searchPage'
import Header from './components/molecules/header';
import Footer from './components/molecules/footer';
import AboutPage from './pages/about';
import ConnectPage from './pages/connect';
import RegisterPage from './pages/register';
function AppRouter() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/connect" element={<ConnectPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default AppRouter
