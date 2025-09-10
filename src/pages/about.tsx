import { useTranslation } from "react-i18next";

export default function About() {
    const { t } = useTranslation();
    
    return (
        <section id="about" className="about-page py-20 bg-blue-50 min-h-[calc(100vh-80px)] flex items-center">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl font-extrabold text-[#ff5252] mb-8">
                        {t("about.title")}
                    </h1>
                    
                    <div className="about-text space-y-6 text-gray-700">
                        <p className="text-lg leading-relaxed">
                            {t("about.description")}
                        </p>

                        <p className="text-lg leading-relaxed">
                            {t("about.content")}
                        </p>

                        <h3 className="text-2xl font-semibold text-[#ff5252] mt-10">
                            {t("about.mission.title")}
                        </h3>
                        
                        <p className="text-lg leading-relaxed">
                            {t("about.mission.description")}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}