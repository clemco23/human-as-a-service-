import { useState } from "react";
import { useCart } from "../../contexts/CartContext";
import { useTranslation } from "react-i18next";

type Props = {
  image?: string;
  title: string;
  age: number;
  personality: string;
  description: string;
  search: string;
  id: number;
  genre: string;
  size: number;
  prix: number;
};

export default function HumanCard({
  id,
  image,
  title,
  age,
  personality,
  description,
  search,
  genre,
  size,
  prix,
}: Props) {
  const [isMonthly, setIsMonthly] = useState(true);
  const { addToCart, isInCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"success" | "error">("success");

  const { t } = useTranslation();
  const itemId = String(id);
  const isAlreadyInCart = isInCart(itemId, title);

  const getTranslatedPersonality = (personality: string) => {
    return t(`humanCard.personalities.${personality}`, personality);
  };

  const handleAddToCart = () => {
    const item = {
      id: itemId,
      title,
      image: image || "",
      age,
      personality,
      description,
      search,
      genre,
      size,
      price: isMonthly ? prix : prix * 12,
      isMonthly,
    };
    
    const result = addToCart(item);
    
    setModalMessage(result.message);
    setModalType(result.success ? "success" : "error");
    setShowModal(true);
    
    setTimeout(() => {
      setShowModal(false);
    }, 2000);
  };

  return (
    <div className="w-sm mx-auto  bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      {/* <p className="text-gray-500 mb-3">{id}</p> */}
      <img
        src={image}
        alt={title}
        className="w-28 h-28 rounded-full object-cover mx-auto mb-4 border-4 border-gray-200 shadow-sm"
      />
      <h2 className="text-2xl font-bold text-gray-900 text-center">{title}</h2>
      <div className="my-4 flex flex-row items-center justify-center gap-4">
        <p className="text-gray-500 text-center mb-3">{genre} </p>
        <p className="text-gray-500 text-center mb-3">{age} {t("humanCard.labels.years")} </p>
        <p className="text-gray-500 text-center mb-3">{size} {t("humanCard.labels.cm")}</p>
      </div>

      <p className="mb-4 rounded-full bg-red-100 px-4 py-1 text-sm font-medium text-red-700 border border-red-200 inline-block">
        {getTranslatedPersonality(personality)}
      </p>

      <p className="text-gray-700 text-sm leading-relaxed mb-4 text-center">
        {description}
      </p>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <h3 className="text-md font-semibold text-gray-800 mb-2">{t("humanCard.labels.whyTakeMe")}</h3>
        <p className="text-gray-600 text-sm leading-snug">{search}</p>
      </div>

      {/* Toggle abonnement/achat unique */}
      <div className="flex items-center justify-center gap-3 mt-4">
        <span className={`text-sm ${isMonthly ? "text-gray-900 font-medium" : "text-gray-400"}`}>
          {t("humanCard.labels.perMonth")}
        </span>
        <button
          onClick={() => setIsMonthly(!isMonthly)}
          className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
            isMonthly ? "bg-blue-500" : "bg-green-300"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
              isMonthly ? "translate-x-0" : "translate-x-6"
            }`}
          />
        </button>
        <span className={`text-sm ${!isMonthly ? "text-gray-900 font-medium" : "text-gray-400"}`}>
          {t("humanCard.labels.oneTime")}
        </span>
      </div>

      {/* Prix affiché */}
      <div className="mt-4 text-center">
        <span className="text-xl font-bold text-gray-900">
          {!isMonthly ? prix * 12 : prix} €
        </span>
        <span className="text-sm text-gray-500">
          {isMonthly ? t("humanCard.IsMonthly.month") : t("humanCard.IsMonthly.year")}
        </span>
      </div>

      {/* Bouton ajouter au panier */}
      <div className="mt-6 text-center">
        <button
          onClick={handleAddToCart}
          disabled={isAlreadyInCart}
          className={`w-full font-semibold py-2 px-4 rounded-lg transition-colors duration-300 ${
            isAlreadyInCart
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : "bg-[#ff6b6b] hover:bg-[#ff5252] text-white"
          }`}
        >
          {isAlreadyInCart 
            ? t("humanCard.labels.alreadyInCart", "Déjà dans le panier")
            : t("humanCard.labels.addToCart")
          }
        </button>
      </div>
        {/* Modal */}
      {showModal && (
        <div className="fixed top-4 right-4 z-50">
          <div className={`bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full text-center animate-fadeIn border-l-4 ${
            modalType === "success" ? "border-green-500" : "border-red-500"
          }`}>
            <h2 className={`text-xl font-bold mb-2 ${
              modalType === "success" ? "text-green-600" : "text-red-600"
            }`}>
              {modalType === "success" ? "✓" : "⚠"} {modalMessage}
            </h2>
            {modalType === "success" && (
              <p className="text-gray-600 mb-4">
                {title} - {isMonthly ? `${prix}€ / mois` : `${prix * 12}€ en une fois`}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
