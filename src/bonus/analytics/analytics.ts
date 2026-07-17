import type { Athlete } from "../../utils/types.js";
import type { Sport } from "../../utils/types.js";
import type { Equipe } from "../../utils/types.js";
import type { Rencontre } from "../../utils/types.js";

import type { AnalyticsData, SportDistribution }
from "./analytics.types.js";



export function generateAnalytics(

    athletes:Athlete[],

    sports:Sport[],

    equipes:Equipe[],

    rencontres:Rencontre[]

):AnalyticsData {



    const athletesBySport:SportDistribution[] =

    sports.map((sport)=>{


        const count = athletes.filter(

            athlete =>
            athlete.sport_id === sport.id

        ).length;



        return {

            sportId:sport.id,

            sportName:sport.name,

            athletesCount:count

        };

    });



    const mostRepresentedSport =

    [...athletesBySport]

    .sort(

        (a,b)=>
        b.athletesCount -
        a.athletesCount

    )[0] ?? null;



    return {


        athletesCount:
        athletes.length,


        sportsCount:
        sports.length,


        equipesCount:
        equipes.length,


        rencontresCount:
        rencontres.length,


        athletesBySport,


        mostRepresentedSport

    };

}