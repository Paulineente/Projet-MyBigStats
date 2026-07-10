import { fetchRencontres } from "../api/rencontres.js";

export async function renderHomePage(main: HTMLElement): Promise<void> {
  const title = document.createElement("h1");
  title.textContent = "Événements en cours";

  const list = document.createElement("section");
  list.id = "events";

  const rencontres = await fetchRencontres();

  rencontres.forEach(r => {
    const card = document.createElement("article");
    card.textContent = formatEncounterSummary(r);
    list.appendChild(card);
  });

  main.append(title, list);
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
