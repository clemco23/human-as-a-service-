import { useState } from 'react';
import Button from "../atoms/button";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white text-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Button color="black" size="medium" href="/">
              Human As A Service
            </Button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 flex-1 justify-center">
            <Button color="black" size="medium" href="/">
              Accueil
            </Button>
            <Button color="black" size="medium" href="/search">
              Chat disponible
            </Button>
            <Button color="black" size="medium" href="/about">
              À propos
            </Button>
            <Button color="black" size="medium" href="/contact">
              Contact
            </Button>
          </nav>

          {/* Cat Connect - Desktop */}
          <div className="hidden md:block">
            <Button size="medium">
              Cat Connect
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Ouvrir le menu principal</span>
              {!mobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 rounded-lg mt-2">
              <Button color="black" size="medium" href="/">
                Acceuil
              </Button>
              <Button color="black" size="medium" href="/search">
                Chat disponible
              </Button>
              <Button color="black" size="medium" href="/about">
                À propos
              </Button>
              <Button color="black" size="medium" href="/contact">
                Contact
              </Button>
              <div className="pt-2 border-t border-gray-200">
                <Button size="medium">
                  Cat Connect
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}