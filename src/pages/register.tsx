export default function Register() {
  return (
    <section id="register" className="page py-16 max-w-lg mx-auto">
      <div className="container mx-auto px-4">
        <div className="contact-content max-w-3xl mx-auto bg-red rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-3 text-center">Créer votre chatière</h1>
          <p className="text-center text-slate-500 mb-8">Inscrivez-vous pour rejoindre la communauté féline</p>
          <form className="contact-form space-y-6">
            <div className="form-group">
              <label htmlFor="name" className="block font-medium mb-1">Nom de chatière</label>
              <input type="text" id="name" required className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="block font-medium mb-1">Catmail</label>
              <input type="email" id="email" required className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="block font-medium mb-1">Clé de chatière</label>
              <input type="password" id="password" required className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword" className="block font-medium mb-1">Confirmez la clé</label>
              <input type="password" id="confirmPassword" required className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <button type="submit" className="btn btn-primary w-full bg-red-400 text-white font-semibold py-2 rounded hover:bg-red-600 transition">Créer ma chatière</button>
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Déjà une chatière ? <a href="/connect" className="text-red-400 font-bold">Ouvrir ma chatière</a>
              </p>
            </div>
            <div className="mt-8 pt-6 border-t bg-gray-100 rounded-xl border-gray-100 p-8">
              <h3 className="text-lg font-semibold mb-4 text-center">Pourquoi créer une chatière ?</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>🐾 Créer votre profil d'humain unique</li>
                <li>🏠 Recevoir vos profils d'humains favoris</li>
                <li>💝 Sauvegarder vos humains préférés</li>
                <li>🎯 Communiquer avec vos humains</li>
                <li>📱 Accéder à tous nos services félins</li>
              </ul>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}