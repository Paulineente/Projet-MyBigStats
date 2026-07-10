var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchSports } from "../api/sports.js";
import { fetchAthletes } from "../api/athletes.js";
import { fetchRencontres } from "../api/rencontres.js";
export function renderSportPage(main, sportId) {
    return __awaiter(this, void 0, void 0, function* () {
        main.innerHTML = "";
        // Charger les sports pour trouver le bon
        const sports = yield fetchSports();
        const sport = sports.find(s => s.id === sportId);
        if (!sport) {
            main.textContent = "Sport introuvable.";
            return;
        }
        // Titre
        const title = document.createElement("h1");
        title.textContent = sport.name;
        main.appendChild(title);
        // Conteneur des onglets
        const tabs = document.createElement("div");
        tabs.id = "tabs";
        const tabButtons = document.createElement("div");
        tabButtons.id = "tab-buttons";
        const tabContent = document.createElement("div");
        tabContent.id = "tab-content";
        const tabNames = ["Stats", "Historique", "Athlètes"];
        tabNames.forEach(name => {
            const btn = document.createElement("button");
            btn.textContent = name;
            btn.onclick = () => {
                renderTabContent(tabContent, name, sportId);
            };
            tabButtons.appendChild(btn);
        });
        tabs.append(tabButtons, tabContent);
        main.appendChild(tabs);
        // Onglet par défaut
        renderTabContent(tabContent, "Stats", sportId);
    });
}
function renderTabContent(container, tabName, sportId) {
    return __awaiter(this, void 0, void 0, function* () {
        container.innerHTML = "";
        if (tabName === "Stats") {
            yield renderStatsTab(container, sportId);
        }
        if (tabName === "Historique") {
            yield renderHistoriqueTab(container, sportId);
        }
        if (tabName === "Athlètes") {
            yield renderAthletesTab(container, sportId);
        }
    });
}
function renderStatsTab(container, sportId) {
    return __awaiter(this, void 0, void 0, function* () {
        const athletes = yield fetchAthletes();
        const count = athletes.filter(a => a.sport_id === sportId).length;
        const p = document.createElement("p");
        p.textContent = `Nombre d'athlètes : ${count}`;
        container.appendChild(p);
    });
}
function renderHistoriqueTab(container, sportId) {
    return __awaiter(this, void 0, void 0, function* () {
        const rencontres = yield fetchRencontres();
        const filtered = rencontres.filter(r => r.sport_id === sportId);
        filtered.forEach(r => {
            const item = document.createElement("p");
            item.textContent = formatEncounterSummary(r);
            container.appendChild(item);
        });
    });
}
function renderAthletesTab(container, sportId) {
    return __awaiter(this, void 0, void 0, function* () {
        const athletes = yield fetchAthletes();
        const filtered = athletes.filter(a => a.sport_id === sportId);
        filtered.forEach(a => {
            const card = document.createElement("div");
            card.className = "athlete-card";
            card.textContent = formatAthleteName(a);
            container.appendChild(card);
        });
    });
}
function formatAthleteName(athlete) {
    const baseName = `${athlete.first_name} ${athlete.last_name}`;
    if ("nickname" in athlete && athlete.nickname) {
        return `${baseName} (${athlete.nickname})`;
    }
    return baseName;
}
function formatEncounterSummary(rencontre) {
    if (rencontre.type === "match") {
        if (rencontre.sport_id === 1) {
            return `${rencontre.date} — ${rencontre.stage} : ${rencontre.home_score}-${rencontre.away_score}`;
        }
        return `${rencontre.date} — ${rencontre.series} (${rencontre.playoff_round}) : ${rencontre.home_score}-${rencontre.away_score}`;
    }
    return `${rencontre.date} — ${rencontre.fighter1_id} vs ${rencontre.fighter2_id} (${rencontre.method})`;
}
