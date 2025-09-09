import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'

import HomePage from './pages/home'
import ContactPage from './pages/contact'
import SearchPage from './pages/searchPage'
import Header from './components/molecules/header';
import AboutPage from './pages/about';

function AppRouter() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/about" element={<AboutPage />} />

      </Routes>
    </Router>
  );
}

export default AppRouter
