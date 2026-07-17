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
# Bonus personnel - Analytics Dashboard 📊

## Présentation

J'ai ajouté un module d'analyse statistique indépendant afin d'améliorer l'expérience utilisateur et d'apporter une vision globale des données disponibles dans MyBigStats.

L'objectif était d'ajouter une fonctionnalité supplémentaire sans modifier l'architecture existante du projet.

---

## Choix d'architecture

J'ai choisi de créer un module séparé dans :

```
src/bonus/analytics/
```

afin de respecter le principe de séparation des responsabilités.

Le module est organisé en plusieurs parties :

* `analytics.page.ts`
  → gestion du chargement des données et orchestration de l'affichage.

* `analytics.service.ts`
  → traitement des données et calcul des statistiques générales.

* `analytics.records.ts`
  → calcul des meilleurs athlètes selon leur sport.

* `analytics.dom.ts`
  → création dynamique de l'interface avec le DOM.

* `analytics.types.ts`
  → définition des types TypeScript utilisés par le module.

---

## Fonctionnalités ajoutées

### Tableau de bord global

Ajout d'une page Analytics permettant d'afficher :

* nombre total d'athlètes ;
* nombre de sports ;
* nombre d'équipes ;
* nombre de rencontres.

---

### Répartition des athlètes

J'ai ajouté une représentation visuelle dynamique de la répartition des athlètes par sport.

Le graphique est généré uniquement avec les outils natifs du navigateur :

* création d'éléments HTML avec `createElement`;
* modification dynamique des styles ;
* calcul automatique des proportions.

Aucune bibliothèque externe n'a été utilisée.

---

### Top Performers

Ajout d'un classement automatique des meilleurs profils selon leur discipline :

* Football → nombre de buts ;
* Basketball → moyenne de points par match ;
* MMA → nombre de victoires.

Le système s'adapte automatiquement aux données récupérées depuis l'API.

---

## Gestion TypeScript

J'ai utilisé TypeScript afin de sécuriser les échanges entre les différentes parties du module.

Les interfaces permettent :

* d'éviter les erreurs de manipulation des données ;
* de garantir une structure claire ;
* de faciliter la maintenance et les évolutions futures.

---

## Gestion de l'asynchronisme

Les données nécessaires au dashboard sont récupérées de manière asynchrone avec `Promise` et `async/await`.

L'utilisation de `Promise.all()` permet de charger plusieurs ressources simultanément :

* athlètes ;
* sports ;
* équipes ;
* rencontres.

Cela améliore les performances et simplifie la gestion du chargement.

---

## Pourquoi ce choix ?

Cette approche permet d'ajouter une fonctionnalité importante sans modifier le fonctionnement existant de l'application.

Le module Analytics reste indépendant, réutilisable et facilement extensible pour ajouter d'autres statistiques dans le futur.


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
`
