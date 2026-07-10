import { fetchRencontres } from "../api/rencontres";

export async function renderHomePage(main: HTMLElement): Promise<void> {
  const title = document.createElement("h1");
  title.textContent = "Événements en cours";

  const list = document.createElement("section");
  list.id = "events";

  const rencontres = await fetchRencontres();

  rencontres.forEach(r => {
    const card = document.createElement("article");
    card.textContent = `${r.date} — Sport #${r.sportId}`;
    list.appendChild(card);
  });

  main.append(title, list);
}
