import { renderLayout } from "./ui/layout.js";
import { initRouter } from "./router.js";
window.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("app");
    if (!root) {
        console.error("Impossible de trouver #app dans index.html");
        return;
    }
    const main = renderLayout(root);
    initRouter(main);
});
