# Projet My Big Stats

## Description

**My Big Stats** est une application web réalisée dans le cadre du cours **JavaScript & TypeScript**. 
Elle permet de consulter et comparer des données sportives issues de trois disciplines :

- **Football**
- **Basketball**
- **MMA**

L’objectif est de manipuler le DOM en TypeScript, utilser des APIs, structurer un projet sans framework, et implémenter un mini‑router pour naviguer entre les pages.

---

## Fonctionnalités

### Page d’accueil
- Affiche les **évènements en cours et passés** (matchs / combats)

### Page des sports
- Liste des sports disponibles
- Navigation vers la page d’un sport via `#sport-ID`

### Page d’un sport
- Affichage dynamique selon l’ID du sport
- Onglets :
  - **Stats**
  - **Historique**
  - **Athlètes**
- Données filtrées automatiquement selon le sport

### Page des athlètes
- Recherche textuelle
- Filtre par sport
- Filtre par catégorie (poste / weight class)
- Affichage des cartes athlètes
- **Comparateur d’athlètes** :
  - Sélection via datalist
  - Vérification du sport
  - Comparaison stat par stat
  - Résultats formatés selon le type d’athlète

### Router
- Navigation basée sur `window.location.hash`
- Pages :
  - `#home`
  - `#sports`
  - `#sport-<id>`
  - `#athletes`

---

## Architecture du projet

```
src/
  api/
    athletes.ts
    sports.ts
    rencontres.ts
    equipes.ts
  pages/
    home.ts
    sports.ts
    sport.ts
    athletes.ts
  utils/
    types.ts
    errors.ts
  ui/
    navbar.ts
    layout.ts
router.ts
index.ts
index.html
tsconfig.json
dist/
```

## Technologies utilisées

- TypeScript
- Modules ES
- DOM API
- fetch() + async/await
- Router hash-based
- CSS simple

---

## Installation & lancement

### 1. Installer les dépendances TypeScript
```bash
npm install
```

### 2. Compiler le projet
```bash
tsc
```

### 3. Lancer un serveur local (obligatoire pour les modules ES)
```bash
npx serve .
```

### 4. Ouvrir le site
```
http://localhost:3000
```
