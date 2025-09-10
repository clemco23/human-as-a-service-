import { useState } from "react";

export default function Paiement() {
  const [moyenPaiement, setMoyenPaiement] = useState("paypal");
  const [conditions, setConditions] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!conditions) {
      alert("Vous devez accepter les conditions d'adoption avant de continuer.");
      return;
    }
    console.log("Formulaire soumis !");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h1 className="text-2xl font-bold mb-2 text-gray-800">Finaliser l'adoption</h1>
      <p className="mb-6 text-gray-600">Dernière étape avant de rencontrer vos nouveaux compagnons</p>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Informations personnelles */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">Informations personnelles</h2>
          <input type="text" placeholder="Prénom" className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          <input type="text" placeholder="Nom" className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          <input type="email" placeholder="Votre email" className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          <input type="text" placeholder="Téléphone" className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
        </div>

        {/* Adresse */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">Adresse</h2>
          <input type="text" placeholder="Adresse" className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          <input type="text" placeholder="Ville" className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          <input type="text" placeholder="Code postal" className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
        </div>

        {/* Moyen de paiement */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-700">Moyen de paiement</h2>
          <div className="flex items-center mb-2">
            <input
              id="radio-cb"
              type="radio"
              value="carte"
              name="paiement"
              checked={moyenPaiement === "carte"}
              onChange={(e) => setMoyenPaiement(e.target.value)}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="radio-cb" className="ml-2 text-sm text-gray-900">Carte bancaire</label>
          </div>
          <div className="flex items-center">
            <input
              id="radio-paypal"
              type="radio"
              value="paypal"
              name="paiement"
              checked={moyenPaiement === "paypal"}
              onChange={(e) => setMoyenPaiement(e.target.value)}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="radio-paypal" className="ml-2 text-sm text-gray-900">PayPal</label>
          </div>

          {/* Champs conditionnels Carte bancaire */}
          {moyenPaiement === "carte" && (
            <div className="space-y-3 p-4 border rounded-lg bg-gray-50 mt-2">
              <input type="text" placeholder="Numéro de carte" className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              <input type="text" placeholder="Date d'expiration (MM/AA)" className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 focus:border-red-500" />
              <input type="text" placeholder="CVV" className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
          )}
        </div>

        {/* Conditions */}
        <div className="flex items-start">
          <input
            id="conditions"
            type="checkbox"
            checked={conditions}
            onChange={(e) => setConditions(e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="conditions" className="ml-2 text-sm text-gray-900">
            J'accepte les conditions d'adoption et je m'engage à prendre soin de mes nouveaux compagnons
          </label>
        </div>

        {/* Bouton */}
        <button
          type="submit"
          disabled={!conditions}
          className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:bg-gray-400 transition"
        >
          Valider
        </button>
      </form>
    </div>
  );
}
