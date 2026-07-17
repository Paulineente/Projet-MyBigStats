import { fetchAthletes } from "../../api/athletes.js";
import { fetchSports } from "../../api/sports.js";
import { fetchEquipes } from "../../api/equipes.js";
import { fetchRencontres } from "../../api/rencontres.js";

import { generateAnalytics } from "./analytics.service.js";
import { renderAnalyticsDashboard } from "./analytics.dom.js";


export async function renderAnalyticsPage(
    main: HTMLElement
): Promise<void> {


    main.innerHTML = `

        <p>
            Chargement des statistiques...
        </p>

    `;


    const [

        athletes,

        sports,

        equipes,

        rencontres

    ] = await Promise.all([

        fetchAthletes(),

        fetchSports(),

        fetchEquipes(),

        fetchRencontres()

    ]);



    const analytics =
    generateAnalytics(

        athletes,

        sports,

        equipes,

        rencontres

    );



    const dashboard =
    renderAnalyticsDashboard(
        analytics
    );


    main.innerHTML = "";

    main.appendChild(dashboard);

}