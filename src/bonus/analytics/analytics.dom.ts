import type { AnalyticsData }
from "./analytics.types.js";


export function renderAnalyticsDashboard(
    data: AnalyticsData
): HTMLElement {


    const container =
    document.createElement("section");

    container.className =
    "analytics-dashboard";


    const title =
    document.createElement("h2");

    title.textContent =
    "📊 MyBigStats Analytics";


    const summary =
    document.createElement("div");

    summary.className =
    "analytics-summary";


    summary.innerHTML = `

        <article>
            <h3>👥 Athlètes</h3>
            <p>${data.athletesCount}</p>
        </article>


        <article>
            <h3>🏆 Sports</h3>
            <p>${data.sportsCount}</p>
        </article>


        <article>
            <h3>🛡️ Équipes</h3>
            <p>${data.equipesCount}</p>
        </article>


        <article>
            <h3>🔥 Rencontres</h3>
            <p>${data.rencontresCount}</p>
        </article>

    `;



    const distribution =
    document.createElement("div");


    distribution.innerHTML =
    "<h3>Répartition des athlètes</h3>";



    data.athletesBySport.forEach(
        sport => {


        const line =
        document.createElement("p");


        line.textContent =
        `${sport.sportName} : ${sport.athletesCount} athlètes`;


        distribution.appendChild(line);


    });



    const bestSport =
    document.createElement("p");



    if(data.mostRepresentedSport){

        bestSport.textContent =
        `🏆 Sport dominant : ${data.mostRepresentedSport.sportName}`;

    }
    else{

        bestSport.textContent =
        "Aucune donnée disponible";

    }



    container.append(
        title,
        summary,
        distribution,
        bestSport
    );


    return container;

}