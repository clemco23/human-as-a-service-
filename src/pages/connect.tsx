import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useTranslation } from "react-i18next";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
   
      navigate("/");
    } catch (err: any) {
      setError(t("login.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="login" className="page py-16 max-w-lg mx-auto">
      <div className="container mx-auto px-4">
        <div className="contact-content max-w-3xl mx-auto bg-red rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-3 text-center">
            {t("login.title")}
          </h1>
          <p className="text-center text-slate-500 mb-8">
            {t("login.subtitle")}
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && <p className="text-red-500 text-center">{error}</p>}

            <div>
              <label htmlFor="email" className="block font-medium mb-1">
                {t("login.form.email")}
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label htmlFor="password" className="block font-medium mb-1">
                {t("login.form.password")}
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember" className="text-sm">
                  {t("login.form.remember")}
                </label>
              </div>
              <a
                href="#"
                className="text-red-400 font-bold text-sm"
              >
                {t("login.form.forgotPassword")}
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-400 text-white font-semibold py-2 rounded hover:bg-red-600 transition"
            >
              {loading ? t("login.form.loading") : t("login.form.submit")}
            </button>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                <a href="/register" className="text-red-400 font-bold">
                  {t("login.form.createAccount")}
                </a>
              </p>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t bg-gray-100 rounded-xl border-gray-100 p-8">
            <h3 className="text-lg font-semibold mb-4 text-center">
              {t("login.benefits.title")}
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              {(t("login.benefits.items", { returnObjects: true }) as string[]).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
