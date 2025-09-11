import { useState, useEffect } from "react";
import CardsPart from '../components/organismes/cardsPart';
import Button from '../components/atoms/button';
import { db } from '../firebase-config';
import { collection, getDocs } from "firebase/firestore";
import { useTranslation } from "react-i18next";
// import { useCart } from "../contexts/CartContext"; // supprimé car inutilisé
type Person = {
  title: string;
  genre: string;
  size: number;
  age: number;
  personality: string;
  description: string;
  search: string;
  image: string;
  id: number ; 
  prix: number;
};
export default function SearchPage() {
  const [ageRange, setAgeRange] = useState<string>("");
  const [personality, setPersonality] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const { t } = useTranslation();


  const [Data, setData] = useState<Person[]>([]);

  useEffect(() => {
    const fetchHumans = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const humans = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: Number(doc.id),
            genre: data.genre,
            size: data.size,
            age: data.age,
            personality: data.personality,
            description: data.description,
            search: data.search,
            image: data.image,
            prix: data.prix,
          } as Person;
        });
        setData(humans);
      } catch (error) {
        console.error("Erreur récupération Firestore :", error);
      }
    };

    fetchHumans();
  }, []);

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

  const getGenreFilter = () => {
    if (!genre) return () => true;
    return (genreValue: string) => genreValue === genre;
  }

  const filteredData = Data
    .filter(person => getAgeFilter()(person.age))
    .filter(person => getPersonalityFilter()(person.personality))
    .filter(person => getGenreFilter()(person.genre));

  return (
    <div>
      <div className='text-center my-10 mb-8'>
        <h1 className='text-3xl font-bold mb-4'>{t("searchPage.title")}</h1>
        <p className='text-xs text-gray-600'>{t("searchPage.subtitle")}</p>
        <div className="flex flex-row justify-center gap-6 mt-4 flex-wrap">

          <div className="mt-6">
            <label className="mr-2 text-sm font-medium text-gray-700">{t("searchPage.age.title")}</label>
            <select value={ageRange} onChange={e => setAgeRange(e.target.value)} className="border rounded px-4 py-2 text-sm">
              <option value="">{t("searchPage.age.subtitle")}</option>
              <option value="10-20">{t("searchPage.age.options1")}</option>
              <option value="20-30">{t("searchPage.age.options2")}</option>
              <option value="30-50">{t("searchPage.age.options3")}</option>
              <option value="50-60">{t("searchPage.age.options4")}</option>
              <option value="60+">{t("searchPage.age.options5")}</option>
            </select>
          </div>

          <div className="mt-6">
            <label className="mr-2 text-sm font-medium text-gray-700">{t("searchPage.personality.title")}</label>
            <select value={personality} onChange={e => setPersonality(e.target.value)} className="border rounded px-4 py-2 text-sm">
              <option value="">{t("searchPage.personality.subtitle")}</option>
              <option value="Calme">{t("searchPage.personality.options1")}</option>
              <option value="Aventureux">{t("searchPage.personality.options2")}</option>
              <option value="Familial">{t("searchPage.personality.options3")}</option>
              <option value="Sportif">{t("searchPage.personality.options4")}</option>
              <option value="Travailleur">{t("searchPage.personality.options5")}</option>
            </select>
          </div>

          <div className="mt-6">
            <label className="mr-2 text-sm font-medium text-gray-700">{t("searchPage.gender.title")}</label>
            <select value={genre} onChange={e => setGenre(e.target.value)} className="border rounded px-4 py-2 text-sm">
              <option value="">{t("searchPage.gender.options1")}</option>
              <option value="M">{t("searchPage.gender.options2")}</option>
              <option value="F">{t("searchPage.gender.options3")}</option>
            </select>
          </div>

          <div className="mt-8">
            <Button size="medium" color="primary" href="/add-human">{t("searchPage.addHuman.title")}</Button>
          </div>
        </div>
      </div>

      {/* On passe addToCart à CardsPart */}
      <CardsPart data={filteredData} />
    </div>
  );
}
