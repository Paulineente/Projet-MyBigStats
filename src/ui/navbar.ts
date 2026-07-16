export function renderNavbar(container: HTMLElement): void {
  const header = document.createElement("header");
  header.id = "navbar";

  // Nom du projet
  const brand = document.createElement("div");
  brand.className = "navbar-brand";
  brand.textContent = "My Big Stats";

  // Liens de navigation
  const navLinks = document.createElement("nav");
  navLinks.className = "navbar-links";

  const homeLink = createNavButton("Accueil", "#home");
  const sportsLink = createNavButton("Sports", "#sports");
  const athletesLink = createNavButton("Athlètes", "#athletes");

  navLinks.append(homeLink, sportsLink, athletesLink);

  header.append(brand, navLinks);
  container.appendChild(header);
}

function createNavButton(label: string, hash: string): HTMLButtonElement {
  const btn = document.createElement("button");
  btn.textContent = label;
  btn.onclick = () => {
    window.location.hash = hash;
  };
  return btn;
}
