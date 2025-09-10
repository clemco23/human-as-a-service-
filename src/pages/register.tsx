import { useState } from "react";
import { auth, db } from "../firebase-config";
import { createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Les clés ne correspondent pas 🐾");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Création utilisateur dans Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // 2️⃣ Mise à jour du displayName
      await updateProfile(userCredential.user, { displayName: name });

      // 3️⃣ Création du document Firestore
      const userDocRef = doc(db, "users", userCredential.user.uid);
      await setDoc(userDocRef, {
        name,
        email,
        createdAt: serverTimestamp(),
      });
      console.log("Utilisateur ajouté dans Firestore ✅", userDocRef.id);

      // 4️⃣ Déconnexion immédiate pour ne pas rester connecté
      await signOut(auth);

      // 5️⃣ Redirection vers la page de connexion
      navigate("/connect");
    } catch (err: any) {
      console.error("Erreur création utilisateur:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page py-16 max-w-lg mx-auto">
      <div className="container mx-auto px-4">
        <div className="contact-content max-w-3xl mx-auto bg-red-400 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-3 text-center">Créer votre chatière</h1>
          <p className="text-center text-slate-50 mb-8">
            Inscrivez-vous pour rejoindre la communauté féline
          </p>

          <form onSubmit={handleRegister} className="space-y-6">
            {error && <p className="text-red-500 text-center">{error}</p>}

            <div>
              <label className="block font-medium mb-1">Nom de chatière</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Catmail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Clé de chatière</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Confirmez la clé</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white font-semibold py-2 rounded hover:bg-red-700 transition"
            >
              {loading ? "Création en cours..." : "Créer ma chatière"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
