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
      </div>
    </header>
  );
}
