import type { Athlete, Sport }
from "../../utils/types.js";


import type { TopAthlete }
from "./analytics.performance.types.js";



export function calculateTopAthletes(

    athletes: Athlete[],

    sports: Sport[]

): TopAthlete[] {


    const result: TopAthlete[] = [];



    athletes.forEach((athlete) => {


        const sport =
        sports.find(
            sport =>
            sport.id === athlete.sport_id
        );


        if(!sport){
            return;
        }



        let metricName = "";

        let metricValue = 0;



        // Football
        if(athlete.sport_id === 1){

            metricName = "Buts";

            metricValue =
            athlete.stats.goals;

        }



        // Basketball
        if(athlete.sport_id === 2){

            metricName =
            "Points par match";

            metricValue =
            athlete.stats.points_per_game;

        }



        // MMA
        if(athlete.sport_id === 3){

            metricName =
            "Victoires";

            metricValue =
            athlete.stats.wins;

        }



        result.push({

            athleteId: athlete.id,

            fullName:
            `${athlete.first_name} ${athlete.last_name}`,

            sportName:
            sport.name,

            metricName,

            metricValue

        });


    });



    return result.sort(

        (a,b)=>
        b.metricValue - a.metricValue

    );

}