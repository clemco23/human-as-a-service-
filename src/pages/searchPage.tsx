import { useState } from "react";
import CardsPart from '../components/organismes/cardsPart';
import Data from '../data/human/dataHuman.json';

export default function SearchPage() {
  const [ageRange, setAgeRange] = useState<string>("");
  const [personality, setPersonality] = useState<string>("");

  const getAgeFilter = () => {
    switch (ageRange) {
      case "10-20":
        return (age: number) => age >= 10 && age <= 20;
      case "20-30":
        return (age: number) => age > 20 && age <= 30;
      case "30-50":
        return (age: number) => age > 30 && age <= 50;
      case "50-60":
        return (age: number) => age > 50 && age <= 60;
      case "60+":
        return (age: number) => age > 60;
      default:
        return () => true;
    }
  };

  const getPersonalityFilter = () => {
    if (!personality) return () => true;
    return (personalityValue: string) => personalityValue === personality;
  };

  const filteredData = Data
    .filter(person => getAgeFilter()(person.age))
    .filter(person => getPersonalityFilter()(person.personality));

  return (
    <div>
      <div className='text-center my-10'>
        <h1 className='text-3xl font-bold mb-4'>Nos humains en recherche</h1>
        <p className='text-xs text-gray-600'>Découvrez les adorables humains qui cherchent leur félin parfait</p>

        <div className="mt-6">
          <label className="mr-2 text-sm font-medium text-gray-700">Tranches d'âges:</label>
          <select
            value={ageRange}
            onChange={e => setAgeRange(e.target.value)}
            className="border rounded px-4 py-2 text-sm"
          >
            <option value="">Toutes les tranches</option>
            <option value="10-20">10-20 ans</option>
            <option value="20-30">20-30 ans</option>
            <option value="30-50">30-50 ans</option>
            <option value="50-60">50-60 ans</option>
            <option value="60+">60 ans et plus</option>
          </select>
        </div>

        <div className="mt-6">
          <label className="mr-2 text-sm font-medium text-gray-700">Personnalité:</label>
          <select
            value={personality}
            onChange={e => setPersonality(e.target.value)}
            className="border rounded px-4 py-2 text-sm"
          >
            <option value="">Toutes les personnalités</option>
            <option value="Calme">Calme</option>
            <option value="Aventureux">Aventureux</option>
            <option value="Familial">Familial</option>
            <option value="Sportif">Sportif</option>
            <option value="Travailleur">Travailleur</option>
          </select>
        </div>
      </div>

      <CardsPart data={filteredData} />
    </div>
  );
}
