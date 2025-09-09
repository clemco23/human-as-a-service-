// import Button from "../components/atoms/button"
import Header from "../components/molecules/header"


import Button from "../components/atoms/button"
import { useState } from "react";
import { FaSearch, FaCat, FaHeart, FaPaw } from "react-icons/fa";

export default function Home() {
     const [activePage, setActivePage] = useState("home");
    return (
        <main className=" bg-grey main-content min-h-[calc(100vh-80px)]">
            <Header />


      {/* Home Page */}
      {activePage === "home" && (
        <section id="home" className="page active animate-fadeIn">
          {/* Hero */}
          <div className="hero grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-8 py-16 max-w-6xl mx-auto">
            <div className="hero-content">
              <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
                Bienvenue sur PawMatch
              </h1>
              <p className="hero-subtitle text-xl font-semibold text-red-500 mb-4">
                Où les chats choisissent leurs humains parfaits
              </p>
              <p className="hero-description text-lg text-gray-600 mb-8 leading-relaxed">
                Découvrez notre approche révolutionnaire : ici, ce sont nos
                adorables félins qui recherchent activement leur compagnon humain
                idéal. Chaque chat a ses préférences et critères spécifiques !
              </p>
              <div className="hero-buttons flex flex-wrap gap-4">
           
                 <Button size="large" color="primary" onClick={() => setActivePage("cats")}> Voir les chats</Button>
               
                <Button size="large" color="transparent" onClick={() => setActivePage("about")}>En savoir plus</Button>
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
                Comment ça marche ?
              </h2>
              <div className="features-grid grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="feature-card bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
                  <FaPaw className="text-4xl text-red-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    Les chats postulent
                  </h3>
                  <p className="text-gray-600">
                    Chaque chat crée son profil et définit le type d'humain qu'il
                    recherche
                  </p>
                </div>
                <div className="feature-card bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
                  <FaSearch className="text-4xl text-red-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    Recherche active
                  </h3>
                  <p className="text-gray-600">
                    Nos félins parcourent les profils humains pour trouver leur
                    match parfait
                  </p>
                </div>
                <div className="feature-card bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
                  <FaHeart className="text-4xl text-red-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Match parfait</h3>
                  <p className="text-gray-600">
                    Quand un chat vous choisit, c'est le début d'une belle
                    amitié !
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
    )
}