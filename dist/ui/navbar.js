// src/ui/navbar.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchSports } from "../api/sports.js";
export function renderNavbar(container) {
    return __awaiter(this, void 0, void 0, function* () {
        const nav = document.createElement("nav");
        nav.id = "navbar";
        // Bouton Home
        const homeBtn = document.createElement("button");
        homeBtn.textContent = "Accueil";
        homeBtn.onclick = () => {
            window.location.hash = "#home";
        };
        nav.appendChild(homeBtn);
        // Bouton Sports (page listant tous les sports)
        const sportsBtn = document.createElement("button");
        sportsBtn.textContent = "Sports";
        sportsBtn.onclick = () => {
            window.location.hash = "#sports";
        };
        nav.appendChild(sportsBtn);
        // Liste dynamique des sports
        const sports = yield fetchSports();
        sports.forEach((sport) => {
            const btn = document.createElement("button");
            btn.textContent = sport.name;
            btn.onclick = () => {
                window.location.hash = `#sport-${sport.id}`;
            };
            nav.appendChild(btn);
        });
        container.appendChild(nav);
    });
}
