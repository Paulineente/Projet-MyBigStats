import { createAppLayout } from "./ui/layout.js";
import { renderNavbar } from "./ui/navbar.js";
import { initRouter } from "./router.js";
function initApp() {
    const { header, main } = createAppLayout();
    renderNavbar(header);
    initRouter(main);
}
initApp();
