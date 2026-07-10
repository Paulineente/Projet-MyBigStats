import { createAppLayout } from "./ui/layout";
import { renderNavbar } from "./ui/navbar";
import { initRouter } from "./router";

function initApp() {
  const { header, main } = createAppLayout();
  renderNavbar(header);
  initRouter(main);
}

initApp();
