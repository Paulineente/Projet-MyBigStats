export function createAppLayout() {
    const app = document.getElementById("app");
    if (!app) {
        throw new Error("Élément #app introuvable dans le DOM");
    }
    const header = document.createElement("header");
    header.id = "header";
    const main = document.createElement("main");
    main.id = "main";
    const footer = document.createElement("footer");
    footer.id = "footer";
    footer.textContent = "MyBigStats ©";
    app.append(header, main, footer);
    return { app, header, main, footer };
}
