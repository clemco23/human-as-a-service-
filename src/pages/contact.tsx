import { useState } from 'react';
import { FaEnvelope, FaPhone, FaCat } from "react-icons/fa";
import emailjs from '@emailjs/browser';
import {useTranslation} from "react-i18next";

export default function Contact() {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus('');

        try {
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    message: formData.message,
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );
            
            setStatus(t('contact.form.success'));
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Erreur EmailJS:', error);
            setStatus('Erreur lors de l\'envoi. Réessayez plus tard.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="contact" className="page py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="contact-content max-w-3xl mx-auto bg-red rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold mb-8">{t('contact.title')}</h1>
                    
                    <div className="contact-info grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <div className="contact-card flex flex-col items-center bg-gray-200 rounded-lg p-6">
                            <FaEnvelope className="text-2xl text-red-500 mb-2" />
                            <h3 className="font-semibold text-lg mb-1">Catmail</h3>
                            <p className="text-gray-700">{t('contact.info.email')}</p>
                        </div>
                        <div className="contact-card flex flex-col items-center bg-gray-200 rounded-lg p-6">
                            <FaPhone className="text-2xl text-red-500 mb-2" />
                            <h3 className="font-semibold text-lg mb-1">Télécat</h3>
                            <p className="text-gray-700">{t('contact.info.phone')}</p>
                        </div>
                        <div className="contact-card flex flex-col items-center bg-gray-200 rounded-lg p-6">
                            <FaCat className="text-2xl text-red-500 mb-2" />
                            <h3 className="font-semibold text-lg mb-1">Coussin</h3>
                            <p className="text-gray-700 text-center" dangerouslySetInnerHTML={{__html: t('contact.info.address')}}></p>
                        </div>
                    </div>
                    
                    <form className="contact-form space-y-6" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name" className="block font-medium mb-1">{t('contact.form.name')}</label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className="block font-medium mb-1">{t('contact.form.email')}</label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message" className="block font-medium mb-1">{t('contact.form.message')}</label>
                            <textarea
                                id="message"
                                rows={5}
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn btn-primary w-full bg-red-400 text-white font-semibold py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {isLoading ? 'Envoi en cours...' : t('contact.form.submit')}
                        </button>
                        
                        {status && (
                            <p className={`text-center mt-4 ${status.includes('succès') || status.includes('Miaouuu') ? 'text-green-600' : 'text-red-600'}`}>
                                {status}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}