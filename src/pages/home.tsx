import Button from "../components/atoms/button";
import { useState } from "react";
import { FaSearch, FaCat, FaHeart, FaPaw } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function Home() {
  const [activePage, setActivePage] = useState("home");
  const { t } = useTranslation();

  // On cast pour que TypeScript comprenne que c’est un tableau
  const features = t("home.features.cards", { returnObjects: true }) as Array<{
    icon: string;
    title: string;
    description: string;
  }>;

  return (
    <main className="bg-grey main-content">
      {/* Home Page */}
      {activePage === "home" && (
        <section id="home" className="page active animate-fadeIn">
          {/* Hero */}
          <div className="hero grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-8 py-16 max-w-6xl mx-auto">
            <div className="hero-content">
              <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {t("home.hero.title")}
              </h1>
              <p className="hero-subtitle text-xl font-semibold text-red-500 mb-4">
                {t("home.hero.subtitle")}
              </p>
              <p className="hero-description text-lg text-gray-600 mb-8 leading-relaxed">
                {t("home.hero.description")}
              </p>
              <div className="hero-buttons flex flex-wrap gap-4">
                <Button
                  size="large"
                  color="primary"
                  onClick={() => setActivePage("cats")}
                  href="/search"
                >
                  {t("home.hero.buttonViewCats")}
                </Button>

                <Button
                  size="large"
                  color="transparent"
                  onClick={() => setActivePage("about")}
                  href="/about"
                >
                  {t("home.hero.buttonLearnMore")}
                </Button>
              </div>
            </div>
            <div className="hero-image flex justify-center items-center">
              <div className="cat-illustration flex gap-4 text-6xl text-pink-400 animate-bounce">
                <FaSearch />
                <FaCat />
                <FaHeart />
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="features bg-gray-50 py-16">
            <div className="container max-w-5xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-12">
                {t("home.features.title")}
              </h2>
              <div className="features-grid grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((card, index) => (
                  <div
                    key={index}
                    className="feature-card bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
                  >
                    {card.icon === "paw" && (
                      <FaPaw className="text-4xl text-red-500 mx-auto mb-4" />
                    )}
                    {card.icon === "search" && (
                      <FaSearch className="text-4xl text-red-500 mx-auto mb-4" />
                    )}
                    {card.icon === "heart" && (
                      <FaHeart className="text-4xl text-red-500 mx-auto mb-4" />
                    )}
                    <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                    <p className="text-gray-600">{card.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
