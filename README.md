# Blob Demo - Simulation de Croissance de Blob

Une simulation interactive de croissance de blob utilisant Next.js, TypeScript et Canvas.

## 🎯 Fonctionnalités

- **Simulation de blob** : Le blob se développe de manière organique sur une grille
- **3 types de nœuds** :
  - 🔵 **Blob** : Point de départ et d'ancrage pour le développement
  - 🍎 **Nourriture** : Attire le blob (force positive)
  - ☠️ **Poison** : Répulse le blob (force négative)
- **Interface interactive** : Contrôles en temps réel pour ajouter des nœuds et ajuster les paramètres
- **Rendu en temps réel** : Visualisation des tubes de blob et des flux

## 🚀 Installation

### Prérequis
- Node.js 18.18.0 ou plus récent
- npm ou yarn

### Installation des dépendances
```bash
npm install
```

### Démarrage en développement
```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🎮 Utilisation

1. **Ajouter des nœuds** :
   - Cliquez sur le bouton 🔵 pour ajouter un nœud blob
   - Cliquez sur le bouton 🍎 pour ajouter de la nourriture
   - Cliquez sur le bouton ☠️ pour ajouter du poison

2. **Contrôles de simulation** :
   - ▶️ **Play/Pause** : Démarrer/arrêter la simulation
   - 🔄 **Reset** : Réinitialiser la simulation

3. **Paramètres ajustables** :
   - **dt** : Vitesse de simulation
   - **Exploration (bruit)** : Niveau d'exploration aléatoire
   - **Poids Blob** : Influence des nœuds blob sur la croissance

## 🧠 Algorithme

La simulation utilise :
- **Potentiels** : Calcul des champs de potentiel basés sur les nœuds
- **Conductances** : Gestion des connexions entre cellules de la grille
- **Flux** : Calcul des flux de matière à travers les connexions
- **Croissance/Décroissance** : Règles adaptatives basées sur les potentiels locaux

## 🛠️ Technologies

- **Next.js 15** : Framework React
- **TypeScript** : Typage statique
- **Tailwind CSS** : Styling
- **Zustand** : Gestion d'état
- **Canvas API** : Rendu graphique
- **Web Workers** : Calculs en arrière-plan

## 📁 Structure du projet

```
src/
├── app/                 # Pages Next.js
├── components/          # Composants React
│   ├── ui/             # Composants UI réutilisables
│   ├── CanvasViewport.tsx
│   ├── ControlsPanel.tsx
│   └── HUDStats.tsx
├── lib/
│   ├── engine/         # Moteur de simulation
│   │   ├── model.ts    # Types et interfaces
│   │   ├── fields.ts   # Calculs de champs
│   │   ├── rules.ts    # Règles de croissance
│   │   ├── solver.ts   # Résolution des potentiels
│   │   └── worker.ts   # Web Worker
│   ├── store/          # Gestion d'état Zustand
│   └── utils/          # Utilitaires
```

## 🎨 Personnalisation

Vous pouvez facilement :
- Modifier les couleurs dans `src/lib/utils/canvas.ts`
- Ajuster les paramètres par défaut dans `src/lib/store/useStore.ts`
- Ajouter de nouveaux types de nœuds dans `src/lib/engine/model.ts`

## 📝 Licence

Ce projet est sous licence MIT.