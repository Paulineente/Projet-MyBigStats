export function renderFooter(container: HTMLElement): void {
  const footer = document.createElement("footer");
  footer.id = "footer";
  footer.textContent = "MyBigStats ©";
  container.appendChild(footer);
}
