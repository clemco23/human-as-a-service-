const currentYear = new Date().getFullYear();      

export default function FooterWithSocialMediaLinks() {
    return (
    <footer className="w-full mt-auto bg-[#2C3E50] text-white py-8">
    <div className="w-full">
        <div className="mx-auto max-w-7xl px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
            <h3 className="text-xl font-bold mb-2">PawMatch</h3>
            <p className="text-gray-300">Où les chats choisissent leurs humains</p>
            </div>
            <div>
            <h4 className="text-lg font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2">
                <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Accueil</a></li>
                <li><a href="/search" className="text-gray-300 hover:text-white transition-colors">Chats disponibles</a></li>
                <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">À propos</a></li>
                <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
            </div>
            <div>
            <h4 className="text-lg font-semibold mb-4">Suivez-nous</h4>
            <div className="flex gap-4">
            </div>
            </div>
        </div>
        <div className="border-t border-gray-600 mt-8 pt-4 text-center">
            <p className="text-gray-300">&copy; {currentYear} PawMatch. Tous droits réservés.</p>
        </div>
        </div>
    </div>
    </footer>
    );
}