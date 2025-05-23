# 🐕🐱 Adoptions Chiens & Chats - Application MERN

Application d'adoption d'animaux développée avec MongoDB, Express, React et Node.js.

## 📝 Description technique

Cette application permet la mise en relation entre particuliers pour l'adoption de chiens et chats :

**Fonctionnalités implémentées :**
- Système d'authentification sécurisé (JWT + bcrypt)
- CRUD complet des animaux avec restriction par propriétaire
- Filtrage des animaux par espèce et sexe
- Gestion des informations de santé (vaccination, stérilisation)
- Interface responsive avec design moderne
- Redirections automatiques après connexion/inscription

**Stack technique :**
- **Backend** : Node.js + Express.js + MongoDB (Mongoose)
- **Frontend** : React 18 + React Router + Axios
- **Sécurité** : JWT pour l'authentification, bcrypt pour les mots de passe
- **Base de données** : MongoDB avec 2 collections (users, animals)
- **Styles** : CSS3 avec variables et glassmorphism

## 📁 Architecture du projet

```
adoptions-animals-mern/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── animalController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Animal.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── animals.js
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.css
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Animals.jsx
│   │   │   ├── CreateAnimal.jsx
│   │   │   ├── EditAnimal.jsx
│   │   │   ├── AnimalDetail.jsx
│   │   │   ├── Home.css
│   │   │   ├── Auth.css
│   │   │   ├── Animals.css
│   │   │   ├── AnimalForm.css
│   │   │   └── AnimalDetail.css
│   │   ├── utils/
│   │   │   ├── auth.js
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── README.md
```

## 🚀 Installation

### Prérequis
- Node.js v14+
- MongoDB v4.4+

### Étapes

1. **Cloner le repository**
```bash
git clone https://github.com/visothyouksim/TP-02-Anya-Dunel-Visoth-02.git
cd TP-02-Anya-Dunel-Visoth-02.git
```

2. **Backend**
```bash
cd backend
npm install
```

3. **Frontend**
```bash
cd ../frontend
npm install
```

4. **Configuration**

Créer `backend/.env` :
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/chatAdopt
JWT_SECRET=votre_jwt_secret_securise
```

5. **Démarrer MongoDB**
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

6. **Lancer l'application**

Terminal 1 (Backend) :
```bash
cd backend
npm start
```

Terminal 2 (Frontend) :
```bash
cd frontend
npm start
```

7. **Accès**
- Frontend : http://localhost:3000
- Backend : http://localhost:5000

## 🐾 Fonctionnalités

### 🔐 Authentification
- **Inscription** : Création de compte avec validation
- **Connexion** : Authentification sécurisée
- **Redirection automatique** vers la liste des animaux
- **Protection des routes** sensibles

### 🐕🐱 Gestion des animaux
- **Ajout d'animaux** : Formulaire complet avec validation
- **Modification/Suppression** : Réservé au propriétaire uniquement
- **Consultation** : Page détaillée pour chaque animal
- **Filtrage** : Par espèce (Chien/Chat) et sexe (Mâle/Femelle)

### 📋 Informations collectées
- **Identité** : Nom, espèce, race, âge, sexe
- **Apparence** : Couleur du pelage
- **Santé** : Statut vaccination et stérilisation
- **Adoption** : Prix, description, localisation
- **Contact** : Informations du propriétaire

### 🎨 Interface utilisateur
- **Design moderne** : Glassmorphism et dégradés
- **Responsive** : Adaptation mobile/tablet/desktop
- **Animations** : Transitions fluides
- **Badges visuels** : Distinction chiens/chats avec couleurs

## 📊 Modèle de données

### Utilisateur (User)
```javascript
{
  username: String,     // Nom d'utilisateur unique
  email: String,        // Email unique
  password: String,     // Mot de passe haché
  createdAt: Date,      // Date de création
  updatedAt: Date       // Date de modification
}
```

### Animal
```javascript
{
  name: String,         // Nom de l'animal
  species: String,      // "Chien" ou "Chat"
  breed: String,        // Race (liste prédéfinie)
  age: Number,          // Âge en années (0-25)
  gender: String,       // "Mâle" ou "Femelle"
  description: String,  // Description détaillée
  price: Number,        // Prix d'adoption
  color: String,        // Couleur du pelage
  vaccinated: Boolean,  // Statut vaccination
  sterilized: Boolean,  // Statut stérilisation
  location: String,     // Localisation
  author: ObjectId,     // Référence vers User
  createdAt: Date,      // Date de création
  updatedAt: Date       // Date de modification
}
```

## 🔧 API Endpoints

### Authentification
```http
POST /api/auth/register    # Inscription
POST /api/auth/login       # Connexion
GET  /api/auth/me         # Profil utilisateur (protégé)
```

### Animaux
```http
GET    /api/animals           # Tous les animaux
GET    /api/animals/:id       # Un animal par ID
POST   /api/animals           # Ajouter un animal (protégé)
PUT    /api/animals/:id       # Modifier un animal (protégé)
DELETE /api/animals/:id       # Supprimer un animal (protégé)
```

### Filtres disponibles
```http
GET /api/animals?species=Chien     # Filtrer par espèce
GET /api/animals?gender=Femelle    # Filtrer par sexe
GET /api/animals?breed=Labrador    # Filtrer par race
```

## 🐕 Races de chiens supportées
Labrador, Golden Retriever, Berger Allemand, Bulldog Français, Chihuahua, Rottweiler, Yorkshire Terrier, Boxer, Husky Sibérien, Border Collie, Caniche, Beagle, Shih Tzu, Cocker Spaniel, Jack Russell, Croisé, Autre

## 🐱 Races de chats supportées
Européen, Persan, Maine Coon, Siamois, British Shorthair, Ragdoll, Bengal, Abyssin, Scottish Fold, Sphynx, Chartreux, Russian Blue, Norvégien, Croisé, Autre

## 🎨 Design et couleurs

### Thème principal
- **Chiens** : Orange (#e67e22)
- **Chats** : Bleu (#3498db)
- **Fond** : Dégradé violet (#667eea → #764ba2)
- **Glassmorphism** : Transparence et flou

### Éléments visuels
- **Badges espèce** : Couleurs différenciées
- **Badges santé** : Vert (vacciné) / Violet (stérilisé)
- **Icônes** : Émojis d'animaux 🐕🐱
- **Animations** : Hover effects et transitions

## 📱 Fonctionnalités responsive

### Desktop (>768px)
- **Grid** : 3 colonnes pour les animaux
- **Sidebar** : Informations détaillées sur 2 colonnes
- **Formulaires** : 2 colonnes pour les champs

### Mobile (<768px)
- **Grid** : 1 colonne pour les animaux
- **Sidebar** : Empilage vertical
- **Formulaires** : 1 colonne pour les champs
- **Navigation** : Menu compacté

## 🔒 Sécurité

### Authentification
- **JWT** : Tokens sécurisés avec expiration
- **bcrypt** : Hachage des mots de passe (10 rounds)
- **Middleware** : Vérification des tokens sur routes protégées
- **Validation** : Données côté client et serveur

### Permissions
- **CRUD** : Seul le propriétaire peut modifier/supprimer
- **Création** : Utilisateur connecté uniquement
- **Consultation** : Libre accès pour favoriser l'adoption

## 🧪 Test de l'application

### Données d'exemple

**Utilisateur de test :**
```json
{
  "username": "animalover",
  "email": "test@adoptions.com",
  "password": "password123"
}
```

**Animal de test :**
```json
{
  "name": "Bella",
  "species": "Chien",
  "breed": "Labrador",
  "age": 3,
  "gender": "Femelle",
  "description": "Très gentille et obéissante, adore les enfants",
  "price": 150,
  "color": "Marron",
  "vaccinated": true,
  "sterilized": true,
  "location": "Paris 75001"
}
```

### Scénarios de test
1. **Inscription** → Redirection vers /animals
2. **Connexion** → Redirection vers /animals  
3. **Ajout animal** → Formulaire complet
4. **Modification** → Accès propriétaire uniquement
5. **Filtrage** → Par espèce et sexe
6. **Responsive** → Test sur mobile/tablet

## 🚀 Améliorations futures

### Version 2.0
- **Upload d'images** : Photos des animaux
- **Messagerie** : Communication propriétaire/adoptant
- **Géolocalisation** : Carte interactive
- **Favoris** : Système de wishlist
- **Notifications** : Alertes nouvelles annonces

### Version 3.0
- **Matching** : Algorithme propriétaire/animal
- **Reviews** : Système d'avis
- **Vétérinaires** : Annuaire partenaires
- **Events** : Événements d'adoption
- **Mobile App** : Application native

## 📄 Licence

Ce projet est sous licence MIT.

---

**Développé avec ❤️ pour nos amis à quatre pattes** 🐾
