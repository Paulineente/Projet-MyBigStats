import { renderHomePage } from "./pages/home";
import { notifyError } from "./utils/errors";

export function initRouter(main: HTMLElement): void {
  function render() {
    const hash = window.location.hash || "#home";
    main.innerHTML = "";

    if (hash === "#home") {
      renderHomePage(main);
      return;
    }

    /*if (hash.startsWith("#sport-")) {
      const id = Number(hash.replace("#sport-", ""));
      if (Number.isNaN(id)) {
        notifyError(new Error("Sport inexistant"));
        return;
      }
      renderSportPage(main, id);
      return;
    }*/

    notifyError(new Error("Page introuvable"));
  }

  window.addEventListener("hashchange", render);
  render();
}
