```markdown
# 🐾 Human As a Service

## 📌 Description
**Human As a Service** est une plateforme web qui permet aux **chats** de choisir leurs humains parfaits 🐱➡️👤.  
Construite avec **React**, **TypeScript** et **Firebase**, elle offre une expérience fluide, moderne et sécurisée.  

## ✨ Fonctionnalités
- Création de profils pour les chats avec leurs préférences pour l’humain idéal.
- Navigation et recherche de profils d’humains disponibles.
- Gestion et stockage des données via **Firebase Firestore**.
- Panier et paiement simulé pour “adopter” un humain.
- Multilingue grâce à **react-i18next**.
- Design responsive et moderne basé sur **TailwindCSS**.

## 📂 Structure du projet
```

src/
├── components/     # Composants réutilisables (atoms, molecules, organisms)
├── pages/          # Pages principales de l’application
├── contexts/       # Contextes React (ex: Auth, Cart)
├── firebase-config.ts  # Configuration Firebase
└── App.tsx         # Point d’entrée de l’application

````

## 🛠️ Technologies utilisées
- [React](https://react.dev/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [Firebase](https://firebase.google.com/) (Auth, Firestore, Hosting)  
- [TailwindCSS](https://tailwindcss.com/)  
- [react-i18next](https://react.i18next.com/) pour la traduction  
- [Material UI](https://mui.com/) & [Material Tailwind](https://www.material-tailwind.com/)  

## 📦 Dépendances principales
```json
@emailjs/browser
@material-tailwind/react
@tailwindcss/vite
firebase
i18next
i18next-browser-languagedetector
i18next-http-backend
react
react-dom
react-i18next
react-icons
react-router
react-router-dom
tailwindcss
````

## 🚀 Scripts disponibles

* `npm run dev` → Lancer l’application en mode développement
* `npm run build` → Construire l’application pour la production
* `npm run preview` → Lancer une prévisualisation locale du build
* `npm run lint` → Vérifier la qualité du code

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour participer :

1. **Forkez** le dépôt
2. **Clonez** votre fork
3. Installez les dépendances :

   ```bash
   npm install
   ```
4. Lancez l’app en mode dev :

   ```bash
   npm run dev
   ```
5. Créez une branche, apportez vos modifications puis ouvrez une **Pull Request**.

## 📜 Licence

Ce projet est sous licence **MIT** – vous êtes libre de l’utiliser et de le modifier.

---

💡 *Human As a Service est un projet fun et créatif — aucune adoption d’humain réel n’est évidemment prévue 😉.*


