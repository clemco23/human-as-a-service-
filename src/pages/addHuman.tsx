import { useState, useEffect } from "react";
import Button from "../components/atoms/button";
import { db } from "../firebase-config";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useTranslation } from "react-i18next";

export default function AddHuman() {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        title: "",
        age: "",
        genre: "",
        size: "",
        personality: "",
        description: "",
        search: "",
        image: "",
        prix: "",
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };
    const [Data, setData] = useState<unknown[]>([]);
    useEffect(() => { const fetchHumans = async () => { try { const snapshot = await getDocs(collection(db, "products")); const humans = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); setData(humans); } catch (error) { console.error("Erreur récupération Firestore :", error); } }; fetchHumans(); }, []);

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        
        const snapshot = await getDocs(collection(db, "products"));
        const nextId = snapshot.size + 1; 

        
        await addDoc(collection(db, "products"), {
            id: nextId,
            ...formData,
            age: Number(formData.age),
            size: Number(formData.size),
            prix: Number(formData.prix),
            createdAt: new Date(),
        });

        alert(t("addHuman.messages.success"));

        setFormData({
            title: "",
            age: "",
            genre: "",
            size: "",
            personality: "",
            description: "",
            search: "",
            image: "",
            prix: "",
        });
    } catch (error) {
        console.error("Erreur lors de l’ajout :", error);
        alert(t("addHuman.messages.error"));
    }
};

    return (
        <section className="page py-12 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            {t("addHuman.title")}
                        </h1>
                        <p className="text-gray-600">
                            {t("addHuman.subtitle")}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Nom */}
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                {t("addHuman.form.name")}
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                placeholder={t("addHuman.form.namePlaceholder")}
                            />
                        </div>

                        {/* Âge et Taille */}
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label
                                    htmlFor="age"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    {t("addHuman.form.age")}
                                </label>
                                <input
                                    type="number"
                                    id="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    placeholder={t("addHuman.form.agePlaceholder")}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="size"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    {t("addHuman.form.size")}
                                </label>
                                <input
                                    type="number"
                                    id="size"
                                    value={formData.size}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    placeholder={t("addHuman.form.sizePlaceholder")}
                                />
                            </div>
                        </div>

                        {/* Genre */}
                        <div>
                            <label
                                htmlFor="genre"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                {t("addHuman.form.gender")}
                            </label>
                            <select
                                id="genre"
                                value={formData.genre}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                            >
                                <option value="">{t("addHuman.form.genderPlaceholder")}</option>
                                <option value="M">{t("addHuman.form.genderOptions.male")}</option>
                                <option value="F">{t("addHuman.form.genderOptions.female")}</option>
                            </select>
                        </div>

                        {/* Personnalité */}
                        <div>
                            <label
                                htmlFor="personality"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                {t("addHuman.form.personality")}
                            </label>
                            <select
                                id="personality"
                                value={formData.personality}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                            >
                                <option value="">{t("addHuman.form.personalityPlaceholder")}</option>
                                <option value="Calme">{t("addHuman.form.personalityOptions.calm")}</option>
                                <option value="Aventureux">{t("addHuman.form.personalityOptions.adventurous")}</option>
                                <option value="Familial">{t("addHuman.form.personalityOptions.family")}</option>
                                <option value="Sportif">{t("addHuman.form.personalityOptions.sporty")}</option>
                                <option value="Travailleur">{t("addHuman.form.personalityOptions.worker")}</option>
                            </select>
                        </div>

                        {/* Description */}
                        <div>
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                {t("addHuman.form.description")}
                            </label>
                            <textarea
                                id="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                placeholder={t("addHuman.form.descriptionPlaceholder")}
                            />
                        </div>

                        {/* Search */}
                        <div>
                            <label
                                htmlFor="search"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                {t("addHuman.form.search")}
                            </label>
                            <input
                                type="text"
                                id="search"
                                value={formData.search}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                placeholder={t("addHuman.form.searchPlaceholder")}
                            />
                        </div>

                        {/* Image */}
                        <div>
                            <label
                                htmlFor="image"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                {t("addHuman.form.image")}
                            </label>
                            <input
                                type="text"
                                id="image"
                                value={formData.image}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                placeholder={t("addHuman.form.imagePlaceholder")}
                            />
                        </div>

                        {/* Prix */}
                        <div>
                            <label
                                htmlFor="prix"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                {t("addHuman.form.price")}
                            </label>
                            <input
                                type="number"
                                id="prix"
                                value={formData.prix}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                placeholder={t("addHuman.form.pricePlaceholder")}
                            />
                        </div>

                        {/* Boutons */}
                        <div className="flex gap-4 pt-6">
                            <Button size="large" color="primary" type="submit">
                                {t("addHuman.form.submit")}
                            </Button>

                            <Button size="large" color="transparent" type="button" href="/search">
                                {t("addHuman.form.cancel")}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

