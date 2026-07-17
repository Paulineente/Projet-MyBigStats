export function getTopPerformers(athletes, sports) {
    var _a, _b, _c;
    var _d, _e, _f;
    const results = [];
    // Football
    const footballPlayers = athletes.filter((a) => a.sport_id === 1);
    if (footballPlayers.length > 0) {
        const best = footballPlayers.reduce((current, next) => next.stats.goals > current.stats.goals ? next : current);
        results.push({
            sport: (_d = (_a = sports.find(s => s.id === 1)) === null || _a === void 0 ? void 0 : _a.name) !== null && _d !== void 0 ? _d : "Football",
            athleteName: `${best.first_name} ${best.last_name}`,
            label: "Buts",
            value: best.stats.goals,
        });
    }
    // Basketball
    const basketballPlayers = athletes.filter((a) => a.sport_id === 2);
    if (basketballPlayers.length > 0) {
        const best = basketballPlayers.reduce((current, next) => next.stats.points_per_game > current.stats.points_per_game
            ? next
            : current);
        results.push({
            sport: (_e = (_b = sports.find(s => s.id === 2)) === null || _b === void 0 ? void 0 : _b.name) !== null && _e !== void 0 ? _e : "Basketball",
            athleteName: `${best.first_name} ${best.last_name}`,
            label: "Points / match",
            value: best.stats.points_per_game,
        });
    }
    // MMA
    const mmaFighters = athletes.filter((a) => a.sport_id === 3);
    if (mmaFighters.length > 0) {
        const best = mmaFighters.reduce((current, next) => next.stats.wins > current.stats.wins ? next : current);
        results.push({
            sport: (_f = (_c = sports.find(s => s.id === 3)) === null || _c === void 0 ? void 0 : _c.name) !== null && _f !== void 0 ? _f : "MMA",
            athleteName: `${best.first_name} ${best.last_name}`,
            label: "Victoires",
            value: best.stats.wins,
        });
    }
    return results;
}
