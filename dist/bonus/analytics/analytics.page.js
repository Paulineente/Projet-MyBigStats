var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchAthletes } from "../../api/athletes.js";
import { fetchSports } from "../../api/sports.js";
import { fetchEquipes } from "../../api/equipes.js";
import { fetchRencontres } from "../../api/rencontres.js";
import { generateAnalytics } from "./analytics.service.js";
import { getTopPerformers } from "./analytics.records.js";
import { renderAnalyticsDashboard } from "./analytics.dom.js";
export function renderAnalyticsPage(main) {
    return __awaiter(this, void 0, void 0, function* () {
        main.innerHTML = `
        <p>Chargement des statistiques...</p>
    `;
        const [athletes, sports, equipes, rencontres] = yield Promise.all([
            fetchAthletes(),
            fetchSports(),
            fetchEquipes(),
            fetchRencontres()
        ]);
        const analytics = generateAnalytics(athletes, sports, equipes, rencontres);
        const topPerformers = getTopPerformers(athletes, sports);
        const dashboard = renderAnalyticsDashboard(analytics, topPerformers);
        main.innerHTML = "";
        main.appendChild(dashboard);
    });
}
