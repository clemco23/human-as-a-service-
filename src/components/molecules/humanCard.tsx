type Props = {
  image?: string;
  title: string;
  age: number;
  personality: string;
  description: string;
  search: string;
}

export default function HumanCard({ image, title, age, personality, description, search }: Props) {
  return (
    <div className="max-w-sm mx-auto bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
     
      
        <img
          src={image}
          alt={title}
          className="w-28 h-28 rounded-full object-cover mx-auto mb-4 border-4 border-gray-200 shadow-sm"
        />
      
      <h2 className="text-2xl font-bold text-gray-900 text-center">{title}</h2>
      <p className="text-gray-500 text-center mb-3">{age} ans</p>

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
    </div>
  )
}
