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
    alert("Paiement effectué avec succès ! Mais transaction non validée :D (en gros tu t'es fait baiser par l'admin).");
  };

  return (
    <div className="max-w-3xl mx-auto p-10 bg-white rounded-3xl shadow-xl mt-12 mb-20">
      <h1 className="text-3xl font-bold mb-3 text-gray-900 text-center">
        Finaliser l'adoption
      </h1>
      <p className="mb-10 text-gray-500 text-center">
        Dernière étape avant de rencontrer vos nouveaux compagnons
      </p>

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
            <input type="radio" id="radio-cb" value="carte" name="paiement"
              checked={moyenPaiement === "carte"}
              onChange={(e) => setMoyenPaiement(e.target.value)}
              className="w-5 h-5 text-gray-700 border-gray-400 focus:ring-gray-400"
            />
            <label htmlFor="radio-cb" className="text-gray-700">Carte bancaire</label>
          </div>
          <div className="flex items-center gap-4">
            <input type="radio" id="radio-paypal" value="paypal" name="paiement"
              checked={moyenPaiement === "paypal"}
              onChange={(e) => setMoyenPaiement(e.target.value)}
              className="w-5 h-5 text-gray-700 border-gray-400 focus:ring-gray-400"
            />
            <label htmlFor="radio-paypal" className="text-gray-700">PayPal</label>
          </div>

          {moyenPaiement === "carte" && (
            <div className="space-y-3 p-5 border rounded-xl bg-gray-50 mt-3">
              <input type="text" placeholder="Numéro de carte" className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400" />
              <input type="text" placeholder="Date d'expiration (MM/AA)" className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400" />
              <input type="text" placeholder="CVV" className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400" />
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
        <button type="submit" disabled={!conditions}
          className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 disabled:bg-gray-300 transition"
        >
          Valider l'adoption
        </button>
      </form>
    </div>
  );
}

