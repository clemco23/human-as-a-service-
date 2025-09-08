
export default function Contact() {
    return (
        <section id="contact" className="page py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                  <h1 className="text-3xl font-bold mb-8 ">Miaulez-Nous</h1>
                <div className="contact-content max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
                  
                    <div className="contact-info grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <div className="contact-card flex flex-col items-center bg-gray-100 rounded-lg p-6">
                            <i className="fas fa-envelope text-2xl text-blue-500 mb-2"></i>
                            <h3 className="font-semibold text-lg mb-1">Catmail</h3>
                            <p className="text-gray-700">catmail@pawmatch.fr</p>
                        </div>
                        <div className="contact-card flex flex-col items-center bg-gray-100 rounded-lg p-6">
                            <i className="fas fa-phone text-2xl text-green-500 mb-2"></i>
                            <h3 className="font-semibold text-lg mb-1">Télécat</h3>
                            <p className="text-gray-700">01 23 45 67 89</p>
                        </div>
                        <div className="contact-card flex flex-col items-center bg-gray-100 rounded-lg p-6">
                            <i className="fas fa-map-marker-alt text-2xl text-red-500 mb-2"></i>
                            <h3 className="font-semibold text-lg mb-1">Coussin</h3>
                            <p className="text-gray-700 text-center">123 Rue des Chats<br />75001 Paris</p>
                        </div>
                    </div>
                    
                    <form className="contact-form space-y-6">
                        <div className="form-group">
                            <label htmlFor="name" className="block font-medium mb-1">Nom</label>
                            <input
                                type="text"
                                id="name"
                                required
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className="block font-medium mb-1">Catmail</label>
                            <input
                                type="email"
                                id="email"
                                required
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message" className="block font-medium mb-1">Miaulement</label>
                            <textarea
                                id="message"
                                rows={5}
                                required
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
                        >
                            Miauler
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}