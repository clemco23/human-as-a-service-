import { useState } from 'react';
import Button from '../components/atoms/button';

export default function AddHuman() {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        genre: '',
        personality: '',
        description: '',
        hobbies: '',
        location: '',
        image: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Logique d'ajout à implémenter plus tard
        console.log('Nouvel humain à ajouter:', formData);
        alert('Humain ajouté avec succès ! 🐱');
        setFormData({
            name: '',
            age: '',
            genre: '',
            personality: '',
            description: '',
            hobbies: '',
            location: '',
            image: ''
        });
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
                            Aidez un humain à trouver son chat parfait en remplissant ce formulaire
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Nom complet
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                                    placeholder="Ex: Jean Dupont"
                                />
                            </div>

                            <div>
                                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                                    Âge
                                </label>
                                <input
                                    type="number"
                                    id="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    required
                                    min="18"
                                    max="100"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                                    placeholder="Ex: 25"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-2">
                                    Genre
                                </label>
                                <select
                                    id="genre"
                                    value={formData.genre}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                                >
                                    <option value="">Sélectionner un genre</option>
                                    <option value="M">Homme</option>
                                    <option value="F">Femme</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="personality" className="block text-sm font-medium text-gray-700 mb-2">
                                    Personnalité
                                </label>
                                <select
                                    id="personality"
                                    value={formData.personality}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                                >
                                    <option value="">Sélectionner une personnalité</option>
                                    <option value="Calme">Calme</option>
                                    <option value="Aventureux">Aventureux</option>
                                    <option value="Familial">Familial</option>
                                    <option value="Sportif">Sportif</option>
                                    <option value="Travailleur">Travailleur</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                                Localisation
                            </label>
                            <input
                                type="text"
                                id="location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                                placeholder="Ex: Paris, France"
                            />
                        </div>

                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                                URL de la photo
                            </label>
                            <input
                                type="url"
                                id="image"
                                value={formData.image}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                                placeholder="https://exemple.com/photo.jpg"
                            />
                        </div>

                        <div>
                            <label htmlFor="hobbies" className="block text-sm font-medium text-gray-700 mb-2">
                                Hobbies et centres d'intérêt
                            </label>
                            <input
                                type="text"
                                id="hobbies"
                                value={formData.hobbies}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                                placeholder="Ex: Lecture, jardinage, cuisine"
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                id="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                                placeholder="Décrivez cet humain et ce qu'il recherche chez un chat..."
                            />
                        </div>

                        <div className="flex gap-4 pt-6">
                            <Button
                                size="large"
                                color="primary"
                                onClick={() => {}}
                            >
                                Ajouter cet humain
                            </Button>
                            
                            <Button
                                size="large"
                                color="transparent"
                                href="/search"
                            >
                                Annuler
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
