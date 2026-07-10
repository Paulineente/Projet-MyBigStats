import { renderHomePage } from "./pages/home.js";
import { renderSportsPage } from "./pages/sports.js";
import { renderSportPage } from "./pages/sport.js";

import { notifyError } from "./utils/errors.js";

export function initRouter(main: HTMLElement): void {
  function render() {
    const hash = window.location.hash || "#home";
    main.innerHTML = "";

    // Page d'accueil
    if (hash === "#home") {
      renderHomePage(main);
      return;
    }

    // Page listant tous les sports
    if (hash === "#sports") {
      renderSportsPage(main);
      return;
    }

    // Page d'un sport spécifique
    if (hash.startsWith("#sport-")) {
      const id = Number(hash.replace("#sport-", ""));
      if (Number.isNaN(id)) {
        notifyError(new Error("Sport inexistant"));
        return;
      }
      renderSportPage(main, id);
      return;
    }

    // Si aucune route ne correspond
    notifyError(new Error("Page introuvable"));
  }

  window.addEventListener("hashchange", render);
  render(); 
}
