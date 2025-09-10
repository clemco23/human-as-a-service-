import { useCart } from "../contexts/CartContext";
import CartItem from "../components/molecules/cartItem";

export default function Cart() {
  const { cartItems } = useCart();

  const handleCheckout = () => {
    window.location.href = "/payment";
  };

  // Calcul des totaux

  const monthlyTotal = cartItems
    .filter((item) => item.isMonthly)
    .reduce((sum, item) => sum + item.price, 0);

  const oneTimeTotal = cartItems
    .filter((item) => !item.isMonthly)
    .reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">🛒 Votre panier</h1>


      {cartItems.length === 0 && (
        <p className="text-gray-600">Votre panier est vide.</p>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Articles */}
        <div className="flex-1 bg-white rounded-2xl shadow p-4">
          {cartItems.map((item) => (
              <CartItem key={item.id} {...item} />
          ))}
        </div>

        {/* Résumé */}
        <div className="w-full lg:w-1/3 bg-gray-50 border border-gray-200 rounded-xl p-4 h-fit">
          <h2 className="text-lg font-semibold mb-2">Résumé</h2>
          <div className="flex justify-between mb-2">
            <span>Abonnements mensuels</span>
            <span className="font-semibold">{monthlyTotal} € / mois</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Achat unique</span>
            <span className="font-semibold">{oneTimeTotal} €</span>
          </div>
          <div className="border-t border-gray-300 my-2"></div>
          <div className="flex justify-between text-lg font-bold mb-4">
            <span>Total</span>
            <span>
              {monthlyTotal > 0 && `${monthlyTotal} € / mois`}{" "}
              {oneTimeTotal > 0 && `+ ${oneTimeTotal} € en une fois`}
            </span>
          </div>

          {/* Bouton paiement */}
          <button
            onClick={handleCheckout}
              disabled={cartItems.length === 0}
            className={`w-full py-3 px-4 font-semibold rounded-lg transition-colors duration-300
        ${cartItems.length === 0
          ? "bg-gray-400 text-gray-200 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
          >
            Passer au paiement
          </button>
        </div>
      </div>
    </div>
  );
}
