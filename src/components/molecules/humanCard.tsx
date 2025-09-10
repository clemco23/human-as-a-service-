import { useState } from "react";

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
}

export default function HumanCard({ id, image, title, age, personality, description, search, genre, size, prix }: Props) {
  console.log(id);
  const [isMonthly, setIsMonthly] = useState(true);

  const handleAddToCart = () => {
    console.log(
      `Ajouté au panier : ${title} (${isMonthly ? "Par mois" : "Achat unique"})`
    );
    alert(`${title} a été ajouté au panier ! (${isMonthly ? `${prix}€ / mois` : `${prix * 12}€ en une fois`})`);

  };
  return (
    <div className="max-w-sm mx-auto bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">


      <p className="text-gray-500  mb-3">{id}</p>
      <img
        src={image}
        alt={title}
        className="w-28 h-28 rounded-full object-cover mx-auto mb-4 border-4 border-gray-200 shadow-sm"
      />
      <h2 className="text-2xl font-bold text-gray-900 text-center">{title}</h2>
      <div className="my-4 flex flex-row items-center justify-center gap-4">
        <p className="text-gray-500 text-center mb-3">{genre} </p>
        <p className="text-gray-500 text-center mb-3">{age} ans </p>
        <p className="text-gray-500 text-center mb-3">{size} cm</p>
      </div>

      <p className="mb-4 rounded-full bg-red-100 px-4 py-1 text-sm font-medium text-red-700 border border-red-200 inline-block">
        {personality}
      </p>

      <p className="text-gray-700 text-sm leading-relaxed mb-4 text-center">
        {description}
      </p>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <h3 className="text-md font-semibold text-gray-800 mb-2">Pourquoi me prendre :</h3>
        <p className="text-gray-600 text-sm leading-snug">{search}</p>
      </div>
      <div className="flex items-center justify-center gap-3 mt-4">
        <span className={`text-sm ${isMonthly ? "text-gray-900 font-medium" : "text-gray-400"}`}>
          Par mois
        </span>
        <button
          onClick={() => setIsMonthly(!isMonthly)}
          className={`w-12 h-6 flex items-center rounded-full p-1 transition ${isMonthly ? "bg-blue-500" : "bg-green-300"
            }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${isMonthly ? "translate-x-0" : "translate-x-6"
              }`}
          />
        </button>
        <span className={`text-sm ${!isMonthly ? "text-gray-900 font-medium" : "text-gray-400"}`}>
          Achat unique
        </span>
      </div>


      <div className="mt-4 text-center">
        <span className="text-xl font-bold text-gray-900"> {!isMonthly ? prix * 12 : prix} €</span>
        <span className="text-sm text-gray-500">
          {isMonthly ? " / mois" : " en une fois"}
        </span>
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  )
}
