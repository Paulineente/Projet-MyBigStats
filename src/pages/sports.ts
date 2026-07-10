import { fetchSports } from "../api/sports.js";

export async function renderSportsPage(main: HTMLElement): Promise<void> {
  main.innerHTML = "";

  const title = document.createElement("h1");
  title.textContent = "Tous les sports";
  main.appendChild(title);

  const list = document.createElement("div");
  list.id = "sports-list";

  const sports = await fetchSports();

  sports.forEach(sport => {
    const card = document.createElement("button");
    card.className = "sport-card";
    card.textContent = sport.name;

    card.onclick = () => {
      window.location.hash = `#sport-${sport.id}`;
    };

    list.appendChild(card);
  });

  main.appendChild(list);
}
