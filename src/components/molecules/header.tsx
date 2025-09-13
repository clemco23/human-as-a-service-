import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaShoppingCart, FaHandPaper, FaPaw } from "react-icons/fa";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { auth, db } from "../../firebase-config"; 
import { doc, getDoc } from "firebase/firestore";
import Button from "../atoms/button";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const switchLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setDisplayName(userDoc.data().name as string);
          } else {
            setDisplayName(null);
          }
        } catch (err) {
          console.error("Erreur récupération nom utilisateur :", err);
          setDisplayName(null);
        }
      } else {
        setDisplayName(null);
      }
    });

    return () => unsubscribe();
  }, []);

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
              {t("header.navHome")}
            </Button>
            <Button color="black" size="medium" href="/search">
              {t("header.navCats")}
            </Button>
            <Button color="black" size="medium" href="/about">
             {t("header.navAbout")}
            </Button>
            <Button color="black" size="medium" href="/contact">
              {t("header.navContact")}
            </Button>
          </nav>

          {/* Right side (User info or login) */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-gray-700">
                  {t("header.navWelcome")} {displayName || user.email}
                </span>
                {/* Icône panier */}
                <a
                  href="/cart"
                  aria-label="Panier"
                  className={`flex items-center justify-center rounded-lg p-2 transition ${
                    location.pathname === "/cart"
                      ? "bg-red-400"
                      : "hover:bg-red-400"
                  }`}
                >
                  <FaShoppingCart
                    className={`text-2xl ${
                      location.pathname === "/cart"
                        ? "text-white"
                        : "text-red-500"
                    }`}
                  />
                </a>
                <button
                  onClick={() => signOut(auth)}
                  className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                 {t("header.navLogout")}
                </button>
              </>
            ) : (
              <Button size="medium" href="/connect">
                {t("header.navConnect")}
              </Button>
            )}

            {/* Boutons langues avec icônes */}
            <div className="flex space-x-2">
              <button
                onClick={() => switchLanguage("fr")}
                className="p-2 rounded flex items-center justify-center hover:bg-gray-100 transition"
                title="Français"
              >
                <FaHandPaper className="text-xl" />
              </button>
              <button
                onClick={() => switchLanguage("en")}
                className="p-2 rounded flex items-center justify-center hover:bg-gray-100 transition"
                title="Miaou"
              >
                <FaPaw className="text-xl" />
              </button>
            </div>
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
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen 
            ? 'max-h-screen opacity-100 visible' 
            : 'max-h-0 opacity-0 invisible overflow-hidden'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200 shadow-lg">
            {/* Navigation Links */}
            <div className="space-y-2">
              <Button 
                color="black" 
                size="medium" 
                href="/"
                className="block w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("header.navHome")}
              </Button>
              <Button 
                color="black" 
                size="medium" 
                href="/search"
                className="block w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("header.navCats")}
              </Button>
              <Button 
                color="black" 
                size="medium" 
                href="/about"
                className="block w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("header.navAbout")}
              </Button>
              <Button 
                color="black" 
                size="medium" 
                href="/contact"
                className="block w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("header.navContact")}
              </Button>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-3"></div>

            {/* User Section */}
            <div className="space-y-3">
              {user ? (
                <>
                  <div className="px-3 py-2 text-sm text-gray-700 bg-gray-50 rounded-md">
                    {t("header.navWelcome")} {displayName || user.email}
                  </div>
                  
                  {/* Cart Button */}
                  <a
                    href="/cart"
                    className="flex items-center px-3 py-2 rounded-md hover:bg-red-50 transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaShoppingCart className="text-red-500 mr-3" />
                    <span className="text-gray-900">Panier</span>
                  </a>

                  {/* Logout Button */}
                  <button
                    onClick={() => {
                      signOut(auth);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 bg-red-400 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
                  >
                    {t("header.navLogout")}
                  </button>
                </>
              ) : (
                <Button 
                  size="medium" 
                  href="/connect"
                  className="block w-full text-center px-3 py-2 bg-red-400 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("header.navConnect")}
                </Button>
              )}

              {/* Language Buttons */}
              <div className="flex space-x-2 px-3">
                <button
                  onClick={() => {
                    switchLanguage("fr");
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 p-3 rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors duration-200 border border-gray-200"
                  title="Français"
                >
                  <FaHandPaper className="text-xl mr-2" />
                  <span className="text-sm">FR</span>
                </button>
                <button
                  onClick={() => {
                    switchLanguage("en");
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 p-3 rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors duration-200 border border-gray-200"
                  title="Miaou"
                >
                  <FaPaw className="text-xl mr-2" />
                  <span className="text-sm">EN</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
