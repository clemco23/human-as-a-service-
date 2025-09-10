type CartHumanItemProps = {
  id: number;
  title: string;
  image?: string;
  age: number;
  genre: string;
  size: number;
  personality: string;
  price: number;
  isMonthly: boolean;
  quantity?: number;
};

export default function CartItem({
  id,
  title,
  image,
  age,
  genre,
  size,
  personality,
  price,
  isMonthly,
}: CartHumanItemProps) {

  return (
    <div className="flex items-center gap-4 border-b border-gray-200 py-4">
      <img
        src={image}
        alt={title}
        className="w-20 h-20 rounded-full object-cover border border-gray-300"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">
          {genre}, {age} ans, {size} cm
        </p>
        <p className="text-sm text-red-700 font-medium">{personality}</p>
      </div>
      <div className="flex flex-col items-end gap-2">
        
        <span className="text-lg font-bold text-gray-800">
          {price } €
        </span>
        <span className="text-sm text-gray-500">
          {isMonthly ? "par mois" : "en une fois"}
        </span>
      </div>
    </div>
  );
}
