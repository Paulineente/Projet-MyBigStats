import { fetchSports } from "../api/sports";
import type { Sport } from "../utils/types";

export async function renderNavbar(container: HTMLElement): Promise<void> {
  const nav = document.createElement("nav");
  nav.id = "navbar";

  const sports: Sport[] = await fetchSports();

  sports.forEach((sport) => {
    const btn = document.createElement("button");
    btn.textContent = sport.name;
    btn.addEventListener("click", () => {
      window.location.hash = `#sport-${sport.id}`;
    });
    nav.appendChild(btn);
  });

  container.appendChild(nav);
}
