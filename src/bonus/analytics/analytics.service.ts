import type {
    Athlete,
    Sport,
    Equipe,
    Rencontre
} from "../../utils/types.js";


import type {
    AnalyticsData,
    SportDistribution
} from "./analytics.types.js";



export function generateAnalytics(

    athletes: Athlete[],

    sports: Sport[],

    equipes: Equipe[],

    rencontres: Rencontre[]

): AnalyticsData {


    const athletesBySport: SportDistribution[] =
    sports.map((sport) => {


        const athletesCount =
        athletes.filter(

            (athlete) =>
            athlete.sport_id === sport.id

        ).length;



        return {

            sportId: sport.id,

            sportName: sport.name,

            athletesCount

        };

    });



    const mostRepresentedSport =

    [...athletesBySport]

    .sort(

        (a, b) =>
        b.athletesCount - a.athletesCount

    )[0] ?? null;



    return {

        athletesCount: athletes.length,

        sportsCount: sports.length,

        equipesCount: equipes.length,

        rencontresCount: rencontres.length,

        athletesBySport,

        mostRepresentedSport

    };

}