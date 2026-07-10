import { fetchSports } from "../api/sports.js";
import type { Sport } from "../utils/types.js";

export async function renderNavbar(container: HTMLElement): Promise<void> {
  const nav = document.createElement("nav");
  nav.id = "navbar";

  // Bouton Home
  const homeBtn = document.createElement("button");
  homeBtn.textContent = "Accueil";
  homeBtn.onclick = () => {
    window.location.hash = "#home";
  };
  nav.appendChild(homeBtn);

  // Bouton Sports (page listant tous les sports)
  const sportsBtn = document.createElement("button");
  sportsBtn.textContent = "Sports";
  sportsBtn.onclick = () => {
    window.location.hash = "#sports";
  };
  nav.appendChild(sportsBtn);

  // Liste dynamique des sports
  const sports: Sport[] = await fetchSports();

  sports.forEach((sport) => {
    const btn = document.createElement("button");
    btn.textContent = sport.name;

    btn.onclick = () => {
      window.location.hash = `#sport-${sport.id}`;
    };

    nav.appendChild(btn);
  });

  container.appendChild(nav);
}
