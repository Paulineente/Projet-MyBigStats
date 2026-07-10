// src/pages/sports.ts
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
export function renderSportsPage(main) {
    return __awaiter(this, void 0, void 0, function* () {
        main.innerHTML = "";
        const title = document.createElement("h1");
        title.textContent = "Tous les sports";
        main.appendChild(title);
        const list = document.createElement("div");
        list.id = "sports-list";
        const sports = yield fetchSports();
        sports.forEach(sport => {
            const card = document.createElement("button");
            card.className = "sport-card";
            card.textContent = sport.name;
            card.onclick = () => {
                window.location.hash = `#sport-${sport.id}`;
            };
            list.appendChild(card);
        });
        main.appendChild(list);
    });
}
