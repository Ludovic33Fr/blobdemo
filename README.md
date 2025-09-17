# Blob Demo - Simulation de Croissance de Blob

Une simulation interactive de croissance de blob utilisant Next.js, TypeScript et Canvas. Le blob se développe de manière organique en suivant des gradients d'attraction vers la nourriture tout en évitant les zones de poison.

## 🎯 Fonctionnalités

- **Simulation de blob intelligente** : Le blob se développe de manière organique sur une grille en suivant des gradients d'attraction
- **3 types de nœuds** :
  - 🔵 **Blob** : Point de départ et d'ancrage pour le développement du réseau
  - 🍎 **Nourriture** : Attire le blob (force positive) - le réseau grandit vers ces nœuds
  - ☠️ **Poison** : Répulse le blob (force négative) - le réseau évite ces zones
- **Interface interactive** : 
  - Contrôles en temps réel pour ajouter des nœuds et ajuster les paramètres
  - **Suppression par clic** : Cliquez sur n'importe quel nœud pour le supprimer
- **Rendu en temps réel** : Visualisation des tubes de blob, des flux et de la grille
- **Algorithme de gradient** : Le blob suit intelligemment les gradients d'attraction vers la nourriture

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
   - Cliquez sur le bouton 🔵 pour ajouter un nœud blob (point de départ)
   - Cliquez sur le bouton 🍎 pour ajouter de la nourriture (cible d'attraction)
   - Cliquez sur le bouton ☠️ pour ajouter du poison (zone à éviter)

2. **Supprimer des nœuds** :
   - **Cliquez directement sur n'importe quel nœud** pour le supprimer
   - Observez comment le réseau blob s'adapte automatiquement

3. **Contrôles de simulation** :
   - ▶️ **Play/Pause** : Démarrer/arrêter la simulation
   - 🔄 **Reset** : Réinitialiser la simulation

4. **Paramètres ajustables** :
   - **dt** : Vitesse de simulation
   - **Exploration (bruit)** : Niveau d'exploration aléatoire
   - **Poids Blob** : Influence des nœuds blob sur la croissance

## 🧠 Algorithme

La simulation utilise un système sophistiqué de gradients et de flux :

- **Gradients d'attraction** : Calcul des champs d'attraction vers les nœuds nourriture
- **Potentiels** : Calcul des champs de potentiel basés sur les nœuds (nourriture, poison, blob)
- **Conductances** : Gestion des connexions entre cellules de la grille (horizontal/vertical)
- **Flux** : Calcul des flux de matière à travers les connexions
- **Croissance intelligente** : Le blob grandit uniquement depuis les nœuds blob vers les nœuds nourriture
- **Évitement** : Le blob évite naturellement les zones de poison
- **Adaptation** : Le réseau s'adapte en temps réel aux changements (ajout/suppression de nœuds)

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