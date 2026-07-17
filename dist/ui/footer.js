export function renderFooter(container) {
    const footer = document.createElement("footer");
    footer.id = "footer";
    footer.textContent = "MyBigStats ©";
    container.appendChild(footer);
}
