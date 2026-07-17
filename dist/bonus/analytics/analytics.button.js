export function createAnalyticsButton(navbar, main) {
    const button = document.createElement("button");
    button.textContent =
        "📊 Analytics";
    button.onclick = () => {
        import("./analytics.page.js")
            .then(({ renderAnalyticsPage }) => {
            renderAnalyticsPage(main);
        });
    };
    navbar.appendChild(button);
}
