export function generateAnalytics(athletes, sports, equipes, rencontres) {
    var _a;
    const athletesBySport = sports.map((sport) => {
        const athletesCount = athletes.filter((athlete) => athlete.sport_id === sport.id).length;
        return {
            sportId: sport.id,
            sportName: sport.name,
            athletesCount
        };
    });
    const mostRepresentedSport = (_a = [...athletesBySport]
        .sort((a, b) => b.athletesCount - a.athletesCount)[0]) !== null && _a !== void 0 ? _a : null;
    return {
        athletesCount: athletes.length,
        sportsCount: sports.length,
        equipesCount: equipes.length,
        rencontresCount: rencontres.length,
        athletesBySport,
        mostRepresentedSport
    };
}
