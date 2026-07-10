var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchRencontres } from "../api/rencontres.js";
export function renderHomePage(main) {
    return __awaiter(this, void 0, void 0, function* () {
        const title = document.createElement("h1");
        title.textContent = "Événements en cours";
        const list = document.createElement("section");
        list.id = "events";
        const rencontres = yield fetchRencontres();
        rencontres.forEach(r => {
            const card = document.createElement("article");
            card.textContent = formatEncounterSummary(r);
            list.appendChild(card);
        });
        main.append(title, list);
    });
}
function formatEncounterSummary(rencontre) {
    if (rencontre.type === "match") {
        if (rencontre.sport_id === 1) {
            return `${rencontre.date} — ${rencontre.home_score} - ${rencontre.away_score} (${rencontre.venue})`;
        }
        return `${rencontre.date} — ${rencontre.series} ${rencontre.home_score}-${rencontre.away_score}`;
    }
    return `${rencontre.date} — ${rencontre.fighter1_id} vs ${rencontre.fighter2_id} (${rencontre.method})`;
}
