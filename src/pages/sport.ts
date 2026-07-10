import { fetchSports } from "../api/sports.js";
import { fetchAthletes } from "../api/athletes.js";
import { fetchRencontres } from "../api/rencontres.js";

export async function renderSportPage(main: HTMLElement, sportId: number): Promise<void> {
  main.innerHTML = "";

  // Charger les sports pour trouver le bon
  const sports = await fetchSports();
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
}

async function renderTabContent(container: HTMLElement, tabName: string, sportId: number): Promise<void> {
  container.innerHTML = "";

  if (tabName === "Stats") {
    await renderStatsTab(container, sportId);
  }

  if (tabName === "Historique") {
    await renderHistoriqueTab(container, sportId);
  }

  if (tabName === "Athlètes") {
    await renderAthletesTab(container, sportId);
  }
}

async function renderStatsTab(container: HTMLElement, sportId: number): Promise<void> {
  const athletes = await fetchAthletes();
  const count = athletes.filter(a => a.sport_id === sportId).length;

  const p = document.createElement("p");
  p.textContent = `Nombre d'athlètes : ${count}`;
  container.appendChild(p);
}

async function renderHistoriqueTab(container: HTMLElement, sportId: number): Promise<void> {
  const rencontres = await fetchRencontres();
  const filtered = rencontres.filter(r => r.sport_id === sportId);

  filtered.forEach(r => {
    const item = document.createElement("p");
    item.textContent = formatEncounterSummary(r);
    container.appendChild(item);
  });
}

async function renderAthletesTab(container: HTMLElement, sportId: number): Promise<void> {
  const athletes = await fetchAthletes();
  const filtered = athletes.filter(a => a.sport_id === sportId);

  filtered.forEach(a => {
    const card = document.createElement("div");
    card.className = "athlete-card";
    card.textContent = formatAthleteName(a);
    container.appendChild(card);
  });
}

function formatAthleteName(
  athlete: Awaited<ReturnType<typeof fetchAthletes>>[number]
): string {
  const baseName = `${athlete.first_name} ${athlete.last_name}`;
  if ("nickname" in athlete && athlete.nickname) {
    return `${baseName} (${athlete.nickname})`;
  }

  return baseName;
}

function formatEncounterSummary(
  rencontre: Awaited<ReturnType<typeof fetchRencontres>>[number]
): string {
  if (rencontre.type === "match") {
    if (rencontre.sport_id === 1) {
      return `${rencontre.date} — ${rencontre.stage} : ${rencontre.home_score}-${rencontre.away_score}`;
    }

    return `${rencontre.date} — ${rencontre.series} (${rencontre.playoff_round}) : ${rencontre.home_score}-${rencontre.away_score}`;
  }

  return `${rencontre.date} — ${rencontre.fighter1_id} vs ${rencontre.fighter2_id} (${rencontre.method})`;
}
