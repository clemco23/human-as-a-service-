import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import StripeCheckout from "../components/molecules/StripeCheckout";

export default function Paiement() {
  const [moyenPaiement, setMoyenPaiement] = useState("stripe");
  const [conditions, setConditions] = useState(false);
  const { cartItems, getTotalPrice, clearCart } = useCart();
  
  const { monthly: monthlyTotal, oneTime: oneTimeTotal } = getTotalPrice();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!conditions) {
      alert("Vous devez accepter les conditions d'adoption avant de continuer.");
      return;
    }
    
    if (cartItems.length === 0) {
      alert("Votre panier est vide !");
      return;
    }
    
    if (moyenPaiement === "paypal") {
      // Simulation PayPal
      alert(`Paiement PayPal de ${monthlyTotal > 0 ? monthlyTotal + '€/mois' : ''} ${oneTimeTotal > 0 ? '+ ' + oneTimeTotal + '€' : ''} effectué avec succès !`);
      clearCart();
      window.location.href = "/";
    }
  };

  const handleStripeSuccess = () => {
    alert(`Paiement Stripe de ${monthlyTotal > 0 ? monthlyTotal + '€/mois' : ''} ${oneTimeTotal > 0 ? '+ ' + oneTimeTotal + '€' : ''} effectué avec succès !`);
    clearCart();
    window.location.href = "/";
  };

  const handleStripeError = (error: string) => {
    alert(`Erreur de paiement: ${error}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-10 bg-white rounded-3xl shadow-xl mt-12 mb-20">
      <h1 className="text-3xl font-bold mb-3 text-gray-900 text-center">
        Finaliser l'adoption
      </h1>
      <p className="mb-6 text-gray-500 text-center">
        Dernière étape avant de rencontrer vos nouveaux compagnons
      </p>
      
      {/* Résumé du panier */}
      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Résumé de votre commande</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-600">Votre panier est vide</p>
        ) : (
          <div className="space-y-3">
            {cartItems.map((item, index) => (
              <div key={`${item.id}-${item.title}-${index}`} className="flex justify-between items-center border-b pb-2">
                <div>
                  <span className="font-medium">{item.title}</span>
                  <span className="text-sm text-gray-500 ml-2">({item.age} ans, {item.genre})</span>
                </div>
                <span className="font-semibold">
                  {item.price}€ {item.isMonthly ? "/mois" : ""}
                </span>
              </div>
            ))}
            <div className="pt-4 border-t">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>
                  {monthlyTotal > 0 && `${monthlyTotal}€/mois`}
                  {monthlyTotal > 0 && oneTimeTotal > 0 && " + "}
                  {oneTimeTotal > 0 && `${oneTimeTotal}€`}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <form className="space-y-10" onSubmit={handleSubmit}>
        {/* Informations personnelles */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Informations personnelles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Prénom" className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400" />
            <input type="text" placeholder="Nom" className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400" />
          </div>
          <input type="email" placeholder="Email" className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400" />
          <input type="text" placeholder="Téléphone" className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400" />
        </div>

        {/* Adresse */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Adresse</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" placeholder="Adresse" className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400" />
            <input type="text" placeholder="Ville" className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400" />
            <input type="text" placeholder="Code postal" className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400" />
          </div>
        </div>

        {/* Moyen de paiement */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">Moyen de paiement</h2>
          <div className="flex items-center gap-4">
            <input type="radio" id="radio-stripe" value="stripe" name="paiement"
              checked={moyenPaiement === "stripe"}
              onChange={(e) => setMoyenPaiement(e.target.value)}
              className="w-5 h-5 text-gray-700 border-gray-400 focus:ring-gray-400"
            />
            <label htmlFor="radio-stripe" className="text-gray-700">Stripe (Carte bancaire)</label>
          </div>
          <div className="flex items-center gap-4">
            <input type="radio" id="radio-paypal" value="paypal" name="paiement"
              checked={moyenPaiement === "paypal"}
              onChange={(e) => setMoyenPaiement(e.target.value)}
              className="w-5 h-5 text-gray-700 border-gray-400 focus:ring-gray-400"
            />
            <label htmlFor="radio-paypal" className="text-gray-700">PayPal</label>
          </div>

          {moyenPaiement === "stripe" && (
            <div className="space-y-3 p-5 border rounded-xl bg-gray-50 mt-3">
              <p className="text-sm text-gray-600 mb-3">💳 Paiement sécurisé avec Stripe</p>
              <StripeCheckout 
                amount={oneTimeTotal + monthlyTotal}
                onSuccess={handleStripeSuccess}
                onError={handleStripeError}
              />
            </div>
          )}
        </div>

        {/* Conditions */}
        <div className="flex items-start gap-2">
          <input type="checkbox" id="conditions" checked={conditions} onChange={(e) => setConditions(e.target.checked)}
            className="w-5 h-5 text-gray-700 border-gray-300 rounded focus:ring-gray-400" 
          />
          <label htmlFor="conditions" className="text-gray-700 text-sm">
            J'accepte les conditions d'adoption et je m'engage à prendre soin de mes nouveaux compagnons
          </label>
        </div>

        {/* Bouton */}
        {moyenPaiement === "paypal" && (
          <button type="submit" disabled={!conditions || cartItems.length === 0}
            className={`w-full py-3 rounded-xl font-semibold transition ${
              !conditions || cartItems.length === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {cartItems.length === 0 ? "Panier vide" : "Payer avec PayPal"}
          </button>
        )}
        
        {moyenPaiement === "stripe" && (
          <div className="text-center text-sm text-gray-600">
            Le paiement Stripe se fait via le formulaire ci-dessus
          </div>
        )}
      </form>
    </div>
  );
}

