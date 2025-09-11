import { useTranslation } from "react-i18next";

const currentYear = new Date().getFullYear();      

export default function FooterWithSocialMediaLinks() {
    const { t } = useTranslation();

    return (
    <footer className="w-full bg-[#2C3E50] text-white py-8">
    <div className="w-full">
        <div className="mx-auto max-w-7xl px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
            <h3 className="text-xl font-bold mb-2">{t("footer.title")}</h3>
            <p className="text-gray-300">{t("footer.subtitle")}</p>
            </div>
            <div>
            <h4 className="text-lg font-semibold mb-4">{t("footer.linkTitle")}</h4>
            <ul className="space-y-2">
                <li><a href="/" className="text-gray-300 hover:text-white transition-colors">{t("footer.linkDescription.navHome")}</a></li>
                <li><a href="/search" className="text-gray-300 hover:text-white transition-colors">{t("footer.linkDescription.navCats")}</a></li>
                <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">{t("footer.linkDescription.navAbout")}</a></li>
                <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors">{t("footer.linkDescription.navContact")}</a></li>
            </ul>
            </div>
            <div>
            <h4 className="text-lg font-semibold mb-4">{t("footer.linkTitle")}</h4>
            <div className="flex gap-4">
            </div>
            </div>
        </div>
        <div className="border-t border-gray-600 mt-8 pt-4 text-center">
            <p className="text-gray-300">&copy; {currentYear} {t("footer.copyright")}</p>
        </div>
        </div>
    </div>
    </footer>
    );
}