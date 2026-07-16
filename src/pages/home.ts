import { fetchRencontres } from "../api/rencontres.js";

export async function renderHomePage(main: HTMLElement): Promise<void> {
  main.innerHTML = "";

  const title = document.createElement("h1");
  title.textContent = "Accueil";

  const rencontres = await fetchRencontres();
  const today = new Date().toISOString().slice(0, 10);

  const upcoming = rencontres.filter(r => r.date >= today);
  const past = rencontres.filter(r => r.date < today);

  const upcomingSection = document.createElement("section");
  const upcomingTitle = document.createElement("h2");
  upcomingTitle.textContent = "Événements à venir";
  upcomingSection.append(upcomingTitle, createEncountersTable(upcoming));

  const pastSection = document.createElement("section");
  const pastTitle = document.createElement("h2");
  pastTitle.textContent = "Événements passés";
  pastSection.append(pastTitle, createEncountersTable(past));

  main.append(title, upcomingSection, pastSection);
}

function createEncountersTable(
  rencontres: Awaited<ReturnType<typeof fetchRencontres>>
): HTMLTableElement {
  const table = document.createElement("table");
  table.className = "events-table";

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  ["Date", "Sport", "Lieu"].forEach(label => {
    const th = document.createElement("th");
    th.textContent = label;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  const tbody = document.createElement("tbody");

  if (rencontres.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 3;
    cell.textContent = "Aucun événement à afficher.";
    row.appendChild(cell);
    tbody.appendChild(row);
  } else {
    rencontres.forEach(rencontre => {
      const row = document.createElement("tr");

      const dateCell = document.createElement("td");
      dateCell.textContent = formatDate(rencontre.date);

      const sportCell = document.createElement("td");
      sportCell.textContent = getSportLabel(rencontre.sport_id);

      const venueCell = document.createElement("td");
      venueCell.textContent = rencontre.venue;

      row.append(dateCell, sportCell, venueCell);
      tbody.appendChild(row);
    });
  }

  table.append(thead, tbody);
  return table;
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatEncounterSummary(
  rencontre: Awaited<ReturnType<typeof fetchRencontres>>[number]
): string {
  if (rencontre.type === "match") {
    if (rencontre.sport_id === 1) {
      return `${rencontre.date} — ${rencontre.home_score} - ${rencontre.away_score} (${rencontre.venue})`;
    }

    return `${rencontre.date} — ${rencontre.series} ${rencontre.home_score}-${rencontre.away_score}`;
  }

  return `${rencontre.date} — ${rencontre.fighter1_id} vs ${rencontre.fighter2_id} (${rencontre.method})`;
}

function getSportLabel(sportId: number): string {
  if (sportId === 1) return "Football";
  if (sportId === 2) return "Basketball";
  if (sportId === 3) return "MMA";
  return "Autre";
}
