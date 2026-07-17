export interface SportDistribution {

    sportId: number;

    sportName: string;

    athletesCount: number;

}


export interface AnalyticsData {

    athletesCount: number;

    sportsCount: number;

    equipesCount: number;

    rencontresCount: number;


    athletesBySport: SportDistribution[];


    mostRepresentedSport: SportDistribution | null;

    
}
export interface TopAthlete {

    athleteId: number;

    fullName: string;

    sportName: string;

    metricName: string;

    metricValue: number;

}