import { useCart } from "../contexts/CartContext";
import CartItem from "../components/molecules/cartItem";
import { useTranslation } from "react-i18next";

export default function Cart() {
  const { cartItems, getTotalPrice } = useCart();
  const { t } = useTranslation();

  const handleCheckout = () => {
    window.location.href = "/payment";
  };

  // Calcul des totaux avec les nouvelles fonctions
  const { monthly: monthlyTotal, oneTime: oneTimeTotal } = getTotalPrice();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">{t("cart.title")}</h1>


      {cartItems.length === 0 && (
        <p className="text-gray-600">{t("cart.empty")}</p>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Articles */}
        <div className="flex-1 bg-white rounded-2xl shadow p-4">
          {cartItems.map((item, index) => (
              <CartItem key={`${item.id}-${item.title}-${index}`} {...item} />
          ))}
        </div>

        {/* Résumé */}
        <div className="w-full lg:w-1/3 bg-gray-50 border border-gray-200 rounded-xl p-4 h-fit">
          <h2 className="text-lg font-semibold mb-2">{t("cart.summary.title")}</h2>
          <div className="flex justify-between mb-2">
            <span>{t("cart.summary.monthlySubscriptions")}</span>
            <span className="font-semibold">{monthlyTotal} € / mois</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>{t("cart.summary.oneTimePurchase")}</span>
            <span className="font-semibold">{oneTimeTotal} €</span>
          </div>
          <div className="border-t border-gray-300 my-2"></div>
          <div className="flex justify-between text-lg font-bold mb-4">
            <span>{t("cart.summary.total")}</span>
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
            {t("cart.checkout")}
          </button>
        </div>
      </div>
    </div>
  );
}
