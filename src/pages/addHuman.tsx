import { useState, useEffect } from "react";
import Button from "../components/atoms/button";
import { db } from "../firebase-config";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function AddHuman() {
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

        alert("Humain ajouté avec succès ✅");

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
        alert("Échec de l’ajout ❌ (voir console)");
    }
};

    return (
        <section className="page py-12 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            Ajouter un nouvel humain
                        </h1>
                        <p className="text-gray-600">
                            Aidez un humain à trouver son chat parfait en remplissant ce
                            formulaire
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Nom */}
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Nom complet
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                placeholder="Ex: Jean Dupont"
                            />
                        </div>

                        {/* Âge et Taille */}
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label
                                    htmlFor="age"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Âge
                                </label>
                                <input
                                    type="number"
                                    id="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    placeholder="Ex: 25"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="size"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Taille (cm)
                                </label>
                                <input
                                    type="number"
                                    id="size"
                                    value={formData.size}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    placeholder="Ex: 175"
                                />
                            </div>
                        </div>

                        {/* Genre */}
                        <div>
                            <label
                                htmlFor="genre"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Genre
                            </label>
                            <select
                                id="genre"
                                value={formData.genre}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                            >
                                <option value="">Sélectionner un genre</option>
                                <option value="M">Homme</option>
                                <option value="F">Femme</option>
                            </select>
                        </div>

                        {/* Personnalité */}
                        <div>
                            <label
                                htmlFor="personality"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Personnalité
                            </label>
                            <select
                                id="personality"
                                value={formData.personality}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                            >
                                <option value="">Sélectionner une personnalité</option>
                                <option value="Calme">Calme</option>
                                <option value="Aventureux">Aventureux</option>
                                <option value="Familial">Familial</option>
                                <option value="Sportif">Sportif</option>
                                <option value="Travailleur">Travailleur</option>
                            </select>
                        </div>

                        {/* Description */}
                        <div>
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                placeholder="Décrivez cet humain..."
                            />
                        </div>

                        {/* Search */}
                        <div>
                            <label
                                htmlFor="search"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Pourquoi me prendre ? (mots-clés)
                            </label>
                            <input
                                type="text"
                                id="search"
                                value={formData.search}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                placeholder="Ex: calme, sportif, joueur"
                            />
                        </div>

                        {/* Image */}
                        <div>
                            <label
                                htmlFor="image"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                URL de l'image
                            </label>
                            <input
                                type="text"
                                id="image"
                                value={formData.image}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                placeholder="https://exemple.com/photo.jpg"
                            />
                        </div>

                        {/* Prix */}
                        <div>
                            <label
                                htmlFor="prix"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Prix (€)
                            </label>
                            <input
                                type="number"
                                id="prix"
                                value={formData.prix}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                placeholder="Ex: 250"
                            />
                        </div>

                        {/* Boutons */}
                        <div className="flex gap-4 pt-6">
                            <Button size="large" color="primary" type="submit">
                                Ajouter cet humain
                            </Button>

                            <Button size="large" color="transparent" type="button" href="/search">
                                Annuler
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

