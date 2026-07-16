import { renderNavbar } from "./navbar.js";
import { renderFooter } from "./footer.js";
export function renderLayout(root) {
    root.innerHTML = "";
    const navbarContainer = document.createElement("div");
    renderNavbar(navbarContainer);
    const main = document.createElement("main");
    const footerContainer = document.createElement("div");
    renderFooter(footerContainer);
    root.append(navbarContainer, main, footerContainer);
    return main;
}
